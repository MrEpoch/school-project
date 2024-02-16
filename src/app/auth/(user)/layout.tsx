import { lucia } from "@/lib/auth";
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export default async function EmailVerifyLayout({ children }: { children: React.ReactNode }) {

  const sessionId = cookies().get("session")?.value;
  if (!sessionId) {
    throw redirect("/auth/login");
  }
  const { user } = await lucia.validateSession(sessionId);
  if (!user) {
    throw redirect("/auth/login");
  }
  if (!user.emailVerified) {
    throw redirect("/auth/email-verify");
  }

  return (
    <>
      {children}
    </>
  )
}
