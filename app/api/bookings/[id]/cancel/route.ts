import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const booking = await prisma.booking.findUnique({ where: { id }, include: { professional: true, slot: true } });
  if (!booking) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const isParticipant = booking.clientId === session.user.id || booking.professional.userId === session.user.id;
  if (!isParticipant) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (booking.status === "COMPLETED" || booking.status === "CANCELLED") {
    return NextResponse.json({ error: "This booking can no longer be cancelled" }, { status: 400 });
  }

  const hoursUntil = (booking.slot.startsAt.getTime() - Date.now()) / (1000 * 60 * 60);
  if (hoursUntil < 24) {
    return NextResponse.json(
      { error: "Bookings can only be cancelled more than 24 hours before the scheduled time" },
      { status: 400 }
    );
  }

  await prisma.$transaction([
    prisma.booking.update({ where: { id }, data: { status: "CANCELLED" } }),
    prisma.availabilitySlot.update({ where: { id: booking.slotId }, data: { isBooked: false } }),
  ]);

  return NextResponse.json({ id, status: "CANCELLED" });
}
