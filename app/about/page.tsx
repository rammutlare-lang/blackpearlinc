import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HeroBackground } from "@/components/HeroBackground";
import { prisma } from "@/lib/prisma";

// Team members are admin-editable via /admin/team, so this page must not be
// statically prerendered at build time — it needs to reflect current data.
export const dynamic = "force-dynamic";

const principles = ["Confidentiality", "Integrity", "Fairness", "Professionalism", "Accessibility"];

export default async function AboutPage() {
  const team = await prisma.teamMember.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <section className="bg-tw-black relative overflow-hidden">
        <HeroBackground src="/images/hero-about.jpg" />
        <div className="container-page py-16 relative z-10">
          <Breadcrumbs dark items={[{ label: "Home", href: "/" }, { label: "About Us" }]} />
          <p className="eyebrow">About Us</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-black text-white max-w-2xl">
            Empowering People. <br />
            <span className="text-tw-red">Building Fair Workplaces.</span>
          </h1>
          <p className="mt-4 text-white/60 max-w-2xl">
            Workplace disputes are often complicated, stressful and expensive. Black
            Pearl was created to make professional employee-relations support easier
            to access, easier to understand and more transparent.
          </p>
          <ButtonLink href="/services" variant="red" size="lg" arrow className="mt-6">
            Our Services
          </ButtonLink>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-tw-border bg-white p-6">
            <p className="eyebrow">Our Mission</p>
            <p className="mt-2 text-sm text-tw-muted">
              To connect South African employees and employers with trusted workplace
              professionals and practical solutions.
            </p>
          </div>
          <div className="rounded-2xl border border-tw-border bg-white p-6">
            <p className="eyebrow">Our Vision</p>
            <p className="mt-2 text-sm text-tw-muted">
              To become South Africa&apos;s leading digital employee-relations
              marketplace.
            </p>
          </div>
          <div className="rounded-2xl border border-tw-border bg-white p-6">
            <p className="eyebrow">Our Principles</p>
            <ul className="mt-2 space-y-1 text-sm text-tw-muted">
              {principles.map((v) => (
                <li key={v} className="flex items-center gap-2">
                  <span className="text-tw-red">✓</span> {v}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="eyebrow">Our Story</p>
            <h3 className="mt-2 text-xl font-black text-tw-ink">
              Bridging the gap between complex workplace problems and the people who
              need clarity most.
            </h3>
            <p className="mt-3 text-sm text-tw-muted">
              We saw how individuals and small businesses struggle to access reliable
              advice, leading to unfair outcomes, costly disputes and damaged
              relationships.
            </p>
            <p className="mt-3 text-sm text-tw-muted">
              Black Pearl was created to change that — by combining expert knowledge,
              technology and a human touch to deliver solutions that are practical,
              affordable and effective for employees and employers alike.
            </p>
          </div>
          <div className="rounded-2xl bg-tw-bg border border-tw-border p-8 text-center">
            <p className="text-2xl font-black text-tw-red uppercase">
              Fairness. Respect. <br /> Justice. Rights.
            </p>
          </div>
        </div>

        <h3 className="mt-16 text-center text-2xl font-black uppercase text-tw-ink">
          Leadership Team
        </h3>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map((m) => (
            <div key={m.id} className="rounded-xl border border-tw-border bg-white p-5 text-center">
              <div className="mx-auto h-20 w-20 rounded-full bg-tw-bg border border-tw-border" />
              <h4 className="mt-3 font-bold text-tw-ink text-sm">{m.name}</h4>
              <p className="text-xs text-tw-red">{m.role}</p>
              <p className="mt-2 text-xs text-tw-muted">{m.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-tw-black">
        <div className="container-page py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white font-bold">We&apos;re here to help you.</p>
          <ButtonLink href="/book" variant="red" size="md" arrow>
            Book a Consultation
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
