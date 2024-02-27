import { lucia } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getSponsorships() {
  const sessionId = cookies().get("session")?.value;
  if (!sessionId) {
    throw redirect("/auth/login");
  }
  const { user } = await lucia.validateSession(sessionId);

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

{
  /*
    Sponsorship values, some of them will be displayed in table

 id         String   @id @default(uuid())
  created_at DateTime @default(now())
  updated_at DateTime @default(now())

  sponsorId   String
  title       String
  category    sponsorship_category
  image_url   String
  image_id    String
  image_signature String
  description String
  amount      Float
  expires_at  DateTime
  status

  sponsor             User   @relation("sponsorshipCreated", fields: [sponsorId], references: [id])
  sponsorShipAccepted User[] @relation("sponsorshipAccepted")
*/
}

export default async function Page() {
  const sponsorships = (await getSponsorships()) ?? [];
  return (
    <main className="min-h-screen dark:bg-darkmode-500 w-full py-16">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
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
