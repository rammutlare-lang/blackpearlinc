import { Breadcrumbs } from "@/components/Breadcrumbs";

const sections = [
  {
    title: "General",
    items: [
      ["What is Black Pearl?", "Black Pearl Inc. is an employee relations and workplace solutions platform connecting employees and employers with verified professionals."],
      ["Who can use Black Pearl?", "Anyone dealing with a workplace issue — employees, employers, and HR professionals."],
      ["How does it work?", "Tell us what happened, we match you with a verified professional, you book and pay, then meet and get an action plan."],
    ],
  },
  {
    title: "Employees",
    items: [
      ["Can Black Pearl help me with dismissal?", "Yes — professionals on the platform can advise on unfair dismissal, disciplinary hearings and CCMA matters."],
      ["Can someone review my employment contract?", "Yes, contract review is available as a service — book a consultation to get started."],
      ["Can you help me prepare for the CCMA?", "Yes. You can also download our CCMA Preparation Guide from the Resources hub."],
    ],
  },
  {
    title: "Employers",
    items: [
      ["Can employers use Black Pearl?", "Yes — visit the Employers page for services and plans built for businesses."],
      ["Can you help with disciplinary processes?", "Yes, including misconduct investigations, hearings and outcome documentation."],
      ["Can you help develop HR policies?", "Yes — HR policy review and development is one of our employer services."],
    ],
  },
  {
    title: "Professionals",
    items: [
      ["How do I become a Black Pearl professional?", "Visit Join as a Professional and apply — we'll guide you through verification and onboarding."],
      ["How are professionals verified?", "We verify identity, qualifications, professional registration and experience before a profile goes live."],
      ["How does payment work?", "Clients pay upfront through the platform; professionals are paid out on a regular payment cycle."],
      ["How much commission does Black Pearl charge?", "Commission details are provided during onboarding — see the Join as a Professional page for an overview."],
    ],
  },
  {
    title: "Payments",
    items: [
      ["What does a consultation cost?", "Pricing varies by service and professional and is always shown before you confirm and pay — see our Pricing page."],
      ["When do I pay?", "Payment is required to confirm your booking, after you've reviewed the price and terms."],
      ["What happens if I cancel?", "Cancellations more than 24 hours before the scheduled time are eligible for a full refund — see Cancellation & Refunds."],
      ["How do refunds work?", "Approved refunds are returned to your original payment method within 5–10 business days."],
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="container-page py-16 max-w-3xl">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
      <p className="eyebrow">Support</p>
      <h1 className="mt-1 text-3xl font-black text-tw-ink">Frequently Asked Questions</h1>

      <div className="mt-8 space-y-10">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="text-lg font-black uppercase text-tw-ink">{section.title}</h2>
            <div className="mt-4 space-y-3">
              {section.items.map(([q, a]) => (
                <div key={q} className="rounded-xl border border-tw-border bg-white p-5">
                  <p className="font-bold text-tw-ink">{q}</p>
                  <p className="mt-1 text-sm text-tw-muted">{a}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
