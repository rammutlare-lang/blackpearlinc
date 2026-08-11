import { ContactForm } from "@/components/ContactForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";

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
          <div className="mt-8 space-y-3 text-sm text-tw-muted">
            <p>📞 087 550 0278</p>
            <p>✉️ hello@blackpearlinc.co.za</p>
            <p>📍 123 Rivonia Road, Sandton, Johannesburg, 2196</p>
          </div>
        </div>
        <div className="rounded-2xl border border-tw-border bg-white p-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
