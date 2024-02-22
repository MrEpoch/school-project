/*
  Warnings:

  - You are about to drop the column `company_website` on the `beSponsorRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "company_email" TEXT,
ADD COLUMN     "company_name" TEXT,
ADD COLUMN     "company_phone" TEXT,
ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "beSponsorRequest" DROP COLUMN "company_website";

-- AlterTable
ALTER TABLE "sponsorship" ALTER COLUMN "image_link" DROP NOT NULL;
