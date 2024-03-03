import { authChecker } from "@/lib/checkAuth";
import { prisma } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

async function getSponsorships() {
  const user = await authChecker();
  try {
    return await prisma.sponsorship.findMany({
      where: {
        sponsorId: user?.id,
      },
      take: 10,
    });
  } catch (error) {
    return null;
  }
}

export default async function Page() {
  const sponsorships = (await getSponsorships()) ?? [];
  return (
    <main className="min-h-screen dark:bg-darkmode-500 w-full py-16">
      <div className="max-w-screen-xl flex flex-col gap-8 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full flex justify-center gap-6 pb-8 items-center">
          <label className="block text-md font-bold text-gray-900 dark:text-white">
            Add sponsorship
          </label>
          <Link
            className="bg-black hover:bg-lime-500 transition rounded p-4"
            href="/auth/sponsorship/create"
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M9 7V2.2a2 2 0 0 0-.5.4l-4 3.9a2 2 0 0 0-.3.5H9Zm2 0V2h7a2 2 0 0 1 2 2v6.4A7.5 7.5 0 1 0 10.5 22H6a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M9 16a6 6 0 1 1 12 0 6 6 0 0 1-12 0Zm6-3c.6 0 1 .4 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 1 1 0-2h1v-1c0-.6.4-1 1-1Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
        <h3 className="text-xl font-bold mb-5">Your Sponsorships:</h3>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-darkmode-300 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Expires
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {sponsorships.map((sponsorship, i) => (
                <tr
                  key={i}
                  className="bg-white border-b dark:bg-darkmode-400 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="p-4">
                    <Image
                      src={sponsorship.image_url}
                      width={100}
                      height={100}
                      alt={sponsorship.title}
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {sponsorship.title}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {sponsorship.category}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    ${sponsorship.amount}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {sponsorship.expires_at.toDateString()}
                  </td>
                  <td
                    className={
                      "px-6 py-4 font-semibold" +
                      (sponsorship.status === "accepting"
                        ? " text-green-500"
                        : " text-red-500")
                    }
                  >
                    {sponsorship.status}
                  </td>
                  <td className="px-6 py-4 font-semibold">
                    <Link
                      className="hover:underline"
                      href={`/auth/sponsorship/info/${sponsorship.id}`}
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
