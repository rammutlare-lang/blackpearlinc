import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "For Employees",
  description:
    "Having a workplace problem? Black Pearl helps South African employees understand dismissal, disciplinary, grievance, harassment and retrenchment situations and connects you with a verified professional.",
};

const problems = [
  {
    icon: "⚖️",
    title: "Unfair Dismissal",
    prompt: "Think your dismissal may have been unfair?",
    body: "Understand the basics of dismissal, important considerations, possible dispute-resolution routes and what information you may need.",
    slug: "unfair-dismissal-assessment",
  },
  {
    icon: "📋",
    title: "Disciplinary Hearing",
    prompt: "Have you received a disciplinary notice or been called to a hearing?",
    body: "Understand the process, prepare your documents and find appropriate professional support.",
    slug: "disciplinary-hearings",
  },
  {
    icon: "💬",
    title: "Workplace Grievance",
    prompt: "Have you raised a concern at work and don't know what to do next?",
    body: "Get information about grievances, workplace complaints and possible options.",
    slug: "grievances",
  },
  {
    icon: "🚫",
    title: "Harassment & Unfair Labour Practices",
    prompt: "Are you experiencing harassment, unfair treatment, victimisation or another workplace concern?",
    body: "Understand your options and find appropriate professional assistance.",
    slug: "harassment-unfair-practices",
  },
  {
    icon: "💰",
    title: "Salary, Benefits & Leave",
    prompt: "Are you experiencing a dispute involving salary, working hours, leave, benefits or other employment conditions?",
    body: "Find relevant information and professional support.",
    slug: "salary-leave-disputes",
  },
  {
    icon: "🔄",
    title: "Retrenchment",
    prompt: "Have you been told your position may be affected by restructuring or retrenchment?",
    body: "Understand the process and access professional support appropriate to your circumstances.",
    slug: "retrenchment-advice",
  },
  {
    icon: "📄",
    title: "Employment Contract",
    prompt: "Do you have questions about your employment contract?",
    body: "Get help understanding important contractual terms, obligations and workplace conditions.",
    slug: "employment-contracts",
  },
  {
    icon: "✍️",
    title: "Resignation",
    prompt: "Thinking about resigning?",
    body: "Understand notice periods, documentation and important considerations before making your decision.",
    slug: "resignation-advice",
  },
];

const storyPrompts = [
  "What happened?",
  "When did it happen?",
  "What has your employer said or done?",
  "What outcome are you hoping for?",
  "What documents do you have?",
];

const journeySteps = [
  { n: "01", title: "Tell Us", body: "Describe your workplace problem through our secure intake process." },
  { n: "02", title: "Understand", body: "Review relevant information and resources to help you understand the issue." },
  { n: "03", title: "Find the Right Professional", body: "Explore professionals whose listed expertise matches your situation." },
  { n: "04", title: "Compare", body: "Review qualifications, expertise, experience, availability, languages, ratings and consultation fees." },
  { n: "05", title: "Book", body: "Select a professional and book a consultation at a suitable time." },
  { n: "06", title: "Get Professional Support", body: "Discuss your situation directly with the professional and determine your appropriate next steps." },
];

const whyUseUs = [
  { icon: "🔒", title: "Confidential", body: "Your workplace matter may be sensitive. We take privacy and responsible handling of information seriously." },
  { icon: "✓", title: "Verified Professionals", body: "Find professionals who have undergone Black Pearl's stated verification process." },
  { icon: "💬", title: "Simple Language", body: "We explain workplace concepts in a way that is easier to understand." },
  { icon: "🔎", title: "Find the Right Expertise", body: "Search for professionals based on your specific workplace issue." },
  { icon: "💳", title: "Transparent Pricing", body: "See applicable consultation prices before booking." },
  { icon: "📅", title: "Flexible Booking", body: "Find available professionals and consultation options that suit your circumstances." },
  { icon: "🇿🇦", title: "Built for South Africa", body: "Access workplace information and professionals relevant to the South African employment environment." },
];

const dismissalDocs = [
  "The date of dismissal", "The reason given by your employer", "Any dismissal letter or notice",
  "Previous warnings or disciplinary records", "Relevant correspondence", "Employment contract",
  "Relevant workplace policies", "Other documents relating to the matter",
];

const disciplinaryQuestions = [
  "What allegations have been made?", "What evidence has been provided?",
  "What does your employment contract say?", "What do the workplace policies provide?",
  "Are there witnesses or documents relevant to your response?", "What happened from your perspective?",
];

const harassmentTopics = [
  "Workplace harassment", "Sexual harassment", "Unfair discrimination", "Victimisation",
  "Protected disclosures", "Workplace complaints", "Grievance procedures",
];

const retrenchmentTopics = [
  "Retrenchment consultations", "Notices", "Severance", "Employment benefits",
  "Consultation processes", "Documentation", "Workplace alternatives", "Dispute-resolution options",
];

const workplaceDocs = [
  "Employment contract", "Payslips", "Leave records", "Disciplinary notices", "Warnings",
  "Dismissal letters", "Emails", "WhatsApp communications", "Grievance correspondence",
  "Performance records", "Workplace policies", "Retrenchment documents", "CCMA documentation",
];

const resourceCategories = [
  { icon: "📘", title: "Guides", body: "Understand workplace concepts in plain language." },
  { icon: "📄", title: "Templates", body: "Access practical workplace letters and checklists." },
  { icon: "🧮", title: "Calculators", body: "Estimate notice periods, leave, severance and other workplace calculations." },
  { icon: "⚖️", title: "Labour Law", body: "Explore relevant legislation and official sources." },
  { icon: "📰", title: "Articles", body: "Read workplace insights and developments." },
  { icon: "🎥", title: "Videos", body: "Learn through practical workplace education." },
  { icon: "🆕", title: "Updates", body: "Stay informed about important workplace developments." },
];

const ccmaTopics = [
  "Referring a dispute", "Conciliation", "Con-Arb", "Arbitration", "Evidence", "Representation", "Awards", "Condonation",
];

const professionalCriteria = [
  "Expertise", "Qualifications", "Experience", "Professional registration where applicable",
  "Language", "Location", "Availability", "Ratings", "Consultation price",
];

const consultationChannels = [
  { icon: "💻", title: "Online Consultation", body: "Connect with a professional remotely." },
  { icon: "📞", title: "Telephone Consultation", body: "Speak directly with your selected professional." },
  { icon: "📍", title: "In-Person Consultation", body: "Where available, meet your professional in person." },
  { icon: "📄", title: "Document Review", body: "Get professional assistance with relevant workplace documentation where offered." },
  { icon: "🤝", title: "Mediation", body: "Where appropriate, access workplace mediation services." },
];

const supportPlans = [
  {
    title: "One-Off Consultation",
    body: "For employees who need help understanding a specific workplace issue.",
    price: "From R295",
    cta: "Book a Consultation",
  },
  {
    title: "Document / Case Review",
    body: "For employees who need a professional to review relevant workplace documents or circumstances.",
    price: "From R795",
    cta: "Get Support",
  },
  {
    title: "Complex Workplace Matter",
    body: "For matters requiring more detailed professional involvement.",
    price: "Assessment & Quotation",
    cta: "Request Assistance",
  },
];

const faqs = [
  {
    q: "Can Black Pearl tell me whether my employer acted illegally?",
    a: "Black Pearl can provide general educational information. For advice about your specific circumstances, you should consult an appropriately qualified professional.",
  },
  {
    q: "Can I use Black Pearl if I am still employed?",
    a: "Yes. You can seek information and professional support while you remain employed.",
  },
  {
    q: "Can I get help after being dismissed?",
    a: "Yes. Black Pearl can help you find relevant resources and professionals.",
  },
  {
    q: "Can someone help me prepare for a disciplinary hearing?",
    a: "Yes. Depending on the professional and service offered, you may be able to book professional preparation or consultation support.",
  },
  {
    q: "Can Black Pearl represent me at the CCMA?",
    a: "Where permitted and appropriate, Black Pearl can facilitate access to an appropriately qualified professional. The professional is responsible for determining whether they can provide representation in your specific matter.",
  },
  {
    q: "What if I don't know what my problem is called?",
    a: 'That’s exactly why we have the "Tell Us What Happened" option. Describe the situation in your own words.',
  },
];

export default function EmployeesPage() {
  return (
    <div>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Employees" }]}
        eyebrow="For Employees"
        title={
          <>
            Having a Workplace Problem? <span className="text-tw-red">You Don&apos;t Have to Face It Alone.</span>
          </>
        }
        description="Workplace problems can be stressful, confusing and difficult to navigate. Black Pearl helps you understand your situation and connect with appropriate professional support."
        image="/images/hero-employees.jpg"
      />

      <section className="bg-tw-bg py-8">
        <div className="container-page flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div>
            <p className="text-tw-red font-bold">
              Tell us what happened. We&apos;ll help you find the right next step.
            </p>
            <p className="mt-1 text-xs text-tw-muted uppercase font-bold">
              Confidential support. Professional expertise. Your decision.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/book" variant="red" size="lg" arrow>
              Get Help Now
            </ButtonLink>
            <ButtonLink href="/resources?audience=EMPLOYEE" variant="outline-red" size="lg" arrow>
              Explore Workplace Resources
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <p className="eyebrow text-center">What Are You Dealing With?</p>
        <h2 className="mt-2 text-center text-2xl md:text-3xl font-black uppercase text-tw-ink">
          Find Support for Your Workplace Issue
        </h2>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((p) => (
            <div key={p.title} className="rounded-2xl border border-tw-border bg-white p-6">
              <span className="text-2xl">{p.icon}</span>
              <p className="mt-2 font-bold text-tw-ink">{p.title}</p>
              <p className="mt-1 text-sm font-semibold text-tw-ink">{p.prompt}</p>
              <p className="mt-1 text-sm text-tw-muted">{p.body}</p>
              <ButtonLink href={`/book?service=${p.slug}`} variant="outline-red" size="sm" arrow className="mt-4">
                Get Help
              </ButtonLink>
            </div>
          ))}
          <div className="rounded-2xl border border-dashed border-tw-border bg-tw-bg p-6 flex flex-col justify-center">
            <p className="font-bold text-tw-ink">Something Else?</p>
            <p className="mt-1 text-sm text-tw-muted">
              Not sure which category applies to your situation? Tell us what
              happened in your own words.
            </p>
            <ButtonLink href="/book" variant="red" size="sm" arrow className="mt-4">
              Tell Us What Happened
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-tw-bg py-16">
        <div className="container-page grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="eyebrow">Your Story Matters</p>
            <h2 className="mt-2 text-2xl font-black uppercase text-tw-ink">Start With What Happened</h2>
            <p className="mt-3 text-sm text-tw-muted">
              You don&apos;t need to know the legal terminology. Simply tell us:
            </p>
            <ul className="mt-4 space-y-2">
              {storyPrompts.map((s) => (
                <li key={s} className="text-sm text-tw-ink font-semibold before:content-['—_'] before:text-tw-red">
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-tw-muted">
              Black Pearl can use this information to help identify the type of
              professional support that may be appropriate.
            </p>
            <ButtonLink href="/book" variant="red" size="md" arrow className="mt-5">
              Start My Assessment
            </ButtonLink>
          </div>
          <div>
            <h3 className="text-lg font-black uppercase text-tw-ink text-center md:text-left">
              From Problem to Professional Support
            </h3>
            <div className="mt-6 space-y-4">
              {journeySteps.map((s) => (
                <div key={s.n} className="flex gap-4">
                  <span className="text-xs font-black text-tw-red shrink-0">{s.n}</span>
                  <div>
                    <p className="font-bold text-sm text-tw-ink">{s.title}</p>
                    <p className="text-sm text-tw-muted">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <p className="eyebrow text-center">Why Use Black Pearl?</p>
        <h2 className="mt-2 text-center text-2xl font-black uppercase text-tw-ink">Workplace Support Built Around You</h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {whyUseUs.map((w) => (
            <div key={w.title} className="rounded-xl border border-tw-border bg-white p-5">
              <span className="text-xl">{w.icon}</span>
              <h4 className="mt-2 font-bold text-tw-ink">{w.title}</h4>
              <p className="mt-1 text-sm text-tw-muted">{w.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-tw-bg py-16">
        <div className="container-page text-center">
          <p className="eyebrow">Understand Your Rights</p>
          <h2 className="mt-2 text-2xl font-black uppercase text-tw-ink">Knowledge Can Help You Make Better Decisions</h2>
          <p className="mt-4 text-sm text-tw-muted max-w-2xl mx-auto">
            South African employees have legal protections relating to areas
            such as unfair dismissal and unfair labour practices. The CCMA
            explains that employees have a right not to be unfairly dismissed
            or subjected to an unfair labour practice. However, every
            workplace situation is different — what matters is understanding
            what happened, what rules may apply, what evidence exists and what
            options may be available. Black Pearl helps you take that first step.
          </p>
          <ButtonLink href="/resources?audience=EMPLOYEE" variant="outline-red" size="md" arrow className="mt-6">
            Explore Employee Resources
          </ButtonLink>
        </div>
      </section>

      <section className="container-page py-16 grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-tw-border bg-white p-8">
          <p className="eyebrow">If You Have Been Dismissed</p>
          <h3 className="mt-2 text-lg font-black text-tw-ink">Don&apos;t Panic. Understand Your Next Steps.</h3>
          <p className="mt-3 text-sm text-tw-muted">
            A dismissal can be overwhelming, especially when you don&apos;t know
            whether the process was fair or what you should do next. Start by recording:
          </p>
          <ul className="mt-3 grid sm:grid-cols-2 gap-x-4 gap-y-1">
            {dismissalDocs.map((d) => (
              <li key={d} className="text-sm text-tw-muted before:content-['—_'] before:text-tw-red">
                {d}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-tw-muted italic">
            The CCMA distinguishes between different types of dismissal
            disputes, and referral procedures and timeframes can differ
            depending on the matter.
          </p>
          <ButtonLink href="/professionals?q=Unfair%20Dismissal" variant="outline-red" size="sm" arrow className="mt-5">
            Find a Professional
          </ButtonLink>
        </div>

        <div className="rounded-2xl border border-tw-border bg-white p-8">
          <p className="eyebrow">If You Have Been Called to a Disciplinary Hearing</p>
          <h3 className="mt-2 text-lg font-black text-tw-ink">Prepare Before You Attend</h3>
          <p className="mt-3 text-sm text-tw-muted">
            A disciplinary hearing can be intimidating. Before attending, consider:
          </p>
          <ul className="mt-3 space-y-1">
            {disciplinaryQuestions.map((d) => (
              <li key={d} className="text-sm text-tw-muted before:content-['—_'] before:text-tw-red">
                {d}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-tw-muted italic">
            The CCMA notes that fair disciplinary action requires appropriate
            process and good cause, and its guidance explains the importance
            of fair procedure in dismissal matters.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <ButtonLink href="/resources?q=disciplinary" variant="outline-red" size="sm" arrow>
              Read the Disciplinary Hearing Guide
            </ButtonLink>
            <ButtonLink href="/professionals?q=Disciplinary" variant="red" size="sm" arrow>
              Find a Professional
            </ButtonLink>
          </div>
        </div>

        <div className="rounded-2xl border border-tw-border bg-white p-8">
          <p className="eyebrow">If You Are Experiencing Harassment or Discrimination</p>
          <h3 className="mt-2 text-lg font-black text-tw-ink">Your Workplace Experience Matters</h3>
          <p className="mt-3 text-sm text-tw-muted">
            Workplace harassment and discrimination can have serious personal
            and professional consequences. Black Pearl provides educational
            information and can help you identify appropriate professional
            support. Resources may cover:
          </p>
          <ul className="mt-3 grid sm:grid-cols-2 gap-x-4 gap-y-1">
            {harassmentTopics.map((h) => (
              <li key={h} className="text-sm text-tw-muted before:content-['—_'] before:text-tw-red">
                {h}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-tw-muted italic">
            The CCMA provides specific guidance on unfair discrimination and
            notes that different disputes can have different referral
            requirements and timeframes.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <ButtonLink href="/resources?q=harassment" variant="outline-red" size="sm" arrow>
              Explore Harassment Resources
            </ButtonLink>
            <ButtonLink href="/professionals?q=Harassment" variant="red" size="sm" arrow>
              Find Professional Support
            </ButtonLink>
          </div>
        </div>

        <div className="rounded-2xl border border-tw-border bg-white p-8">
          <p className="eyebrow">If You Are Facing Retrenchment</p>
          <h3 className="mt-2 text-lg font-black text-tw-ink">Understand the Process Before Making Decisions</h3>
          <p className="mt-3 text-sm text-tw-muted">
            Retrenchment can affect your income, career and family. Black
            Pearl can help you access information and appropriate professional
            support relating to:
          </p>
          <ul className="mt-3 grid sm:grid-cols-2 gap-x-4 gap-y-1">
            {retrenchmentTopics.map((r) => (
              <li key={r} className="text-sm text-tw-muted before:content-['—_'] before:text-tw-red">
                {r}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-2">
            <ButtonLink href="/resources?q=retrenchment" variant="outline-red" size="sm" arrow>
              Explore Retrenchment Resources
            </ButtonLink>
            <ButtonLink href="/professionals?q=Retrenchment" variant="red" size="sm" arrow>
              Get Professional Support
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-tw-bg py-16">
        <div className="container-page grid md:grid-cols-2 gap-10 items-start">
          <div>
            <p className="eyebrow">Your Workplace Documents</p>
            <h2 className="mt-2 text-xl font-black uppercase text-tw-ink">Keep Important Records</h2>
            <p className="mt-3 text-sm text-tw-muted">
              If you are dealing with a workplace dispute, keeping relevant
              documents organised can be extremely useful. Depending on your
              circumstances, documents may include:
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {workplaceDocs.map((d) => (
                <span key={d} className="text-xs font-bold uppercase bg-white border border-tw-border rounded-full px-3 py-1.5 text-tw-muted">
                  {d}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-tw-charcoal p-8">
            <p className="eyebrow">Create Your Workplace File</p>
            <p className="mt-2 text-sm text-white/60">
              Black Pearl should eventually allow employees to securely
              organise relevant documents and important dates within their account.
            </p>
            <ButtonLink href="/register" variant="red" size="md" arrow className="mt-5">
              Create My Workplace File
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="container-page py-16 text-center">
        <p className="eyebrow">Employee Resource Centre</p>
        <h2 className="mt-2 text-2xl font-black uppercase text-tw-ink">Free Information to Help You Understand Your Situation</h2>
        <p className="mt-3 text-sm text-tw-muted max-w-2xl mx-auto">
          Explore practical guides, templates, calculators and workplace information.
        </p>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {resourceCategories.map((r) => (
            <div key={r.title} className="rounded-xl border border-tw-border bg-white p-5">
              <span className="text-xl">{r.icon}</span>
              <h4 className="mt-2 font-bold text-tw-ink">{r.title}</h4>
              <p className="mt-1 text-sm text-tw-muted">{r.body}</p>
            </div>
          ))}
        </div>
        <ButtonLink href="/resources?audience=EMPLOYEE" variant="red" size="md" arrow className="mt-8">
          Visit the Resource Centre
        </ButtonLink>
      </section>

      <section className="bg-tw-bg py-16">
        <div className="container-page text-center">
          <p className="eyebrow">CCMA Support</p>
          <h2 className="mt-2 text-2xl font-black uppercase text-tw-ink">Need to Understand the CCMA?</h2>
          <p className="mt-3 text-sm text-tw-muted max-w-2xl mx-auto">
            If your workplace dispute remains unresolved, you may need to
            understand the appropriate dispute-resolution process. Black
            Pearl&apos;s CCMA resources can help you learn about:
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
            {ccmaTopics.map((c) => (
              <span key={c} className="text-xs font-bold uppercase bg-white border border-tw-border rounded-full px-3 py-1.5 text-tw-muted">
                {c}
              </span>
            ))}
          </div>
          <p className="mt-4 text-xs text-tw-muted max-w-2xl mx-auto italic">
            The CCMA publishes official information sheets and referral
            guidance, and users should always verify current procedures and
            applicable time limits directly with the CCMA.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/resources?q=ccma" variant="outline-red" size="md" arrow>
              Explore CCMA Resources
            </ButtonLink>
            <ButtonLink href="/professionals?q=CCMA" variant="red" size="md" arrow>
              Find a Professional
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="eyebrow">Find a Professional</p>
            <h2 className="mt-2 text-xl font-black uppercase text-tw-ink">You Don&apos;t Need to Know Who You Need</h2>
            <p className="mt-3 text-sm text-tw-muted">
              You might not know whether your matter requires an HR
              professional, employee relations practitioner, mediator, labour
              consultant or attorney. That&apos;s okay. Tell Black Pearl what
              happened and explore professionals based on:
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {professionalCriteria.map((c) => (
                <span key={c} className="text-xs font-bold uppercase bg-tw-bg border border-tw-border rounded-full px-3 py-1.5 text-tw-muted">
                  {c}
                </span>
              ))}
            </div>
            <ButtonLink href="/professionals" variant="red" size="md" arrow className="mt-5">
              Find My Professional
            </ButtonLink>
          </div>
          <div>
            <h3 className="text-lg font-black uppercase text-tw-ink text-center md:text-left">
              Choose How You Get Help
            </h3>
            <div className="mt-4 space-y-3">
              {consultationChannels.map((c) => (
                <div key={c.title} className="rounded-lg border border-tw-border bg-white p-4 flex items-start gap-3">
                  <span className="text-xl">{c.icon}</span>
                  <div>
                    <p className="font-bold text-sm text-tw-ink">{c.title}</p>
                    <p className="text-sm text-tw-muted">{c.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-tw-muted">
              Available services depend on the professional, matter and location.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-tw-bg py-16">
        <div className="container-page">
          <p className="eyebrow text-center">Employee Support Plans</p>
          <h2 className="mt-2 text-center text-2xl font-black uppercase text-tw-ink">
            Get the Level of Support That Fits Your Situation
          </h2>
          <div className="mt-10 grid sm:grid-cols-3 gap-6">
            {supportPlans.map((p) => (
              <div key={p.title} className="rounded-2xl border border-tw-border bg-white p-6">
                <p className="font-black uppercase text-tw-ink">{p.title}</p>
                <p className="mt-2 text-sm text-tw-muted">{p.body}</p>
                <p className="mt-4 text-xl font-black text-tw-red">{p.price}</p>
                <ButtonLink href="/book" variant="outline-red" size="md" arrow className="mt-5 w-full">
                  {p.cta}
                </ButtonLink>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-tw-muted text-center">
            Prices are starting prices — the final professional fee may vary
            according to complexity and scope, and is always confirmed before you pay.
          </p>
        </div>
      </section>

      <section className="container-page py-16 grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-tw-border bg-white p-8">
          <p className="eyebrow">Your Privacy Matters</p>
          <h3 className="mt-2 text-lg font-black text-tw-ink">Workplace Matters Can Be Personal</h3>
          <p className="mt-3 text-sm text-tw-muted">
            Black Pearl is designed to provide a confidential environment for
            employees seeking workplace information and professional support.
            We encourage users to provide only information necessary for their
            enquiry and to avoid unnecessarily sharing sensitive personal
            information during initial enquiries. Our platform should clearly
            explain how information is collected, used, stored and shared.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <ButtonLink href="/privacy-policy" variant="outline-red" size="sm" arrow>
              Read Our Privacy Policy
            </ButtonLink>
            <ButtonLink href="/popia" variant="outline-red" size="sm" arrow>
              Read Our POPIA Notice
            </ButtonLink>
          </div>
        </div>

        <div className="rounded-2xl bg-tw-black p-8">
          <p className="eyebrow">Important</p>
          <h3 className="mt-2 text-lg font-black text-white">Black Pearl Does Not Decide Your Case</h3>
          <p className="mt-3 text-sm text-white/60">
            Black Pearl is a platform that helps connect employees with
            workplace professionals and educational resources. We do not
            guarantee that a dismissal was unfair, that an employer acted
            unlawfully, that a dispute will succeed or that a particular
            outcome will be achieved. Professionals remain responsible for
            their own independent professional judgement, advice and services.
            Where legal advice or representation is required, employees should
            engage an appropriately qualified professional authorised to
            provide the relevant service.
          </p>
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
        <h2 className="text-xl font-black uppercase text-tw-ink">You Have Options</h2>
        <p className="mt-3 text-sm text-tw-muted max-w-2xl mx-auto">
          You don&apos;t have to solve your workplace problem today. Start by
          understanding what happened, gathering your documents and learning
          about the options that may be available to you.
        </p>
        <p className="mt-3 text-tw-red font-bold">Tell us what happened.</p>
        <ButtonLink href="/book" variant="red" size="lg" arrow className="mt-5">
          Get Help Now
        </ButtonLink>
      </section>

      <section className="bg-tw-black py-16">
        <div className="container-page text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white">Your Workplace. Your Rights. Your Next Step.</h2>
          <p className="mt-3 text-white/60 max-w-2xl mx-auto">
            Whether you are facing dismissal, discipline, harassment,
            retrenchment, a grievance, a salary dispute or another workplace
            challenge, Black Pearl is here to help you find the information
            and professional support you need.
          </p>
          <p className="mt-3 text-tw-red font-bold uppercase text-sm">
            Understand. Prepare. Connect. Move Forward.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/book" variant="red" size="lg" arrow>
              Get Help Now
            </ButtonLink>
            <ButtonLink href="/professionals" variant="outline-white" size="lg" arrow>
              Find a Professional
            </ButtonLink>
            <ButtonLink href="/resources?audience=EMPLOYEE" variant="outline-white" size="lg" arrow>
              Explore Resources
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-tw-charcoal py-14">
        <div className="container-page text-center">
          <p className="font-black uppercase text-white">Black Pearl</p>
          <p className="mt-2 text-white/60 max-w-xl mx-auto">
            Professional workplace expertise, made accessible. Helping
            employees navigate workplace challenges with greater clarity,
            confidence and access to appropriate professional support.
          </p>
        </div>
      </section>
    </div>
  );
}
