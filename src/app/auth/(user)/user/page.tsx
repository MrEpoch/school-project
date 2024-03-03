import { authChecker } from "@/lib/checkAuth";
import Link from "next/link";

export default async function Page() {
  const user = await authChecker();
  return (
    <div className="min-h-screen w-full dark:bg-darkmode-500">
      <div className="flex flex-col gap-10 items-center justify-center h-screen max-w-screen-xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <form method="POST" action="/auth/api/logout">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Logout
          </button>
        </form>
        {user?.is_sponsor && (
          <Link href="/auth/sponsorship">Add sponsorship</Link>
        )}
      </div>
    </div>
  );
}
