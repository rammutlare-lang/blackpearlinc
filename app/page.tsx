import { ButtonLink } from "@/components/ui/Button";
import { HeroBackground } from "@/components/HeroBackground";

const needHelpTags = [
  ["Unfair Dismissal", "unfair-dismissal-ccma"],
  ["Disciplinary", "disciplinary-hearings"],
  ["Contract", "employment-contracts"],
  ["CCMA", "unfair-dismissal-ccma"],
  ["Grievance", "grievances"],
  ["Salary", "salary-leave-disputes"],
  ["Retrenchment", "retrenchment-advice"],
  ["Mediation", "workplace-mediation"],
  ["HR Compliance", "workplace-policies-compliance"],
];

const builtFor = ["Employees", "Employers", "HR Professionals", "Labour Practitioners"];

const processSteps = [
  ["01", "Tell Us Your Issue", "Answer a few questions about what happened."],
  ["02", "We Match You", "We connect you with the right verified professional."],
  ["03", "Book & Pay", "Choose a time that works and pay securely online."],
  ["04", "Get Advice", "Meet with your professional and get a clear action plan."],
];

const whyChoose = [
  "Verified, vetted professionals",
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

export default function Home() {
  return (
    <div>
      <section className="bg-tw-black relative overflow-hidden">
        <HeroBackground src="/images/hero-home.jpg" />
        <div className="container-page py-16 md:py-20 relative z-10">
          <p className="eyebrow">Black Pearl Inc.</p>
          <h1 className="mt-4 text-4xl md:text-6xl font-black uppercase leading-[0.95] tracking-tight text-white max-w-3xl">
            Employee Relations & <span className="text-tw-red">Workplace Solutions</span>
          </h1>
          <p className="mt-6 text-xl font-bold text-white max-w-2xl">
            Tell us what happened. We&apos;ll connect you with the right professional.
          </p>
          <p className="mt-3 text-white/60 max-w-2xl">
            Whether you&apos;re an employee dealing with a workplace problem or an employer
            needing employee-relations support, Black Pearl helps you find the right
            expertise.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href="/employees" variant="red" size="lg" arrow>
              I&apos;m an Employee
            </ButtonLink>
            <ButtonLink href="/employers" variant="outline-white" size="lg" arrow>
              I&apos;m an Employer
            </ButtonLink>
          </div>

          <div className="mt-12 border-t border-white/10 pt-8">
            <p className="text-sm font-bold uppercase tracking-wide text-white/60">
              What do you need help with?
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {needHelpTags.map(([label, slug]) => (
                <ButtonLink key={label} href={`/book?service=${slug}`} variant="outline-white" size="sm">
                  {label}
                </ButtonLink>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-tw-bg border-t border-tw-border">
        <div className="container-page py-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          <p className="text-xs font-bold uppercase tracking-wide text-tw-muted">
            Built for South African Workplaces
          </p>
          {builtFor.map((b) => (
            <span key={b} className="text-sm font-bold text-tw-ink">
              {b}
            </span>
          ))}
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

        <div className="mt-6 text-center">
          <ButtonLink href="/how-it-works" variant="outline-red" size="sm">
            See the Full Process
          </ButtonLink>
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
