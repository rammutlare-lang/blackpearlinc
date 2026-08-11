import { Breadcrumbs } from "@/components/Breadcrumbs";

export default function TermsPage() {
  return (
    <div className="container-page py-16 max-w-3xl">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms & Conditions" }]} />
      <p className="eyebrow">Legal</p>
      <h1 className="mt-1 text-3xl font-black text-tw-ink">Terms & Conditions</h1>

      <div className="mt-6 space-y-5 text-sm text-tw-muted leading-relaxed">
        <p>
          These Terms & Conditions govern your use of the Black Pearl Inc. platform. By
          creating an account or booking a consultation, you agree to these terms.
        </p>
        <h2 className="text-lg font-bold text-tw-ink">Our Role</h2>
        <p>
          Black Pearl Inc. is a technology platform that connects clients with
          independent, vetted labour law professionals. We are not a law firm and do not
          ourselves provide legal advice or representation. Each professional is
          responsible for the advice they give.
        </p>
        <h2 className="text-lg font-bold text-tw-ink">Accounts</h2>
        <p>
          You are responsible for keeping your account credentials confidential and for
          all activity under your account.
        </p>
        <h2 className="text-lg font-bold text-tw-ink">Bookings & Payments</h2>
        <p>
          Consultation prices are displayed before booking. Payment is required to
          confirm a booking. See our{" "}
          <a href="/cancellation-refund-policy" className="text-tw-red">
            Cancellation & Refund Policy
          </a>{" "}
          for changes to confirmed bookings.
        </p>
        <h2 className="text-lg font-bold text-tw-ink">Acceptable Use</h2>
        <p>
          You agree not to misuse the platform, submit false information, or attempt to
          circumvent our booking and payment process to transact with professionals
          outside the platform.
        </p>
        <h2 className="text-lg font-bold text-tw-ink">Changes</h2>
        <p>We may update these terms from time to time; continued use constitutes acceptance of the updated terms.</p>
      </div>
    </div>
  );
}
