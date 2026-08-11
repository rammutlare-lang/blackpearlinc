import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { messageSchema } from "@/lib/validations";

async function assertParticipant(bookingId: string, userId: string) {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { professional: true },
  });
  if (!booking) return null;
  const isParticipant = booking.clientId === userId || booking.professional.userId === userId;
  return isParticipant ? booking : null;
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const booking = await assertParticipant(id, session.user.id);
  if (!booking) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const messages = await prisma.message.findMany({
    where: { bookingId: id },
    include: { sender: { select: { firstName: true, lastName: true } } },
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json(messages);
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const booking = await assertParticipant(id, session.user.id);
  if (!booking) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json();
  const parsed = messageSchema.safeParse({ bookingId: id, body: body.body });
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }

  const message = await prisma.message.create({
    data: { bookingId: id, senderId: session.user.id, body: parsed.data.body },
  });
  return NextResponse.json(message, { status: 201 });
}
