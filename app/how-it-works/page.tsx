import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HeroBackground } from "@/components/HeroBackground";
import { prisma } from "@/lib/prisma";

const steps = [
  ["01", "Tell Us Your Issue", "Complete our quick intake form so we can understand your situation and needs."],
  ["02", "Get Matched", "We match you with one of our vetted labour law professionals within 24 hours."],
  ["03", "Book & Pay", "Choose a convenient time and pay securely online in just a few clicks."],
  ["04", "Consult & Resolve", "Meet online or in person with your expert and get practical advice and clear next steps."],
];

const whyItWorks = [
  "Qualified & vetted professionals",
  "Practical, solution-focused advice",
  "Transparent pricing",
  "Secure payments",
  "Confidential & POPIA compliant",
  "Fast, convenient & reliable",
];

const footerStrip = [
  ["Fast Turnaround", "Get matched and booked within 24 hours."],
  ["100% Confidential", "Your information is protected and never shared."],
  ["Secure Payments", "Safe and encrypted payments you can trust."],
  ["Dedicated Support", "We're here to assist you every step of the way."],
];

export default async function HowItWorksPage() {
  const stats = await prisma.siteStat.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <section className="bg-tw-black relative overflow-hidden">
        <HeroBackground src="/images/hero-how-it-works.jpg" />
        <div className="container-page py-16 grid lg:grid-cols-[1fr_360px] gap-10 items-center relative z-10">
          <div>
            <Breadcrumbs dark items={[{ label: "Home", href: "/" }, { label: "How It Works" }]} />
            <p className="eyebrow">How It Works</p>
            <h1 className="mt-2 text-4xl md:text-5xl font-black text-white">
              Simple Steps. <br /> Expert <span className="text-tw-red">Solutions.</span>
            </h1>
            <p className="mt-4 text-white/60 max-w-lg">
              We connect you with qualified labour law professionals to resolve your
              workplace issues with confidence.
            </p>
          </div>
          <div className="panel-glass rounded-2xl p-6 text-center">
            <p className="text-lg font-black text-white">
              Confidential. Professional. Results Driven.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(([n, title, desc], i) => (
            <div key={n} className="relative rounded-2xl border border-tw-border bg-white p-6">
              <span className="absolute -top-3 -left-3 h-9 w-9 rounded-lg bg-tw-black text-white flex items-center justify-center text-xs font-black">
                {n}
              </span>
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-tw-red text-white text-xl">
                {i + 1}
              </span>
              <p className="mt-4 font-black uppercase text-tw-ink">{title}</p>
              <p className="mt-1 text-sm text-tw-muted">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl bg-tw-black p-8">
          <p className="eyebrow">Why It Works</p>
          <ul className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2 text-sm text-white/80">
            {whyItWorks.map((w) => (
              <li key={w} className="flex items-center gap-2">
                <span className="text-tw-red">✓</span> {w}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-tw-bg border-t border-tw-border">
        <div className="container-page py-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {footerStrip.map(([title, desc]) => (
            <div key={title} className="flex items-center gap-3">
              <span className="h-8 w-8 shrink-0 rounded-full border border-tw-red flex items-center justify-center text-tw-red text-xs font-bold">
                ✓
              </span>
              <div>
                <p className="font-bold text-tw-ink text-xs uppercase">{title}</p>
                <p className="text-xs text-tw-muted">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-tw-red">
        <div className="container-page py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase text-white/80">Ready to get expert help?</p>
            <h3 className="text-2xl font-black text-white">
              Book a consultation today and take the first step towards a solution.
            </h3>
          </div>
          <ButtonLink href="/book" variant="white" size="lg" arrow>
            Book Consultation
          </ButtonLink>
        </div>
      </section>

      <section className="bg-tw-black">
        <div className="container-page py-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.id} className="text-center">
              <p className="text-2xl font-black text-white">{s.value}</p>
              <p className="text-xs text-white/50">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
