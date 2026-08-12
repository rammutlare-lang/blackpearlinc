import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HeroBackground } from "@/components/HeroBackground";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { prisma } from "@/lib/prisma";
import type { ProfessionalType } from "@/lib/enums";

export const dynamic = "force-dynamic";

const professionTypeCards: { icon: string; label: string; type: ProfessionalType; body: string }[] = [
  {
    icon: "⚖️",
    label: "Labour & Employment Specialists",
    type: "CCMA Practitioner",
    body: "Get professional assistance with employment disputes, dismissals, disciplinary matters, contracts and workplace rights.",
  },
  {
    icon: "👥",
    label: "Employee Relations Practitioners",
    type: "Employee Relations Practitioner",
    body: "Support with workplace conflict, grievances, employee relations, disciplinary processes and workplace solutions.",
  },
  {
    icon: "🏢",
    label: "HR Professionals",
    type: "HR Professional",
    body: "Access practical HR expertise covering policies, compliance, contracts, performance management and workplace practices.",
  },
  {
    icon: "🤝",
    label: "Workplace Mediators",
    type: "Mediator",
    body: "Get assistance with workplace conflict, communication breakdowns, grievances and facilitated dispute resolution.",
  },
  {
    icon: "⚖️",
    label: "Attorneys",
    type: "Attorney",
    body: "Connect with appropriately qualified legal professionals for matters requiring legal expertise and professional legal services.",
  },
  {
    icon: "📋",
    label: "Labour Consultants",
    type: "Labour Consultant",
    body: "Access specialist workplace guidance relating to labour relations, employment practices and workplace disputes.",
  },
];

const issueSearches = [
  { label: "Unfair Dismissal", q: "Unfair Dismissal" },
  { label: "Disciplinary Hearing", q: "Disciplinary" },
  { label: "Workplace Grievance", q: "Grievance" },
  { label: "Workplace Harassment", q: "Harassment" },
  { label: "Retrenchment", q: "Retrenchment" },
  { label: "Employment Contract", q: "Contract" },
  { label: "Salary & Benefits", q: "Benefits" },
  { label: "Workplace Conflict", q: "Conflict" },
  { label: "CCMA Matters", q: "CCMA" },
];

const verificationChecks = [
  { name: "Identity", body: "Confirmation of the professional's identity." },
  { name: "Qualifications", body: "Review of relevant qualifications and credentials." },
  { name: "Experience", body: "Assessment of relevant professional experience." },
  { name: "Professional Registration", body: "Verification of applicable professional registration where required." },
  { name: "Professional Standing", body: "Appropriate checks relating to professional standing where reasonably applicable." },
  { name: "Platform Standards", body: "Ongoing monitoring of client feedback, complaints and professional conduct." },
];

const chooseSteps = [
  { n: "01", label: "Search", body: "Tell us what workplace issue you need help with." },
  { n: "02", label: "Compare", body: "Review professional profiles, expertise, experience, languages, availability and feedback." },
  { n: "03", label: "Choose", body: "Select the professional who best matches your needs." },
  { n: "04", label: "Book", body: "Choose an available consultation time and complete your booking." },
  { n: "05", label: "Connect", body: "Meet with your professional through the available consultation channel." },
  { n: "06", label: "Move Forward", body: "Receive professional guidance and determine your next appropriate steps." },
];

const profileIncludes = [
  "Professional title",
  "Area of expertise",
  "Qualifications",
  "Relevant experience",
  "Professional registration where applicable",
  "Languages",
  "Location",
  "Consultation fees",
  "Availability",
  "Client ratings and number of completed consultations",
  "Professional biography",
  "Services offered",
  "Black Pearl verification status",
];

const compareFilters = [
  { label: "Expertise", body: "Find professionals experienced in your specific workplace issue." },
  { label: "Experience", body: "Compare relevant professional experience." },
  { label: "Location", body: "Find professionals in your area or choose remote consultation where available." },
  { label: "Language", body: "Find a professional who can communicate in your preferred language where available." },
  { label: "Price", body: "Compare consultation prices before booking." },
  { label: "Availability", body: "Find professionals with appointments that fit your schedule." },
  { label: "Ratings", body: "Consider feedback from previous Black Pearl clients." },
];

const languages = [
  "English", "Afrikaans", "isiZulu", "isiXhosa", "Setswana", "Sesotho",
  "Sepedi", "Xitsonga", "siSwati", "Tshivenda", "isiNdebele",
];

const consultationChannels = [
  { icon: "💻", label: "Online Consultation", body: "Connect remotely from wherever you are." },
  { icon: "📞", label: "Telephone Consultation", body: "Speak directly with your professional." },
  { icon: "📍", label: "In-Person Consultation", body: "Meet a professional where in-person services are available." },
];

const ratingFactors = ["Professionalism", "Communication", "Knowledge", "Responsiveness", "Overall experience"];

const professionalKinds = [
  "HR Professionals",
  "Labour Relations Practitioners",
  "Labour Consultants",
  "Workplace Mediators",
  "Employee Relations Specialists",
  "Attorneys",
  "Other Appropriately Qualified Specialists",
];

const joinReasons = [
  { label: "Reach New Clients", body: "Connect with people and organisations actively looking for workplace expertise." },
  { label: "Build Your Professional Profile", body: "Showcase your experience, qualifications, expertise and professional services." },
  { label: "Manage Your Availability", body: "Make it easier for clients to find suitable consultation times." },
  { label: "Build Your Reputation", body: "Develop your professional presence through verified profiles and genuine client feedback." },
  { label: "Focus on Your Expertise", body: "Black Pearl provides the digital marketplace infrastructure while you focus on delivering your professional service." },
];

function minPriceCents(services: { priceCents: number | null; service: { defaultPriceCents: number } }[]) {
  if (services.length === 0) return null;
  return Math.min(...services.map((s) => s.priceCents ?? s.service.defaultPriceCents));
}

export default async function ProfessionalsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; location?: string; type?: string; language?: string }>;
}) {
  const { q, location, type, language } = await searchParams;

  const where = {
    verificationStatus: "APPROVED",
    ...(location ? { location: { contains: location } } : {}),
    ...(type ? { professionalType: type } : {}),
    ...(language ? { languages: { contains: language } } : {}),
    ...(q
      ? {
          OR: [
            { designation: { contains: q } },
            { specializations: { contains: q } },
            { professionalType: { contains: q } },
            { user: { firstName: { contains: q } } },
            { user: { lastName: { contains: q } } },
          ],
        }
      : {}),
  };

  const [professionals, featured] = await Promise.all([
    prisma.professionalProfile.findMany({
      where,
      include: { user: true, services: { include: { service: true } } },
      orderBy: { ratingAvg: "desc" },
    }),
    prisma.professionalProfile.findMany({
      where: { verificationStatus: "APPROVED" },
      include: { user: true, services: { include: { service: true } } },
      orderBy: { ratingAvg: "desc" },
      take: 3,
    }),
  ]);

  const hasFilters = Boolean(q || location || type || language);

  function ProfessionalCard({ p }: { p: (typeof professionals)[number] }) {
    const price = minPriceCents(p.services);
    return (
      <div className="rounded-2xl border border-tw-border bg-white p-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-tw-bg border border-tw-border shrink-0" />
          <div>
            <p className="font-bold text-tw-ink">
              {p.user.firstName} {p.user.lastName}
            </p>
            <p className="text-xs text-tw-red font-bold uppercase">{p.professionalType}</p>
            <p className="text-xs text-tw-muted">{p.designation}</p>
            <p className="text-xs text-tw-muted">{p.location}</p>
          </div>
        </div>
        <div className="mt-3">
          <VerifiedBadge compact />
        </div>
        <p className="mt-3 text-xs text-tw-muted">
          ★ {p.ratingAvg.toFixed(1)} ({p.ratingCount} consultations)
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {p.specializations.split(",").slice(0, 4).map((s) => (
            <span key={s} className="text-[10px] font-bold uppercase bg-tw-bg text-tw-muted rounded px-2 py-1">
              {s.trim()}
            </span>
          ))}
        </div>
        <p className="mt-3 text-xs text-tw-muted">Languages: {p.languages.split(",").join(" · ")}</p>
        {price !== null && (
          <p className="mt-2 text-sm font-black text-tw-ink">From R{(price / 100).toFixed(0)} / consultation</p>
        )}
        <div className="mt-4 flex gap-2">
          <ButtonLink href={`/professionals/${p.id}`} variant="red" size="sm" className="flex-1">
            View Profile
          </ButtonLink>
          <ButtonLink href={`/book?professional=${p.id}`} variant="outline-red" size="sm" className="flex-1">
            Book Consultation
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-tw-black relative overflow-hidden">
        <HeroBackground src="/images/hero-professionals.jpg" />
        <div className="container-page py-16 relative z-10">
          <Breadcrumbs dark items={[{ label: "Home", href: "/" }, { label: "Professionals" }]} />
          <p className="eyebrow">Find Your Workplace Professional</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-black text-white">
            The Right Expertise <span className="text-tw-red">for Your Workplace Matter</span>
          </h1>
          <p className="mt-4 text-white/60 max-w-xl">
            Connect with appropriately qualified workplace professionals who can help
            you understand your situation, explore your options and take informed
            next steps.
          </p>

          <form className="mt-8 rounded-2xl border border-white/20 bg-white/5 p-4 flex flex-col md:flex-row gap-3">
            <input
              name="q"
              defaultValue={q}
              placeholder="Search by profession, expertise or workplace issue..."
              className="flex-1 rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-tw-red/50"
            />
            <input
              name="location"
              defaultValue={location}
              placeholder="Location"
              className="w-full md:w-48 rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-tw-red/50"
            />
            <select
              name="language"
              defaultValue={language ?? ""}
              className="w-full md:w-48 rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-tw-red/50"
            >
              <option value="" className="text-tw-ink">Language</option>
              {languages.map((l) => (
                <option key={l} value={l} className="text-tw-ink">
                  {l}
                </option>
              ))}
            </select>
            <button className="rounded-full bg-tw-red px-6 py-2.5 text-sm font-bold uppercase text-white">
              Search Professionals
            </button>
          </form>
        </div>
      </section>

      <section className="container-page py-16">
        <h2 className="text-xl font-black uppercase text-tw-ink">What Type of Professional Do You Need?</h2>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {professionTypeCards.map((c) => (
            <Link
              key={c.label}
              href={`/professionals?type=${encodeURIComponent(c.type)}`}
              className="rounded-xl border border-tw-border bg-white p-5 hover:border-tw-red transition-colors"
            >
              <span className="text-2xl">{c.icon}</span>
              <h4 className="mt-2 font-bold text-tw-ink">{c.label}</h4>
              <p className="mt-1 text-sm text-tw-muted">{c.body}</p>
              <span className="mt-3 inline-block text-xs font-bold uppercase text-tw-red">Find {c.label.split(" ")[0]} &rarr;</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-tw-bg py-16">
        <div className="container-page">
          <h2 className="text-xl font-black uppercase text-tw-ink">Search by What You Need Help With</h2>
          <p className="mt-2 text-sm text-tw-muted max-w-2xl">
            Not sure what type of professional you need? Start with your workplace issue.
          </p>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {issueSearches.map((s) => (
              <Link
                key={s.label}
                href={`/professionals?q=${encodeURIComponent(s.q)}`}
                className="rounded-xl border border-tw-border bg-white p-4 flex items-center justify-between gap-3 hover:border-tw-red transition-colors"
              >
                <span className="text-sm font-semibold text-tw-ink">{s.label}</span>
                <span className="text-tw-red font-bold">&rarr;</span>
              </Link>
            ))}
          </div>
          <Link href="/professionals" className="mt-6 inline-block text-xs font-bold uppercase text-tw-red">
            View All Areas of Expertise &rarr;
          </Link>
        </div>
      </section>

      <section className="container-page py-16">
        <h2 className="text-xl font-black uppercase text-tw-ink">Expertise You Can Explore With Confidence</h2>
        <p className="mt-2 text-sm text-tw-muted max-w-2xl">
          Professionals displaying the Black Pearl Verified badge have undergone
          Black Pearl&apos;s stated verification process. Depending on the professional
          category, verification may consider:
        </p>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {verificationChecks.map((v) => (
            <div key={v.name} className="rounded-xl border border-tw-border bg-white p-5">
              <span className="text-xs font-bold uppercase text-tw-red">{v.name}</span>
              <p className="mt-2 text-sm text-tw-muted">{v.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <VerifiedBadge />
          <p className="mt-3 text-xs text-tw-muted max-w-2xl">
            Verification confirms that a professional has undergone Black Pearl&apos;s
            stated verification process. It does not guarantee the outcome, quality
            or suitability of any professional service.
          </p>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="bg-tw-bg py-16">
          <div className="container-page">
            <h2 className="text-xl font-black uppercase text-tw-ink">Meet Our Workplace Experts</h2>
            <p className="mt-2 text-sm text-tw-muted max-w-2xl">
              Discover professionals based on their expertise, experience, availability and client feedback.
            </p>
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((p) => (
                <ProfessionalCard key={p.id} p={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="container-page py-16">
        <h2 className="text-xl font-black uppercase text-tw-ink">Finding the Right Professional Is Simple</h2>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {chooseSteps.map((s) => (
            <div key={s.n} className="rounded-xl border border-tw-border bg-white p-5">
              <span className="text-xs font-black text-tw-red">{s.n}</span>
              <h4 className="mt-1 font-bold text-tw-ink">{s.label}</h4>
              <p className="mt-1 text-sm text-tw-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-tw-bg py-16">
        <div className="container-page grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-xl font-black uppercase text-tw-ink">Know Who You&apos;re Booking</h2>
            <p className="mt-2 text-sm text-tw-muted">
              Every professional profile should give you enough information to make an informed choice. A profile may include:
            </p>
            <ul className="mt-4 grid sm:grid-cols-2 gap-x-4 gap-y-1.5">
              {profileIncludes.map((p) => (
                <li key={p} className="text-sm text-tw-muted before:content-['—_'] before:text-tw-red">
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-black uppercase text-tw-ink">Choose Based on What Matters to You</h2>
            <p className="mt-2 text-sm text-tw-muted">Use our filters to narrow your search.</p>
            <div className="mt-4 space-y-3">
              {compareFilters.map((f) => (
                <div key={f.label} className="rounded-lg border border-tw-border bg-white p-4">
                  <span className="text-xs font-bold uppercase text-tw-red">{f.label}</span>
                  <p className="mt-1 text-sm text-tw-muted">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-xl font-black uppercase text-tw-ink">Workplace Support in Languages You Understand</h2>
            <p className="mt-2 text-sm text-tw-muted">
              Where available, search for professionals who can communicate in your preferred language.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {languages.map((l) => (
                <Link
                  key={l}
                  href={`/professionals?language=${encodeURIComponent(l)}`}
                  className="text-xs rounded-full border border-tw-border px-3 py-1.5 text-tw-muted hover:border-tw-red hover:text-tw-red"
                >
                  {l}
                </Link>
              ))}
            </div>
            <p className="mt-3 text-xs text-tw-muted">
              Language availability depends on individual professional profiles.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-black uppercase text-tw-ink">Choose How You Connect</h2>
            <div className="mt-4 space-y-3">
              {consultationChannels.map((c) => (
                <div key={c.label} className="rounded-lg border border-tw-border bg-white p-4 flex items-start gap-3">
                  <span className="text-xl">{c.icon}</span>
                  <div>
                    <p className="font-bold text-sm text-tw-ink">{c.label}</p>
                    <p className="text-sm text-tw-muted">{c.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-tw-muted">
              Availability depends on the professional, location and nature of the service.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-tw-bg py-16">
        <div className="container-page">
          <h2 className="text-xl font-black uppercase text-tw-ink">Real Client Experiences</h2>
          <p className="mt-2 text-sm text-tw-muted max-w-2xl">
            Client feedback helps you understand the experience others have had with
            a professional. Ratings may consider:
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {ratingFactors.map((r) => (
              <span key={r} className="text-xs font-bold uppercase bg-white border border-tw-border rounded-full px-4 py-2 text-tw-ink">
                {r}
              </span>
            ))}
          </div>
          <p className="mt-4 text-xs text-tw-muted max-w-2xl">
            Reviews should be based on genuine completed engagements and are subject to Black Pearl&apos;s review standards.
          </p>
        </div>
      </section>

      <section id="directory" className="container-page py-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-xl font-black uppercase text-tw-ink">
            {hasFilters ? "Matching Professionals" : "All Professionals"}
          </h2>
          {hasFilters && (
            <Link href="/professionals" className="text-xs font-bold uppercase text-tw-red">
              Clear filters
            </Link>
          )}
        </div>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {professionals.map((p) => (
            <ProfessionalCard key={p.id} p={p} />
          ))}
          {professionals.length === 0 && (
            <div className="col-span-full rounded-xl border border-tw-border bg-white p-6 text-center">
              <p className="text-sm text-tw-muted">
                No professionals currently match your search. Let us help you find the right fit.
              </p>
              <ButtonLink href="/book" variant="red" size="sm" arrow className="mt-4">
                Get Matched
              </ButtonLink>
            </div>
          )}
        </div>
      </section>

      <section className="bg-tw-black py-16">
        <div className="container-page grid md:grid-cols-[1fr_auto] items-center gap-6">
          <div>
            <p className="eyebrow">Not Sure Who You Need?</p>
            <h2 className="mt-2 text-2xl font-black text-white">Let Black Pearl Help You Find the Right Professional</h2>
            <p className="mt-2 text-white/60 max-w-xl">
              You don&apos;t need to know whether you need an HR professional, labour
              consultant, mediator or attorney before you start. Tell us about your
              workplace issue and our matching process can help identify
              professionals whose expertise may be appropriate for your needs.
            </p>
          </div>
          <ButtonLink href="/book" variant="red" size="lg" arrow>
            Get Matched With a Professional
          </ButtonLink>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="rounded-2xl border border-tw-border bg-white p-8">
          <span className="eyebrow">Need Urgent Support?</span>
          <h3 className="mt-2 text-lg font-black text-tw-ink">Start With the Right Information</h3>
          <p className="mt-2 text-sm text-tw-muted max-w-2xl">
            If you are dealing with a dismissal, disciplinary hearing, workplace
            harassment, retrenchment or another serious workplace matter, start by
            reviewing the relevant Black Pearl resources. For matters requiring
            individual advice, consider booking an appropriately qualified professional.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <ButtonLink href="/resources" variant="outline-red" size="md" arrow>
              Visit Workplace Resources
            </ButtonLink>
            <ButtonLink href="/book" variant="red" size="md" arrow>
              Book a Consultation
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-tw-bg py-16">
        <div className="container-page grid md:grid-cols-2 gap-10">
          <div>
            <span className="eyebrow">For Professionals</span>
            <h2 className="mt-2 text-xl font-black text-tw-ink">Are You a Workplace Professional?</h2>
            <p className="mt-2 text-sm text-tw-muted">
              Black Pearl is building a professional network connecting workplace
              specialists with employees and employers looking for appropriate
              expertise. Professionals may include:
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {professionalKinds.map((k) => (
                <span key={k} className="text-xs font-bold uppercase bg-white border border-tw-border rounded-full px-3 py-1.5 text-tw-muted">
                  {k}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm text-tw-muted">
              Build your professional profile, showcase your expertise and connect
              with clients through the Black Pearl platform.
            </p>
            <ButtonLink href="/join-as-professional" variant="dark" size="md" arrow className="mt-5">
              Become a Black Pearl Professional
            </ButtonLink>
          </div>
          <div>
            <h3 className="text-lg font-black text-tw-ink">Why Professionals Join Black Pearl</h3>
            <div className="mt-4 space-y-3">
              {joinReasons.map((r) => (
                <div key={r.label} className="rounded-lg border border-tw-border bg-white p-4">
                  <p className="font-bold text-sm text-tw-ink">{r.label}</p>
                  <p className="text-sm text-tw-muted">{r.body}</p>
                </div>
              ))}
            </div>
            <ButtonLink href="/join-as-professional" variant="outline-red" size="md" arrow className="mt-5">
              Join the Professional Network
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <p className="text-xs text-tw-muted max-w-3xl">
          Black Pearl is a digital marketplace that facilitates connections between
          clients and independent workplace professionals. Professionals remain
          responsible for their own professional advice, judgement, conduct and
          services. Black Pearl does not guarantee the outcome of any consultation,
          workplace dispute, CCMA matter, disciplinary process, mediation or legal
          proceeding. Where a matter requires regulated legal or specialist
          services, clients should engage an appropriately qualified professional
          who is authorised to provide those services. Verification does not
          constitute an endorsement or guarantee of professional performance or outcome.
        </p>
      </section>

      <section className="bg-tw-black py-16">
        <div className="container-page text-center">
          <span className="eyebrow">Can&apos;t Find the Right Professional?</span>
          <h2 className="mt-2 text-2xl font-black text-white">We&apos;ll Help You Find a Match</h2>
          <p className="mt-2 text-white/60 max-w-xl mx-auto">
            Tell us what you&apos;re dealing with and let Black Pearl help connect you
            with professionals whose listed expertise may be appropriate for your needs.
          </p>
          <p className="mt-4 text-tw-red font-bold uppercase text-sm">
            Your workplace matter. The right expertise. One trusted platform.
          </p>
          <ButtonLink href="/book" variant="red" size="lg" arrow className="mt-6">
            Get Matched Now
          </ButtonLink>
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="rounded-2xl bg-tw-charcoal p-10 text-center">
          <h2 className="text-2xl font-black text-white">Find the Right Workplace Expertise</h2>
          <p className="mt-2 text-white/60 max-w-2xl mx-auto">
            Whether you&apos;re an employee looking for guidance, an employer seeking
            HR support or an organisation dealing with a complex workplace matter,
            the right professional may be closer than you think.
          </p>
          <p className="mt-3 text-tw-red font-bold uppercase text-sm">Search. Compare. Choose. Connect.</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="#directory" variant="red" size="md" arrow>
              Find a Professional
            </ButtonLink>
            <ButtonLink href="/book" variant="outline-white" size="md" arrow>
              Get Matched
            </ButtonLink>
            <ButtonLink href="/join-as-professional" variant="outline-white" size="md" arrow>
              Become a Professional
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
