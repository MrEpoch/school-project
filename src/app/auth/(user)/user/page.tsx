import { authChecker } from "@/lib/checkAuth";
import { prisma } from "@/lib/db";
import { User } from "lucia";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getSponsorships(user: User) {
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
  const user = await authChecker();
  const sponsorships = await getSponsorships(user);
  if (!sponsorships) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen w-full dark:bg-darkmode-500">
      <div className="flex flex-col gap-10 items-center justify-center h-screen max-w-screen-xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-400">
          User information:
        </h1>
        <h3 className="text-xl font-bold mb-5">Your Accepted Sponsorships:</h3>
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
        <div className="w-full flex justify-end gap-6">
        <Link className="bg-black  text-white hover:bg-lime-500 transition rounded p-4" href="/auth/user/sponsor-request">Become sponsor</Link>
          <Link
          href="/auth/user/sponsorships"
          className="bg-black  text-white hover:bg-lime-500 transition rounded p-4"
        >
          View all
        </Link>
      </div>
        <form className="w-full flex justify-end" method="POST" action="/auth/api/logout">
          <button
    className="dark:bg-red-600 bg-red-500 dark:hover:bg-red-700 hover:bg-red-700 dark:text-white font-bold p-4 transition rounded-lg"
            type="submit"
          >
            <svg
              width="24px"
              height="24px"
              strokeWidth="2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
    fill="currentColor"
                d="M12 12H19M19 12L16 15M19 12L16 9"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M19 6V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V18"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </button>
        </form>
        {user?.is_sponsor && (
          <Link href="/auth/sponsorship">Add sponsorship</Link>
        )}
      </div>
    </div>
  );
}
