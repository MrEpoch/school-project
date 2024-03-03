import { authChecker } from "@/lib/checkAuth";
import { prisma } from "@/lib/db";
import moment from "moment";
import Image from "next/image";
import { redirect } from "next/navigation";
import { z } from "zod";

async function getSponsorship(id: string) {
  const user = await authChecker();

  const zodParams = z.string().uuid();
  const checked = zodParams.safeParse(id);

  if (!checked.success) {
    redirect("/deals");
  }

  try {
    return await prisma.sponsorship.findUnique({
      where: {
        id: id,
        sponsorId: user?.id,
      },
    });
  } catch (error) {
    console.log(error);
  }
  redirect("/deals");
}

export default async function Page({ params }: { params: { id: string } }) {
  const sponsorship = await getSponsorship(params.id);
  
  if (!sponsorship) {
    redirect("/deals");
  }

  const dateFormatted = moment(sponsorship.expires_at, "YYYY-MM-DD").toDate().toISOString().split("T")[0].split("-");

  const date = {
    year: dateFormatted[0],
    month: dateFormatted[1],
    day: dateFormatted[2],
  };

  return (
    <main className="min-h-screen w-full dark:bg-darkmode-500 py-8">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Sponsorship details</h1>
        <Image src={sponsorship.image_url} alt={sponsorship.title} width={500} height={500} />
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white underline">{sponsorship.title}</h1>
        <p className="text-lg font-medium text-gray-900 dark:text-white"><span className="">{sponsorship.description}</span></p>
        <p className="text-lg font-medium text-gray-900 dark:text-white">Sponsorship amount: <span className="font-bold text-lime-600">${sponsorship.amount}</span></p>
        <p className="text-lg font-medium text-gray-900 dark:text-white">Sponsorship acceptance ends: <span className="font-bold text-lime-600">{date.year}/{date.month}/{date.day}</span></p>
      </div>
    </main>
  );
}
