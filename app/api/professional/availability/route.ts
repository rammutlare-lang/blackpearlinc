import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";

const schema = z.object({
  startsAt: z.string().min(1),
  durationMins: z.number().int().min(15).max(240).default(45),
});

export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.role !== "PROFESSIONAL") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const profile = await prisma.professionalProfile.findUnique({ where: { userId: session.user.id } });
  if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

  const slots = await prisma.availabilitySlot.findMany({
    where: { professionalId: profile.id, startsAt: { gte: new Date() } },
    orderBy: { startsAt: "asc" },
  });
  return NextResponse.json(slots);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== "PROFESSIONAL") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const profile = await prisma.professionalProfile.findUnique({ where: { userId: session.user.id } });
  if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }

  const startsAt = new Date(parsed.data.startsAt);
  if (Number.isNaN(startsAt.getTime()) || startsAt < new Date()) {
    return NextResponse.json({ error: "Choose a future date and time" }, { status: 400 });
  }
  const endsAt = new Date(startsAt.getTime() + parsed.data.durationMins * 60 * 1000);

  const slot = await prisma.availabilitySlot.create({
    data: { professionalId: profile.id, startsAt, endsAt },
  });
  return NextResponse.json(slot, { status: 201 });
}
