import { lucia } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CardsInterace from "./CardsInterface";

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
    return [];
  }
}

export default async function Page() {
  const sponsorships = await getSponsorships();
  return (
    <main className="min-h-screen w-full dark:bg-darkmode-500">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <CardsInterace initialData={sponsorships} />
      </div>
    </main>
  );
}
