import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HeroBackground } from "@/components/HeroBackground";
import { prisma } from "@/lib/prisma";

export default async function PricingPage() {
  const services = await prisma.service.findMany({ where: { active: true }, orderBy: { order: "asc" } });

  return (
    <div>
      <section className="bg-tw-black relative overflow-hidden">
        <HeroBackground src="/images/hero-how-it-works.jpg" />
        <div className="container-page py-16 relative z-10">
          <Breadcrumbs dark items={[{ label: "Home", href: "/" }, { label: "Pricing" }]} />
          <p className="eyebrow">Transparent Pricing</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-black text-white max-w-2xl">
            No Surprise Fees. <span className="text-tw-red">Ever.</span>
          </h1>
          <p className="mt-4 text-white/60 max-w-xl">
            Every consultation price is shown up front. You approve the service and
            price before you pay — nothing is billed without your confirmation.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <p className="eyebrow text-center">Consultations</p>
        <h2 className="mt-2 text-center text-2xl md:text-3xl font-black uppercase text-tw-ink">
          Book a Specific Consultation
        </h2>

        <div className="mt-10 overflow-x-auto rounded-2xl border border-tw-border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-tw-bg text-left text-xs uppercase text-tw-muted">
              <tr>
                <th className="p-4">Service</th>
                <th className="p-4">Typical Duration</th>
                <th className="p-4">From</th>
                <th className="p-4" />
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s.id} className="border-t border-tw-border">
                  <td className="p-4 font-semibold text-tw-ink">{s.name}</td>
                  <td className="p-4 text-tw-muted">{s.defaultDurationMins} min</td>
                  <td className="p-4 font-bold text-tw-red">R{(s.defaultPriceCents / 100).toFixed(0)}</td>
                  <td className="p-4 text-right">
                    <ButtonLink href={`/book?service=${s.slug}`} variant="outline-red" size="sm">
                      Book
                    </ButtonLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-tw-muted">
          Prices vary slightly by professional and are always confirmed before you pay. Individual
          professionals may price services differently — exact pricing is shown during booking.
        </p>
      </section>

      <section className="bg-tw-bg border-y border-tw-border">
        <div className="container-page py-16">
          <p className="eyebrow text-center">By Duration</p>
          <h2 className="mt-2 text-center text-2xl md:text-3xl font-black uppercase text-tw-ink">
            Or Just Book Time With an Expert
          </h2>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              ["Quick Assessment", "15 min", "R350"],
              ["30-Minute Consultation", "30 min", "R650"],
              ["60-Minute Consultation", "60 min", "R950"],
              ["Employer Advisory", "60 min", "R1,200"],
            ].map(([title, duration, price]) => (
              <div key={title} className="rounded-2xl border border-tw-border bg-white p-6 text-center">
                <p className="font-bold text-tw-ink">{title}</p>
                <p className="text-xs text-tw-muted">{duration}</p>
                <p className="mt-3 text-2xl font-black text-tw-red">{price}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-tw-muted">
            Indicative pricing shown for planning purposes — exact pricing is always confirmed at
            booking before you pay.
          </p>
        </div>
      </section>

      <section className="bg-tw-black">
        <div className="container-page py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white font-bold">You approve the service before payment. No surprise fees.</p>
          <ButtonLink href="/book" variant="red" size="md" arrow>
            Book Consultation
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
