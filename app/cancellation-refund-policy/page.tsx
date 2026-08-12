import { Breadcrumbs } from "@/components/Breadcrumbs";

const scenarios = [
  ["Cancelled more than 24 hours before", "Full refund"],
  ["Cancelled less than 24 hours before", "Not refundable via the platform — contact us directly"],
  ["Professional fails to attend", "Full refund or free rebooking, your choice"],
  ["Client fails to attend (no-show)", "Not refundable"],
  ["Technical failure prevents the consultation", "Free rebooking or full refund"],
  ["Professional determines the matter is outside their expertise", "Free rebooking with a suitable professional or full refund"],
];

export default function CancellationRefundPolicyPage() {
  return (
    <div className="container-page py-16 max-w-3xl">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cancellation & Refund Policy" }]} />
      <p className="eyebrow">Legal</p>
      <h1 className="mt-1 text-3xl font-black text-tw-ink">Cancellation & Refund Policy</h1>
      <p className="mt-4 text-sm text-tw-muted">The short version:</p>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-tw-border bg-white">
        <table className="w-full text-sm">
          <tbody>
            {scenarios.map(([scenario, outcome]) => (
              <tr key={scenario} className="border-t border-tw-border first:border-t-0">
                <td className="p-4 text-tw-ink">{scenario}</td>
                <td className="p-4 font-semibold text-tw-red text-right">{outcome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 space-y-5 text-sm text-tw-muted leading-relaxed">
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
        <h2 className="text-lg font-bold text-tw-ink">Professional Cancellations & Unavailability</h2>
        <p>
          If a professional cancels, is unable to attend, or determines during intake
          that your matter falls outside their expertise, you will be offered a
          rebooking with a suitable professional or a full refund.
        </p>
        <h2 className="text-lg font-bold text-tw-ink">Technical Failures</h2>
        <p>
          If a technical failure on our side prevents an online consultation from
          taking place, you will be offered a free rebooking or a full refund.
        </p>
      </div>
    </div>
  );
}
