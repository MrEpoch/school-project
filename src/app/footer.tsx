import Logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
<footer className="bg-white rounded-lg shadow dark:bg-darkmode-500">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <Image src={Logo} alt="Flowbite Logo" className="h-8" height={50} width={50}/>
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Serenity</span>
            </Link>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">About</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                </li>
                <li>
                    <a href="#" className="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://stencukpage.com/" className="hover:underline">Alexandr Stenčuk</a>. All Rights Reserved.</span>
    </div>
</footer>
  )
}
