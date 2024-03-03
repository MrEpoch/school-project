"use server";

import { prisma } from "@/lib/db";
import { z } from "zod";

export async function getSponsorships(skip: number) {
  const skipZod = z.number().min(10).max(15);

  const skipZodResult = skipZod.safeParse(skip);

  if (!skipZodResult.success) {
    return { error: "Invalid skip", data: null };
  }

  try {
    const data = await prisma.sponsorship.findMany({
      skip: skipZodResult.data,
      take: 10,
    });
    return { data, error: null };
  } catch (error) {
    return { error: "Cannot get data", data: null };
  }
}
