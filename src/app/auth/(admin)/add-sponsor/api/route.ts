import { limiter } from "@/lib/Limiter";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
  const remaining = await limiter.removeTokens(1);
  const requestUrl = new URL(req.url);

  if (remaining < 0) {
    return NextResponse.redirect(requestUrl.origin + "/too-many-requests", {
      status: 429,
    });
  }

  const formData = await req.formData();

  const email = formData.get("email");

  const emailZod = z.string().email();

  const emailResult = emailZod.safeParse(email);

  if (!emailResult.success) {
    return NextResponse.redirect(
      requestUrl.origin + "/auth/sponsorship?error=invalid_email",
    );
  }

  try {
    const dbUser = await prisma.user.findUnique({
      where: {
        email: emailResult.data,
      },
    });

    if (!dbUser) {
      return NextResponse.redirect(
        requestUrl.origin + "/auth/sponsorship?error=user_not_found",
      );
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
    return NextResponse.redirect(
      requestUrl.origin + "/auth/sponsorship?error=unknown_error",
    );
  }
}
