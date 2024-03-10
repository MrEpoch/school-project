import { limiter } from "@/lib/Limiter";
import { lucia } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Argon2id } from "oslo/password";
import { z } from "zod";

export async function POST(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const remaining = await limiter.removeTokens(1);
  const requestUrl = new URL(request.url);

  if (remaining < 0) {
    return NextResponse.redirect(requestUrl.origin + "/too-many-requests", {
      status: 429,
    });
  }

  const formData = await request.formData();
  const password = formData.get("password");
  const repeat_password = formData.get("repeat_password");
  const token = params.slug;

  const passwordZod = z.string().min(8);

  const passwordResult = passwordZod.safeParse(password);
  const repeatPasswordResult = passwordZod.safeParse(repeat_password);

  console.log(params);

  try {
    const token_db = await prisma.password_reset.findUnique({
      where: {
        id: token,
      },
    });

    if (token_db) {
      if (!passwordResult.success) {
        return NextResponse.redirect(
          requestUrl.origin +
            "/auth/reset-password/verify/" +
            token +
            "?error=invalid_password",
          { status: 400 },
        );
      } else if (!repeatPasswordResult.success) {
        return NextResponse.redirect(
          requestUrl.origin +
            "/auth/reset-password/verify/" +
            token +
            "?error=invalid_repeat_password",
          { status: 400 },
        );
      } else if (passwordResult.data !== repeatPasswordResult.data) {
        return NextResponse.redirect(
          requestUrl.origin +
            "/auth/reset-password/verify/" +
            token +
            "?error=invalid_repeat_password",
          { status: 400 },
        );
      }

      await prisma.password_reset.delete({
        where: {
          id: token,
        },
      });
    } else {
      return NextResponse.redirect(
        requestUrl.origin + "/auth/reset-password/verify/?error=invalid_token",
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: token_db.userId,
      },
    });

    if (!user) {
      return NextResponse.redirect(
        requestUrl.origin + "/auth/reset-password/verify/?error=user_not_found",
        { status: 400 },
      );
    }

    await lucia.invalidateUserSessions(user.id);
    const hashed_password = await new Argon2id().hash(passwordResult.data);
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        hashed_password,
      },
    });

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set("session", sessionCookie.value);
    return NextResponse.redirect(requestUrl.origin + "/auth/user", {
      status: 301,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(
      requestUrl.origin +
        "/auth/reset-password/verify/" +
        token +
        "?error=unknown_error",
      { status: 400 },
    );
  }
}
