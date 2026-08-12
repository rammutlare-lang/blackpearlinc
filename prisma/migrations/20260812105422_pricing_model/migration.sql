/*
  Warnings:

  - Added the required column `payoutCents` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `platformCents` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "payoutCents" INTEGER NOT NULL,
ADD COLUMN     "platformCents" INTEGER NOT NULL,
ADD COLUMN     "refundPercent" INTEGER;

-- AlterTable
ALTER TABLE "ProfessionalProfile" ADD COLUMN     "commissionRate" DOUBLE PRECISION NOT NULL DEFAULT 0.25,
ADD COLUMN     "professionalTier" TEXT NOT NULL DEFAULT 'VERIFIED';
