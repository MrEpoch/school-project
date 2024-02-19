import Image from "next/image";
import womanPhoto from "@/assets/growth.png";

export default function Page() {
  return (
    <main className="flex relative min-h-screen w-full bg-white dark:bg-darkmode-500 min-h-screen justify-center">
      <div className="container w-full text-center  mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 items-center lg:grid-cols-2">
        <div className="w-full h-full flex flex-col justify-center gap-8 row-start-2 lg:row-auto">
          <h1 className="text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Connecting sponsors with clients
          </h1>
          <p className="mb-8 text-md font-normal text-gray-500 lg:text-md sm:px-16 lg:px-2 dark:text-gray-400">
            Our goal at Serenity is to help business finding content creators and influencers to which seek sponsorships and endorsments.
          </p>
          <div className="lg:mt-16 flex w-full flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <a
              href="#"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:ring-lime-300 dark:focus:ring-lime-900"
            >
              See deals
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
            <a
              href="#"
              className="py-3 px-5 sm:ms-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-lime-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-70"
            >
              Learn more
            </a>
          </div>
        </div>
        <div className="w-full">
          <div className="">
            <Image
              src={womanPhoto}
              alt="image"
              width={1200}
              height={800}
              className=""
            />
          </div>
        </div>
      </div>
    </main>
  );
}
