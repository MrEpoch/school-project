import Logo from "@/assets/logo.png";
import NavigationToggle from "@/components/NavigationToggle";
import ThemeSwitchButton from "@/components/ThemeSwitchButton";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import LoginButton from "./LoginButton";

async function isLoggedIn() {
  const sessionId = cookies().get("session")?.value;
  if (!sessionId) {
    return false;
  }
  const { user } = await lucia.validateSession(sessionId);
  if (!user) {
    return false;
  }
  return true;
}


export default async function Header() {
  const logged = await isLoggedIn();

  return (
    <nav className="bg-white z-10 border-gray-200 dark:bg-darkmode-500">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image src={Logo} alt="logo" width={50} height={50} />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Serenity
          </span>
        </Link>
        <NavigationToggle />
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="gap-4 font-medium flex flex-col md:items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-darkmode-400 md:dark:bg-darkmode-500 dark:border-gray-700">
            <li>
              <Link
                href="/"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-lime-700 md:p-0 dark:text-white md:dark:hover:text-lime-500 dark:hover:bg-darkmode-200 dark:hover:text-white md:dark:hover:bg-transparent"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/deals"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-lime-700 md:p-0 dark:text-white md:dark:hover:text-lime-500 dark:hover:bg-darkmode-200 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Deals
              </Link>
            </li>
            <li className="w-full h-full">
              <LoginButton isLogged={logged} />
            </li>
            <li>
              <ThemeSwitchButton />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
