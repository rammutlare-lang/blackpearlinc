import { Breadcrumbs } from "@/components/Breadcrumbs";

export default function PrivacyPolicyPage() {
  return (
    <div className="container-page py-16 max-w-3xl prose-content">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
      <p className="eyebrow">Legal</p>
      <h1 className="mt-1 text-3xl font-black text-tw-ink">Privacy Policy</h1>
      <p className="mt-4 text-sm text-tw-muted">Last updated: 2026</p>

      <div className="mt-6 space-y-5 text-sm text-tw-muted leading-relaxed">
        <p>
          Black Pearl Inc. (&quot;we&quot;, &quot;us&quot;) respects your privacy. This policy explains what
          personal information we collect when you use our platform to find and book
          labour law professionals, and how we use, store and protect it.
        </p>
        <h2 className="text-lg font-bold text-tw-ink">Information We Collect</h2>
        <p>
          Contact details (name, email, phone), account information, details of the
          workplace issue you describe when booking a consultation, booking and payment
          records, and messages exchanged with professionals through the platform.
        </p>
        <h2 className="text-lg font-bold text-tw-ink">How We Use Your Information</h2>
        <p>
          To match you with an appropriate professional, process bookings and payments,
          provide customer support, and improve our services. We do not sell your
          personal information.
        </p>
        <h2 className="text-lg font-bold text-tw-ink">Sharing With Professionals</h2>
        <p>
          When you book a consultation, relevant details of your enquiry are shared only
          with the professional you are matched with, so they can prepare for and
          conduct your consultation.
        </p>
        <h2 className="text-lg font-bold text-tw-ink">Your Rights</h2>
        <p>
          You may request access to, correction of, or deletion of your personal
          information at any time by contacting us. See our{" "}
          <a href="/popia" className="text-tw-red">
            POPIA Notice
          </a>{" "}
          for further detail on your rights under South African law.
        </p>
      </div>
    </div>
  );
}
