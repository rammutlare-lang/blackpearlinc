import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { prisma } from "@/lib/prisma";

const values = ["Integrity", "Confidentiality", "Empowerment", "Excellence", "Fairness"];

const whyChoose = [
  ["1200+", "Consultations Completed"],
  ["35+", "Vetted Labour Law Professionals"],
  ["4.8/5", "Average Client Satisfaction"],
  ["100%", "Confidential & Secure"],
  ["24–48hrs", "Professional Response Time"],
];

export default async function AboutPage() {
  const team = await prisma.teamMember.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <section className="bg-tw-black diagonal-accent">
        <div className="container-page py-16">
          <Breadcrumbs dark items={[{ label: "Home", href: "/" }, { label: "About Us" }]} />
          <p className="eyebrow">About Us</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-black text-white max-w-2xl">
            Empowering People. <br />
            <span className="text-tw-red">Building Fair Workplaces.</span>
          </h1>
          <p className="mt-4 text-white/60 max-w-2xl">
            Black Pearl Inc. is a trusted employee relations company that connects
            individuals and employers with qualified professionals for practical,
            reliable and affordable advice.
          </p>
          <p className="mt-2 text-white/60 max-w-2xl">
            We simplify labour law, protect rights and promote fair workplace
            relationships across South Africa.
          </p>
          <ButtonLink href="/services" variant="red" size="lg" arrow className="mt-6">
            Our Services
          </ButtonLink>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-tw-border bg-white p-6">
            <p className="eyebrow">Our Mission</p>
            <p className="mt-2 text-sm text-tw-muted">
              To make expert labour law advice accessible to everyone and help build
              fair, productive and compliant workplaces.
            </p>
          </div>
          <div className="rounded-2xl border border-tw-border bg-white p-6">
            <p className="eyebrow">Our Vision</p>
            <p className="mt-2 text-sm text-tw-muted">
              A South Africa where every workplace is fair, every right is protected
              and every dispute is resolved with dignity.
            </p>
          </div>
          <div className="rounded-2xl border border-tw-border bg-white p-6">
            <p className="eyebrow">Our Values</p>
            <ul className="mt-2 space-y-1 text-sm text-tw-muted">
              {values.map((v) => (
                <li key={v} className="flex items-center gap-2">
                  <span className="text-tw-red">✓</span> {v}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-2xl bg-tw-black p-8">
          <p className="text-center eyebrow">Why Choose Black Pearl Inc.?</p>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-6">
            {whyChoose.map(([value, label]) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-black text-white">{value}</p>
                <p className="text-xs text-white/50">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="eyebrow">Our Story</p>
            <h3 className="mt-2 text-xl font-black text-tw-ink">
              Bridging the gap between complex labour law and the people who need
              clarity most.
            </h3>
            <p className="mt-3 text-sm text-tw-muted">
              We saw how individuals and small businesses struggle to access reliable
              advice, leading to unfair outcomes, costly disputes and damaged
              relationships.
            </p>
            <p className="mt-3 text-sm text-tw-muted">
              Our platform was created to change that — by combining expert
              knowledge, technology and a human touch to deliver solutions that are
              practical, affordable and effective.
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
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
