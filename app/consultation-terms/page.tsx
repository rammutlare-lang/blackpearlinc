import { Breadcrumbs } from "@/components/Breadcrumbs";

export default function ConsultationTermsPage() {
  return (
    <div className="container-page py-16 max-w-3xl">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Consultation Terms" }]} />
      <p className="eyebrow">Legal</p>
      <h1 className="mt-1 text-3xl font-black text-tw-ink">Consultation Terms</h1>

      <div className="mt-6 space-y-5 text-sm text-tw-muted leading-relaxed">
        <p>
          These terms apply specifically to booked consultations between clients and
          professionals on the Black Pearl Inc. platform.
        </p>
        <h2 className="text-lg font-bold text-tw-ink">Nature of Advice</h2>
        <p>
          Consultations provide practical guidance based on the information you share.
          They do not constitute formal legal representation unless separately agreed
          with the professional, and outcomes cannot be guaranteed.
        </p>
        <h2 className="text-lg font-bold text-tw-ink">Confidentiality</h2>
        <p>
          Information you share during a consultation is treated as confidential by the
          professional, subject to any legal obligations that require disclosure.
        </p>
        <h2 className="text-lg font-bold text-tw-ink">Consultation Format</h2>
        <p>
          Consultations may be conducted online or in person, as selected at the time of
          booking and subject to the professional&apos;s availability.
        </p>
        <h2 className="text-lg font-bold text-tw-ink">Rescheduling & Cancellation</h2>
        <p>
          See our{" "}
          <a href="/cancellation-refund-policy" className="text-tw-red">
            Cancellation & Refund Policy
          </a>{" "}
          for details on changing or cancelling a confirmed booking.
        </p>
      </div>
    </div>
  );
}
