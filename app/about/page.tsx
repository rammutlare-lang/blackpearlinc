import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HeroBackground } from "@/components/HeroBackground";
import { prisma } from "@/lib/prisma";

// Team members are admin-editable via /admin/team, so this page must not be
// statically prerendered at build time — it needs to reflect current data.
export const dynamic = "force-dynamic";

const audiences = [
  ["Employees", "People looking for clarity, guidance and professional support when dealing with workplace matters."],
  ["Employers", "Businesses seeking flexible access to HR, employee-relations and workplace expertise."],
  ["Professionals", "Appropriately qualified professionals who provide independent expertise to clients through the Black Pearl platform."],
];

const missionTraits = ["Accessible", "Transparent", "Professional", "Human", "Technology-enabled"];

const values = [
  ["01", "Confidentiality", "Workplace matters can be deeply personal and sensitive. We treat information with care and promote responsible handling of client information throughout the Black Pearl experience."],
  ["02", "Integrity", "We believe trust is earned through honesty, transparency and responsible conduct."],
  ["03", "Fairness", "We believe employees and employers should have access to clear information and appropriate professional support."],
  ["04", "Professionalism", "We are committed to creating an environment where expertise, qualifications, experience and professional standards matter."],
  ["05", "Accessibility", "Professional workplace expertise should not feel impossible to find or understand. Technology allows us to make access simpler."],
  ["06", "Respect", "Every workplace matter involves people. We believe every client should be treated with dignity, regardless of their position, circumstances or dispute."],
  ["07", "Accountability", "We believe professionals, clients and the platform itself should operate with clear responsibilities and transparent expectations."],
];

const verificationConsiders = [
  ["Identity", "Confirming the professional's identity."],
  ["Qualifications", "Reviewing relevant qualifications and credentials."],
  ["Experience", "Considering relevant professional experience."],
  ["Professional Registration", "Verifying applicable registration requirements where relevant."],
  ["Professional Standing", "Applying appropriate verification processes where reasonably available."],
  ["Platform Conduct", "Monitoring client feedback, complaints and professional conduct on the platform."],
];

const approach = [
  ["Discover", "Find appropriate workplace expertise."],
  ["Understand", "Gain clarity about your situation and available options."],
  ["Connect", "Engage with an appropriate professional."],
  ["Act", "Move forward with informed professional support."],
  ["Resolve", "Work towards a practical and appropriate outcome."],
];

const whoWeServe = [
  ["👤", "Employees", "For people who need professional assistance navigating workplace challenges."],
  ["🏢", "Employers", "For organisations that need flexible access to workplace and employee-relations expertise."],
  ["⚖️", "Professionals", "For appropriately qualified professionals who want to make their expertise more accessible to clients."],
];

const commitments = [
  "Clear information",
  "Transparent expectations",
  "Appropriate professional connections",
  "Responsible technology",
  "Respect for clients",
  "Professional independence",
];

export default async function AboutPage() {
  const team = await prisma.teamMember.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <section className="bg-tw-black relative overflow-hidden">
        <HeroBackground src="/images/hero-about.jpg" />
        <div className="container-page py-16 relative z-10">
          <Breadcrumbs dark items={[{ label: "Home", href: "/" }, { label: "About Us" }]} />
          <p className="eyebrow">About Black Pearl</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-black text-white max-w-2xl">
            Empowering People. <br />
            <span className="text-tw-red">Building Fair Workplaces.</span>
          </h1>
          <p className="mt-4 text-lg font-bold text-white max-w-2xl">
            Professional workplace expertise, made accessible.
          </p>
          <p className="mt-3 text-white/60 max-w-2xl">
            Black Pearl is a digital employee-relations marketplace connecting
            employees, employers and appropriately qualified workplace professionals
            through a trusted, transparent and technology-enabled platform. We believe
            that when people understand their workplace rights, responsibilities and
            options, better decisions can be made — and better workplaces can be built.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <ButtonLink href="#who-we-are" variant="red" size="lg" arrow>
              Meet Black Pearl
            </ButtonLink>
            <ButtonLink href="/professionals" variant="outline-white" size="lg">
              Find Professional Support
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <p className="eyebrow text-center">Our Purpose</p>
        <h2 className="mt-2 text-center text-2xl md:text-3xl font-black uppercase text-tw-ink max-w-2xl mx-auto">
          Workplace problems shouldn&apos;t be faced alone
        </h2>
        <div className="mt-6 max-w-2xl mx-auto text-sm text-tw-muted leading-relaxed space-y-4">
          <p>
            Workplace issues can be complicated, stressful and difficult to navigate.
            An employee may be facing dismissal, disciplinary action, harassment, a
            grievance, a contract dispute or retrenchment. An employer may need help
            managing conflict, improving employee relations, handling a disciplinary
            process or understanding its workplace obligations.
          </p>
          <p>
            Too often, people struggle to find the right professional, understand what
            support they need or know where to begin.
          </p>
          <p className="font-bold text-tw-ink">Black Pearl exists to bridge that gap.</p>
          <p>
            We bring people closer to appropriate workplace expertise through a
            digital environment designed around accessibility, transparency and
            professional standards.
          </p>
        </div>
      </section>

      <section id="who-we-are" className="bg-tw-bg border-y border-tw-border">
        <div className="container-page py-16">
          <p className="eyebrow text-center">Who We Are</p>
          <h2 className="mt-2 text-center text-2xl md:text-3xl font-black uppercase text-tw-ink">
            More Than a Consultancy. A Workplace Expertise Marketplace.
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-center text-sm text-tw-muted">
            Black Pearl is being built as a new way for people and organisations to
            access workplace expertise. We connect three sides of the workplace
            ecosystem, and provide the digital infrastructure that supports
            discovery, professional matching, booking, communication and access to
            workplace expertise.
          </p>
          <div className="mt-10 grid sm:grid-cols-3 gap-6">
            {audiences.map(([title, desc]) => (
              <div key={title} className="rounded-2xl border border-tw-border bg-white p-6">
                <p className="font-black uppercase text-tw-ink">{title}</p>
                <p className="mt-2 text-sm text-tw-muted">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <p className="eyebrow text-center">Our Story</p>
        <h2 className="mt-2 text-center text-2xl md:text-3xl font-black uppercase text-tw-ink max-w-2xl mx-auto">
          Built to close the gap between workplace problems and professional support
        </h2>
        <div className="mt-6 max-w-2xl mx-auto text-sm text-tw-muted leading-relaxed space-y-4">
          <p className="font-bold text-tw-ink">
            Finding help with a workplace problem should not be harder than the
            problem itself.
          </p>
          <p>
            Employees and small businesses can struggle to identify the right person
            to speak to, understand what type of assistance they require and access
            professional support at a price they can reasonably afford. At the same
            time, many qualified workplace professionals have valuable expertise but
            limited access to a modern platform through which they can connect with
            people and businesses that need their services.
          </p>
          <p>
            Black Pearl brings these two worlds together. We combine professional
            expertise, technology and human connection to create a more accessible
            way of navigating workplace challenges.
          </p>
          <p>
            Our ambition is not simply to provide another website where people search
            for advice. We are building an ecosystem where people can find the right
            expertise, understand their options and move forward with greater
            confidence.
          </p>
        </div>
      </section>

      <section className="bg-tw-black">
        <div className="container-page py-16 grid sm:grid-cols-2 gap-10">
          <div>
            <p className="eyebrow">Our Mission</p>
            <h2 className="mt-2 text-xl font-black text-white">
              Making workplace expertise easier to access.
            </h2>
            <p className="mt-3 text-sm text-white/60">
              Our mission is to connect employees and employers with appropriately
              qualified workplace professionals and practical support through a
              trusted digital marketplace. We aim to make professional assistance:
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {missionTraits.map((t) => (
                <span key={t} className="text-xs font-bold uppercase text-tw-red bg-white/5 border border-tw-red/30 rounded-full px-3 py-1.5">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="eyebrow">Our Vision</p>
            <h2 className="mt-2 text-xl font-black text-white">
              A South Africa where professional workplace support is within reach.
            </h2>
            <p className="mt-3 text-sm text-white/60">
              We envision a future where an employee in a small town, a growing
              business in a regional centre or an established organisation in a major
              city can easily find appropriate workplace expertise when they need it.
            </p>
            <p className="mt-3 text-sm text-white/60">
              Our long-term vision is to build South Africa&apos;s most trusted
              digital marketplace for workplace expertise, connecting people and
              organisations with a growing network of appropriately qualified
              professionals across the country.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <p className="eyebrow text-center">Our Values</p>
        <h2 className="mt-2 text-center text-2xl md:text-3xl font-black uppercase text-tw-ink">
          What We Stand For
        </h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map(([n, title, desc]) => (
            <div key={n} className="rounded-2xl border border-tw-border bg-white p-6">
              <span className="text-xs font-black text-tw-red">{n}</span>
              <p className="mt-1 font-black uppercase text-tw-ink">{title}</p>
              <p className="mt-2 text-sm text-tw-muted">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-tw-bg border-y border-tw-border">
        <div className="container-page py-16">
          <p className="eyebrow text-center">Our Professional Standard</p>
          <h2 className="mt-2 text-center text-2xl md:text-3xl font-black uppercase text-tw-ink max-w-2xl mx-auto">
            Trust Starts With Who You Connect With
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-center text-sm text-tw-muted">
            Black Pearl is being designed around a network of workplace professionals
            whose expertise is relevant to the services they provide. Where
            applicable, professional verification may consider:
          </p>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {verificationConsiders.map(([title, desc]) => (
              <div key={title} className="rounded-2xl border border-tw-border bg-white p-6">
                <p className="font-bold text-tw-ink">{title}</p>
                <p className="mt-1 text-sm text-tw-muted">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-tw-black p-8 max-w-2xl mx-auto text-center">
            <span className="inline-block text-xs font-bold uppercase text-tw-red bg-white/5 border border-tw-red/40 rounded-full px-3 py-1">
              ✓ Black Pearl Verified
            </span>
            <p className="mt-3 text-sm text-white/70">
              A Black Pearl verification status indicates that the professional has
              undergone Black Pearl&apos;s stated verification process. Verification
              does not guarantee a particular outcome, quality of advice or
              professional performance. Professionals remain responsible for their
              independent professional judgement and services.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <p className="eyebrow text-center">Our Approach</p>
        <h2 className="mt-2 text-center text-2xl md:text-3xl font-black uppercase text-tw-ink max-w-2xl mx-auto">
          Technology Connects People. People Solve Workplace Problems.
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-center text-sm text-tw-muted">
          We believe technology should simplify access to expertise — not replace the
          human element. Black Pearl uses technology to make it easier to discover
          and connect with professionals while preserving the human interaction that
          workplace matters require.
        </p>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {approach.map(([title, desc], i) => (
            <div key={title} className="rounded-2xl border border-tw-border bg-white p-5 text-center">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-tw-red text-white text-xs font-black">
                {i + 1}
              </span>
              <p className="mt-3 font-black uppercase text-tw-ink text-sm">{title}</p>
              <p className="mt-1 text-xs text-tw-muted">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-tw-bg border-y border-tw-border">
        <div className="container-page py-16">
          <p className="eyebrow text-center">Who We Serve</p>
          <h2 className="mt-2 text-center text-2xl md:text-3xl font-black uppercase text-tw-ink">
            One Platform. A Complete Workplace Ecosystem.
          </h2>
          <div className="mt-10 grid sm:grid-cols-3 gap-6">
            {whoWeServe.map(([emoji, title, desc]) => (
              <div key={title} className="rounded-2xl border border-tw-border bg-white p-6 text-center">
                <span className="text-3xl">{emoji}</span>
                <p className="mt-3 font-black uppercase text-tw-ink">{title}</p>
                <p className="mt-1 text-sm text-tw-muted">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 text-center">
        <p className="eyebrow">Built for South Africa</p>
        <h2 className="mt-2 text-2xl md:text-3xl font-black uppercase text-tw-ink">
          Local Understanding. National Ambition.
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-sm text-tw-muted">
          South Africa&apos;s workplaces are diverse. From large corporations to
          small businesses, from metropolitan centres to rural communities, workplace
          challenges can take many forms. Black Pearl is being developed with the
          South African workplace environment at its centre — our ambition is to
          create a nationwide digital network that makes appropriate workplace
          expertise easier to discover and access across all nine provinces.
        </p>
        <p className="mt-6 text-lg font-black uppercase text-tw-ink max-w-xl mx-auto leading-relaxed">
          From Johannesburg to Mahikeng.
          <br />
          Cape Town to Polokwane.
          <br />
          Durban to Mbombela.
          <br />
          <span className="text-tw-red">Every workplace deserves access to appropriate expertise.</span>
        </p>
      </section>

      <section className="bg-tw-black">
        <div className="container-page py-16">
          <p className="eyebrow text-center">Our Commitment</p>
          <h2 className="mt-2 text-center text-2xl md:text-3xl font-black uppercase text-white max-w-2xl mx-auto">
            We Don&apos;t Promise Outcomes. We Promise a Better Way to Find Support.
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-center text-sm text-white/60">
            Workplace disputes do not always have simple answers. No platform can
            guarantee that a dispute will be won, an employee will be reinstated, an
            employer will prevail or a particular legal outcome will occur. What
            Black Pearl can do is create a better way to find appropriate
            professional support. We are committed to building a platform that
            promotes:
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {commitments.map((c) => (
              <span key={c} className="text-sm font-bold text-white bg-white/5 border border-white/10 rounded-full px-4 py-2">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {team.length > 0 && (
        <section className="container-page py-16">
          <p className="eyebrow text-center">Leadership</p>
          <h2 className="mt-2 text-center text-2xl md:text-3xl font-black uppercase text-tw-ink">
            The People Behind Black Pearl
          </h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m) => (
              <div key={m.id} className="rounded-2xl border border-tw-border bg-white p-6 text-center">
                <div className="mx-auto h-20 w-20 rounded-full bg-tw-bg border border-tw-border" />
                <h3 className="mt-3 font-black text-tw-ink text-sm">{m.name}</h3>
                <p className="text-xs text-tw-red font-bold uppercase">{m.role}</p>
                <p className="mt-2 text-xs text-tw-muted">{m.bio}</p>
                {m.expertise && (
                  <p className="mt-2 text-[11px] text-tw-muted">
                    <span className="font-bold text-tw-ink">Expertise:</span> {m.expertise.split(",").join(" | ")}
                  </p>
                )}
                {m.linkedIn && (
                  <a href={m.linkedIn} className="mt-3 inline-block text-xs font-bold text-tw-red">
                    LinkedIn
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="bg-tw-black relative overflow-hidden">
        <HeroBackground src="/images/hero-about.jpg" />
        <div className="container-page py-16 relative z-10 text-center">
          <p className="eyebrow">Black Pearl</p>
          <h2 className="mt-2 text-2xl md:text-3xl font-black uppercase text-white">
            Empowering People. Building Fair Workplaces.
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-sm text-white/70">
            We believe access to workplace expertise should be simpler, more
            transparent and more human. We connect people with expertise. We make
            workplace support easier to access. We help people move forward with
            confidence.
          </p>
          <p className="mt-4 text-sm font-bold text-white">
            Professional workplace expertise, made accessible.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <ButtonLink href="/book" variant="red" size="lg" arrow>
              Find Professional Support
            </ButtonLink>
            <ButtonLink href="/join-as-professional" variant="outline-white" size="lg">
              Join Black Pearl
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
