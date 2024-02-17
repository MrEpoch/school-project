import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { verifyEmailCode } from "@/lib/EmailVerify";
import { lucia } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const emailCode = formData.get("email_code");

  const sessionId = cookies().get("session")?.value;
  if (!sessionId) {
    return NextResponse.json({ error: "Session not found" }, { status: 400 });
  }
  const { user } = await lucia.validateSession(sessionId);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 400 });
  }

  if (user.email_verified) {
    return NextResponse.json(
      { error: "User already verified" },
      { status: 400 },
    );
  }

  console.log("it rendered 1");

  const emailCodeZod = z.string().length(8);

  console.log("it rendered 2");

  const emailCodeResult = emailCodeZod.safeParse(emailCode);

  console.log("it rendered 3");

  if (!emailCodeResult.success) {
    console.log("false mail code");
    return NextResponse.json({ error: "Invalid code email" }, { status: 400 });
  }
  console.log("it rendered 4");

  try {
    console.log("it rendered 5");

    const validCode = await verifyEmailCode(user, emailCodeResult.data);

    if (!validCode) {
      console.log("false valid code");
      return NextResponse.json(
        { error: "Invalid code email" },
        { status: 400 },
      );
    }
    console.log("it rendered 6");

    await lucia.invalidateUserSessions(user.id);
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        email_verified_value: true,
      },
    });

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    console.log("it rendered 9");

    console.log("it rendered 10");

    cookies().set("session", sessionCookie?.value, { path: "/" });
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
