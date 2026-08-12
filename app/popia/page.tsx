import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "POPIA Notice",
  description: "Black Pearl's notice on processing personal information under the Protection of Personal Information Act (POPIA).",
};

export default function PopiaPage() {
  return (
    <div className="container-page py-16 max-w-3xl">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "POPIA Notice" }]} />
      <p className="eyebrow">Legal</p>
      <h1 className="mt-1 text-3xl font-black text-tw-ink">POPIA Notice</h1>

      <div className="mt-6 space-y-5 text-sm text-tw-muted leading-relaxed">
        <p>
          Black Pearl Inc. processes personal information in accordance with the
          Protection of Personal Information Act 4 of 2013 (POPIA). We collect only the
          information necessary to match you with a suitable labour law professional,
          process your booking and payment, and provide support.
        </p>
        <h2 className="text-lg font-bold text-tw-ink">Lawful Basis for Processing</h2>
        <p>
          We process your information based on your consent when registering or booking
          a consultation, and to perform the contract you enter into with us when you
          book a paid consultation.
        </p>
        <h2 className="text-lg font-bold text-tw-ink">Retention</h2>
        <p>
          We retain booking and payment records for as long as necessary to comply with
          legal, tax and accounting obligations, after which they are securely deleted.
        </p>
        <h2 className="text-lg font-bold text-tw-ink">Your Rights Under POPIA</h2>
        <p>
          You have the right to access, correct or request deletion of your personal
          information, to object to processing, and to lodge a complaint with the
          Information Regulator of South Africa if you believe your information has been
          mishandled.
        </p>
        <h2 className="text-lg font-bold text-tw-ink">Information Officer</h2>
        <p>
          Our Information Officer can be contacted at hello@blackpearlinc.co.za for any
          POPIA-related requests or queries.
        </p>
      </div>
    </div>
  );
}
