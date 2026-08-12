import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HeroBackground } from "@/components/HeroBackground";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { prisma } from "@/lib/prisma";
import { professionalTypes } from "@/lib/enums";

export default async function ProfessionalsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; location?: string; type?: string }>;
}) {
  const { q, location, type } = await searchParams;

  const professionals = await prisma.professionalProfile.findMany({
    where: {
      verificationStatus: "APPROVED",
      ...(location ? { location: { contains: location } } : {}),
      ...(type ? { professionalType: type } : {}),
      ...(q
        ? {
            OR: [
              { designation: { contains: q } },
              { specializations: { contains: q } },
              { user: { firstName: { contains: q } } },
              { user: { lastName: { contains: q } } },
            ],
          }
        : {}),
    },
    include: { user: true },
    orderBy: { ratingAvg: "desc" },
  });

  return (
    <div>
      <section className="bg-tw-black relative overflow-hidden">
        <HeroBackground src="/images/hero-professionals.jpg" />
        <div className="container-page py-16 relative z-10">
          <Breadcrumbs dark items={[{ label: "Home", href: "/" }, { label: "Professionals" }]} />
          <p className="eyebrow">Find Your Workplace Professional</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-black text-white">
            Qualified Experts. <br /> <span className="text-tw-red">Trusted Advice.</span>
          </h1>
          <p className="mt-4 text-white/60 max-w-xl">
            Search by problem, profession, location or language and connect with a
            Black Pearl Verified professional.
          </p>
        </div>
      </section>

      <section className="container-page py-10">
        <form className="rounded-2xl border border-tw-border bg-white p-4 flex flex-col md:flex-row gap-3">
          <input
            name="q"
            defaultValue={q}
            placeholder="Search by name, expertise or keyword..."
            className="flex-1 rounded-lg border border-tw-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-tw-red/30"
          />
          <select
            name="type"
            defaultValue={type ?? ""}
            className="w-full md:w-64 rounded-lg border border-tw-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-tw-red/30"
          >
            <option value="">All Professions</option>
            {professionalTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <input
            name="location"
            defaultValue={location}
            placeholder="Location..."
            className="w-full md:w-56 rounded-lg border border-tw-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-tw-red/30"
          />
          <button className="rounded-full bg-tw-red px-6 py-2.5 text-sm font-bold uppercase text-white">
            Search
          </button>
        </form>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {professionals.map((p) => (
            <div key={p.id} className="rounded-2xl border border-tw-border bg-white p-6">
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
              <div className="mt-4 flex gap-2">
                <ButtonLink href={`/professionals/${p.id}`} variant="red" size="sm" className="flex-1">
                  View Profile
                </ButtonLink>
                <ButtonLink href={`/book?professional=${p.id}`} variant="outline-red" size="sm" className="flex-1">
                  Book
                </ButtonLink>
              </div>
            </div>
          ))}
          {professionals.length === 0 && (
            <p className="text-sm text-tw-muted">No professionals match your search.</p>
          )}
        </div>
      </section>

      <section className="bg-tw-black">
        <div className="container-page py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white font-bold">Can&apos;t find the right expert?</p>
          <ButtonLink href="/book" variant="red" size="md" arrow>
            Get Matched Now
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
