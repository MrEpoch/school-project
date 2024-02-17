import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function EmailVerifyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessionId = cookies().get("session")?.value;
  if (!sessionId) {
    console.log("ses", sessionId);
    throw redirect("/auth/login");
  }
  console.log(sessionId);
  const { user } = await lucia.validateSession(sessionId);
  console.log(user);
  if (!user) {
    throw redirect("/auth/login");
  }
  if (!user.email_verified) {
    throw redirect("/auth/email-verify");
  }

  return <>{children}</>;
}
