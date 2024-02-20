import { lucia } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Argon2id } from "oslo/password";
import { z } from "zod";

export async function POST(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const password = formData.get("password");
  const repeat_password = formData.get("repeat_password");
  const token = params.slug;

  const passwordZod = z.string().min(8);

  const passwordResult = passwordZod.safeParse(password);
  const repeatPasswordResult = passwordZod.safeParse(repeat_password);

  if (!passwordResult.success) {
    return NextResponse.json({ error: "Invalid password" }, { status: 400 });
  } else if (!repeatPasswordResult.success) {
    return NextResponse.json(
      { error: "Invalid repeat password" },
      { status: 400 },
    );
  } else if (passwordResult.data !== repeatPasswordResult.data) {
    return NextResponse.json(
      { error: "Passwords do not match" },
      { status: 400 },
    );
  }

  try {
    const token_db = await prisma.password_reset.findUnique({
      where: {
        id: token,
      },
    });

    if (token_db) {
      await prisma.password_reset.delete({
        where: {
          id: token,
        },
      });
    }

    if (!token_db) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: token_db.userId,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Unknown user" }, { status: 400 });
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
