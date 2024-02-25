-- CreateEnum
CREATE TYPE "sponsorship_status" AS ENUM ('ended', 'accepting');

-- AlterTable
ALTER TABLE "sponsorship" ADD COLUMN     "status" "sponsorship_status" NOT NULL DEFAULT 'accepting';
