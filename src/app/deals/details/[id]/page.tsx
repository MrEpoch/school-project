import { authChecker } from "@/lib/checkAuth";
import { prisma } from "@/lib/db";
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

  return (
    <main className="min-h-screen w-full dark:bg-darkmode-500">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1>Sponsorship details</h1>
      </div>
    </main>
  );
}
