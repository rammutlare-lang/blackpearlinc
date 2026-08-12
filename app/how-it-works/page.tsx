import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HeroBackground } from "@/components/HeroBackground";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "See exactly how Black Pearl works: tell us what happened, get matched with a verified professional, book, pay securely and get support.",
};

const steps = [
  ["01", "Tell Us What Happened", "Answer a few questions about your workplace issue."],
  ["02", "We Assess Your Needs", "Black Pearl identifies the type of professional you need."],
  ["03", "Meet Your Match", "Choose from suitable verified professionals."],
  ["04", "Book & Pay", "Select a consultation and available time."],
  ["05", "Get Your Advice", "Meet online or in person."],
  ["06", "Decide Your Next Step", "Receive practical recommendations and further options if needed."],
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

export default function HowItWorksPage() {
  return (
    <div>
      <section className="bg-tw-black relative overflow-hidden">
        <HeroBackground src="/images/hero-how-it-works.jpg" />
        <div className="container-page py-16 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-center relative z-10">
          <div>
            <Breadcrumbs dark items={[{ label: "Home", href: "/" }, { label: "How It Works" }]} />
            <p className="eyebrow">How It Works</p>
            <h1 className="mt-2 text-4xl md:text-5xl font-black text-white">
              Simple Steps. <br /> Expert <span className="text-tw-red">Solutions.</span>
            </h1>
            <p className="mt-4 text-white/60 max-w-lg">
              Tell us what happened. We&apos;ll connect you with the right professional
              and help you decide your next step.
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2 text-sm text-white/80">
            {whyItWorks.map((w) => (
              <li key={w} className="flex items-center gap-2">
                <span className="text-tw-red">✓</span> {w}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 rounded-2xl border border-tw-border bg-white p-8">
          <p className="eyebrow">What Black Pearl Does NOT Do</p>
          <p className="mt-3 text-sm text-tw-muted max-w-2xl">
            Black Pearl is a platform connecting clients with independent professionals.
            Black Pearl does not replace a professional&apos;s independent judgment, and
            using the platform does not by itself create an attorney-client
            relationship. Each professional is responsible for the advice they give —
            see our{" "}
            <a href="/professional-disclaimer" className="text-tw-red font-semibold">
              Professional Disclaimer
            </a>{" "}
            for full detail.
          </p>
        </div>
      </section>

      <section className="bg-tw-bg border-t border-tw-border">
        <div className="container-page py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
    </div>
  );
}
