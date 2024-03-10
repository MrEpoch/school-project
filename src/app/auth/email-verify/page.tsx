import ErrorHandler from "@/components/ErrorHandler";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const sessionId = cookies().get("session")?.value;
  if (!sessionId) {
    throw redirect("/auth/login");
  }
  const { user } = await lucia.validateSession(sessionId);
  if (user && user.email_verified) {
    throw redirect("/auth/user");
  }

  return (
    <div className="min-h-screen w-full dark:bg-darkmode-500">
      <ErrorHandler />
      <div className="flex flex-col gap-10 items-center justify-center h-screen max-w-screen-xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
          Check your email for code
        </h1>
        <form
          method="POST"
          action="/auth/api/email-verify"
          className="max-w-sm mx-auto w-full"
        >
          <div className="mb-5">
            <label
              htmlFor="email_code"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email code:
            </label>
            <input
              name="email_code"
              type="text"
              minLength={8}
              maxLength={8}
              id="email_code"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-darkmode-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
              placeholder="12345678"
              required
            />
          </div>
          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                id="agree"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-lime-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-lime-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                required
              />
            </div>
            <label
              htmlFor="agree-terms"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Agree to{" "}
              <Link className="hover:underline text-lime-600" href="/">
                terms of service
              </Link>
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
