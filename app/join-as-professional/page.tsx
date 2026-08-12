import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HeroBackground } from "@/components/HeroBackground";

const whoCanApply = [
  "Labour attorneys",
  "HR professionals",
  "Employee relations practitioners",
  "Mediators",
  "Labour consultants",
  "CCMA specialists",
];

const steps = [
  ["1", "Apply", "Tell us about your experience, qualifications and areas of expertise."],
  ["2", "Verification", "We verify your identity, qualifications and professional registration."],
  ["3", "Approval", "Once approved, your profile is reviewed and published on the platform."],
  ["4", "Profile", "Set your pricing, availability and consultation formats."],
  ["5", "Receive Bookings", "Clients find and book you directly through Black Pearl."],
  ["6", "Get Paid", "Consultations are paid securely upfront through the platform."],
];

const details = [
  ["Commission", "Black Pearl retains a platform commission on each paid consultation — full rate sheet provided during onboarding."],
  ["Professional Requirements", "You must hold the relevant qualification, registration or accreditation for the services you offer."],
  ["Verification", "Identity, qualifications, professional registration and experience are verified before your profile goes live."],
  ["Code of Conduct", "Professionals are expected to maintain confidentiality, professionalism and to act within their area of expertise."],
  ["Payment", "Client payments are processed through Black Pearl and paid out to professionals on a regular cycle."],
  ["Complaints", "Client complaints are reviewed through our formal complaints process — see our Complaints page for details."],
];

export default function JoinAsProfessionalPage() {
  return (
    <div>
      <section className="bg-tw-black relative overflow-hidden">
        <HeroBackground src="/images/hero-professionals.jpg" />
        <div className="container-page py-16 relative z-10">
          <Breadcrumbs dark items={[{ label: "Home", href: "/" }, { label: "Join as a Professional" }]} />
          <p className="eyebrow">Are You an Employee Relations Professional?</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-black text-white max-w-2xl">
            Join <span className="text-tw-red">Black Pearl Inc.</span>
          </h1>
          <p className="mt-4 text-white/60 max-w-xl">
            Get access to clients seeking professional workplace assistance and grow
            your practice through a trusted, verified platform.
          </p>
          <ButtonLink href="/register" variant="red" size="lg" arrow className="mt-6">
            Apply Now
          </ButtonLink>
        </div>
      </section>

      <section className="container-page py-16">
        <p className="eyebrow text-center">Who Can Apply?</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {whoCanApply.map((w) => (
            <span key={w} className="text-sm font-bold text-tw-ink bg-tw-bg rounded-full px-4 py-2">
              {w}
            </span>
          ))}
        </div>

        <p className="mt-14 eyebrow text-center">How It Works</p>
        <h2 className="mt-2 text-center text-2xl md:text-3xl font-black uppercase text-tw-ink">
          Apply → Verification → Approval → Profile → Bookings → Paid
        </h2>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map(([n, title, desc]) => (
            <div key={n} className="rounded-2xl border border-tw-border bg-white p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-tw-red text-white font-black">
                {n}
              </span>
              <p className="mt-4 font-black uppercase text-tw-ink">{title}</p>
              <p className="mt-1 text-sm text-tw-muted">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 grid sm:grid-cols-2 gap-6">
          {details.map(([title, desc]) => (
            <div key={title} className="rounded-2xl border border-tw-border bg-white p-6">
              <p className="font-bold text-tw-ink">{title}</p>
              <p className="mt-1 text-sm text-tw-muted">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-tw-black">
        <div className="container-page py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white font-bold">Ready to grow your practice?</p>
          <ButtonLink href="/register" variant="red" size="md" arrow>
            Apply to Join
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
