-- DropForeignKey
ALTER TABLE "sponsorship" DROP CONSTRAINT "sponsorship_userId_fkey";

-- AddForeignKey
ALTER TABLE "sponsorship" ADD CONSTRAINT "sponsorship_sponsorId_fkey" FOREIGN KEY ("sponsorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
