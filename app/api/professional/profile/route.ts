import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";

const profileSchema = z.object({
  designation: z.string().min(1),
  bio: z.string().min(1),
  qualifications: z.string().min(1),
  specializations: z.string().min(1),
  languages: z.string().min(1),
  location: z.string().min(1),
  yearsExperience: z.number().int().min(0),
  offersOnline: z.boolean(),
  offersInPerson: z.boolean(),
});

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== "PROFESSIONAL") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = profileSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }

  await prisma.professionalProfile.update({
    where: { userId: session.user.id },
    data: parsed.data,
  });

  return NextResponse.json({ ok: true });
}
