import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }

  const { firstName, lastName, email, phone, organisation, password, accountKind } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { error: "An account with this email already exists" },
      { status: 409 }
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const role = accountKind === "professional" ? "PROFESSIONAL" : "CLIENT";
  const accountType = accountKind === "employer" ? "EMPLOYER" : "INDIVIDUAL";

  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      phone,
      organisation,
      passwordHash,
      role,
      accountType,
    },
  });

  if (role === "PROFESSIONAL") {
    await prisma.professionalProfile.create({
      data: {
        userId: user.id,
        designation: "Labour Law Professional",
        bio: "",
        qualifications: "",
        specializations: "",
        languages: "English",
        location: "",
      },
    });
  }

  return NextResponse.json({ id: user.id, email: user.email }, { status: 201 });
}
