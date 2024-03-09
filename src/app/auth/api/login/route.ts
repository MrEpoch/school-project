import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { getUser } from "@/lib/UserActions";
import { lucia } from "@/lib/auth";
import { Argon2id } from "oslo/password";
import { limiter } from "@/lib/Limiter";

export async function POST(request: NextRequest) {
  const remaining = await limiter.removeTokens(1);
  const requestUrl = new URL(request.url);

  if (remaining < 0) {
    return NextResponse.redirect(requestUrl.origin + "/too-many-requests", { status: 429 });
  }

  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  const emailZod = z.string().email();
  const passwordZod = z.string().min(8);

  const emailResult = emailZod.safeParse(email);
  const passwordResult = passwordZod.safeParse(password);

  if (!emailResult.success) {
    console.log("false mail");
    return NextResponse.redirect(requestUrl.origin + "/auth/login?error=invalid_email", {
     status: 301, 
    });
  } else if (!passwordResult.success) {
    console.log("false password");
    return NextResponse.redirect(requestUrl.origin + "/auth/login?error=invalid_password", {
      status: 301,
    })
  }

  try {
    const user = await getUser(emailResult.data);

    if (!user) {
      return NextResponse.redirect(requestUrl.origin + "/auth/login?error=user_not_found", {
        status: 301,
      });
    }

    const validPassword = await new Argon2id().verify(
      user.hashed_password,
      passwordResult.data,
    );

    if (!validPassword) {
      return NextResponse.redirect(requestUrl.origin + "/auth/login?error=invalid_password", {
        status: 301,
      })
    }

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set("session", sessionCookie.value, { path: "/" });
    return NextResponse.redirect(requestUrl.origin + "/auth/user", {
      status: 301,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(requestUrl.origin + "/auth/login?error=unknown_error", { status: 500 });
  }
}
