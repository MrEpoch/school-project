/*
  Warnings:

  - Added the required column `category` to the `sponsorship` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "sponsorship_category" AS ENUM ('technology', 'fashion', 'other', 'cosmetics');

-- AlterTable
ALTER TABLE "sponsorship" ADD COLUMN     "category" "sponsorship_category" NOT NULL;
