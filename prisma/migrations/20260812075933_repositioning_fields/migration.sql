-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "urgency" TEXT;

-- AlterTable
ALTER TABLE "ProfessionalProfile" ADD COLUMN     "professionalType" TEXT NOT NULL DEFAULT 'Labour Consultant';

-- AlterTable
ALTER TABLE "Resource" ADD COLUMN     "audience" TEXT NOT NULL DEFAULT 'BOTH',
ADD COLUMN     "priceCents" INTEGER;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "audience" TEXT NOT NULL DEFAULT 'BOTH';
