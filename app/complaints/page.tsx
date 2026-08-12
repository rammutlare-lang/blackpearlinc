import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Complaints",
  description: "How to submit a complaint about Black Pearl or an independent professional, and what happens next.",
};

const steps = [
  ["1", "Submit Complaint", "Tell us what happened, including your booking reference if applicable."],
  ["2", "Acknowledgement", "We acknowledge receipt of your complaint within 2 business days."],
  ["3", "Internal Review", "Our team reviews the complaint and gathers relevant information."],
  ["4", "Professional Response", "Where the complaint relates to an independent professional, we request their response."],
  ["5", "Outcome", "We work with you towards a fair resolution and communicate the outcome."],
  ["6", "Escalation", "If unresolved, we outline further options available to you."],
];

export default function ComplaintsPage() {
  return (
    <div className="container-page py-16 max-w-3xl">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Complaints" }]} />
      <p className="eyebrow">Support</p>
      <h1 className="mt-1 text-3xl font-black text-tw-ink">Complaints & Dispute Resolution</h1>
      <p className="mt-4 text-sm text-tw-muted leading-relaxed">
        We take complaints about the platform or about a consultation seriously. If
        something didn&apos;t go as expected, please tell us using the process below.
      </p>

      <div className="mt-8 grid sm:grid-cols-2 gap-5">
        {steps.map(([n, title, desc]) => (
          <div key={n} className="rounded-xl border border-tw-border bg-white p-5">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-tw-red text-white text-xs font-black">
              {n}
            </span>
            <p className="mt-3 font-bold text-tw-ink">{title}</p>
            <p className="mt-1 text-sm text-tw-muted">{desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid sm:grid-cols-2 gap-5">
        <div className="rounded-xl border border-tw-border bg-white p-5">
          <p className="font-bold text-tw-ink">Complaint Against Black Pearl</p>
          <p className="mt-1 text-sm text-tw-muted">
            Relates to the platform itself — bookings, payments, matching or the
            service you received from our team. We handle these directly.
          </p>
        </div>
        <div className="rounded-xl border border-tw-border bg-white p-5">
          <p className="font-bold text-tw-ink">Complaint Against a Professional</p>
          <p className="mt-1 text-sm text-tw-muted">
            Relates to advice or conduct from an independent professional on the
            platform. We review these through the same process, involving the
            relevant professional.
          </p>
        </div>
      </div>

      <p className="mt-8 text-sm text-tw-muted">
        Contact our team at hello@blackpearlinc.co.za with your booking reference and a
        description of the issue.
      </p>

      <ButtonLink href="/contact" variant="red" size="md" arrow className="mt-6">
        Contact Us
      </ButtonLink>
    </div>
  );
}
