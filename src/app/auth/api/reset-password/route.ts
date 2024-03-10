import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getUser } from "@/lib/UserActions";
import { createPasswordResetToken } from "@/lib/PasswordReset";
import { sendMail } from "@/lib/SendMail";
import { limiter } from "@/lib/Limiter";

export async function POST(request: Request) {
  const remaining = await limiter.removeTokens(1);

  const requestUrl = new URL(request.url);
  if (remaining < 0) {
    return NextResponse.redirect(requestUrl.origin + "/too-many-requests", {
      status: 429,
    });
  }

  const formData = await request.formData();
  const email = formData.get("email");

  const emailZod = z.string().email();

  const emailResult = emailZod.safeParse(email);

  if (!emailResult.success) {
    console.log("false mail");
    return NextResponse.redirect(
      requestUrl.origin + "/auth/reset-password?error=invalid_email",
      { status: 400 },
    );
  }

  try {
    const user = await getUser(emailResult.data);

    if (!user) {
      return NextResponse.redirect(
        requestUrl.origin + "/auth/reset-password?error=user_not_found",
        {
          status: 301,
        },
      );
    } else if (!user.email_verified_value) {
      return NextResponse.redirect(
        requestUrl.origin + "/auth/reset-password?error=not_verified",
        {
          status: 301,
        },
      );
    }

    const verificationToken = await createPasswordResetToken(user.id);
    const verificationLink = `${requestUrl.origin}/auth/reset-password/verify/${verificationToken}`;

    await sendMail({
      to: user.email,
      subject: "Password Reset",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
      Please click on the following link, or paste this into your browser to complete the process:\n\n
      ${verificationLink}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    });

    return NextResponse.redirect(
      requestUrl.origin + "/auth/reset-password/info",
      {
        status: 301,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(
      requestUrl.origin + "/auth/reset-password?error=unknown_error",
      { status: 500 },
    );
  }
}
