import { TimeSpan, createDate } from "oslo";
import { prisma } from "./db";

export async function createPasswordResetToken(userId: string): Promise<string> {
  await prisma.password_reset.deleteMany({
    where: {
      userId,
    },
  });

  const token = await prisma.password_reset.create({
    data: {
      userId,
      expires_at: createDate(new TimeSpan(1, "h")),
    },
  });
  
  return token.id;
}

