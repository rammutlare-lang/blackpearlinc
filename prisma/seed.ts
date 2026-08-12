import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const services = [
  // EMPLOYEE-FACING
  {
    slug: "unfair-dismissal-ccma",
    name: "Unfair Dismissal & CCMA Guidance",
    description: "Advice and representation guidance for unfair dismissal disputes and CCMA matters.",
    icon: "briefcase",
    audience: "EMPLOYEE",
    defaultPriceCents: 85000,
  },
  {
    slug: "disciplinary-hearings",
    name: "Disciplinary Hearings",
    description: "Guidance on disciplinary processes, hearings and your rights as an employee.",
    icon: "users",
    audience: "EMPLOYEE",
    defaultPriceCents: 75000,
  },
  {
    slug: "grievances",
    name: "Workplace Grievances",
    description: "Support raising or responding to a formal workplace grievance.",
    icon: "shield",
    audience: "EMPLOYEE",
    defaultPriceCents: 65000,
  },
  {
    slug: "harassment-unfair-practices",
    name: "Harassment & Unfair Labour Practices",
    description: "Confidential advice on workplace harassment and unfair labour practices.",
    icon: "shield",
    audience: "EMPLOYEE",
    defaultPriceCents: 75000,
  },
  {
    slug: "salary-leave-disputes",
    name: "Salary & Leave Disputes",
    description: "Advice on salary, allowances, leave and related entitlement disputes.",
    icon: "coin",
    audience: "EMPLOYEE",
    defaultPriceCents: 65000,
  },
  {
    slug: "retrenchment-advice",
    name: "Retrenchment Advice",
    description: "Understand your rights and options if you are facing retrenchment.",
    icon: "document",
    audience: "EMPLOYEE",
    defaultPriceCents: 75000,
  },
  {
    slug: "resignation-advice",
    name: "Resignation Advice",
    description: "Practical guidance before resigning, including notice and constructive dismissal questions.",
    icon: "document",
    audience: "EMPLOYEE",
    defaultPriceCents: 65000,
  },
  // EMPLOYER-FACING
  {
    slug: "employment-contracts",
    name: "Employment Contracts",
    description: "Review, drafting and advice on employment contracts and contractual terms.",
    icon: "document",
    audience: "BOTH",
    defaultPriceCents: 65000,
  },
  {
    slug: "workplace-policies-compliance",
    name: "Workplace Policies & Compliance",
    description: "Help with policies, compliance requirements and best practice implementation.",
    icon: "shield",
    audience: "EMPLOYER",
    defaultPriceCents: 95000,
  },
  {
    slug: "misconduct-investigations",
    name: "Misconduct Investigations",
    description: "Structured support investigating workplace misconduct allegations.",
    icon: "users",
    audience: "EMPLOYER",
    defaultPriceCents: 95000,
  },
  {
    slug: "retrenchment-support-employer",
    name: "Retrenchment Support",
    description: "Guidance running a fair, compliant retrenchment process.",
    icon: "briefcase",
    audience: "EMPLOYER",
    defaultPriceCents: 120000,
  },
  {
    slug: "workplace-mediation",
    name: "Workplace Mediation",
    description: "Independent mediation to resolve conflict between employees or teams.",
    icon: "users",
    audience: "BOTH",
    defaultPriceCents: 95000,
  },
  {
    slug: "performance-management",
    name: "Performance Management",
    description: "Advice on managing poor performance fairly and lawfully.",
    icon: "briefcase",
    audience: "EMPLOYER",
    defaultPriceCents: 75000,
  },
  {
    slug: "hr-employee-relations-strategy",
    name: "HR & Employee Relations Strategy",
    description: "Broader advisory support on employee-relations strategy and HR compliance.",
    icon: "shield",
    audience: "EMPLOYER",
    defaultPriceCents: 120000,
  },
];

const professionals = [
  {
    firstName: "Thabo",
    lastName: "Mokoena",
    designation: "Labour Law Attorney",
    professionalType: "Attorney",
    location: "Johannesburg, Gauteng",
    specializations: "Unfair Dismissal,CCMA,Disciplinary Matters,Contracts",
    bio: "Labour law attorney with over 10 years of experience representing both employees and employers in CCMA and Labour Court matters.",
    years: 10,
  },
  {
    firstName: "Nomsa",
    lastName: "Dlamini",
    designation: "Employment Specialist",
    professionalType: "Employee Relations Practitioner",
    location: "Pretoria, Gauteng",
    specializations: "Employment Contracts,Policies,Retrenchments,CCMA",
    bio: "Employment specialist focused on contracts, policies and retrenchment processes for growing businesses.",
    years: 8,
  },
  {
    firstName: "Sipho",
    lastName: "Ndlovu",
    designation: "Labour Law Consultant",
    professionalType: "CCMA Practitioner",
    location: "Durban, KwaZulu-Natal",
    specializations: "Disciplinary Hearings,Dismissals,Arbitration,Wage Disputes",
    bio: "Consultant specialising in disciplinary hearings, arbitration and wage disputes across multiple industries.",
    years: 9,
  },
  {
    firstName: "Lerato",
    lastName: "Kgosana",
    designation: "HR & Compliance Advisor",
    professionalType: "HR Professional",
    location: "Cape Town, Western Cape",
    specializations: "Compliance,Employment Policies,Leave & Benefits,PF & BCEA",
    bio: "HR and compliance advisor helping employers build fair, compliant and well-documented workplace practices.",
    years: 7,
  },
  {
    firstName: "Karabo",
    lastName: "Sithole",
    designation: "Workplace Mediator",
    professionalType: "Mediator",
    location: "Johannesburg, Gauteng",
    specializations: "Mediation,Grievances,Harassment,Conflict Resolution",
    bio: "Accredited mediator helping employees and employers resolve workplace conflict before it escalates.",
    years: 11,
  },
];

const teamMembers = [
  { name: "Thabo Mokoena", role: "Founder & CEO", bio: "Labour law expert with over 15 years of experience in dispute resolution and employee relations.", order: 0 },
  { name: "Nomsa Dlamini", role: "Head of Operations", bio: "Operations strategist passionate about building systems that deliver exceptional client experiences.", order: 1 },
  { name: "Sipho Nkosi", role: "Head of Legal & Compliance", bio: "Ensures our platform meets the highest legal, ethical and regulatory standards.", order: 2 },
  { name: "Lerato Kgosana", role: "Client Relations Lead", bio: "Dedicated to our community and committed to supporting every client with care.", order: 3 },
];

const resources = [
  {
    title: "Understanding Unfair Dismissal",
    slug: "understanding-unfair-dismissal",
    category: "GUIDE" as const,
    audience: "EMPLOYEE",
    summary: "A step-by-step guide to recognising and responding to unfair dismissal.",
    body: "This guide walks through the CCMA process, timelines and what evidence to gather if you believe you were unfairly dismissed.",
    priceCents: null,
  },
  {
    title: "CCMA Process: A Step-by-Step Guide",
    slug: "ccma-process-step-by-step",
    category: "GUIDE" as const,
    audience: "EMPLOYEE",
    summary: "What to expect at each stage of a CCMA referral.",
    body: "From referral to conciliation to arbitration — a plain-language walkthrough of the CCMA process.",
    priceCents: null,
  },
  {
    title: "Notice Period & Severance Calculator",
    slug: "notice-severance-calculator",
    category: "CALCULATOR" as const,
    audience: "BOTH",
    summary: "Estimate statutory notice periods and severance pay.",
    body: "Use this tool to get an indicative estimate of notice period and severance entitlements under the BCEA.",
    priceCents: null,
  },
  {
    title: "Disciplinary Hearing Checklist",
    slug: "disciplinary-hearing-checklist",
    category: "TEMPLATE" as const,
    audience: "BOTH",
    summary: "A practical checklist for preparing for a disciplinary hearing.",
    body: "Covers notice requirements, representation rights, evidence preparation and outcome documentation.",
    priceCents: null,
  },
  {
    title: "Employment Contract Checklist",
    slug: "employment-contract-checklist",
    category: "TEMPLATE" as const,
    audience: "EMPLOYER",
    summary: "Make sure your employment contracts cover the essentials before you send them.",
    body: "A structured checklist covering the clauses employers most often forget or get wrong.",
    priceCents: 4900,
  },
  {
    title: "CCMA Preparation Guide",
    slug: "ccma-preparation-guide",
    category: "GUIDE" as const,
    audience: "EMPLOYEE",
    summary: "How to prepare your evidence, timeline and testimony for a CCMA hearing.",
    body: "A practical guide to arriving at your CCMA hearing organised and confident.",
    priceCents: 9900,
  },
  {
    title: "Employer Disciplinary Pack",
    slug: "employer-disciplinary-pack",
    category: "TEMPLATE" as const,
    audience: "EMPLOYER",
    summary: "Notice templates, hearing scripts and outcome letters for running a fair disciplinary process.",
    body: "Everything an employer needs to run a procedurally fair disciplinary process, from notice to outcome.",
    priceCents: 29900,
  },
  {
    title: "How to Conduct a Disciplinary Hearing",
    slug: "how-to-conduct-a-disciplinary-hearing",
    category: "GUIDE" as const,
    audience: "EMPLOYER",
    summary: "A step-by-step guide for chairpersons running a disciplinary hearing.",
    body: "Covers notice periods, representation rights, evidence handling and writing a defensible outcome.",
    priceCents: null,
  },
  {
    title: "Managing Poor Performance",
    slug: "managing-poor-performance",
    category: "GUIDE" as const,
    audience: "EMPLOYER",
    summary: "A fair, lawful process for managing underperforming employees.",
    body: "Practical steps for setting expectations, documenting performance and reaching a fair outcome.",
    priceCents: null,
  },
  {
    title: "What Is a Grievance?",
    slug: "what-is-a-grievance",
    category: "ARTICLE" as const,
    audience: "EMPLOYEE",
    summary: "Understanding when and how to raise a formal workplace grievance.",
    body: "A plain-language explanation of what qualifies as a grievance and how the process typically works.",
    priceCents: null,
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
      update: { audience: s.audience },
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
      update: { professionalType: p.professionalType },
      create: {
        userId: user.id,
        designation: p.designation,
        professionalType: p.professionalType,
        bio: p.bio,
        qualifications: "LLB, Admitted Attorney of the High Court of South Africa",
        specializations: p.specializations,
        languages: "English,isiZulu,Afrikaans",
        location: p.location,
        yearsExperience: p.years,
        offersOnline: true,
        offersInPerson: true,
        verificationStatus: "APPROVED",
        ratingAvg: 4.7 + i * 0.04,
        ratingCount: 50 + i * 20,
      },
    });

    const relevant = createdServices.filter((s) => p.specializations.toLowerCase().includes(s.name.split(" ")[0].toLowerCase())) ;
    const servicesToLink = relevant.length > 0 ? relevant.slice(0, 4) : createdServices.slice(0, 3);
    for (const service of servicesToLink) {
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

  // Legacy placeholder homepage stats removed — SiteStat rows are no longer
  // seeded. Add real figures later via /admin/site-stats once they exist.
  await prisma.siteStat.deleteMany({
    where: { key: { in: ["enquiries", "paid_consultations", "conversion_rate", "satisfaction"] } },
  });

  for (const r of resources) {
    await prisma.resource.upsert({ where: { slug: r.slug }, update: { audience: r.audience, priceCents: r.priceCents }, create: r });
  }

  console.log("Seed complete. Demo accounts:");
  console.log("  admin@blackpearlinc.co.za / Demo@1234");
  console.log("  client@demo.thembile / Demo@1234");
  console.log("  employer@demo.thembile / Demo@1234");
  console.log("  thabo.mokoena@pro.thembile / Demo@1234 (and 4 more professionals)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
