import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default function ComplaintsPage() {
  return (
    <div className="container-page py-16 max-w-3xl">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Complaints" }]} />
      <p className="eyebrow">Support</p>
      <h1 className="mt-1 text-3xl font-black text-tw-ink">Complaints & Dispute Resolution</h1>

      <div className="mt-6 space-y-5 text-sm text-tw-muted leading-relaxed">
        <p>
          We take complaints about the platform or about a consultation seriously. If
          something didn&apos;t go as expected, please tell us.
        </p>
        <h2 className="text-lg font-bold text-tw-ink">How to Raise a Complaint</h2>
        <p>
          Contact our team at hello@blackpearlinc.co.za with your booking reference and a
          description of the issue. We aim to acknowledge complaints within 2 business
          days.
        </p>
        <h2 className="text-lg font-bold text-tw-ink">What Happens Next</h2>
        <p>
          We review the complaint, may contact the relevant professional for their
          response, and work with you towards a fair resolution — which may include a
          rebooking, refund, or removal of a professional from the platform where
          warranted.
        </p>
      </div>

      <ButtonLink href="/contact" variant="red" size="md" arrow className="mt-8">
        Contact Us
      </ButtonLink>
    </div>
  );
}
