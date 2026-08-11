import { Breadcrumbs } from "@/components/Breadcrumbs";

export default function ProfessionalDisclaimerPage() {
  return (
    <div className="container-page py-16 max-w-3xl">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Professional Disclaimer" }]} />
      <p className="eyebrow">Legal</p>
      <h1 className="mt-1 text-3xl font-black text-tw-ink">Professional Disclaimer</h1>

      <div className="mt-6 space-y-5 text-sm text-tw-muted leading-relaxed">
        <p>
          Black Pearl Inc. is a technology platform connecting clients with independent
          labour law professionals. We carry out a vetting process before approving a
          professional&apos;s profile, but we do not employ professionals and are not a
          law firm.
        </p>
        <p>
          Professionals listed on the platform are responsible for the accuracy of their
          own qualifications, experience and advice. Consultations do not guarantee any
          particular legal outcome, and information shared on the platform is for
          general guidance and should not be treated as a substitute for formal legal
          representation where required.
        </p>
        <p>
          If you have a concern about advice received from a professional, please use
          our{" "}
          <a href="/complaints" className="text-tw-red">
            Complaints & Dispute Resolution
          </a>{" "}
          process.
        </p>
      </div>
    </div>
  );
}
