import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const slots = await prisma.availabilitySlot.findMany({
    where: { professionalId: id, isBooked: false, startsAt: { gte: new Date() } },
    orderBy: { startsAt: "asc" },
    take: 30,
  });
  return NextResponse.json(slots);
}
