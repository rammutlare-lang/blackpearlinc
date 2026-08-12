import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HeroBackground } from "@/components/HeroBackground";
import { prisma } from "@/lib/prisma";

// Plans and project pricing are admin-editable, so this must not be
// statically prerendered at build time.
export const dynamic = "force-dynamic";

const plans = [
  {
    name: "Starter",
    tagline: "For small businesses",
    price: "R2,495",
    period: "/month",
    features: ["1 advisory consultation / month", "Email & phone support", "Access to HR templates", "2-business-day response"],
  },
  {
    name: "Growth",
    tagline: "For growing businesses",
    price: "R5,995",
    period: "/month",
    features: ["4 consultations / month", "Priority support", "Disciplinary & grievance support", "1-business-day response"],
    highlight: true,
  },
  {
    name: "Business",
    tagline: "For established SMEs",
    price: "R9,995",
    period: "/month",
    features: ["8 consultations / month", "Dedicated professional", "Retrenchment & investigation support", "Quarterly HR review"],
  },
  {
    name: "Enterprise",
    tagline: "For larger organisations",
    price: "From R15,000",
    period: "/month",
    features: ["Dedicated professional & SLA", "Unlimited consultations", "On-site support where appropriate", "Custom reporting"],
  },
];

export default async function EmployersPage() {
  const projectServices = await prisma.service.findMany({
    where: { active: true, audience: "EMPLOYER" },
    orderBy: { order: "asc" },
  });

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

      <section className="bg-tw-bg border-y border-tw-border">
        <div className="container-page py-16">
          <p className="eyebrow text-center">Plans</p>
          <h2 className="mt-2 text-center text-2xl md:text-3xl font-black uppercase text-tw-ink">
            Choose the Level of Support You Need
          </h2>
          <p className="mt-2 text-center text-sm text-tw-muted max-w-xl mx-auto">
            Indicative pricing — final plan pricing is confirmed with your account team.
          </p>

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

      <section className="container-page py-16">
        <p className="eyebrow text-center">Project Pricing</p>
        <h2 className="mt-2 text-center text-2xl md:text-3xl font-black uppercase text-tw-ink">
          Or Pay for What You Need, When You Need It
        </h2>

        <div className="mt-10 overflow-x-auto rounded-2xl border border-tw-border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-tw-bg text-left text-xs uppercase text-tw-muted">
              <tr>
                <th className="p-4">Service</th>
                <th className="p-4">Price</th>
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
          Items marked &quot;from&quot; in their description are quoted based on scope —
          your final price is confirmed before you pay.
        </p>
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
