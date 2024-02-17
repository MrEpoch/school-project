import { prisma } from "./db";
import { Argon2id } from "oslo/password";

export const createUser = async (email: string, password: string) => {
  try {
    const hashed_password = await new Argon2id().hash(password);
    console.log(hashed_password);

    return await prisma.user.create({
      data: {
        email,
        hashed_password,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUser = async (email: string) => {
  try {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
