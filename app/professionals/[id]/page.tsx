import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { prisma } from "@/lib/prisma";

export default async function ProfessionalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const professional = await prisma.professionalProfile.findFirst({
    where: { id, verificationStatus: "APPROVED" },
    include: { user: true, services: { include: { service: true } } },
  });
  if (!professional) notFound();

  return (
    <div>
      <section className="bg-tw-black diagonal-accent">
        <div className="container-page py-16 grid md:grid-cols-[160px_1fr] gap-8 items-start">
          <div className="h-40 w-40 rounded-2xl bg-white/10 border border-white/10" />
          <div>
            <Breadcrumbs
              dark
              items={[
                { label: "Home", href: "/" },
                { label: "Professionals", href: "/professionals" },
                { label: `${professional.user.firstName} ${professional.user.lastName}` },
              ]}
            />
            <span className="inline-block text-xs font-bold uppercase text-tw-red bg-white/5 border border-tw-red/40 rounded-full px-3 py-1">
              Vetted & Verified
            </span>
            <h1 className="mt-3 text-3xl md:text-4xl font-black text-white">
              {professional.user.firstName} {professional.user.lastName}
            </h1>
            <p className="mt-1 text-tw-red font-bold">{professional.designation}</p>
            <p className="mt-1 text-white/50 text-sm">{professional.location}</p>
            <p className="mt-1 text-white/50 text-sm">
              ★ {professional.ratingAvg.toFixed(1)} ({professional.ratingCount} reviews) ·{" "}
              {professional.yearsExperience}+ years experience
            </p>
            <ButtonLink
              href={`/book?professional=${professional.id}`}
              variant="red"
              size="lg"
              arrow
              className="mt-6"
            >
              Book Consultation
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="container-page py-16 grid md:grid-cols-[1fr_320px] gap-10">
        <div>
          <h2 className="text-lg font-black uppercase text-tw-ink">Biography</h2>
          <p className="mt-2 text-sm text-tw-muted">{professional.bio}</p>

          <h2 className="mt-8 text-lg font-black uppercase text-tw-ink">Qualifications</h2>
          <p className="mt-2 text-sm text-tw-muted">{professional.qualifications}</p>

          <h2 className="mt-8 text-lg font-black uppercase text-tw-ink">Areas of Expertise</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {professional.specializations.split(",").map((s) => (
              <span key={s} className="text-xs font-bold uppercase bg-tw-bg text-tw-muted rounded px-3 py-1.5">
                {s.trim()}
              </span>
            ))}
          </div>

          <h2 className="mt-8 text-lg font-black uppercase text-tw-ink">Languages</h2>
          <p className="mt-2 text-sm text-tw-muted">{professional.languages.split(",").join(", ")}</p>
        </div>

        <div className="rounded-2xl border border-tw-border bg-white p-6 h-fit">
          <p className="font-bold text-tw-ink">Consultation Formats</p>
          <ul className="mt-2 text-sm text-tw-muted space-y-1">
            {professional.offersOnline && <li>✓ Online consultation</li>}
            {professional.offersInPerson && <li>✓ In-person consultation</li>}
          </ul>

          <p className="mt-6 font-bold text-tw-ink">Services & Pricing</p>
          <ul className="mt-2 text-sm text-tw-muted space-y-2">
            {professional.services.map((ps) => (
              <li key={ps.id} className="flex justify-between gap-2">
                <span>{ps.service.name}</span>
                <span className="font-bold text-tw-ink">
                  R{((ps.priceCents ?? ps.service.defaultPriceCents) / 100).toFixed(0)}
                </span>
              </li>
            ))}
          </ul>

          <ButtonLink
            href={`/book?professional=${professional.id}`}
            variant="red"
            size="md"
            arrow
            className="mt-6 w-full"
          >
            Book Consultation
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
