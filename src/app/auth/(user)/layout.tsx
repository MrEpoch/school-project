import { authChecker } from "@/lib/checkAuth";

export default async function EmailVerifyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await authChecker();
  return <>{children}</>;
}
