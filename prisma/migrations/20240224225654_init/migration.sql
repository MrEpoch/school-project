/*
  Warnings:

  - You are about to drop the column `image_link` on the `sponsorship` table. All the data in the column will be lost.
  - Added the required column `image_id` to the `sponsorship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_signature` to the `sponsorship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_url` to the `sponsorship` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sponsorship" DROP COLUMN "image_link",
ADD COLUMN     "image_id" TEXT NOT NULL,
ADD COLUMN     "image_signature" TEXT NOT NULL,
ADD COLUMN     "image_url" TEXT NOT NULL;
