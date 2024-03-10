import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { limiter } from "@/lib/Limiter";

export async function POST(request: NextRequest) {
  const remaining = await limiter.removeTokens(1);

  const requestUrl = new URL(request.url);
  if (remaining < 0) {
    return NextResponse.redirect(requestUrl.origin + "/too-many-requests", {
      status: 429,
    });
  }

  const sessionId = cookies().get("session")?.value;
  if (!sessionId) {
    return NextResponse.redirect("/auth/login", { status: 400 });
  }
  const { user } = await lucia.validateSession(sessionId);
  if (!user) {
    cookies().delete("session");
    return NextResponse.redirect("/auth/login", { status: 400 });
  }

  try {
    await lucia.invalidateSession(sessionId);
  } catch (error) {
    return NextResponse.redirect(
      requestUrl.origin + "/auth/user?error=logout",
      { status: 500 },
    );
  }
  return NextResponse.redirect(requestUrl.origin + "/auth/login");
}
