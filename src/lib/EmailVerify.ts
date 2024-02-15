import { TimeSpan, createDate } from "oslo";
import { generateRandomString, alphabet } from "oslo/crypto";
import { prisma } from "./db";

export async function generateEmailVerificationCode(userId: string, email: string): Promise<string> {
  await prisma.email_verified.deleteMany({
    where: {
      userId
    }
  })
	const code = generateRandomString(8, alphabet("0-9"));

  await prisma.email_verified.create({
    data: {
      userId,
      email,
      code,
      expires_at: createDate(new TimeSpan(5, "m"))
    }
  })

	return code;
}
