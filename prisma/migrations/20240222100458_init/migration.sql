-- AlterTable
ALTER TABLE "User" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_sponsor" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "beSponsorRequest" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "company_website" TEXT NOT NULL,
    "company_phone" TEXT NOT NULL,
    "company_email" TEXT NOT NULL,

    CONSTRAINT "beSponsorRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sponsorship" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sponsorId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image_link" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "sponsorship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_sponsorshipAccepted" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_sponsorshipAccepted_AB_unique" ON "_sponsorshipAccepted"("A", "B");

-- CreateIndex
CREATE INDEX "_sponsorshipAccepted_B_index" ON "_sponsorshipAccepted"("B");

-- AddForeignKey
ALTER TABLE "beSponsorRequest" ADD CONSTRAINT "beSponsorRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sponsorship" ADD CONSTRAINT "sponsorship_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_sponsorshipAccepted" ADD CONSTRAINT "_sponsorshipAccepted_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_sponsorshipAccepted" ADD CONSTRAINT "_sponsorshipAccepted_B_fkey" FOREIGN KEY ("B") REFERENCES "sponsorship"("id") ON DELETE CASCADE ON UPDATE CASCADE;
