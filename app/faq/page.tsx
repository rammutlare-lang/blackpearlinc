import { Breadcrumbs } from "@/components/Breadcrumbs";

const faqs = [
  ["How do I book a consultation?", "Go to Book Consultation, tell us about your issue, choose a matched professional and a time, then pay securely online to confirm."],
  ["Is my information confidential?", "Yes. Information you share is only visible to your matched professional and our team, and is handled in line with our Privacy Policy and POPIA."],
  ["What if I need to cancel?", "You can cancel a confirmed booking for a full refund more than 24 hours before the scheduled time from your dashboard."],
  ["Are the professionals qualified?", "All professionals go through a verification process before their profile is approved and made publicly bookable."],
  ["Can I book for my company?", "Yes — register as an Employer / Organisation account when signing up."],
  ["How much does a consultation cost?", "Pricing varies by service and professional and is always shown before you confirm and pay."],
];

export default function FaqPage() {
  return (
    <div className="container-page py-16 max-w-3xl">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
      <p className="eyebrow">Support</p>
      <h1 className="mt-1 text-3xl font-black text-tw-ink">Frequently Asked Questions</h1>

      <div className="mt-8 space-y-4">
        {faqs.map(([q, a]) => (
          <div key={q} className="rounded-xl border border-tw-border bg-white p-5">
            <p className="font-bold text-tw-ink">{q}</p>
            <p className="mt-1 text-sm text-tw-muted">{a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
