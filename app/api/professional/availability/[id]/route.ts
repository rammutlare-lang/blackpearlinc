import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "PROFESSIONAL") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const profile = await prisma.professionalProfile.findUnique({ where: { userId: session.user.id } });
  if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

  const { id } = await params;
  const slot = await prisma.availabilitySlot.findUnique({ where: { id } });
  if (!slot || slot.professionalId !== profile.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (slot.isBooked) {
    return NextResponse.json({ error: "Cannot remove a booked slot" }, { status: 400 });
  }

  await prisma.availabilitySlot.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
