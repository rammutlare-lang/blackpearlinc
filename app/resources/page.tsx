import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { prisma } from "@/lib/prisma";
import { resourceCategoryLabels, type ResourceCategory } from "@/lib/enums";

const categoryDescriptions: Record<ResourceCategory, string> = {
  GUIDE: "Step-by-step guidance on your rights and workplace processes.",
  TEMPLATE: "Download ready-to-use documents and letters.",
  LAW: "Key labour laws, regulations and compliance information.",
  CALCULATOR: "Practical tools to help you understand your entitlements.",
  ARTICLE: "Expert insights on the latest labour law developments.",
  WEBINAR: "Stay informed with our videos and webinars.",
};

export default async function ResourcesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const resources = await prisma.resource.findMany({
    where: q
      ? { OR: [{ title: { contains: q } }, { summary: { contains: q } }] }
      : undefined,
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div>
      <section className="bg-tw-black diagonal-accent">
        <div className="container-page py-16">
          <Breadcrumbs dark items={[{ label: "Home", href: "/" }, { label: "Resources" }]} />
          <p className="eyebrow">Resources</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-black text-white">
            Knowledge. Tools. <span className="text-tw-red">Empowerment.</span>
          </h1>
          <p className="mt-4 text-white/60 max-w-xl">
            Access reliable labour law information, practical tools and guides to
            help you understand your rights and protect your workplace.
          </p>

          <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-2xl">
            <input
              name="q"
              defaultValue={q}
              placeholder="Search articles, guides, templates and tools..."
              className="flex-1 rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-tw-red/50"
            />
            <button className="rounded-full bg-tw-red px-6 py-2.5 text-sm font-bold uppercase text-white">
              Search Resources
            </button>
          </form>
        </div>
      </section>

      <section className="container-page py-16">
        <h2 className="text-xl font-black uppercase text-tw-ink">Explore By Category</h2>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {(Object.keys(resourceCategoryLabels) as ResourceCategory[]).map((cat) => (
            <div key={cat} className="rounded-xl border border-tw-border bg-white p-5">
              <h4 className="font-bold text-tw-ink">{resourceCategoryLabels[cat]}</h4>
              <p className="mt-1 text-sm text-tw-muted">{categoryDescriptions[cat]}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-14 text-xl font-black uppercase text-tw-ink">
          {q ? `Results for "${q}"` : "Resource Library"}
        </h2>
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
              {r.isPremium && (
                <span className="mt-3 inline-block text-[10px] font-bold uppercase text-tw-red">
                  Members Only
                </span>
              )}
            </Link>
          ))}
          {resources.length === 0 && (
            <p className="text-sm text-tw-muted">No resources found.</p>
          )}
        </div>

        <div className="mt-14 rounded-2xl bg-tw-black p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-bold">Can&apos;t find what you&apos;re looking for?</p>
            <p className="text-sm text-white/50">Our team is here to assist you.</p>
          </div>
          <ButtonLink href="/contact" variant="red" size="md" arrow>
            Contact Our Team
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
