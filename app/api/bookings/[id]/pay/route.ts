import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { paymentProvider } from "@/lib/payments";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "You must be logged in" }, { status: 401 });
  }

  const { id } = await params;
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { payment: true, professional: { include: { user: true } }, client: true },
  });

  if (!booking || booking.clientId !== session.user.id) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }
  if (!booking.payment) {
    return NextResponse.json({ error: "No payment record for this booking" }, { status: 400 });
  }
  if (booking.payment.status === "PAID") {
    return NextResponse.json({ id: booking.id, status: booking.status });
  }

  const result = await paymentProvider.charge({
    bookingId: booking.id,
    amountCents: booking.payment.amountCents,
    reference: booking.payment.reference,
  });

  if (!result.success) {
    await prisma.payment.update({ where: { bookingId: booking.id }, data: { status: "FAILED" } });
    return NextResponse.json({ error: "Payment failed. Please try again." }, { status: 402 });
  }

  await prisma.$transaction([
    prisma.payment.update({
      where: { bookingId: booking.id },
      data: { status: "PAID", paidAt: new Date(), reference: result.providerReference },
    }),
    prisma.booking.update({ where: { id: booking.id }, data: { status: "CONFIRMED" } }),
    prisma.notification.create({
      data: {
        userId: booking.clientId,
        type: "BOOKING_CONFIRMED",
        payload: `Your consultation with ${booking.professional.user.firstName} ${booking.professional.user.lastName} is confirmed.`,
      },
    }),
    prisma.notification.create({
      data: {
        userId: booking.professional.userId,
        type: "NEW_BOOKING",
        payload: `New confirmed booking from ${booking.client.firstName} ${booking.client.lastName}.`,
      },
    }),
  ]);

  return NextResponse.json({ id: booking.id, status: "CONFIRMED" });
}
