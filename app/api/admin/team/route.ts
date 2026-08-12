import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  bio: z.string().min(1),
  expertise: z.string().optional(),
  linkedIn: z.string().optional(),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }
  const count = await prisma.teamMember.count();
  const member = await prisma.teamMember.create({ data: { ...parsed.data, order: count } });
  return NextResponse.json(member, { status: 201 });
}
