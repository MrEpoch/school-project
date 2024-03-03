import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { lucia } from "./auth";

export async function authChecker() {
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
