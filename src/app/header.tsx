import Logo from "@/assets/logo.png";
import NavigationToggle from "@/components/NavigationToggle";
import ThemeSwitchButton from "@/components/ThemeSwitchButton";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
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
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-darkmode-500 dark:border-gray-700">
            <li>
              <Link
                href="/"
                className="block py-2 px-3 text-white bg-lime-700 rounded md:bg-transparent md:text-lime-700 md:p-0 dark:text-white md:dark:text-lime-500"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-lime-700 md:p-0 dark:text-white md:dark:hover:text-lime-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                About
              </Link>
            </li>
            <li>
              <a
                href="/contact"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-lime-700 md:p-0 dark:text-white md:dark:hover:text-lime-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Contact
              </a>
            </li>
            <li>
              <Link
                href="/auth/login"
                className="border hover:border-transparent border-lime-400  block py-2 px-3 text-gray-900 rounded dark:text-white  md:p-0 md:px-6 hover:text-gray-100 hover:bg-gradient-to-br hover:text-white hover:from-teal-400 hover:to-lime-400"
              >
                Log In
              </Link>
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
