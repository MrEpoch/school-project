import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { createUser } from "@/lib/UserActions";
import { generateEmailVerificationCode } from "@/lib/EmailVerify";
import { sendMail } from "@/lib/SendMail";
import { lucia } from "@/lib/auth";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
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
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  } else if (!passwordResult.success) {
    return NextResponse.json({ error: "Invalid password" }, { status: 400 });
  } else if (!password2Result.success) {
    return NextResponse.json(
      { error: "Confirm password is invalid" },
      { status: 400 },
    );
  } else if (passwordResult.data !== password2Result.data) {
    return NextResponse.json(
      { error: "Passwords do not match" },
      { status: 400 },
    );
  }

  try {
    const user = await createUser(emailResult.data, passwordResult.data);

    if (!user) {
      return NextResponse.json(
        { error: "User creation failed" },
        { status: 500 },
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
    console.log(error);
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
  }
}
