import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HeroBackground } from "@/components/HeroBackground";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent pricing for employees, employers and professionals — consultation fees from R295, business plans from R2,495/month and professional membership from free.",
};

// Pricing is admin-editable via /admin/services, so this page must not be
// statically prerendered at build time — it needs to reflect current data.
export const dynamic = "force-dynamic";

const paths = [
  {
    emoji: "👤",
    title: "Employees",
    price: "From R295",
    desc: "Get professional help with workplace problems, disciplinary matters, dismissals, grievances, contracts and CCMA preparation.",
    href: "/employees",
    cta: "View Employee Pricing",
  },
  {
    emoji: "🏢",
    title: "Employers",
    price: "From R2,495/month",
    desc: "Flexible HR and employee-relations support for SMEs and growing businesses.",
    href: "/employers",
    cta: "View Employer Plans",
  },
  {
    emoji: "⚖️",
    title: "Professional Services",
    price: "From R595",
    desc: "Connect with verified HR, labour-relations, mediation and legal professionals.",
    href: "/professionals",
    cta: "Find a Professional",
  },
  {
    emoji: "👨‍💼",
    title: "Professional Membership",
    price: "Free – R1,999/month",
    desc: "Grow your practice, receive clients and build your professional presence.",
    href: "/join-as-professional",
    cta: "Join Black Pearl",
  },
];

const comparison = [
  { row: "Entry", employee: "R295", employer: "R2,495/mo", professional: "Free" },
  { row: "Standard", employee: "R795", employer: "R5,995/mo", professional: "R499/mo" },
  { row: "Premium", employee: "R1,995+", employer: "R9,995/mo", professional: "R999/mo" },
  { row: "Enterprise", employee: "—", employer: "R15,000+", professional: "R1,999/mo" },
];

export default async function PricingPage() {
  const services = await prisma.service.findMany({ where: { active: true }, orderBy: { order: "asc" } });
  const employeeServices = services.filter((s) => s.audience === "EMPLOYEE" || s.audience === "BOTH");

  return (
    <div>
      <section className="bg-tw-black relative overflow-hidden">
        <HeroBackground src="/images/hero-how-it-works.jpg" />
        <div className="container-page py-16 relative z-10">
          <Breadcrumbs dark items={[{ label: "Home", href: "/" }, { label: "Pricing" }]} />
          <p className="eyebrow">Transparent Pricing</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-black text-white max-w-2xl">
            Professional Workplace Support <span className="text-tw-red">Without the Traditional Price Tag</span>
          </h1>
          <p className="mt-4 text-white/60 max-w-xl">
            Get access to verified HR, labour-relations, mediation and legal
            professionals — when you need them. Transparent prices, no hidden fees.
            Choose the level of support that fits your situation.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <ButtonLink href="/employees" variant="red" size="md">
              I&apos;m an Employee
            </ButtonLink>
            <ButtonLink href="/employers" variant="outline-white" size="md">
              I&apos;m an Employer
            </ButtonLink>
            <ButtonLink href="/join-as-professional" variant="outline-white" size="md">
              I&apos;m a Professional
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <p className="eyebrow text-center">Choose Your Path</p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {paths.map((p) => (
            <div key={p.title} className="rounded-2xl border border-tw-border bg-white p-6 text-center flex flex-col">
              <span className="text-3xl">{p.emoji}</span>
              <p className="mt-3 font-black uppercase text-tw-ink">{p.title}</p>
              <p className="mt-1 text-lg font-black text-tw-red">{p.price}</p>
              <p className="mt-2 text-sm text-tw-muted flex-1">{p.desc}</p>
              <ButtonLink href={p.href} variant="outline-red" size="sm" className="mt-4">
                {p.cta}
              </ButtonLink>
            </div>
          ))}
        </div>

        <p className="mt-14 eyebrow text-center">Simple Price Comparison</p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-tw-border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-tw-bg text-left text-xs uppercase text-tw-muted">
              <tr>
                <th className="p-4"></th>
                <th className="p-4">Employee</th>
                <th className="p-4">Employer</th>
                <th className="p-4">Professional</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.row} className="border-t border-tw-border">
                  <td className="p-4 font-semibold text-tw-ink">{row.row}</td>
                  <td className="p-4 text-tw-muted">{row.employee}</td>
                  <td className="p-4 text-tw-muted">{row.employer}</td>
                  <td className="p-4 text-tw-muted">{row.professional}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-tw-bg border-y border-tw-border">
        <div className="container-page py-16">
          <p className="eyebrow text-center">Employee Consultations & Case Support</p>
          <h2 className="mt-2 text-center text-2xl md:text-3xl font-black uppercase text-tw-ink">
            Book a Specific Service
          </h2>

          <div className="mt-10 overflow-x-auto rounded-2xl border border-tw-border bg-white">
            <table className="w-full text-sm">
              <thead className="bg-tw-bg text-left text-xs uppercase text-tw-muted">
                <tr>
                  <th className="p-4">Service</th>
                  <th className="p-4">Typical Duration</th>
                  <th className="p-4">Price</th>
                  <th className="p-4" />
                </tr>
              </thead>
              <tbody>
                {employeeServices.map((s) => (
                  <tr key={s.id} className="border-t border-tw-border">
                    <td className="p-4 font-semibold text-tw-ink">{s.name}</td>
                    <td className="p-4 text-tw-muted">{s.defaultDurationMins} min</td>
                    <td className="p-4 font-bold text-tw-red">R{(s.defaultPriceCents / 100).toFixed(0)}</td>
                    <td className="p-4 text-right">
                      <ButtonLink href={`/book?service=${s.slug}`} variant="outline-red" size="sm">
                        Book
                      </ButtonLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-tw-muted">
            Prices vary slightly by professional and are always confirmed before you pay.
            See{" "}
            <a href="/employers" className="text-tw-red font-semibold">
              Employer Plans & Project Pricing
            </a>{" "}
            for business services.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <p className="eyebrow text-center">Price Transparency</p>
        <h2 className="mt-2 text-center text-2xl md:text-3xl font-black uppercase text-tw-ink">
          Every Booking Shows
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-center">
          <span className="rounded-xl border border-tw-border bg-white px-6 py-4 font-bold text-tw-ink">
            Professional Fee
          </span>
          <span className="text-tw-red text-xl">+</span>
          <span className="rounded-xl border border-tw-border bg-white px-6 py-4 font-bold text-tw-ink">
            Black Pearl Platform Fee
          </span>
          <span className="text-tw-red text-xl">=</span>
          <span className="rounded-xl bg-tw-black text-white px-6 py-4 font-bold">Total Price</span>
        </div>
        <p className="mt-6 text-center text-sm text-tw-muted max-w-2xl mx-auto">
          No surprises. You always see the total price before you pay — professionals
          can see their exact payout in their dashboard.
        </p>

        <div className="mt-10 rounded-2xl border border-tw-border bg-white p-6 max-w-2xl mx-auto text-sm text-tw-muted leading-relaxed">
          <p className="font-bold text-tw-ink">A note on legal representation</p>
          <p className="mt-2">
            Where a matter requires formal representation (for example, at the CCMA),
            fees for legal practitioners are determined by the appointed legal
            practitioner and are subject to applicable professional and regulatory
            requirements. Black Pearl may charge separate platform or service fees
            where legally permissible — see our{" "}
            <a href="/professional-disclaimer" className="text-tw-red font-semibold">
              Professional Disclaimer
            </a>
            .
          </p>
        </div>
      </section>

      <section className="bg-tw-black">
        <div className="container-page py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white font-bold">You approve the service before payment. No surprise fees.</p>
          <ButtonLink href="/book" variant="red" size="md" arrow>
            Book Consultation
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
