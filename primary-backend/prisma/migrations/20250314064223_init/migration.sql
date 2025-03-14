/*
  Warnings:

  - You are about to drop the column `subscribersId` on the `Subscribers` table. All the data in the column will be lost.
  - Added the required column `subscriberId` to the `Subscribers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Subscribers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Subscribers" DROP CONSTRAINT "Subscribers_subscribersId_fkey";

-- AlterTable
ALTER TABLE "Subscribers" DROP COLUMN "subscribersId",
ADD COLUMN     "subscriberId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Subscribers" ADD CONSTRAINT "Subscribers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
