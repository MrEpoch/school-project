import { prisma } from "@/lib/db";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import DeleteButton from "./DeleteButton";

export const revalidate = 0;

async function getSponsorship(id: string) {
  const sessionId = cookies().get("session")?.value;
  if (!sessionId) {
    throw redirect("/auth/login");
  }
  const { user } = await lucia.validateSession(sessionId);

  try {
    return await prisma.sponsorship.findUnique({
      where: {
        id,
        sponsorId: user?.id,
      },
    });
  } catch (error) {
    return null;
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return redirect("/auth/sponsorship");
  }

  const sponsorship = await getSponsorship(id);
  if (!sponsorship) {
    return redirect("/auth/sponsorship");
  }

  return (
    <div className="min-h-screen dark:bg-darkmode-500 py-16">
      <div className="p-4 mx-auto max-w-screen-xl h-full w-full flex flex-col gap-[2rem]">
        <Image
          src={sponsorship.image_url}
          width={1000}
          height={750}
          alt=""
          className="w-full"
        />
        <h2 className="mt-4 text-2xl sm:text-4xl tracking-wide text-gray-900 dark:text-white">
          {sponsorship.title}
        </h2>
        <span className="long-line bg-gradient-to-r from-lime-400 to-green-400 h-1 w-full" />
        <div className="w-full">
          <div className="flex gap-2 justify-between">
            <h3 className="font-bold sm:text-lg text-sm">Amount:</h3>
            <p className="sm:text-lg text-sm">${sponsorship.amount}</p>
          </div>
          <div className="flex gap-2 justify-between">
            <h3 className="font-bold sm:text-lg text-sm">Expires:</h3>
            <p className="sm:text-lg text-sm">
              {sponsorship.expires_at.toDateString()}
            </p>
          </div>
          <div className="flex gap-2 justify-between">
            <h3 className="font-bold sm:text-lg text-sm">Category:</h3>
            <p className="sm:text-lg text-sm">{sponsorship.category}</p>
          </div>
          <div className="flex gap-2 justify-between">
            <h3 className="font-bold sm:text-lg text-sm">Status:</h3>
            <p className="sm:text-lg text-sm">{sponsorship.status}</p>
          </div>
        </div>
        <span className="long-line bg-gradient-to-r from-lime-400 to-green-400 h-1 w-full" />
        <div className="w-full">
          <h3 className="mt-4 text-2xl tracking-wide font-anton text-gray-900 dark:text-white">
            Description
          </h3>
          <p className="mt-4 text-lg text-gray-900 dark:text-white">
            {sponsorship.description}
          </p>
        </div>
        <span className="long-line bg-gradient-to-r from-lime-400 to-green-400 h-1 w-full" />
        <div className="w-full flex gap-6 justify-end">
          <Link
            className="transition bg-black hover:bg-blue-700 text-white font-bold flex justify-center items-center p-4 rounded"
            href={`/auth/sponsorship/update/${sponsorship.id}`}
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
                d="M11.3 6.2H5a2 2 0 0 0-2 2V19a2 2 0 0 0 2 2h11c1.1 0 2-1 2-2.1V11l-4 4.2c-.3.3-.7.6-1.2.7l-2.7.6c-1.7.3-3.3-1.3-3-3.1l.6-2.9c.1-.5.4-1 .7-1.3l3-3.1Z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M19.8 4.3a2.1 2.1 0 0 0-1-1.1 2 2 0 0 0-2.2.4l-.6.6 2.9 3 .5-.6a2.1 2.1 0 0 0 .6-1.5c0-.2 0-.5-.2-.8Zm-2.4 4.4-2.8-3-4.8 5-.1.3-.7 3c0 .3.3.7.6.6l2.7-.6.3-.1 4.7-5Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          <DeleteButton id={sponsorship.id} />
        </div>
      </div>
    </div>
  );
}
