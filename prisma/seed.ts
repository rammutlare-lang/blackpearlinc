import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const staleServiceSlugs = ["unfair-dismissal-ccma", "workplace-policies-compliance"];

const services = [
  // QUICK ADVICE (employee, duration-based)
  {
    slug: "quick-assessment",
    name: "Quick Workplace Assessment",
    description: "Not sure what to do? Speak to a professional for 15 minutes and get your next best step.",
    icon: "briefcase",
    audience: "EMPLOYEE",
    defaultDurationMins: 15,
    defaultPriceCents: 29500,
  },
  {
    slug: "consultation-30",
    name: "30-Minute Consultation",
    description: "A focused consultation to talk through your workplace issue.",
    icon: "briefcase",
    audience: "EMPLOYEE",
    defaultDurationMins: 30,
    defaultPriceCents: 59500,
  },
  {
    slug: "consultation-45",
    name: "45-Minute Consultation",
    description: "More time to cover your situation in detail and get a clear plan.",
    icon: "briefcase",
    audience: "EMPLOYEE",
    defaultDurationMins: 45,
    defaultPriceCents: 79500,
  },
  {
    slug: "consultation-60",
    name: "60-Minute Consultation",
    description: "A full hour with a professional for more complex situations.",
    icon: "briefcase",
    audience: "EMPLOYEE",
    defaultDurationMins: 60,
    defaultPriceCents: 99500,
  },
  // EMPLOYEE SPECIALIST SERVICES
  {
    slug: "resignation-advice",
    name: "Resignation Advice",
    description: "Practical guidance before resigning, including notice and constructive dismissal questions.",
    icon: "document",
    audience: "EMPLOYEE",
    defaultDurationMins: 45,
    defaultPriceCents: 59500,
  },
  {
    slug: "salary-leave-disputes",
    name: "Salary & Leave Dispute",
    description: "Advice on salary, allowances, leave and related entitlement disputes.",
    icon: "coin",
    audience: "EMPLOYEE",
    defaultDurationMins: 45,
    defaultPriceCents: 69500,
  },
  {
    slug: "grievances",
    name: "Workplace Grievance",
    description: "Support raising or responding to a formal workplace grievance.",
    icon: "shield",
    audience: "EMPLOYEE",
    defaultDurationMins: 45,
    defaultPriceCents: 69500,
  },
  {
    slug: "employment-contracts",
    name: "Employment Contract Review",
    description: "A professional reviews your employment contract and explains what it means for you.",
    icon: "document",
    audience: "EMPLOYEE",
    defaultDurationMins: 45,
    defaultPriceCents: 79500,
  },
  {
    slug: "disciplinary-hearings",
    name: "Disciplinary Hearing Preparation",
    description: "Guidance preparing for a disciplinary hearing and understanding your rights.",
    icon: "users",
    audience: "EMPLOYEE",
    defaultDurationMins: 45,
    defaultPriceCents: 79500,
  },
  {
    slug: "harassment-unfair-practices",
    name: "Harassment / ULP Assessment",
    description: "Confidential advice on workplace harassment and unfair labour practices.",
    icon: "shield",
    audience: "EMPLOYEE",
    defaultDurationMins: 45,
    defaultPriceCents: 79500,
  },
  {
    slug: "retrenchment-advice",
    name: "Retrenchment Consultation",
    description: "Understand your rights and options if you are facing retrenchment.",
    icon: "briefcase",
    audience: "EMPLOYEE",
    defaultDurationMins: 45,
    defaultPriceCents: 89500,
  },
  {
    slug: "unfair-dismissal-assessment",
    name: "Unfair Dismissal Assessment",
    description: "An assessment of whether your dismissal may have been unfair and what to do next.",
    icon: "briefcase",
    audience: "EMPLOYEE",
    defaultDurationMins: 45,
    defaultPriceCents: 89500,
  },
  {
    slug: "ccma-case-assessment",
    name: "CCMA Case Assessment",
    description: "An assessment of your case and guidance on referring a matter to the CCMA.",
    icon: "briefcase",
    audience: "EMPLOYEE",
    defaultDurationMins: 45,
    defaultPriceCents: 89500,
  },
  // EMPLOYEE PACKAGES
  {
    slug: "ccma-ready-package",
    name: "CCMA Ready",
    description: "Case assessment, document checklist, chronology preparation, evidence review, dispute-process explanation, a preparation session and a written action plan.",
    icon: "shield",
    audience: "EMPLOYEE",
    defaultDurationMins: 90,
    defaultPriceCents: 149500,
  },
  {
    slug: "workplace-case-pack",
    name: "Workplace Case Pack",
    description: "A 60-minute consultation, document review, case assessment, written case strategy, evidence checklist and a follow-up consultation.",
    icon: "shield",
    audience: "EMPLOYEE",
    defaultDurationMins: 90,
    defaultPriceCents: 199500,
  },
  {
    slug: "complex-matter-assessment",
    name: "Complex Matter Assessment",
    description: "For complex dismissal, discrimination, harassment, retrenchment, senior employee disputes, multiple allegations or extensive documentation.",
    icon: "shield",
    audience: "EMPLOYEE",
    defaultDurationMins: 120,
    defaultPriceCents: 249500,
  },
  // EMPLOYER PROJECT PRICING
  {
    slug: "employer-employment-contract",
    name: "Employment Contract",
    description: "A drafted, compliant employment contract for your business.",
    icon: "document",
    audience: "EMPLOYER",
    defaultDurationMins: 60,
    defaultPriceCents: 149500,
  },
  {
    slug: "executive-contract",
    name: "Executive Contract",
    description: "A drafted employment contract for a senior or executive hire.",
    icon: "document",
    audience: "EMPLOYER",
    defaultDurationMins: 60,
    defaultPriceCents: 299500,
  },
  {
    slug: "workplace-policy-single",
    name: "Single Workplace Policy",
    description: "One workplace policy drafted or reviewed for your business.",
    icon: "shield",
    audience: "EMPLOYER",
    defaultDurationMins: 60,
    defaultPriceCents: 199500,
  },
  {
    slug: "policy-pack",
    name: "Policy Pack",
    description: "A set of core workplace policies drafted or reviewed for your business.",
    icon: "shield",
    audience: "EMPLOYER",
    defaultDurationMins: 90,
    defaultPriceCents: 599500,
  },
  {
    slug: "employee-handbook",
    name: "Employee Handbook",
    description: "A complete employee handbook drafted for your business.",
    icon: "shield",
    audience: "EMPLOYER",
    defaultDurationMins: 120,
    defaultPriceCents: 899500,
  },
  {
    slug: "hr-compliance-review",
    name: "HR Compliance Review",
    description: "A review of your current HR practices against labour law requirements.",
    icon: "shield",
    audience: "EMPLOYER",
    defaultDurationMins: 60,
    defaultPriceCents: 499500,
  },
  {
    slug: "hr-compliance-audit-full",
    name: "Full HR Compliance Audit",
    description: "A comprehensive audit of your HR and labour-law compliance, with a written report.",
    icon: "shield",
    audience: "EMPLOYER",
    defaultDurationMins: 120,
    defaultPriceCents: 999500,
  },
  {
    slug: "disciplinary-process-support",
    name: "Disciplinary Process Support",
    description: "Guidance running a fair, procedurally sound disciplinary process from start to finish.",
    icon: "users",
    audience: "EMPLOYER",
    defaultDurationMins: 60,
    defaultPriceCents: 199500,
  },
  {
    slug: "disciplinary-hearing-employer",
    name: "Disciplinary Hearing",
    description: "A professional chairs or supports a disciplinary hearing on your behalf. Priced from — final quote depends on complexity.",
    icon: "users",
    audience: "EMPLOYER",
    defaultDurationMins: 90,
    defaultPriceCents: 299500,
  },
  {
    slug: "misconduct-investigations",
    name: "Misconduct Investigation",
    description: "An independent, structured investigation into misconduct allegations. Priced from — final quote depends on scope.",
    icon: "users",
    audience: "EMPLOYER",
    defaultDurationMins: 120,
    defaultPriceCents: 350000,
  },
  {
    slug: "workplace-mediation",
    name: "Workplace Mediation",
    description: "Independent mediation to resolve conflict between employees or teams. Priced from — final quote depends on scope.",
    icon: "users",
    audience: "EMPLOYER",
    defaultDurationMins: 90,
    defaultPriceCents: 199500,
  },
  {
    slug: "retrenchment-support-employer",
    name: "Retrenchment Support",
    description: "Guidance running a fair, compliant retrenchment process. Priced from — final quote depends on scope.",
    icon: "briefcase",
    audience: "EMPLOYER",
    defaultDurationMins: 90,
    defaultPriceCents: 350000,
  },
  {
    slug: "performance-management",
    name: "Performance Management System",
    description: "A structured system for fairly and lawfully managing underperformance. Priced from — final quote depends on scope.",
    icon: "briefcase",
    audience: "EMPLOYER",
    defaultDurationMins: 90,
    defaultPriceCents: 499500,
  },
  {
    slug: "hr-employee-relations-strategy",
    name: "HR & Employee Relations Strategy",
    description: "Ongoing advisory support on employee-relations strategy and HR compliance, billed hourly.",
    icon: "shield",
    audience: "EMPLOYER",
    defaultDurationMins: 60,
    defaultPriceCents: 149500,
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
    tier: "VERIFIED_PREMIUM",
    commissionRate: 0.15,
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
    tier: "VERIFIED_PRO",
    commissionRate: 0.20,
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
    tier: "VERIFIED",
    commissionRate: 0.25,
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
    tier: "PARTNER",
    commissionRate: 0.1125,
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
    tier: "VERIFIED_PRO",
    commissionRate: 0.20,
  },
];

// No placeholder leadership profiles are seeded — the About page's
// Leadership section only appears once genuine, verifiable people are
// added via /admin/team. Never seed fictional names/credentials here.
const placeholderTeamNames = ["Thabo Mokoena", "Nomsa Dlamini", "Sipho Nkosi", "Lerato Kgosana"];

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
  {
    title: "The Basic Conditions of Employment Act, Explained",
    slug: "bcea-explained",
    category: "LAW" as const,
    audience: "BOTH",
    summary: "A plain-language overview of the BCEA and what it guarantees every employee.",
    body: "Covers working hours, leave, notice periods and remuneration protections set out in the BCEA.",
    priceCents: null,
  },
  {
    title: "The Labour Relations Act: What It Means for You",
    slug: "lra-what-it-means-for-you",
    category: "LAW" as const,
    audience: "BOTH",
    summary: "Understanding your rights and obligations under the LRA, from dismissal to unfair labour practice.",
    body: "An accessible walkthrough of the LRA provisions most relevant to everyday workplace disputes.",
    priceCents: null,
  },
  {
    title: "Understanding CCMA Arbitration: A Recorded Briefing",
    slug: "understanding-ccma-arbitration-briefing",
    category: "WEBINAR" as const,
    audience: "EMPLOYEE",
    summary: "A recorded session walking through what happens at CCMA arbitration and how to prepare.",
    body: "A recorded briefing covering arbitration procedure, evidence, representation and outcomes.",
    priceCents: null,
  },
  {
    title: "HR Compliance Essentials for Small Businesses",
    slug: "hr-compliance-essentials-small-business",
    category: "TEMPLATE" as const,
    audience: "HR",
    summary: "The core policies and records every small business needs to stay compliant.",
    body: "A practical starter pack covering the minimum HR policies, records and processes SMEs need in place.",
    priceCents: 14900,
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
      update: { ...s, active: true },
      create: s,
    });
    createdServices.push(service);
  }

  await prisma.service.updateMany({
    where: { slug: { in: staleServiceSlugs } },
    data: { active: false },
  });

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
      update: { professionalType: p.professionalType, professionalTier: p.tier, commissionRate: p.commissionRate },
      create: {
        userId: user.id,
        designation: p.designation,
        professionalType: p.professionalType,
        professionalTier: p.tier,
        commissionRate: p.commissionRate,
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

    // Every professional offers the full catalogue at default pricing in this
    // seed dataset, so every service has at least one bookable professional.
    for (const service of createdServices) {
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

  // Remove any previously-seeded placeholder leadership profiles — these were
  // fictional demo names and should never be presented as real people.
  await prisma.teamMember.deleteMany({ where: { name: { in: placeholderTeamNames } } });

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
