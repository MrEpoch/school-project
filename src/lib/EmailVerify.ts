import { TimeSpan, createDate, isWithinExpirationDate } from "oslo";
import { generateRandomString, alphabet } from "oslo/crypto";
import { prisma } from "./db";
import type { User } from "lucia";

export async function generateEmailVerificationCode(
  userId: string,
  email: string,
): Promise<string> {
  await prisma.email_verified.deleteMany({
    where: {
      userId,
    },
  });
  const code = generateRandomString(8, alphabet("0-9"));

  await prisma.email_verified.create({
    data: {
      userId,
      email,
      code,
      expires_at: createDate(new TimeSpan(5, "m")),
    },
  });

  return code;
}

export async function verifyEmailCode(
  user: User,
  code: string,
): Promise<boolean> {
  try {
    const email_verify_code = await prisma.email_verified.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!email_verify_code || email_verify_code.code !== code) {
      return false;
    }

    await prisma.email_verified.delete({
      where: {
        id: email_verify_code.id,
      },
    });

    if (
      !isWithinExpirationDate(email_verify_code.expires_at) ||
      email_verify_code.email !== user.email
    ) {
      return false;
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
