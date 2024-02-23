import { prisma } from "@/lib/db";
import ImageComponents from "@/components/ImageComponents";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
        userId: user?.id,
      },
    });
  } catch (error) {
    return null;
  }
}

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const sponsorship = getSponsorship(id);
  if (!sponsorship) {
    throw redirect("/auth/sponsorship");
  }

  return (
    <main className="min-h-screen w-full dark:bg-darkmode-500">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8"></div>
    </main>
  );
}
