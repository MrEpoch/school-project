import { lucia } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
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
        userId: user?.id,
      },
      take: 10,
    });
  } catch (error) {
    return null;
  }
}

export default function Page() {
  return <main className="min-h-screen dark:bg-darkmode-500 w-full"></main>;
}
