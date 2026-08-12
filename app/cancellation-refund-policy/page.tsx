import { Breadcrumbs } from "@/components/Breadcrumbs";

const employeeScenarios = [
  ["More than 24 hours before appointment", "100% refund or free rescheduling"],
  ["12–24 hours before appointment", "75% refund or free rescheduling"],
  ["Less than 12 hours before appointment", "50% refund"],
  ["No-show", "No refund, unless Black Pearl determines there were exceptional circumstances"],
];

const otherScenarios = [
  ["Professional cancels or is unavailable", "100% refund OR immediate professional reassignment — never at your cost"],
  ["Technical failure prevents the consultation", "Free rebooking or full refund"],
  ["Professional determines the matter is outside their expertise", "Free rebooking with a suitable professional or full refund"],
];

const employerScenarios = [
  ["Before project work starts", "100% refund, less any approved third-party costs"],
  ["Work has commenced", "Refund calculated according to work completed"],
  ["Work completed", "No refund — disclosed clearly before payment"],
];

export default function CancellationRefundPolicyPage() {
  return (
    <div className="container-page py-16 max-w-3xl">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cancellation & Refund Policy" }]} />
      <p className="eyebrow">Legal</p>
      <h1 className="mt-1 text-3xl font-black text-tw-ink">Cancellation & Refund Policy</h1>

      <h2 className="mt-8 text-lg font-bold text-tw-ink">Employee Consultations</h2>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-tw-border bg-white">
        <table className="w-full text-sm">
          <tbody>
            {employeeScenarios.map(([scenario, outcome]) => (
              <tr key={scenario} className="border-t border-tw-border first:border-t-0">
                <td className="p-4 text-tw-ink">{scenario}</td>
                <td className="p-4 font-semibold text-tw-red text-right">{outcome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-tw-muted">
        Cancel from your dashboard any time before your appointment — the refund
        percentage you&apos;ll receive is shown before you confirm.
      </p>

      <h2 className="mt-10 text-lg font-bold text-tw-ink">Professional & Technical Issues</h2>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-tw-border bg-white">
        <table className="w-full text-sm">
          <tbody>
            {otherScenarios.map(([scenario, outcome]) => (
              <tr key={scenario} className="border-t border-tw-border first:border-t-0">
                <td className="p-4 text-tw-ink">{scenario}</td>
                <td className="p-4 font-semibold text-tw-red text-right">{outcome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-tw-muted">
        Black Pearl will never make you absorb the cost of a professional cancellation.
      </p>

      <h2 className="mt-10 text-lg font-bold text-tw-ink">Employer Projects</h2>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-tw-border bg-white">
        <table className="w-full text-sm">
          <tbody>
            {employerScenarios.map(([scenario, outcome]) => (
              <tr key={scenario} className="border-t border-tw-border first:border-t-0">
                <td className="p-4 text-tw-ink">{scenario}</td>
                <td className="p-4 font-semibold text-tw-red text-right">{outcome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-lg font-bold text-tw-ink">Document Revisions</h2>
      <p className="mt-3 text-sm text-tw-muted leading-relaxed">
        Fixed-price documents (contracts, policies, handbooks) include one round of
        revisions. Additional revisions are R395 each; a major change in scope
        requires a new quotation.
      </p>

      <p className="mt-10 text-sm text-tw-muted">
        Approved refunds are returned to your original payment method within 5–10
        business days.
      </p>
    </div>
  );
}
