import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { prisma } from "@/lib/prisma";

const heroTrust = ["Vetted Professionals", "Confidential & Secure", "Easy Booking & Payments", "Practical Solutions"];

const processSteps = [
  ["1", "Tell Us Your Issue", "Complete our quick intake form so we can understand your needs."],
  ["2", "Get Matched", "We match you with one of our trusted labour experts within 24 hours."],
  ["3", "Book & Pay", "Pick a convenient time and pay securely online in just a few clicks."],
  ["4", "Consult & Resolve", "Meet online with your expert and get practical advice and clear next steps."],
];

const whyChoose = [
  "Qualified & vetted professionals",
  "Practical, solution-focused advice",
  "Transparent pricing",
  "Secure payments",
  "Confidential & POPIA compliant",
  "Fast, convenient & reliable",
];

export default async function ServicesPage() {
  const services = await prisma.service.findMany({ where: { active: true }, orderBy: { order: "asc" } });

  return (
    <div>
      <section className="bg-tw-black diagonal-accent">
        <div className="container-page py-16 grid lg:grid-cols-[1fr_360px] gap-10">
          <div>
            <Breadcrumbs dark items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
            <h1 className="mt-4 text-4xl md:text-5xl font-black text-white">
              Services <br />
              Expert <span className="text-tw-red">Labour Law Solutions</span>
            </h1>
            <p className="mt-4 eyebrow">Phase 2: Minimum Viable Service (Month 1–3)</p>
            <p className="mt-2 text-white/60 max-w-xl">
              Get professional advice from vetted labour law experts through our simple,
              secure and convenient consultation service.
            </p>
            <div className="mt-6 flex flex-wrap gap-6">
              {heroTrust.map((t) => (
                <span key={t} className="text-xs font-bold uppercase text-white/70">{t}</span>
              ))}
            </div>
          </div>
          <div className="panel-glass rounded-2xl p-6">
            <p className="text-center text-lg font-black text-white">Simple. Fast. Confidential.</p>
            <div className="mt-6 space-y-4">
              {processSteps.map(([n, title, desc]) => (
                <div key={n} className="flex items-start gap-3">
                  <span className="h-8 w-8 shrink-0 rounded-full bg-tw-red text-white flex items-center justify-center text-xs font-black">
                    {n}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-white">{title}</p>
                    <p className="text-xs text-white/50">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <h2 className="text-center text-2xl md:text-3xl font-black uppercase text-tw-ink">
          Our <span className="text-tw-red">Consultation</span> Services
        </h2>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.id} className="rounded-2xl border border-tw-border bg-white p-6">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-tw-red/10 text-tw-red font-black">
                {s.name.charAt(0)}
              </span>
              <p className="mt-4 font-black text-tw-ink">{s.name}</p>
              <p className="mt-1 text-sm text-tw-muted">{s.description}</p>
              <p className="mt-3 text-sm font-bold text-tw-red">
                From R{(s.defaultPriceCents / 100).toFixed(0)}
              </p>
              <ButtonLink href={`/book?service=${s.slug}`} variant="outline-red" size="sm" className="mt-4">
                Book Consultation
              </ButtonLink>
            </div>
          ))}
        </div>

        <div className="mt-14 grid lg:grid-cols-[1fr_320px] gap-10 items-start">
          <div>
            <h3 className="text-xl font-black uppercase text-tw-ink">A Simple, Professional Process</h3>
            <div className="mt-6 grid sm:grid-cols-2 gap-6">
              {processSteps.map(([n, title, desc]) => (
                <div key={n} className="flex items-start gap-3">
                  <span className="h-10 w-10 shrink-0 rounded-full bg-tw-black text-white flex items-center justify-center text-xs font-black">
                    {n}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-tw-ink">{title}</p>
                    <p className="text-xs text-tw-muted">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-tw-black p-6 text-white">
            <p className="eyebrow">Why Choose Us</p>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              {whyChoose.map((w) => (
                <li key={w} className="flex items-center gap-2">
                  <span className="text-tw-red">✓</span> {w}
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-xl border border-white/10 p-4">
              <p className="text-xs font-bold uppercase text-white">Secure Payments</p>
              <p className="mt-1 text-xs text-white/50">
                We use industry-standard security to protect your payments and personal
                information.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
