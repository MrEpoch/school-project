import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { getUser } from "@/lib/UserActions";
import { lucia } from "@/lib/auth";
import { Argon2id } from "oslo/password";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  const emailZod = z.string().email();
  const passwordZod = z.string().min(8);

  const emailResult = emailZod.safeParse(email);
  const passwordResult = passwordZod.safeParse(password);

  if (!emailResult.success) {
    console.log("false mail");
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  } else if (!passwordResult.success) {
    console.log("false password");
    return NextResponse.json({ error: "Invalid password" }, { status: 400 });
  }

  try {
    const user = await getUser(emailResult.data);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 500 });
    }

    const validPassword = await new Argon2id().verify(
      user.hashed_password,
      passwordResult.data,
    );

    if (!validPassword) {
      return NextResponse.json(
        { error: "Passwords don't match" },
        { status: 400 },
      );
    }
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set("session", sessionCookie.value, { path: "/" });
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
