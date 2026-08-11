import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";

const schema = z.object({
  serviceId: z.string().min(1),
  enabled: z.boolean(),
  priceCents: z.number().int().min(0).nullable().optional(),
});

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
  const { serviceId, enabled, priceCents } = parsed.data;

  if (enabled) {
    await prisma.professionalService.upsert({
      where: { professionalId_serviceId: { professionalId: profile.id, serviceId } },
      update: { priceCents: priceCents ?? null },
      create: { professionalId: profile.id, serviceId, priceCents: priceCents ?? null },
    });
  } else {
    await prisma.professionalService.deleteMany({ where: { professionalId: profile.id, serviceId } });
  }

  return NextResponse.json({ ok: true });
}
