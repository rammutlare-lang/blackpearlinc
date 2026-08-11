import { Breadcrumbs } from "@/components/Breadcrumbs";

export default function CancellationRefundPolicyPage() {
  return (
    <div className="container-page py-16 max-w-3xl">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cancellation & Refund Policy" }]} />
      <p className="eyebrow">Legal</p>
      <h1 className="mt-1 text-3xl font-black text-tw-ink">Cancellation & Refund Policy</h1>

      <div className="mt-6 space-y-5 text-sm text-tw-muted leading-relaxed">
        <h2 className="text-lg font-bold text-tw-ink">Cancelling a Booking</h2>
        <p>
          Confirmed bookings can be cancelled free of charge more than 24 hours before
          the scheduled consultation time from your dashboard. Cancellations within 24
          hours of the scheduled time cannot be made through the platform — please
          contact us directly.
        </p>
        <h2 className="text-lg font-bold text-tw-ink">Refunds</h2>
        <p>
          Bookings cancelled more than 24 hours in advance are eligible for a full
          refund to the original payment method. Refunds are processed within 5–10
          business days.
        </p>
        <h2 className="text-lg font-bold text-tw-ink">No-Shows</h2>
        <p>
          If a client does not attend a confirmed consultation without prior
          cancellation, the consultation fee is non-refundable.
        </p>
        <h2 className="text-lg font-bold text-tw-ink">Professional Cancellations</h2>
        <p>
          If a professional cancels or is unable to attend, you will be offered a
          rebooking with the same or an alternative professional, or a full refund.
        </p>
      </div>
    </div>
  );
}
