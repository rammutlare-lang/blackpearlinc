import { ButtonLink } from "@/components/ui/Button";
import { HeroBackground } from "@/components/HeroBackground";
import { prisma } from "@/lib/prisma";

const heroTrust = [
  ["Vetted", "Professionals"],
  ["Fast & Easy", "Booking"],
  ["Secure", "Payments"],
  ["Confidential &", "Compliant"],
];

const partners = ["SACPCMP", "LHRD", "CCMA", "PSA"];

const processSteps = [
  ["01", "Submit Your Request", "Tell us about your issue in a few simple steps."],
  ["02", "We Match You", "We connect you with a vetted labour law expert."],
  ["03", "Book & Pay", "Choose a time that works and pay securely online."],
  ["04", "Consult & Resolve", "Get practical advice and clear next steps."],
];

const whyChoose = [
  "Specialised labour law expertise",
  "Practical, solution-focused advice",
  "Confidential & secure",
  "Transparent pricing",
  "Fast, convenient & reliable",
];

const trustFooter = [
  ["Expert Guidance", "Get professional advice tailored to your situation."],
  ["100% Confidential", "Your privacy is our top priority."],
  ["Secure Payments", "Safe & encrypted payment options."],
  ["Dedicated Support", "We're here to help every step of the way."],
];

export default async function Home() {
  const stats = await prisma.siteStat.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <section className="bg-tw-black relative overflow-hidden">
        <HeroBackground src="/images/hero-home.jpg" />
        <div className="container-page py-16 md:py-20 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 items-start relative z-10">
          <div>
            <p className="eyebrow">Expert Advice. Fair Solutions.</p>
            <h1 className="mt-4 text-4xl md:text-6xl font-black uppercase leading-[0.95] tracking-tight text-white">
              Professional Labour Law <span className="text-tw-red">Consultations</span>
            </h1>
            <p className="mt-6 text-white/60 max-w-lg">
              Connect with vetted labour law professionals for practical solutions and
              peace of mind.
            </p>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {heroTrust.map(([title, sub]) => (
                <div key={title} className="flex items-center gap-2">
                  <span className="h-9 w-9 shrink-0 rounded-full border border-tw-red flex items-center justify-center text-tw-red">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                      <circle cx="7" cy="7" r="5" />
                    </svg>
                  </span>
                  <span className="text-xs font-bold text-white uppercase leading-tight">
                    {title}
                    <br />
                    <span className="text-white/50 font-medium normal-case">{sub}</span>
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/book" variant="red" size="lg" arrow>
                Book a Consultation
              </ButtonLink>
              <ButtonLink href="/how-it-works" variant="outline-white" size="lg">
                How It Works
              </ButtonLink>
            </div>
          </div>

          <div className="panel-glass rounded-2xl p-6">
            <p className="text-center text-lg font-black text-white">
              Simple. Fast. Confidential.
            </p>
            <div className="mt-6 space-y-5">
              {processSteps.map(([n, title, desc]) => (
                <div key={n} className="flex items-start gap-3">
                  <span className="h-9 w-9 shrink-0 rounded-full bg-tw-red text-white flex items-center justify-center text-xs font-black">
                    {n}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-white">{title}</p>
                    <p className="text-xs text-white/50">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-white/40 border-t border-white/10 pt-4">
              Your information is protected and never shared.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-tw-bg border-t border-tw-border">
        <div className="container-page py-8 grid grid-cols-1 gap-8 md:grid-cols-[auto_1fr_auto] items-center">
          <div>
            <p className="text-xs font-bold uppercase text-tw-muted">Trusted By</p>
            <p className="text-sm font-bold text-tw-ink">Employees & Employers Across SA</p>
          </div>
          <div className="flex flex-wrap gap-8 justify-start md:justify-center text-sm font-bold text-tw-muted">
            {partners.map((p) => (
              <span key={p}>{p}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-8">
            {stats.map((s) => (
              <div key={s.id} className="text-center">
                <p className="text-2xl font-black text-tw-ink">{s.value}</p>
                <p className="text-xs text-tw-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <p className="eyebrow text-center">How It Works</p>
        <h2 className="mt-2 text-center text-3xl md:text-4xl font-black uppercase text-tw-ink">
          Simple Steps. Expert Solutions.
        </h2>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map(([n, title, desc]) => (
            <div key={n} className="rounded-2xl border border-tw-border bg-white p-6">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-tw-red text-white font-black">
                {n}
              </span>
              <p className="mt-4 font-black uppercase text-tw-ink">{title}</p>
              <p className="mt-1 text-sm text-tw-muted">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-tw-black p-8 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <p className="eyebrow">Why Choose Black Pearl Inc.?</p>
            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-white/80">
              {whyChoose.map((w) => (
                <li key={w} className="flex items-center gap-2">
                  <span className="text-tw-red">✓</span> {w}
                </li>
              ))}
            </ul>
          </div>
          <ButtonLink href="/book" variant="red" size="lg" arrow>
            Book Consultation
          </ButtonLink>
        </div>
      </section>

      <section className="bg-tw-black">
        <div className="container-page py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm text-white/70">
          {trustFooter.map(([title, desc]) => (
            <div key={title} className="flex items-center gap-3">
              <span className="h-8 w-8 shrink-0 rounded-full border border-tw-red flex items-center justify-center text-tw-red text-xs font-bold">
                ✓
              </span>
              <div>
                <p className="font-bold text-white text-xs uppercase">{title}</p>
                <p className="text-xs text-white/40">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
