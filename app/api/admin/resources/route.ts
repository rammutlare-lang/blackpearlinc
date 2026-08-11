import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  category: z.enum(["GUIDE", "TEMPLATE", "LAW", "CALCULATOR", "ARTICLE", "WEBINAR"]),
  summary: z.string().min(1),
  body: z.string().min(1),
  isPremium: z.boolean().default(false),
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
  const resource = await prisma.resource.create({ data: parsed.data });
  return NextResponse.json(resource, { status: 201 });
}
