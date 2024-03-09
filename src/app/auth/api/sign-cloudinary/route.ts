import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { v2 as cloudinary } from "cloudinary";
import { limiter } from "@/lib/Limiter";

export async function POST(request: NextRequest) {
  
  const remaining = await limiter.removeTokens(1);
  if (remaining < 0) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }


  const body = JSON.parse(request.body) || {};
  const { paramsToSign } = body;

  const sessionId = cookies().get("session")?.value;
  if (!sessionId) {
    return NextResponse.json({ error: "Session not found" }, { status: 400 });
  }
  const { user } = await lucia.validateSession(sessionId);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 400 });
  }

  if (!user.email_verified) {
    return NextResponse.json({ error: "User not verified" }, { status: 400 });
  }

  try {
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET as string,
    );
    return NextResponse.json({ signature }, { status: 200 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "Bad request" },
          {
            status: 301,
          },
        );
      }
    }
  }
}
