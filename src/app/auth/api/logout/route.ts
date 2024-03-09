import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { limiter } from "@/lib/Limiter";

export async function POST(request: NextRequest) {
  const remaining = await limiter.removeTokens(1);

  if (remaining < 0) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const requestUrl = new URL(request.url);
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
    return NextResponse.json({ error: "Failed to logout" }, { status: 500 });
  }
  return NextResponse.redirect(requestUrl.origin + "/auth/login");
}
