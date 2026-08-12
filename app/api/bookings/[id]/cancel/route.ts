import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { professional: true, slot: true, payment: true },
  });
  if (!booking) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const isProfessionalCancelling = booking.professional.userId === session.user.id;
  const isParticipant = booking.clientId === session.user.id || isProfessionalCancelling;
  if (!isParticipant) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (booking.status === "COMPLETED" || booking.status === "CANCELLED") {
    return NextResponse.json({ error: "This booking can no longer be cancelled" }, { status: 400 });
  }

  // A professional cancellation always entitles the client to a full refund;
  // a client cancellation is refunded on a sliding scale based on notice given.
  const hoursUntil = (booking.slot.startsAt.getTime() - Date.now()) / (1000 * 60 * 60);
  let refundPercent = 100;
  if (!isProfessionalCancelling) {
    if (hoursUntil >= 24) refundPercent = 100;
    else if (hoursUntil >= 12) refundPercent = 75;
    else refundPercent = 50;
  }

  await prisma.$transaction([
    prisma.booking.update({ where: { id }, data: { status: "CANCELLED" } }),
    prisma.availabilitySlot.update({ where: { id: booking.slotId }, data: { isBooked: false } }),
    ...(booking.payment && booking.payment.status === "PAID"
      ? [
          prisma.payment.update({
            where: { bookingId: id },
            data: { status: "REFUNDED", refundPercent },
          }),
        ]
      : []),
  ]);

  return NextResponse.json({ id, status: "CANCELLED", refundPercent });
}
