import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HeroBackground } from "@/components/HeroBackground";
import { prisma } from "@/lib/prisma";
import { resourceCategoryLabels, type ResourceCategory } from "@/lib/enums";

export const dynamic = "force-dynamic";

const categoryDescriptions: Record<ResourceCategory, string> = {
  GUIDE: "Step-by-step guidance on your rights and workplace processes.",
  TEMPLATE: "Ready-to-use documents, checklists and letters.",
  LAW: "Key labour laws and legislation, explained in plain language.",
  CALCULATOR: "Practical tools to help you understand your entitlements.",
  ARTICLE: "Insights and analysis on workplace and labour-law developments.",
  WEBINAR: "Recorded briefings and training sessions.",
};

const categoryTopics: Record<ResourceCategory, string[]> = {
  GUIDE: [
    "Understanding unfair dismissal",
    "The CCMA process, step by step",
    "Raising a grievance",
    "Preparing for a disciplinary hearing",
    "Managing poor performance fairly",
  ],
  TEMPLATE: [
    "Disciplinary hearing checklist",
    "Employment contract checklist",
    "Employer disciplinary pack",
    "HR compliance essentials",
  ],
  LAW: [
    "Basic Conditions of Employment Act (BCEA)",
    "Labour Relations Act (LRA)",
    "Employment Equity Act",
    "Occupational Health and Safety Act",
  ],
  CALCULATOR: [
    "Notice period & severance calculator",
    "Leave entitlement estimator",
    "UIF contribution reference",
  ],
  ARTICLE: [
    "What is a grievance?",
    "Recent CCMA rulings and what they mean",
    "Workplace trends for South African employers",
  ],
  WEBINAR: [
    "Understanding CCMA arbitration",
    "Running a fair disciplinary process",
    "HR compliance for small businesses",
  ],
};

const popularSearches = [
  "unfair dismissal",
  "CCMA process",
  "notice period",
  "disciplinary hearing",
  "retrenchment",
  "grievance",
];

const audienceCards = [
  {
    key: "EMPLOYEE",
    title: "For Employees",
    body: "Know your rights, understand your options and prepare for what's ahead.",
  },
  {
    key: "EMPLOYER",
    title: "For Employers",
    body: "Stay compliant, manage your team fairly and reduce dispute risk.",
  },
  {
    key: "HR",
    title: "For Workplace Professionals",
    body: "Practical tools and references to support the people you work with.",
  },
] as const;

const qualityBadges = [
  {
    name: "Official Source",
    body: "Sourced directly from legislation, government bodies or the CCMA.",
  },
  {
    name: "Expert Reviewed",
    body: "Reviewed by a verified Black Pearl professional before publication.",
  },
  {
    name: "Recently Updated",
    body: "Refreshed to reflect the latest legislative or procedural changes.",
  },
  {
    name: "Premium Resource",
    body: "An in-depth, paid resource — templates, packs or detailed guides.",
  },
];

const officialResources = [
  {
    name: "CCMA — Commission for Conciliation, Mediation and Arbitration",
    href: "https://www.ccma.org.za",
    body: "Referrals, case status, forms and CCMA rules.",
  },
  {
    name: "Department of Employment and Labour",
    href: "https://www.labour.gov.za",
    body: "Labour legislation, UIF, compliance and inspectorate information.",
  },
  {
    name: "South African Government",
    href: "https://www.gov.za",
    body: "Official government services and legislation portal.",
  },
  { name: "Labour Court of South Africa", body: "Handles disputes referred beyond the CCMA." },
  { name: "Labour Appeal Court", body: "Hears appeals from the Labour Court." },
  {
    name: "Bargaining Councils",
    body: "Sector-specific dispute resolution bodies (e.g. MEIBC, MIBCO).",
  },
  {
    name: "Professional & HR Bodies",
    body: "e.g. SABPP, and relevant law society bodies for attorney verification.",
  },
];

const scenarios = [
  { q: "I was dismissed and think it was unfair", href: "/book?persona=EMPLOYEE&service=unfair-dismissal" },
  { q: "I need to run a disciplinary hearing", href: "/employers" },
  { q: "I've been asked to attend a CCMA hearing", href: "/resources?q=ccma" },
  { q: "I want to understand my notice pay or severance", href: "/resources/notice-severance-calculator" },
  { q: "I'm not being paid what my contract says", href: "/book?persona=EMPLOYEE" },
  { q: "I need HR policies for my small business", href: "/resources/hr-compliance-essentials-small-business" },
  { q: "I want to raise a grievance at work", href: "/resources/what-is-a-grievance" },
];

export default async function ResourcesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; audience?: string; category?: string }>;
}) {
  const { q, audience, category } = await searchParams;

  const [resources, featured] = await Promise.all([
    prisma.resource.findMany({
      where: {
        ...(audience ? { audience: { in: [audience, "BOTH"] } } : {}),
        ...(category ? { category } : {}),
        ...(q ? { OR: [{ title: { contains: q } }, { summary: { contains: q } }] } : {}),
      },
      orderBy: { publishedAt: "desc" },
    }),
    prisma.resource.findUnique({ where: { slug: "understanding-unfair-dismissal" } }),
  ]);

  return (
    <div>
      <section className="bg-tw-black relative overflow-hidden">
        <HeroBackground src="/images/hero-resources.jpg" />
        <div className="container-page py-16 relative z-10">
          <Breadcrumbs dark items={[{ label: "Home", href: "/" }, { label: "Resources" }]} />
          <p className="eyebrow">Black Pearl Workplace Knowledge Centre</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-black text-white">
            Knowledge. Tools. <span className="text-tw-red">Empowerment.</span>
          </h1>
          <p className="mt-4 text-white/60 max-w-xl">
            Reliable, plain-language workplace information, templates and tools —
            built for employees, employers and the professionals who support them.
          </p>

          <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-2xl">
            <input
              name="q"
              defaultValue={q}
              placeholder="Search guides, templates, laws and tools..."
              className="flex-1 rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-tw-red/50"
            />
            <button className="rounded-full bg-tw-red px-6 py-2.5 text-sm font-bold uppercase text-white">
              Search Resources
            </button>
          </form>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs text-white/40 uppercase font-bold">Popular:</span>
            {popularSearches.map((term) => (
              <Link
                key={term}
                href={`/resources?q=${encodeURIComponent(term)}`}
                className="text-xs rounded-full border border-white/20 px-3 py-1 text-white/70 hover:border-tw-red hover:text-white"
              >
                {term}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <h2 className="text-xl font-black uppercase text-tw-ink">Resources For Everyone</h2>
        <div className="mt-6 grid sm:grid-cols-3 gap-5">
          {audienceCards.map((a) => (
            <Link
              key={a.key}
              href={`/resources?audience=${a.key}`}
              className="rounded-xl border border-tw-border bg-white p-6 hover:border-tw-red transition-colors"
            >
              <h3 className="font-bold text-tw-ink">{a.title}</h3>
              <p className="mt-2 text-sm text-tw-muted">{a.body}</p>
              <span className="mt-4 inline-block text-xs font-bold uppercase text-tw-red">
                Explore &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {featured && (
        <section className="container-page pb-16">
          <div className="rounded-2xl bg-tw-charcoal p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="eyebrow">Featured Resource</span>
              <h3 className="mt-2 text-2xl font-black text-white">{featured.title}</h3>
              <p className="mt-2 text-white/60 max-w-xl">{featured.summary}</p>
            </div>
            <ButtonLink href={`/resources/${featured.slug}`} variant="red" size="md" arrow>
              Read the Guide
            </ButtonLink>
          </div>
        </section>
      )}

      <section className="bg-tw-bg py-16">
        <div className="container-page">
          <h2 className="text-xl font-black uppercase text-tw-ink">The Knowledge Hub</h2>
          <p className="mt-2 text-sm text-tw-muted max-w-2xl">
            Browse by category, or use search above to find something specific.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {(Object.keys(resourceCategoryLabels) as ResourceCategory[]).map((cat) => (
              <Link
                key={cat}
                href={`/resources?category=${cat}`}
                className="rounded-xl border border-tw-border bg-white p-5 hover:border-tw-red transition-colors block"
              >
                <h4 className="font-bold text-tw-ink">{resourceCategoryLabels[cat]}</h4>
                <p className="mt-1 text-sm text-tw-muted">{categoryDescriptions[cat]}</p>
                <ul className="mt-3 space-y-1">
                  {categoryTopics[cat].map((t) => (
                    <li key={t} className="text-xs text-tw-muted before:content-['—_'] before:text-tw-red">
                      {t}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}

            <div className="rounded-xl border border-tw-border bg-white p-5">
              <h4 className="font-bold text-tw-ink">CCMA Resource Centre</h4>
              <p className="mt-1 text-sm text-tw-muted">
                Everything you need to understand a CCMA case, from referral to award.
              </p>
              <ul className="mt-3 space-y-1">
                {["Referral & con-ciliation", "Con-arb", "Arbitration & evidence", "Representation rights", "Awards & condonation"].map(
                  (t) => (
                    <li key={t} className="text-xs text-tw-muted before:content-['—_'] before:text-tw-red">
                      {t}
                    </li>
                  ),
                )}
              </ul>
              <Link href="/resources?q=ccma" className="mt-3 inline-block text-xs font-bold uppercase text-tw-red">
                Explore CCMA Resources &rarr;
              </Link>
            </div>

            <div className="rounded-xl border border-tw-border bg-white p-5">
              <h4 className="font-bold text-tw-ink">Workplace Updates</h4>
              <p className="mt-1 text-sm text-tw-muted">
                Legislative and regulatory changes that affect South African
                workplaces, as they happen.
              </p>
              <p className="mt-3 text-xs text-tw-muted">
                This section is being built out. Contact us if there&apos;s an
                update you&apos;d like us to cover.
              </p>
              <Link href="/contact" className="mt-3 inline-block text-xs font-bold uppercase text-tw-red">
                Get in Touch &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-xl font-black uppercase text-tw-ink">
            {q ? `Results for "${q}"` : category ? resourceCategoryLabels[category as ResourceCategory] ?? "Resource Library" : "Resource Library"}
          </h2>
          {(q || audience || category) && (
            <Link href="/resources" className="text-xs font-bold uppercase text-tw-red">
              Clear filters
            </Link>
          )}
        </div>

        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {resources.map((r) => (
            <Link
              key={r.id}
              href={`/resources/${r.slug}`}
              className="rounded-xl border border-tw-border bg-white p-5 hover:border-tw-red transition-colors"
            >
              <span className="inline-block text-xs font-bold uppercase text-tw-red">
                {resourceCategoryLabels[r.category as ResourceCategory]}
              </span>
              <h4 className="mt-3 font-bold text-tw-ink text-sm">{r.title}</h4>
              <p className="mt-1 text-xs text-tw-muted">{r.summary}</p>
              <span className="mt-3 inline-block text-xs font-black text-tw-ink">
                {r.priceCents ? `R${(r.priceCents / 100).toFixed(0)}` : "Free"}
              </span>
            </Link>
          ))}
          {resources.length === 0 && (
            <p className="text-sm text-tw-muted">No resources found.</p>
          )}
        </div>
      </section>

      <section className="bg-tw-bg py-16">
        <div className="container-page grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl bg-white border border-tw-border p-8">
            <span className="eyebrow">Free Resources</span>
            <h3 className="mt-2 text-lg font-black text-tw-ink">Always Free</h3>
            <p className="mt-2 text-sm text-tw-muted">
              Our essential guides, laws & legislation explainers and core
              checklists are free to access — because everyone deserves to
              understand their basic workplace rights.
            </p>
          </div>
          <div className="rounded-2xl bg-tw-black p-8">
            <span className="eyebrow">Premium Resources</span>
            <h3 className="mt-2 text-lg font-black text-white">In-Depth & Ready to Use</h3>
            <p className="mt-2 text-sm text-white/60">
              Detailed document packs, professionally drafted templates and
              specialist preparation guides are available at a clearly marked
              price — a fraction of the cost of a full consultation.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <h2 className="text-xl font-black uppercase text-tw-ink">Resource Quality &amp; Transparency</h2>
        <p className="mt-2 text-sm text-tw-muted max-w-2xl">
          We label our resources so you know exactly what you&apos;re getting.
        </p>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {qualityBadges.map((b) => (
            <div key={b.name} className="rounded-xl border border-tw-border bg-white p-5">
              <span className="inline-block text-xs font-bold uppercase text-tw-red">{b.name}</span>
              <p className="mt-2 text-sm text-tw-muted">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-tw-bg py-16">
        <div className="container-page">
          <h2 className="text-xl font-black uppercase text-tw-ink">Official South African Workplace Resources</h2>
          <p className="mt-2 text-sm text-tw-muted max-w-2xl">
            Direct links to the official bodies that govern South African
            workplace and labour matters.
          </p>
          <div className="mt-6 grid sm:grid-cols-2 gap-5">
            {officialResources.map((r) =>
              r.href ? (
                <a
                  key={r.name}
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-tw-border bg-white p-5 hover:border-tw-red transition-colors"
                >
                  <h4 className="font-bold text-tw-ink text-sm">{r.name}</h4>
                  <p className="mt-1 text-xs text-tw-muted">{r.body}</p>
                </a>
              ) : (
                <div key={r.name} className="rounded-xl border border-tw-border bg-white p-5">
                  <h4 className="font-bold text-tw-ink text-sm">{r.name}</h4>
                  <p className="mt-1 text-xs text-tw-muted">{r.body}</p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <h2 className="text-xl font-black uppercase text-tw-ink">Not Sure Where to Start?</h2>
        <p className="mt-2 text-sm text-tw-muted max-w-2xl">
          Find the resource or next step that matches your situation.
        </p>
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          {scenarios.map((s) => (
            <Link
              key={s.q}
              href={s.href}
              className="rounded-xl border border-tw-border bg-white p-5 flex items-center justify-between gap-4 hover:border-tw-red transition-colors"
            >
              <span className="text-sm font-semibold text-tw-ink">{s.q}</span>
              <span className="text-tw-red font-bold">&rarr;</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="rounded-2xl bg-tw-black p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-bold">Need more than a resource?</p>
            <p className="text-sm text-white/50">Speak to a verified professional about your specific situation.</p>
          </div>
          <ButtonLink href="/professionals" variant="red" size="md" arrow>
            Find a Professional
          </ButtonLink>
        </div>
      </section>

      <section className="container-page pb-16">
        <p className="text-xs text-tw-muted max-w-3xl">
          The information in this Resource Centre is provided for general
          educational purposes only and does not constitute legal advice. Laws
          and procedures may change, and individual circumstances vary — for
          guidance on your specific situation, please{" "}
          <Link href="/book" className="text-tw-red font-semibold">
            book a consultation
          </Link>{" "}
          with a verified professional.
        </p>
      </section>

      <section className="bg-tw-black py-16">
        <div className="container-page text-center">
          <p className="text-white/70 max-w-2xl mx-auto">
            Black Pearl exists to make workplace knowledge accessible — so that
            every employee, employer and professional in South Africa can act
            with clarity and confidence.
          </p>
        </div>
      </section>
    </div>
  );
}
