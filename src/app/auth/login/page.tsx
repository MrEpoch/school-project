import Logo from "@/assets/logo.png";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import ButtonSubmit from "./ButtonSubmit";
import ErrorHandler from "@/components/ErrorHandler";

export default async function Page() {
  const sessionId = cookies().get("session")?.value;
  if (sessionId) {
    const { user } = await lucia.validateSession(sessionId);
    if (user && user.email_verified) {
      throw redirect("/auth/user");
    }
  }

  return (
    <section className="bg-gray-50 min-h-screen w-full dark:bg-darkmode-500">
      <ErrorHandler />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Image src={Logo} alt="logo" width={50} height={50} />
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-darkmode-400 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Log in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              action="/auth/api/login"
              method="POST"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-lime-600 focus:border-lime-600 block w-full p-2.5 dark:bg-darkmode-400 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-lime-600 focus:border-lime-600 block w-full p-2.5 dark:bg-darkmode-400 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-lime-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-lime-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-lime-600 hover:underline dark:text-lime-500"
                >
                  Forgot password?
                </a>
              </div>
              <ButtonSubmit />
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Forgot password?{" "}
                <Link
                  href="/auth/reset-password"
                  className="font-medium text-lime-600 hover:underline dark:text-lime-500"
                >
                  Reset password
                </Link>
              </p>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  href="/auth/signup"
                  className="font-medium text-lime-600 hover:underline dark:text-lime-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
