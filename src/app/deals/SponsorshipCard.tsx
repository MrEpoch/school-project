"use client";

import { sponsorship } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function Card({ cardInfo }: { cardInfo: sponsorship }) {
  return (
    <div className="max-w-sm bg-white h-fit border border-gray-200 rounded-lg shadow dark:bg-darkmode-400 dark:border-black">
      <Link href="#">
        <Image
          className="rounded-t-lg"
          src={cardInfo.image_url}
          alt={cardInfo.title}
          width={500}
          height={500}
        />
      </Link>
      <div className="p-5 flex flex-col gap-2">
        <Link href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {cardInfo.title}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {cardInfo.description.substring(0, 100) + "..."}
        </p>
        <div className="w-full flex justify-center">
        <Link
          href="#"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-lime-700 rounded-lg hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800"
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
      </div>
    </div>
  );
}
