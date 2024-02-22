import { prisma } from "@/lib/db";
import ImageComponents from "../../ImageComponents"
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const revalidate = 0

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
        userId: user?.id
      }
    })
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
    <div className="h-80 relative sm:col-span-2">
      <ImageComponents />
    </div>
  )
}
