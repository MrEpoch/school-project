import { limiter } from "@/lib/Limiter";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
  const remaining = await limiter.removeTokens(1);

  if (remaining < 0) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const requestUrl = new URL(req.url);
  const formData = await req.formData();

  const email = formData.get("email");

  const emailZod = z.string().email();

  const emailResult = emailZod.safeParse(email);

  if (!emailResult.success) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  try {
    const dbUser = await prisma.user.findUnique({
      where: {
        email: emailResult.data,
      },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 500 });
    }

    await prisma.user.update({
      where: {
        id: dbUser.id,
      },
      data: {
        is_sponsor: true,
      },
    });

    return NextResponse.redirect(requestUrl.origin + "/auth/sponsorship");
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
