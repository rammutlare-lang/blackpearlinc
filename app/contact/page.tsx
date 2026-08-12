import { ContactForm } from "@/components/ContactForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const reasons = [
  ["General enquiries", "Questions about Black Pearl or how the platform works."],
  ["Client support", "Help with a booking, payment or your account."],
  ["Professional enquiries", "Questions about joining as a professional."],
  ["Business partnerships", "Partnership or employer-account enquiries."],
  ["Complaints", "Raise a formal complaint — see our Complaints page."],
];

export default function ContactPage() {
  return (
    <div className="container-page py-16">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact Us" }]} />
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <p className="eyebrow">Get In Touch</p>
          <h1 className="mt-1 text-3xl md:text-4xl font-black text-tw-ink">
            We&apos;re Here to <span className="text-tw-red">Help</span>
          </h1>
          <p className="mt-4 text-tw-muted">
            Have a question about our services or need help booking a consultation? Send
            us a message and our team will respond as soon as possible.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-3">
            {reasons.map(([title, desc]) => (
              <div key={title} className="rounded-lg border border-tw-border bg-white p-3">
                <p className="text-sm font-bold text-tw-ink">{title}</p>
                <p className="text-xs text-tw-muted">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-3 text-sm text-tw-muted">
            <p>📞 087 550 0278</p>
            <p>✉️ hello@blackpearlinc.co.za</p>
            <p>📍 123 Rivonia Road, Sandton, Johannesburg, 2196</p>
            <p>
              💬{" "}
              <a href="https://wa.me/27875500278" className="text-tw-red font-semibold">
                Message us on WhatsApp
              </a>
            </p>
          </div>
        </div>
        <div className="rounded-2xl border border-tw-border bg-white p-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
