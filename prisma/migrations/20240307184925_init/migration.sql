/*
  Warnings:

  - You are about to drop the `_sponsorshipAccepted` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_sponsorshipAccepted" DROP CONSTRAINT "_sponsorshipAccepted_A_fkey";

-- DropForeignKey
ALTER TABLE "_sponsorshipAccepted" DROP CONSTRAINT "_sponsorshipAccepted_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "sponsorshipAccepted" TEXT[];

-- DropTable
DROP TABLE "_sponsorshipAccepted";
