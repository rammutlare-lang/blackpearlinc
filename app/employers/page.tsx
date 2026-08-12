import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/PageHero";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "For Businesses",
  description:
    "Flexible HR and employee-relations support for South African SMEs — plans from R2,495/month or pay per matter, without the cost of a full HR department.",
};

// Plans and project pricing are admin-editable, so this must not be
// statically prerendered at build time.
export const dynamic = "force-dynamic";

const plans = [
  {
    name: "Starter",
    tagline: "For small businesses that need occasional professional support.",
    price: "R2,495",
    period: "/month",
    features: [
      "1 advisory consultation per month",
      "Email support",
      "HR templates",
      "Basic employee-relations guidance",
      "Basic disciplinary guidance",
      "Standard response time",
      "Access to Black Pearl workplace resources",
    ],
  },
  {
    name: "Growth",
    tagline: "For growing businesses managing more employees and workplace matters.",
    price: "R5,995",
    period: "/month",
    features: [
      "4 consultations per month",
      "Priority booking",
      "Disciplinary-process support",
      "Grievance support",
      "Performance-management guidance",
      "Employment-contract guidance",
      "Policy guidance",
      "Monthly HR risk check",
      "Email & WhatsApp support",
      "Faster response time",
    ],
    highlight: true,
  },
  {
    name: "Business",
    tagline: "For established SMEs requiring more comprehensive support.",
    price: "R9,995",
    period: "/month",
    features: [
      "8 consultations per month",
      "Priority support",
      "Dedicated professional",
      "Disciplinary support",
      "Grievance support",
      "Performance management",
      "Retrenchment guidance",
      "Workplace conflict support",
      "Policy review",
      "Monthly compliance review",
      "Quarterly HR review",
    ],
  },
  {
    name: "Enterprise",
    tagline: "For larger organisations requiring tailored support.",
    price: "From R15,000",
    period: "/month",
    features: [
      "Dedicated professional",
      "Custom service-level agreement",
      "Specialist workplace support",
      "Investigations",
      "Mediation",
      "Retrenchment support",
      "Employee-relations strategy",
      "Policy development",
      "Management advisory",
      "Reporting",
      "On-site support where appropriate",
    ],
  },
];

const lifecycleAreas = [
  {
    n: "01",
    title: "Employment & Onboarding",
    body: "Build stronger employment relationships from the beginning.",
    items: ["Employment contract guidance", "Onboarding processes", "Workplace documentation", "Employee files", "Policies and procedures", "Employment standards"],
  },
  {
    n: "02",
    title: "Performance Management",
    body: "Manage performance problems fairly, consistently and appropriately.",
    items: ["Performance improvement processes", "Performance discussions", "Performance documentation", "Performance-management plans", "Guidance for managers", "Underperformance matters"],
  },
  {
    n: "03",
    title: "Disciplinary Processes",
    body: "Handle workplace misconduct through structured and appropriate processes.",
    items: ["Disciplinary notices", "Process guidance", "Hearing preparation", "Procedural guidance", "Outcome documentation", "Misconduct investigations", "Professional referrals where required"],
  },
  {
    n: "04",
    title: "Employee Grievances",
    body: "Respond to employee concerns through a structured and fair process.",
    items: ["Grievance procedures", "Grievance response guidance", "Workplace conflict", "Employee complaints", "Management response", "Mediation referrals"],
  },
  {
    n: "05",
    title: "Workplace Investigations",
    body: "When serious allegations arise, businesses need a structured approach.",
    items: ["Investigation planning", "Evidence organisation", "Interview preparation", "Witness processes", "Investigation documentation", "Findings and recommendations"],
    note: "Where an independent investigation is appropriate, Black Pearl can facilitate access to an appropriately qualified professional.",
  },
  {
    n: "06",
    title: "Workplace Policies",
    body: "Build a clearer framework for managing your workforce.",
    items: ["HR policies", "Disciplinary codes", "Grievance procedures", "Leave policies", "Remote-work policies", "Workplace conduct", "Harassment policies", "Performance-management procedures"],
  },
  {
    n: "07",
    title: "Retrenchment & Restructuring",
    body: "Workforce restructuring requires careful planning and appropriate professional support.",
    items: ["Retrenchment processes", "Consultation preparation", "Documentation", "Communication", "Process planning", "Employee-relations considerations"],
  },
  {
    n: "08",
    title: "Labour Relations",
    body: "Get professional support when workplace relationships become complicated.",
    items: ["Employee-relations strategy", "Workplace disputes", "Labour-relations advice", "Collective workplace issues", "CCMA-related preparation", "Bargaining-council matters", "Professional referrals"],
    note: "The appropriate dispute forum depends on the nature of the matter — some disputes fall within a bargaining or statutory council rather than the CCMA.",
  },
];

const whyChoose = [
  { title: "Access When You Need It", body: "Don't hire a full HR department when you only need specialist assistance occasionally." },
  { title: "Flexible Support", body: "Choose a once-off consultation, project-based assistance or ongoing support." },
  { title: "Appropriate Professionals", body: "Access professionals whose listed expertise matches your workplace requirements." },
  { title: "Practical Guidance", body: "Move beyond generic information and get support relevant to the situation you are managing." },
  { title: "Transparent Pricing", body: "Know the applicable price and scope before committing to a service." },
  { title: "Nationwide Access", body: "Access workplace professionals across South Africa through a digital platform." },
];

const businessStages = [
  {
    icon: "🌱",
    title: "Start-Ups",
    body: "You are hiring your first employees and need the foundations right.",
    items: ["Contracts", "Policies", "Onboarding", "Basic HR processes"],
  },
  {
    icon: "📈",
    title: "Growing Businesses",
    body: "Your workforce is expanding and employee matters are becoming more complex.",
    items: ["Performance", "Discipline", "Grievances", "HR policies", "Employee relations"],
  },
  {
    icon: "🏢",
    title: "Established SMEs",
    body: "You need reliable workplace expertise without necessarily maintaining a large internal specialist team.",
    items: ["Ongoing advisory support", "Investigations", "Workplace conflict", "Compliance", "Retrenchment", "Employee relations"],
  },
  {
    icon: "🏛️",
    title: "Larger Organisations",
    body: "You require specialist or additional capacity alongside your existing HR function.",
    items: ["Specialist employee relations", "Independent investigations", "Mediation", "Complex workplace matters", "Additional professional capacity"],
  },
];

const advantageFlow = [
  { title: "Information", body: "Understand the workplace issue." },
  { title: "Assessment", body: "Identify the appropriate professional support." },
  { title: "Action", body: "Implement the appropriate process." },
  { title: "Documentation", body: "Create and maintain appropriate records." },
  { title: "Review", body: "Identify potential workplace risks and next steps." },
];

const complianceAreas = [
  "Employment contracts", "Working conditions", "Leave", "Payroll-related obligations",
  "UIF", "PAYE", "Skills Development Levy", "Employment Equity",
  "Occupational health and safety", "Workplace policies", "Employee records",
  "Disciplinary procedures", "Grievance procedures",
];

const contactMoments = [
  { title: "Before Hiring", body: "Make sure your employment foundations are in place." },
  { title: "When an Employee Has a Problem", body: "Get guidance before a workplace issue escalates." },
  { title: "Before Taking Disciplinary Action", body: "Understand the appropriate process before proceeding." },
  { title: "When Performance Declines", body: "Structure performance management appropriately." },
  { title: "When an Employee Raises a Grievance", body: "Respond in a structured and fair manner." },
  { title: "When Serious Allegations Arise", body: "Consider whether an independent investigation is appropriate." },
  { title: "Before Retrenchment", body: "Seek appropriate professional guidance before implementing a restructuring process." },
  { title: "When a Dispute Escalates", body: "Access appropriate workplace professionals and understand your options." },
];

const caseManagementFeatures = [
  "Case records", "Consultation history", "Document management", "Important dates",
  "Action items", "Professional communications", "Workplace issue tracking",
  "Service history", "HR resources", "Professional recommendations",
];

const professionalKinds = [
  "HR Professionals", "Employee Relations Practitioners", "CCMA Practitioners",
  "Labour Consultants", "Mediators", "Disciplinary Specialists", "Attorneys",
  "Other Appropriately Qualified Professionals",
];

const howItWorks = [
  { n: "01", title: "Tell Us What You Need", body: "Describe your workplace issue or business requirement." },
  { n: "02", title: "Identify the Appropriate Support", body: "Black Pearl helps you identify the relevant type of professional or service." },
  { n: "03", title: "Review Your Options", body: "Consider professional expertise, availability, pricing and service scope." },
  { n: "04", title: "Book", body: "Select your preferred professional and appointment." },
  { n: "05", title: "Get Professional Support", body: "Engage directly with the selected professional." },
  { n: "06", title: "Move Forward", body: "Implement the appropriate next steps for your business." },
];

const employerResourceLinks = [
  "Employment guides", "HR checklists", "Policy templates", "Disciplinary resources",
  "Performance-management resources", "Workplace calculators", "Labour-law information",
  "CCMA resources", "Employer articles", "HR updates",
];

const faqs = [
  {
    q: "Do I need a monthly subscription?",
    a: "No. Businesses can book individual consultations or project-based services without subscribing.",
  },
  {
    q: "Can small businesses use Black Pearl?",
    a: "Yes. Black Pearl is specifically designed to make workplace expertise more accessible to small and growing businesses.",
  },
  {
    q: "Can I get help with one employee matter?",
    a: "Yes. You can access support for specific matters such as disciplinary processes, grievances, performance management, investigations and workplace disputes.",
  },
  {
    q: "Can Black Pearl provide an HR department for my business?",
    a: "Black Pearl is designed to provide access to workplace professionals and support. The nature and scope of services depend on the professional or plan selected.",
  },
  {
    q: "Can Black Pearl represent my business at the CCMA?",
    a: "Where representation is required, Black Pearl can facilitate access to an appropriately qualified professional where permitted and appropriate. The professional remains responsible for the representation and applicable professional requirements.",
  },
  {
    q: "Are the prices fixed?",
    a: "Some services have fixed or starting prices. Complex matters may require an assessment and quotation before work begins.",
  },
];

export default async function EmployersPage() {
  const projectServices = await prisma.service.findMany({
    where: { active: true, audience: "EMPLOYER" },
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Employers" }]}
        eyebrow="Black Pearl for Business"
        title={
          <>
            Better Employee Relations. <span className="text-tw-red">Stronger Businesses.</span>
          </>
        }
        description="Professional workplace support without the cost of a full HR or labour-relations department."
        image="/images/hero-employers.jpg"
      />

      <section className="bg-tw-bg py-8">
        <div className="container-page flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <p className="text-tw-muted max-w-2xl">
            Running a business means managing people, performance, policies,
            workplace conflict and compliance — all while focusing on your
            customers and growth. Black Pearl gives businesses access to
            appropriately qualified workplace professionals when they need them,
            whether you need help with a single employee matter, ongoing HR
            support or a complex workplace issue.
          </p>
          <div className="flex flex-wrap gap-3 shrink-0">
            <ButtonLink href="/book" variant="red" size="lg" arrow>
              Get Business Support
            </ButtonLink>
            <ButtonLink href="#plans" variant="outline-red" size="lg" arrow>
              Explore Employer Plans
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="container-page py-16 text-center">
        <p className="eyebrow">Your Business. Your People. Your Support.</p>
        <h2 className="mt-2 text-2xl md:text-3xl font-black uppercase text-tw-ink max-w-2xl mx-auto">
          HR and Employee Relations When You Need It
        </h2>
        <p className="mt-4 text-sm text-tw-muted max-w-2xl mx-auto">
          Not every business needs a full-time HR department. But every employer
          needs access to appropriate workplace expertise. Black Pearl helps
          businesses access professional support across the employee
          lifecycle — from hiring and employment documentation to performance
          management, disciplinary processes, workplace conflict, investigations
          and separation.
        </p>
        <p className="mt-4 text-tw-red font-bold uppercase text-sm">
          Practical support. Professional expertise. Flexible access.
        </p>
      </section>

      <section className="bg-tw-bg py-16">
        <div className="container-page">
          <h2 className="text-xl font-black uppercase text-tw-ink text-center">Support Across the Employee Lifecycle</h2>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {lifecycleAreas.map((l) => (
              <div key={l.n} className="rounded-2xl border border-tw-border bg-white p-6">
                <span className="text-xs font-black text-tw-red">{l.n}</span>
                <h3 className="mt-1 font-bold text-lg text-tw-ink">{l.title}</h3>
                <p className="mt-1 text-sm text-tw-muted">{l.body}</p>
                <p className="mt-3 text-xs font-bold uppercase text-tw-muted">Support may include:</p>
                <ul className="mt-2 grid sm:grid-cols-2 gap-x-4 gap-y-1">
                  {l.items.map((i) => (
                    <li key={i} className="text-sm text-tw-muted before:content-['—_'] before:text-tw-red">
                      {i}
                    </li>
                  ))}
                </ul>
                {l.note && <p className="mt-3 text-xs text-tw-muted italic">{l.note}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <h2 className="text-xl font-black uppercase text-tw-ink text-center">Professional Expertise Without Permanent Overhead</h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyChoose.map((w) => (
            <div key={w.title} className="rounded-xl border border-tw-border bg-white p-5">
              <h4 className="font-bold text-tw-ink">{w.title}</h4>
              <p className="mt-1 text-sm text-tw-muted">{w.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-tw-bg py-16">
        <div className="container-page">
          <p className="eyebrow text-center">Built for South African Businesses</p>
          <h2 className="mt-2 text-2xl font-black uppercase text-tw-ink text-center">From Start-Up to Established Organisation</h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {businessStages.map((s) => (
              <div key={s.title} className="rounded-xl border border-tw-border bg-white p-5">
                <span className="text-2xl">{s.icon}</span>
                <h4 className="mt-2 font-bold text-tw-ink">{s.title}</h4>
                <p className="mt-1 text-sm text-tw-muted">{s.body}</p>
                <p className="mt-3 text-xs font-bold uppercase text-tw-muted">We can help with:</p>
                <p className="mt-1 text-xs text-tw-muted">{s.items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="plans" className="border-y border-tw-border">
        <div className="container-page py-16">
          <p className="eyebrow text-center">Choose Your Level of Support</p>
          <h2 className="mt-2 text-center text-2xl md:text-3xl font-black uppercase text-tw-ink">
            Flexible Business Plans
          </h2>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`rounded-2xl p-6 ${
                  p.highlight ? "bg-tw-black text-white border-2 border-tw-red" : "bg-white border border-tw-border text-tw-ink"
                }`}
              >
                {p.highlight && (
                  <span className="inline-block text-[10px] font-bold uppercase text-tw-red bg-white rounded-full px-2 py-1 mb-3">
                    Most Popular
                  </span>
                )}
                <p className="font-black uppercase text-lg">{p.name}</p>
                <p className={`text-sm ${p.highlight ? "text-white/60" : "text-tw-muted"}`}>{p.tagline}</p>
                <p className="mt-4 text-2xl font-black">
                  {p.price}
                  <span className="text-sm font-normal">{p.period}</span>
                </p>
                <ul className="mt-6 space-y-2 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="text-tw-red">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <ButtonLink
                  href={p.name === "Enterprise" ? "/contact" : "/contact"}
                  variant={p.highlight ? "red" : "outline-red"}
                  size="md"
                  className="mt-6 w-full"
                >
                  {p.name === "Enterprise" ? "Request Enterprise Consultation" : `Choose ${p.name}`}
                </ButtonLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <p className="eyebrow text-center">On-Demand Business Services</p>
        <h2 className="mt-2 text-center text-2xl md:text-3xl font-black uppercase text-tw-ink">
          Need Help With One Specific Matter?
        </h2>
        <p className="mt-3 text-sm text-tw-muted text-center max-w-xl mx-auto">
          You don&apos;t have to subscribe to a monthly plan. Access professional
          assistance when you need it.
        </p>

        <div className="mt-10 overflow-x-auto rounded-2xl border border-tw-border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-tw-bg text-left text-xs uppercase text-tw-muted">
              <tr>
                <th className="p-4">Service</th>
                <th className="p-4">Starting From</th>
                <th className="p-4" />
              </tr>
            </thead>
            <tbody>
              {projectServices.map((s) => (
                <tr key={s.id} className="border-t border-tw-border">
                  <td className="p-4">
                    <p className="font-semibold text-tw-ink">{s.name}</p>
                    <p className="text-xs text-tw-muted">{s.description}</p>
                  </td>
                  <td className="p-4 font-bold text-tw-red whitespace-nowrap">R{(s.defaultPriceCents / 100).toFixed(0)}</td>
                  <td className="p-4 text-right">
                    <ButtonLink href={`/book?service=${s.slug}`} variant="outline-red" size="sm">
                      Enquire
                    </ButtonLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-tw-muted">
          Starting prices are indicative. Final pricing may depend on the
          complexity, scope, documents involved, number of employees or
          professional selected.
        </p>
      </section>

      <section className="bg-tw-bg py-16">
        <div className="container-page">
          <p className="eyebrow text-center">The Black Pearl Business Advantage</p>
          <h2 className="mt-2 text-center text-2xl font-black uppercase text-tw-ink">Prevent Problems Before They Become Expensive</h2>
          <p className="mt-4 text-sm text-tw-muted text-center max-w-2xl mx-auto">
            Workplace problems can become significantly more difficult when
            processes are poorly documented or handled inconsistently. Free
            labour-law educational resources exist, but they can only take a
            business so far — Black Pearl&apos;s value is the professional layer on
            top of information: helping businesses apply appropriate processes
            to their actual workplace situations.
          </p>
          <div className="mt-10 flex flex-col md:flex-row items-stretch justify-center gap-4">
            {advantageFlow.map((a, i) => (
              <div key={a.title} className="flex items-center gap-4">
                <div className="rounded-xl border border-tw-border bg-white p-5 w-44">
                  <p className="text-xs font-bold uppercase text-tw-red">{a.title}</p>
                  <p className="mt-1 text-xs text-tw-muted">{a.body}</p>
                </div>
                {i < advantageFlow.length - 1 && <span className="hidden md:block text-tw-red font-bold">→</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 grid md:grid-cols-2 gap-10">
        <div>
          <p className="eyebrow">HR Compliance</p>
          <h2 className="mt-2 text-xl font-black uppercase text-tw-ink">Know Where Your Business Stands</h2>
          <p className="mt-3 text-sm text-tw-muted">
            Your employment obligations can involve more than contracts and
            disciplinary procedures. Depending on your workforce and
            circumstances, employers may need to consider areas such as:
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {complianceAreas.map((c) => (
              <span key={c} className="text-xs font-bold uppercase bg-tw-bg border border-tw-border rounded-full px-3 py-1.5 text-tw-muted">
                {c}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-tw-muted">
            Black Pearl can help businesses identify areas requiring attention
            and connect them with appropriate professionals.
          </p>
        </div>
        <div className="rounded-2xl bg-tw-charcoal p-8 h-fit">
          <p className="eyebrow">Your Business Doesn&apos;t Need an HR Department to Have HR Support</p>
          <h3 className="mt-2 text-lg font-black text-white">Expertise Without the Full-Time Cost</h3>
          <p className="mt-3 text-sm text-white/60">
            A growing business may not need a permanent HR manager,
            labour-relations specialist or employment-law professional. But
            having access to appropriate expertise when something happens can
            make a significant difference. Black Pearl gives you the flexibility
            to access support when you need it.
          </p>
        </div>
      </section>

      <section className="bg-tw-bg py-16">
        <div className="container-page">
          <h2 className="text-xl font-black uppercase text-tw-ink text-center">When Should You Contact Black Pearl?</h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactMoments.map((c) => (
              <div key={c.title} className="rounded-xl border border-tw-border bg-white p-5">
                <p className="font-bold text-sm text-tw-ink">{c.title}</p>
                <p className="mt-1 text-sm text-tw-muted">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <p className="eyebrow text-center">Case Management</p>
        <h2 className="mt-2 text-center text-xl font-black uppercase text-tw-ink">Keep Your Workplace Matters Organised</h2>
        <p className="mt-3 text-sm text-tw-muted text-center max-w-2xl mx-auto">
          For businesses using Black Pearl&apos;s ongoing services, the platform
          should eventually provide a centralised environment for managing
          workplace matters. Potential features include:
        </p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
          {caseManagementFeatures.map((f) => (
            <div key={f} className="rounded-lg border border-tw-border bg-white p-3 text-center">
              <p className="text-xs font-semibold text-tw-ink">✓ {f}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm font-bold text-tw-red uppercase">
          One business account. One organised workplace-support environment.
        </p>
      </section>

      <section className="bg-tw-bg py-16">
        <div className="container-page">
          <p className="eyebrow text-center">Professional Network</p>
          <h2 className="mt-2 text-center text-xl font-black uppercase text-tw-ink">Access the Right Expertise</h2>
          <p className="mt-3 text-sm text-tw-muted text-center max-w-2xl mx-auto">
            Black Pearl connects businesses with an expanding network of
            workplace professionals. Depending on the matter, professionals may include:
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {professionalKinds.map((k) => (
              <span key={k} className="text-xs font-bold uppercase bg-white border border-tw-border rounded-full px-3 py-1.5 text-tw-muted">
                {k}
              </span>
            ))}
          </div>
          <p className="mt-4 text-xs text-tw-muted text-center">
            Professional availability, qualifications and scope of services vary.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <h2 className="text-xl font-black uppercase text-tw-ink text-center">How It Works</h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {howItWorks.map((s) => (
            <div key={s.n} className="rounded-xl border border-tw-border bg-white p-5">
              <span className="text-xs font-black text-tw-red">{s.n}</span>
              <h4 className="mt-1 font-bold text-tw-ink">{s.title}</h4>
              <p className="mt-1 text-sm text-tw-muted">{s.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <ButtonLink href="/how-it-works" variant="outline-red" size="md" arrow>
            How Black Pearl Works
          </ButtonLink>
        </div>
      </section>

      <section className="bg-tw-black py-16">
        <div className="container-page text-center">
          <p className="eyebrow">Business Resources</p>
          <h2 className="mt-2 text-2xl font-black text-white">Free Tools for Employers</h2>
          <p className="mt-3 text-white/60 max-w-2xl mx-auto">
            Before booking professional support, explore the Black Pearl
            Workplace Resource Centre.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
            {employerResourceLinks.map((r) => (
              <span key={r} className="text-xs font-bold uppercase bg-white/5 border border-white/20 rounded-full px-3 py-1.5 text-white/70">
                {r}
              </span>
            ))}
          </div>
          <ButtonLink href="/resources?audience=EMPLOYER" variant="red" size="md" arrow className="mt-6">
            Visit Employer Resources
          </ButtonLink>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="rounded-2xl border border-tw-border bg-white p-8">
          <p className="eyebrow">Confidentiality & Professional Standards</p>
          <h3 className="mt-2 text-lg font-black text-tw-ink">Your Business Matters</h3>
          <p className="mt-3 text-sm text-tw-muted max-w-3xl">
            Workplace information can be sensitive. Black Pearl is committed to
            creating a platform that promotes responsible handling of client
            information, transparent service expectations and appropriate
            professional standards. Professionals remain responsible for their
            independent professional judgement, advice and services. Black
            Pearl does not guarantee the outcome of a disciplinary matter,
            dispute, CCMA proceeding, investigation, retrenchment process or
            other professional engagement.
          </p>
          <ButtonLink href="/professional-disclaimer" variant="outline-red" size="sm" arrow className="mt-5">
            Read Our Professional Standards
          </ButtonLink>
        </div>
      </section>

      <section className="bg-tw-bg py-16">
        <div className="container-page">
          <h2 className="text-xl font-black uppercase text-tw-ink text-center">Frequently Asked Questions</h2>
          <div className="mt-10 max-w-3xl mx-auto space-y-4">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-xl border border-tw-border bg-white p-5">
                <p className="font-bold text-tw-ink">{f.q}</p>
                <p className="mt-1 text-sm text-tw-muted">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-black uppercase text-tw-ink">Build a Better Workplace</h2>
        <p className="mt-3 text-sm text-tw-muted max-w-2xl mx-auto">
          You don&apos;t need to wait for a workplace problem to become a dispute.
          Get access to the information, tools and professional expertise your
          business needs to manage employee relations more confidently.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="/book" variant="red" size="lg" arrow>
            Get Business Support
          </ButtonLink>
          <ButtonLink href="#plans" variant="outline-red" size="lg" arrow>
            View Plans
          </ButtonLink>
          <ButtonLink href="/book" variant="outline-red" size="lg" arrow>
            Book a Consultation
          </ButtonLink>
        </div>
      </section>

      <section className="bg-tw-black py-14">
        <div className="container-page text-center">
          <p className="font-black uppercase text-white">Black Pearl for Business</p>
          <p className="mt-2 text-white/60 max-w-xl mx-auto">
            Professional workplace expertise. Flexible support. Better employee
            relations. Built for South African businesses.
          </p>
        </div>
      </section>
    </div>
  );
}
