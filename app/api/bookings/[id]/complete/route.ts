import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "PROFESSIONAL") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const booking = await prisma.booking.findUnique({ where: { id }, include: { professional: true } });
  if (!booking || booking.professional.userId !== session.user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (booking.status !== "CONFIRMED") {
    return NextResponse.json({ error: "Only confirmed bookings can be marked complete" }, { status: 400 });
  }

  await prisma.booking.update({ where: { id }, data: { status: "COMPLETED" } });
  return NextResponse.json({ id, status: "COMPLETED" });
}
