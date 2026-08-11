import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const services = [
  {
    slug: "unfair-dismissal-ccma",
    name: "Unfair Dismissal & CCMA Guidance",
    description: "Advice and representation guidance for unfair dismissal disputes and CCMA matters.",
    icon: "briefcase",
    defaultPriceCents: 85000,
  },
  {
    slug: "contracts-of-employment",
    name: "Contracts of Employment",
    description: "Review, drafting and advice on employment contracts and contractual terms.",
    icon: "document",
    defaultPriceCents: 65000,
  },
  {
    slug: "disciplinary-matters",
    name: "Disciplinary Matters",
    description: "Guidance on disciplinary processes, hearings and employee rights.",
    icon: "users",
    defaultPriceCents: 75000,
  },
  {
    slug: "remuneration-benefits",
    name: "Remuneration & Benefits",
    description: "Advice on salary, allowances, benefits and related entitlements.",
    icon: "coin",
    defaultPriceCents: 65000,
  },
  {
    slug: "workplace-policies-compliance",
    name: "Workplace Policies & Compliance",
    description: "Help with policies, compliance requirements and best practice implementation.",
    icon: "shield",
    defaultPriceCents: 95000,
  },
];

const professionals = [
  {
    firstName: "Thabo",
    lastName: "Mokoena",
    designation: "Labour Law Attorney",
    location: "Johannesburg, Gauteng",
    specializations: "Unfair Dismissal,CCMA,Disciplinary Matters,Contracts",
    bio: "Labour law attorney with over 10 years of experience representing both employees and employers in CCMA and Labour Court matters.",
    years: 10,
  },
  {
    firstName: "Nomsa",
    lastName: "Dlamini",
    designation: "Employment Specialist",
    location: "Pretoria, Gauteng",
    specializations: "Employment Contracts,Policies,Retrenchments,CCMA",
    bio: "Employment specialist focused on contracts, policies and retrenchment processes for growing businesses.",
    years: 8,
  },
  {
    firstName: "Sipho",
    lastName: "Ndlovu",
    designation: "Labour Law Consultant",
    location: "Durban, KwaZulu-Natal",
    specializations: "Disciplinary Hearings,Dismissals,Arbitration,Wage Disputes",
    bio: "Consultant specialising in disciplinary hearings, arbitration and wage disputes across multiple industries.",
    years: 9,
  },
  {
    firstName: "Lerato",
    lastName: "Kgosana",
    designation: "HR & Compliance Advisor",
    location: "Cape Town, Western Cape",
    specializations: "Compliance,Employment Policies,Leave & Benefits,PF & BCEA",
    bio: "HR and compliance advisor helping employers build fair, compliant and well-documented workplace practices.",
    years: 7,
  },
];

const teamMembers = [
  { name: "Thabo Mokoena", role: "Founder & CEO", bio: "Labour law expert with over 15 years of experience in dispute resolution and employee relations.", order: 0 },
  { name: "Nomsa Dlamini", role: "Head of Operations", bio: "Operations strategist passionate about building systems that deliver exceptional client experiences.", order: 1 },
  { name: "Sipho Nkosi", role: "Head of Legal & Compliance", bio: "Ensures our platform meets the highest legal, ethical and regulatory standards.", order: 2 },
  { name: "Lerato Kgosana", role: "Client Relations Lead", bio: "Dedicated to our community and committed to supporting every client with care.", order: 3 },
];

const siteStats = [
  { key: "enquiries", label: "Enquiries Received", value: "350+", order: 0 },
  { key: "paid_consultations", label: "Paid Consultations", value: "120+", order: 1 },
  { key: "conversion_rate", label: "Conversion Rate", value: "34%", order: 2 },
  { key: "satisfaction", label: "Customer Satisfaction", value: "4.8/5", order: 3 },
];

const resources = [
  {
    title: "Understanding Unfair Dismissal",
    slug: "understanding-unfair-dismissal",
    category: "GUIDE" as const,
    summary: "A step-by-step guide to recognising and responding to unfair dismissal.",
    body: "This guide walks through the CCMA process, timelines and what evidence to gather if you believe you were unfairly dismissed.",
  },
  {
    title: "CCMA Process: A Step-by-Step Guide",
    slug: "ccma-process-step-by-step",
    category: "GUIDE" as const,
    summary: "What to expect at each stage of a CCMA referral.",
    body: "From referral to conciliation to arbitration — a plain-language walkthrough of the CCMA process.",
  },
  {
    title: "Notice Period & Severance Calculator",
    slug: "notice-severance-calculator",
    category: "CALCULATOR" as const,
    summary: "Estimate statutory notice periods and severance pay.",
    body: "Use this tool to get an indicative estimate of notice period and severance entitlements under the BCEA.",
  },
  {
    title: "Disciplinary Hearing Checklist",
    slug: "disciplinary-hearing-checklist",
    category: "TEMPLATE" as const,
    summary: "A practical checklist for preparing for a disciplinary hearing.",
    body: "Covers notice requirements, representation rights, evidence preparation and outcome documentation.",
  },
];

async function main() {
  const demoPassword = await bcrypt.hash("Demo@1234", 10);

  await prisma.user.upsert({
    where: { email: "admin@blackpearlinc.co.za" },
    update: {},
    create: {
      firstName: "Admin",
      lastName: "User",
      email: "admin@blackpearlinc.co.za",
      phone: "0800000000",
      passwordHash: demoPassword,
      role: "ADMIN",
    },
  });

  await prisma.user.upsert({
    where: { email: "client@demo.thembile" },
    update: {},
    create: {
      firstName: "Rammutlare",
      lastName: "Demo",
      email: "client@demo.thembile",
      phone: "0821234567",
      passwordHash: demoPassword,
      role: "CLIENT",
      accountType: "INDIVIDUAL",
    },
  });

  await prisma.user.upsert({
    where: { email: "employer@demo.thembile" },
    update: {},
    create: {
      firstName: "Zanele",
      lastName: "Employer",
      email: "employer@demo.thembile",
      phone: "0837654321",
      organisation: "Beacon Retail Group",
      passwordHash: demoPassword,
      role: "CLIENT",
      accountType: "EMPLOYER",
    },
  });

  const createdServices = [];
  for (const s of services) {
    const service = await prisma.service.upsert({
      where: { slug: s.slug },
      update: {},
      create: s,
    });
    createdServices.push(service);
  }

  for (let i = 0; i < professionals.length; i++) {
    const p = professionals[i];
    const email = `${p.firstName.toLowerCase()}.${p.lastName.toLowerCase()}@pro.thembile`;
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        firstName: p.firstName,
        lastName: p.lastName,
        email,
        phone: "0810000000",
        passwordHash: demoPassword,
        role: "PROFESSIONAL",
      },
    });

    const profile = await prisma.professionalProfile.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        designation: p.designation,
        bio: p.bio,
        qualifications: "LLB, Admitted Attorney of the High Court of South Africa",
        specializations: p.specializations,
        languages: "English,isiZulu,Afrikaans",
        location: p.location,
        yearsExperience: p.years,
        offersOnline: true,
        offersInPerson: true,
        verificationStatus: "APPROVED",
        ratingAvg: 4.7 + i * 0.05,
        ratingCount: 50 + i * 20,
      },
    });

    for (const service of createdServices.slice(0, 3)) {
      await prisma.professionalService.upsert({
        where: { professionalId_serviceId: { professionalId: profile.id, serviceId: service.id } },
        update: {},
        create: { professionalId: profile.id, serviceId: service.id },
      });
    }

    const existingSlots = await prisma.availabilitySlot.count({ where: { professionalId: profile.id } });
    if (existingSlots === 0) {
      const now = new Date();
      for (let d = 1; d <= 10; d++) {
        const day = new Date(now);
        day.setDate(day.getDate() + d);
        for (const hour of [9, 11, 14]) {
          const startsAt = new Date(day);
          startsAt.setHours(hour, 0, 0, 0);
          const endsAt = new Date(startsAt);
          endsAt.setMinutes(endsAt.getMinutes() + 45);
          await prisma.availabilitySlot.create({
            data: { professionalId: profile.id, startsAt, endsAt },
          });
        }
      }
    }
  }

  for (const t of teamMembers) {
    const existing = await prisma.teamMember.findFirst({ where: { name: t.name } });
    if (!existing) await prisma.teamMember.create({ data: t });
  }

  for (const s of siteStats) {
    await prisma.siteStat.upsert({ where: { key: s.key }, update: {}, create: s });
  }

  for (const r of resources) {
    await prisma.resource.upsert({ where: { slug: r.slug }, update: {}, create: r });
  }

  console.log("Seed complete. Demo accounts:");
  console.log("  admin@blackpearlinc.co.za / Demo@1234");
  console.log("  client@demo.thembile / Demo@1234");
  console.log("  employer@demo.thembile / Demo@1234");
  console.log("  thabo.mokoena@pro.thembile / Demo@1234 (and 3 more professionals)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
