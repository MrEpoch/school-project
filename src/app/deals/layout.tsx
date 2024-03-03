import { authChecker } from "@/lib/checkAuth";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await authChecker();
  return <>{children}</>;
}
