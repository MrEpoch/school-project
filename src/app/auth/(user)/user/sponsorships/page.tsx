import { authChecker } from "@/lib/checkAuth";
import { prisma } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getAllSponsorships() {
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
  const sponsorships = await getAllSponsorships();

  if (!sponsorships) {
    redirect("/auth/login");
  }

  return (
    <main className="min-h-screen relative w-full flex flex-col dark:bg-darkmode-500 py-8">
      <div className="flex flex-col w-full mx-auto px-4 items-center h-full justify-center gap-8">
        <Link
          className="bg-black hover:bg-lime-500 transition rounded p-4"
          href="/auth/user"
        >
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h14M5 12l4-4m-4 4 4 4"
            />
          </svg>
        </Link>
        <div className="justify-center flex flex-col w-full h-full border-r-2">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
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
                        href={`/deals/details/${sponsorship.id}`}
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
      </div>
    </main>
  );
}
