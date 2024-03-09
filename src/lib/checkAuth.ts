import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { lucia } from "./auth";
import { limiter } from "./Limiter";

export async function authChecker() {
  const remaining = await limiter.removeTokens(1);

  if (remaining < 0) {
    redirect("/too-many-requests");
  }

  const sessionId = cookies().get("session")?.value;
  if (!sessionId) {
    redirect("/auth/login");
  }
  const { user } = await lucia.validateSession(sessionId);
  if (!user) {
    redirect("/auth/login");
  }
  if (!user.email_verified) {
    redirect("/auth/email-verify");
  }

  return user;
}
