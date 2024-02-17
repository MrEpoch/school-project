import Image from "next/image";
import womanPhoto from "@/assets/growth.png";

export default function Page() {
  return (
    <main className="flex relative min-h-screen w-full bg-white dark:bg-darkmode-500 min-h-screen justify-center">
      <div className="w-full flex h-screen text-center lg:flex-row items-center flex-col justify-around max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="">
          <h1 className="mb-4 text-3xl font-extrabold tracking-tight leading-none text-gray-900 md:text-4xl lg:text-5xl dark:text-white">We invest in the world’s potential</h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-md sm:px-16 lg:px-2 dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
        <div className="flex w-full flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <a href="#" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:ring-lime-300 dark:focus:ring-lime-900">
                Get started
                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </a>
            <a href="#" className="py-3 px-5 sm:ms-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-lime-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-70">
                Learn more
            </a>  
        </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <div className="dark:bg-darkmode-400">
          <Image
            src={womanPhoto}
            alt="image"
            width={1200}
            height={800}
            className="rounded-bl-3xl h-64 w-64 object-cover"
      />
    <h3 className="h1">
      <span className="bg-gradient-to-br dark:from-white dark:to-lime-700 font-bold bg-clip-text text-transparent box-decoration-clone from-darkmode-500 to-lime-400">Eric</span>
</h3>
    </div>
        </div>
      </div>
    </main>
  );
}
