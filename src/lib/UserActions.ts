const bcrypt = require("bcrypt");
import { prisma } from "./db";

export const createUser = async (email: string, password: string) => {
  try {
    const hashed_password = await bcrypt.hash(password, 10);
    console.log(hashed_password);

    return await prisma.user.create({
      data: {
        email,
        hashed_password
      }
    })
  } catch (error) {
    console.log(error)
    return null;
  }
};
