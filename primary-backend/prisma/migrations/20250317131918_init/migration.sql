-- AlterTable
ALTER TABLE "Subscribers" ADD COLUMN     "subscriberEmail" TEXT,
ALTER COLUMN "subscriberId" DROP NOT NULL;
