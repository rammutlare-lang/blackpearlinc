import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HeroBackground } from "@/components/HeroBackground";

const problems = [
  ["Unfair Dismissal", "unfair-dismissal-ccma"],
  ["Disciplinary Hearings", "disciplinary-hearings"],
  ["Workplace Grievances", "grievances"],
  ["Harassment & Unfair Labour Practices", "harassment-unfair-practices"],
  ["Salary & Leave Disputes", "salary-leave-disputes"],
  ["Retrenchment Advice", "retrenchment-advice"],
  ["Employment Contracts", "employment-contracts"],
  ["Resignation Advice", "resignation-advice"],
];

export default function EmployeesPage() {
  return (
    <div>
      <section className="bg-tw-black relative overflow-hidden">
        <HeroBackground src="/images/hero-home.jpg" />
        <div className="container-page py-16 relative z-10">
          <Breadcrumbs dark items={[{ label: "Home", href: "/" }, { label: "Employees" }]} />
          <p className="eyebrow">For Employees</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-black text-white max-w-2xl">
            Having a <span className="text-tw-red">Workplace Problem?</span>
          </h1>
          <p className="mt-4 text-white/60 max-w-xl">
            Tell us what happened and we&apos;ll connect you with a verified
            professional who can help — confidentially, and on your terms.
          </p>
          <ButtonLink href="/book" variant="red" size="lg" arrow className="mt-6">
            Get Help Now
          </ButtonLink>
        </div>
      </section>

      <section className="container-page py-16">
        <p className="eyebrow text-center">Workplace Problems</p>
        <h2 className="mt-2 text-center text-2xl md:text-3xl font-black uppercase text-tw-ink">
          What Can We Help You With?
        </h2>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map(([title, slug]) => (
            <div key={title} className="rounded-2xl border border-tw-border bg-white p-6">
              <p className="font-bold text-tw-ink">{title}</p>
              <ButtonLink href={`/book?service=${slug}`} variant="outline-red" size="sm" className="mt-4">
                Get Help
              </ButtonLink>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-tw-black">
        <div className="container-page py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white font-bold">Not sure where your issue fits?</p>
          <ButtonLink href="/book" variant="red" size="md" arrow>
            Tell Us What Happened
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
