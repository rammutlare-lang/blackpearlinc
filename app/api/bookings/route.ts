import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { bookingCreateSchema } from "@/lib/validations";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "You must be logged in to book a consultation" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = bookingCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }

  const { professionalId, serviceId, slotId, consultationType, issueDescription, urgency } = parsed.data;

  const slot = await prisma.availabilitySlot.findUnique({ where: { id: slotId } });
  if (!slot || slot.professionalId !== professionalId || slot.isBooked) {
    return NextResponse.json({ error: "That time slot is no longer available" }, { status: 409 });
  }

  const professionalService = await prisma.professionalService.findUnique({
    where: { professionalId_serviceId: { professionalId, serviceId } },
    include: { service: true },
  });
  const service = professionalService?.service ?? (await prisma.service.findUnique({ where: { id: serviceId } }));
  if (!service) {
    return NextResponse.json({ error: "Service not found" }, { status: 404 });
  }
  const priceCents = professionalService?.priceCents ?? service.defaultPriceCents;

  const professional = await prisma.professionalProfile.findUnique({ where: { id: professionalId } });
  if (!professional) {
    return NextResponse.json({ error: "Professional not found" }, { status: 404 });
  }
  const platformCents = Math.round(priceCents * professional.commissionRate);
  const payoutCents = priceCents - platformCents;

  const booking = await prisma.$transaction(async (tx) => {
    const created = await tx.booking.create({
      data: {
        clientId: session.user.id,
        professionalId,
        serviceId,
        slotId,
        consultationType,
        issueDescription,
        urgency,
        priceCents,
      },
    });
    await tx.availabilitySlot.update({ where: { id: slotId }, data: { isBooked: true } });
    await tx.payment.create({
      data: {
        bookingId: created.id,
        amountCents: priceCents,
        payoutCents,
        platformCents,
        reference: `TW-${created.id.slice(-8).toUpperCase()}`,
      },
    });
    return created;
  });

  return NextResponse.json({ id: booking.id }, { status: 201 });
}
