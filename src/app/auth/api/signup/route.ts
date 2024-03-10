import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { createUser } from "@/lib/UserActions";
import { generateEmailVerificationCode } from "@/lib/EmailVerify";
import { sendMail } from "@/lib/SendMail";
import { lucia } from "@/lib/auth";
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
  const password = formData.get("password");
  const password2 = formData.get("password_confirm");

  const emailZod = z.string().email();
  const passwordZod = z.string().min(8);

  const emailResult = emailZod.safeParse(email);
  const passwordResult = passwordZod.safeParse(password);
  const password2Result = z.string().min(8).safeParse(password2);

  if (!emailResult.success) {
    return NextResponse.redirect(
      requestUrl.origin + "/auth/signup?error=invalid_email",
      { status: 400 },
    );
  } else if (!passwordResult.success) {
    return NextResponse.redirect(
      requestUrl.origin + "/auth/signup?error=invalid_password",
      { status: 400 },
    );
  } else if (!password2Result.success) {
    return NextResponse.redirect(
      requestUrl.origin + "/auth/signup?error=invalid_password_repeat",
      { status: 400 },
    );
  } else if (passwordResult.data !== password2Result.data) {
    return NextResponse.redirect(
      requestUrl.origin + "/auth/signup?error=invalid_password_repeat",
      { status: 400 },
    );
  }

  try {
    const user = await createUser(emailResult.data, passwordResult.data);

    if (!user) {
      return NextResponse.redirect(
        requestUrl.origin + "/auth/signup?error=user_not_created",
        { status: 400 },
      );
    }

    const verificationCode = await generateEmailVerificationCode(
      user.id,
      user.email,
    );

    await sendMail({
      to: user.email,
      subject: "Verify your email",
      text: `Your verification code is ${verificationCode}`,
    });

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set("session", sessionCookie.value, { path: "/" });
    return NextResponse.redirect(requestUrl.origin + "/auth/email-verify", {
      status: 301,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.redirect(
          requestUrl.origin + "/signup?error=email_exists",
          {
            status: 301,
          },
        );
      }
    }
    return NextResponse.redirect(
      requestUrl.origin + "/auth/signup?error=user_not_created",
      { status: 400 },
    );
  }
}
