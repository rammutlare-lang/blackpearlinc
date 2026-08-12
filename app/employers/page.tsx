import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HeroBackground } from "@/components/HeroBackground";

const services = [
  ["Disciplinary Support", "Guidance running fair, procedurally sound disciplinary processes."],
  ["HR Policy Review", "Review and strengthen your workplace policies and procedures."],
  ["Employee Grievances", "Structured support responding to formal employee grievances."],
  ["Workplace Investigations", "Independent, structured investigations into misconduct allegations."],
  ["Performance Management", "Advice on managing underperformance fairly and lawfully."],
  ["Retrenchment Support", "Guidance running a fair, compliant retrenchment process."],
  ["Labour Relations Advice", "Ongoing employee-relations and compliance advisory support."],
];

const plans = [
  {
    name: "Starter",
    tagline: "For small businesses",
    price: "R1,950",
    period: "/month",
    features: ["1 advisory consultation / month", "Email & phone support", "Access to HR templates", "Standard response time"],
  },
  {
    name: "Growth",
    tagline: "For growing businesses",
    price: "R4,500",
    period: "/month",
    features: ["3 advisory consultations / month", "Priority booking", "Disciplinary process support", "Faster response time"],
    highlight: true,
  },
  {
    name: "Enterprise",
    tagline: "For larger organisations",
    price: "Custom",
    period: "",
    features: ["Dedicated account professional", "Unlimited consultations", "On-site support available", "Custom SLAs"],
  },
];

export default function EmployersPage() {
  return (
    <div>
      <section className="bg-tw-black relative overflow-hidden">
        <HeroBackground src="/images/hero-about.jpg" />
        <div className="container-page py-16 relative z-10">
          <Breadcrumbs dark items={[{ label: "Home", href: "/" }, { label: "Employers" }]} />
          <p className="eyebrow">Black Pearl for Business</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-black text-white max-w-2xl">
            Employee Relations Support, <span className="text-tw-red">Without the Overhead</span>
          </h1>
          <p className="mt-4 text-white/60 max-w-xl">
            Employee-relations support without the cost of a full internal
            labour-relations department. Get verified professional advice exactly
            when you need it.
          </p>
          <ButtonLink href="/book" variant="red" size="lg" arrow className="mt-6">
            Get Help Now
          </ButtonLink>
        </div>
      </section>

      <section className="container-page py-16">
        <p className="eyebrow text-center">Services</p>
        <h2 className="mt-2 text-center text-2xl md:text-3xl font-black uppercase text-tw-ink">
          Support Across the Employee Lifecycle
        </h2>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(([title, desc]) => (
            <div key={title} className="rounded-2xl border border-tw-border bg-white p-6">
              <p className="font-bold text-tw-ink">{title}</p>
              <p className="mt-1 text-sm text-tw-muted">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-tw-bg border-y border-tw-border">
        <div className="container-page py-16">
          <p className="eyebrow text-center">Plans</p>
          <h2 className="mt-2 text-center text-2xl md:text-3xl font-black uppercase text-tw-ink">
            Choose the Level of Support You Need
          </h2>
          <p className="mt-2 text-center text-sm text-tw-muted max-w-xl mx-auto">
            Indicative pricing — final plan pricing is confirmed with your account team.
          </p>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`rounded-2xl p-8 ${
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
                <p className="mt-4 text-3xl font-black">
                  {p.price}
                  <span className="text-sm font-normal">{p.period}</span>
                </p>
                <ul className="mt-6 space-y-2 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="text-tw-red">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <ButtonLink
                  href="/contact"
                  variant={p.highlight ? "red" : "outline-red"}
                  size="md"
                  className="mt-6 w-full"
                >
                  Talk to Us
                </ButtonLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-tw-black">
        <div className="container-page py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white font-bold">Prefer a single, once-off consultation?</p>
          <ButtonLink href="/book" variant="red" size="md" arrow>
            Book a Consultation
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
