import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { v2 as cloudinary } from "cloudinary";
import { limiter } from "@/lib/Limiter";

export async function POST(request: NextRequest) {
  const remaining = await limiter.removeTokens(1);
  const requestUrl = new URL(request.url);
  if (remaining < 0) {
    return NextResponse.redirect(requestUrl.origin + "/too-many-requests", {
      status: 429,
    });
  }

  const body = JSON.parse(request.body) || {};
  const { paramsToSign } = body;

  const sessionId = cookies().get("session")?.value;
  if (!sessionId) {
    return NextResponse.redirect(requestUrl + "/auth/login", { status: 400 });
  }
  const { user } = await lucia.validateSession(sessionId);

  if (!user) {
    return NextResponse.redirect(requestUrl + "/auth/login", { status: 400 });
  }

  if (!user.email_verified) {
    return NextResponse.redirect(requestUrl + "/auth/login", { status: 400 });
  }

  try {
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET as string,
    );
    return NextResponse.json({ signature }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(requestUrl + "/auth/login", { status: 500 });
  }
}
