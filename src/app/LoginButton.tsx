'use client';

import Link from "next/link";

export default function LoginButton({ isLogged }: { isLogged: boolean }) {
  
  return (
    <>
      {isLogged ? (
        <Link
          href="/auth/user"
          className="block transition p-4 border-2 border-gray-200 rounded-full hover:border-lime-500 hover:text-lime-500"
        >
        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clipRule="evenodd"/>
  </svg>

        </Link> 
      ) : (
            <Link
              href="/auth/login"
              className="block py-2 px-3 text-gray-900 rounded dark:text-white  md:px-6 hover:text-gray-100 bg-gradient-to-br text-white from-teal-500 to-lime-500 hover:brightness-75 transition"
            >
              Log In
            </Link>
        
      )}
    </>
  )
}
