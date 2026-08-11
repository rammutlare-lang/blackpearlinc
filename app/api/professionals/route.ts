import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const serviceId = searchParams.get("serviceId");

  const professionals = await prisma.professionalProfile.findMany({
    where: {
      verificationStatus: "APPROVED",
      ...(serviceId ? { services: { some: { serviceId } } } : {}),
    },
    include: {
      user: { select: { firstName: true, lastName: true } },
      services: { include: { service: true } },
    },
    orderBy: { ratingAvg: "desc" },
  });

  return NextResponse.json(professionals);
}
