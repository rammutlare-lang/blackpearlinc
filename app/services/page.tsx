import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HeroBackground } from "@/components/HeroBackground";
import { prisma } from "@/lib/prisma";

// Services are admin-editable via /admin/services, so this page must not be
// statically prerendered at build time — it needs to reflect current data.
export const dynamic = "force-dynamic";

const flow = ["Problem", "Assessment", "Professional", "Consultation", "Action Plan"];

const whyChoose = [
  "Qualified & vetted professionals",
  "Practical, solution-focused advice",
  "Transparent pricing",
  "Secure payments",
  "Confidential & POPIA compliant",
  "Fast, convenient & reliable",
];

function ServiceCard({ s }: { s: { id: string; name: string; description: string; defaultPriceCents: number; slug: string } }) {
  return (
    <div className="rounded-2xl border border-tw-border bg-white p-6">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-tw-red/10 text-tw-red font-black">
        {s.name.charAt(0)}
      </span>
      <p className="mt-4 font-black text-tw-ink">{s.name}</p>
      <p className="mt-1 text-sm text-tw-muted">{s.description}</p>
      <p className="mt-3 text-sm font-bold text-tw-red">From R{(s.defaultPriceCents / 100).toFixed(0)}</p>
      <ButtonLink href={`/book?service=${s.slug}`} variant="outline-red" size="sm" className="mt-4">
        Book Consultation
      </ButtonLink>
    </div>
  );
}

export default async function ServicesPage() {
  const allServices = await prisma.service.findMany({ where: { active: true }, orderBy: { order: "asc" } });
  const employeeServices = allServices.filter((s) => s.audience === "EMPLOYEE" || s.audience === "BOTH");
  const employerServices = allServices.filter((s) => s.audience === "EMPLOYER" || s.audience === "BOTH");

  return (
    <div>
      <section className="bg-tw-black relative overflow-hidden">
        <HeroBackground src="/images/hero-services.jpg" />
        <div className="container-page py-16 relative z-10">
          <Breadcrumbs dark items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
          <h1 className="mt-4 text-4xl md:text-5xl font-black text-white">
            Expert <span className="text-tw-red">Employee Relations Solutions</span>
          </h1>
          <p className="mt-4 text-white/60 max-w-2xl">
            Whether you&apos;re dealing with a workplace problem as an employee or need
            employee-relations support as an employer, we connect you with the right
            verified professional.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <h2 className="text-2xl md:text-3xl font-black uppercase text-tw-ink">
          For <span className="text-tw-red">Employees</span>
        </h2>
        <p className="mt-1 text-sm text-tw-muted">Workplace Problems</p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {employeeServices.map((s) => (
            <ServiceCard key={s.id} s={s} />
          ))}
        </div>

        <h2 className="mt-16 text-2xl md:text-3xl font-black uppercase text-tw-ink">
          For <span className="text-tw-red">Employers</span>
        </h2>
        <p className="mt-1 text-sm text-tw-muted">Workplace Solutions</p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {employerServices.map((s) => (
            <ServiceCard key={s.id} s={s} />
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-tw-black p-8">
          <p className="eyebrow text-center">What Happens Next?</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {flow.map((f, i) => (
              <div key={f} className="flex items-center gap-3">
                <span className="text-sm font-bold text-white bg-white/10 rounded-full px-4 py-2">{f}</span>
                {i < flow.length - 1 && <span className="text-tw-red">→</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-2xl bg-tw-bg border border-tw-border p-8">
          <p className="eyebrow">Why Choose Us</p>
          <ul className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2 text-sm text-tw-muted">
            {whyChoose.map((w) => (
              <li key={w} className="flex items-center gap-2">
                <span className="text-tw-red">✓</span> {w}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
