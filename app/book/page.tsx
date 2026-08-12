"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HeroBackground } from "@/components/HeroBackground";
import { Input } from "@/components/ui/Input";

type Service = { id: string; slug: string; name: string; defaultPriceCents: number };
type ProfessionalService = { priceCents: number | null; service: Service };
type Professional = {
  id: string;
  designation: string;
  location: string;
  ratingAvg: number;
  ratingCount: number;
  specializations: string;
  offersOnline: boolean;
  offersInPerson: boolean;
  user: { firstName: string; lastName: string };
  services: ProfessionalService[];
};
type Slot = { id: string; startsAt: string; endsAt: string };

const steps = ["Your Issue", "Choose a Professional", "Pick a Time", "Review & Pay"];

export default function BookPage() {
  return (
    <Suspense fallback={null}>
      <BookWizard />
    </Suspense>
  );
}

function BookWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  const [step, setStep] = useState(1);
  const [services, setServices] = useState<Service[]>([]);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [serviceId, setServiceId] = useState(searchParams.get("service") ?? "");
  const [issueDescription, setIssueDescription] = useState("");
  const [consultationType, setConsultationType] = useState<"ONLINE" | "IN_PERSON">("ONLINE");
  const [professionalId, setProfessionalId] = useState(searchParams.get("professional") ?? "");
  const [slotId, setSlotId] = useState("");
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setFullName(session.user.name ?? "");
      setEmail(session.user.email ?? "");
    }
  }, [session]);

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((data: Service[]) => {
        setServices(data);
        const preselected = searchParams.get("service");
        if (preselected) {
          const match = data.find((s) => s.slug === preselected);
          if (match) setServiceId(match.id);
        }
      });
  }, [searchParams]);

  useEffect(() => {
    if (professionalId && step >= 3) {
      setLoading(true);
      fetch(`/api/professionals/${professionalId}/slots`)
        .then((r) => r.json())
        .then((data: Slot[]) => setSlots(data))
        .finally(() => setLoading(false));
    }
  }, [professionalId, step]);

  const selectedService = useMemo(() => services.find((s) => s.id === serviceId), [services, serviceId]);
  const selectedProfessional = useMemo(
    () => professionals.find((p) => p.id === professionalId),
    [professionals, professionalId]
  );
  const selectedSlot = useMemo(() => slots.find((s) => s.id === slotId), [slots, slotId]);
  const price = useMemo(() => {
    const override = selectedProfessional?.services.find((ps) => ps.service.id === serviceId)?.priceCents;
    return override ?? selectedService?.defaultPriceCents ?? 0;
  }, [selectedProfessional, selectedService, serviceId]);

  async function goToProfessionals() {
    if (!serviceId || issueDescription.trim().length < 10) {
      setError("Please select a service and describe your issue (at least 10 characters).");
      return;
    }
    setError(null);
    setLoading(true);
    const res = await fetch(`/api/professionals?serviceId=${serviceId}`);
    const data: Professional[] = await res.json();
    setProfessionals(data);
    setLoading(false);
    setStep(2);
  }

  async function confirmAndPay() {
    if (!session?.user) {
      router.push(`/login?callbackUrl=/book`);
      return;
    }
    setSubmitting(true);
    setError(null);
    const createRes = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ professionalId, serviceId, slotId, consultationType, issueDescription }),
    });
    const createBody = await createRes.json();
    if (!createRes.ok) {
      setError(createBody.error ?? "Could not create booking.");
      setSubmitting(false);
      return;
    }

    const payRes = await fetch(`/api/bookings/${createBody.id}/pay`, { method: "POST" });
    const payBody = await payRes.json();
    setSubmitting(false);
    if (!payRes.ok) {
      setError(payBody.error ?? "Payment failed.");
      return;
    }
    router.push(`/book/confirmation/${createBody.id}`);
  }

  return (
    <div>
      <section className="bg-tw-black relative overflow-hidden">
        <HeroBackground src="/images/hero-book.jpg" />
        <div className="container-page py-16 relative z-10">
          <Breadcrumbs dark items={[{ label: "Home", href: "/" }, { label: "Book Consultation" }]} />
          <p className="eyebrow">Book Your Consultation</p>
          <h1 className="mt-1 text-3xl md:text-4xl font-black text-white">
            Schedule a Confidential Consultation
          </h1>
        </div>
      </section>

      <div className="container-page py-12 max-w-4xl">
      <div className="mt-0 flex flex-wrap gap-4">
        {steps.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <span
              className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold ${
                step === i + 1 ? "bg-tw-red text-white" : step > i + 1 ? "bg-tw-black text-white" : "bg-tw-bg text-tw-muted"
              }`}
            >
              {i + 1}
            </span>
            <span className={`text-xs font-bold ${step === i + 1 ? "text-tw-ink" : "text-tw-muted"}`}>{label}</span>
          </div>
        ))}
      </div>

      {error && <p className="mt-4 text-sm text-red-600 bg-red-50 rounded-lg p-3">{error}</p>}

      <div className="mt-8 rounded-2xl border border-tw-border bg-white p-6 md:p-8">
        {step === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-tw-ink">Full Name</label>
                <div className="mt-1.5">
                  <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full name" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-tw-ink">Email Address</label>
                <div className="mt-1.5">
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-tw-ink">Phone Number</label>
                <div className="mt-1.5">
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-tw-ink">Organisation (Optional)</label>
                <div className="mt-1.5">
                  <Input value={organisation} onChange={(e) => setOrganisation(e.target.value)} placeholder="Organisation" />
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-tw-ink">I Need Help With</label>
              <select
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-tw-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-tw-red/30"
              >
                <option value="">Select a service...</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} — from R{(s.defaultPriceCents / 100).toFixed(0)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-tw-ink">Describe Your Issue</label>
              <textarea
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
                rows={4}
                placeholder="Tell us briefly what's happening..."
                className="mt-1.5 w-full rounded-lg border border-tw-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-tw-red/30"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-tw-ink">Preferred Consultation Type</label>
              <div className="mt-1.5 flex gap-3">
                {(["ONLINE", "IN_PERSON"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setConsultationType(t)}
                    className={`rounded-lg border px-4 py-2 text-sm font-semibold ${
                      consultationType === t ? "border-tw-red bg-tw-red/5 text-tw-red" : "border-tw-border text-tw-muted"
                    }`}
                  >
                    {t === "ONLINE" ? "Online" : "In Person"}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs text-tw-muted">🔒 Your information is confidential and protected.</p>

            <Button onClick={goToProfessionals} size="lg" disabled={loading} arrow>
              {loading ? "Finding professionals..." : "Find a Professional"}
            </Button>
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="text-sm text-tw-muted mb-4">
              We matched {professionals.length} vetted professional(s) for{" "}
              <strong>{selectedService?.name}</strong>.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {professionals.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setProfessionalId(p.id);
                    setStep(3);
                  }}
                  className={`text-left rounded-xl border p-4 hover:border-tw-red transition-colors ${
                    professionalId === p.id ? "border-tw-red" : "border-tw-border"
                  }`}
                >
                  <p className="font-bold text-tw-ink">
                    {p.user.firstName} {p.user.lastName}
                  </p>
                  <p className="text-xs text-tw-red">{p.designation}</p>
                  <p className="text-xs text-tw-muted">{p.location}</p>
                  <p className="text-xs text-tw-muted mt-1">
                    ★ {p.ratingAvg.toFixed(1)} ({p.ratingCount})
                  </p>
                </button>
              ))}
              {professionals.length === 0 && (
                <p className="text-sm text-tw-muted">No professionals available for this service right now.</p>
              )}
            </div>
            <Button variant="outline-red" size="sm" className="mt-6" onClick={() => setStep(1)}>
              Back
            </Button>
          </div>
        )}

        {step === 3 && (
          <div>
            <p className="text-sm text-tw-muted mb-4">
              Choose an available time with {selectedProfessional?.user.firstName}{" "}
              {selectedProfessional?.user.lastName}.
            </p>
            {loading ? (
              <p className="text-sm text-tw-muted">Loading availability...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {slots.map((s) => {
                  const d = new Date(s.startsAt);
                  return (
                    <button
                      key={s.id}
                      onClick={() => {
                        setSlotId(s.id);
                        setStep(4);
                      }}
                      className={`rounded-lg border p-3 text-sm hover:border-tw-red ${
                        slotId === s.id ? "border-tw-red bg-tw-red/5" : "border-tw-border"
                      }`}
                    >
                      <p className="font-bold text-tw-ink">
                        {d.toLocaleDateString("en-ZA", { weekday: "short", day: "numeric", month: "short" })}
                      </p>
                      <p className="text-tw-muted">{d.toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" })}</p>
                    </button>
                  );
                })}
                {slots.length === 0 && <p className="text-sm text-tw-muted">No upcoming availability.</p>}
              </div>
            )}
            <Button variant="outline-red" size="sm" className="mt-6" onClick={() => setStep(2)}>
              Back
            </Button>
          </div>
        )}

        {step === 4 && (
          <div>
            <h3 className="font-black uppercase text-tw-ink">Review Your Consultation</h3>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between border-b border-tw-border pb-2">
                <dt className="text-tw-muted">Service</dt>
                <dd className="font-semibold text-tw-ink">{selectedService?.name}</dd>
              </div>
              <div className="flex justify-between border-b border-tw-border pb-2">
                <dt className="text-tw-muted">Professional</dt>
                <dd className="font-semibold text-tw-ink">
                  {selectedProfessional?.user.firstName} {selectedProfessional?.user.lastName}
                </dd>
              </div>
              <div className="flex justify-between border-b border-tw-border pb-2">
                <dt className="text-tw-muted">Date & Time</dt>
                <dd className="font-semibold text-tw-ink">
                  {selectedSlot && new Date(selectedSlot.startsAt).toLocaleString("en-ZA")}
                </dd>
              </div>
              <div className="flex justify-between border-b border-tw-border pb-2">
                <dt className="text-tw-muted">Type</dt>
                <dd className="font-semibold text-tw-ink">{consultationType === "ONLINE" ? "Online" : "In Person"}</dd>
              </div>
              <div className="flex justify-between pb-2">
                <dt className="text-tw-muted">Price</dt>
                <dd className="font-black text-tw-red text-lg">R{(price / 100).toFixed(2)}</dd>
              </div>
            </dl>

            <label className="mt-4 flex items-start gap-2 text-sm text-tw-muted">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5" />
              <span>
                I accept the{" "}
                <Link href="/consultation-terms" className="text-tw-red">
                  Consultation Terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy-policy" className="text-tw-red">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>

            {status !== "authenticated" ? (
              <div className="mt-6 rounded-lg bg-tw-bg p-4 text-sm text-tw-muted">
                Please{" "}
                <Link href="/login?callbackUrl=/book" className="text-tw-red font-semibold">
                  log in
                </Link>{" "}
                or{" "}
                <Link href="/register" className="text-tw-red font-semibold">
                  create an account
                </Link>{" "}
                to complete payment and confirm your booking.
              </div>
            ) : (
              <Button onClick={confirmAndPay} size="lg" className="mt-6" disabled={!agreed || submitting} arrow>
                {submitting ? "Processing payment..." : `Pay R${(price / 100).toFixed(2)} & Confirm`}
              </Button>
            )}

            <Button variant="outline-red" size="sm" className="mt-6 ml-3" onClick={() => setStep(3)}>
              Back
            </Button>
          </div>
        )}
      </div>

      <p className="mt-6 text-xs text-tw-muted">
        Need help choosing? <ButtonLink href="/contact" variant="outline-red" size="sm">Contact Us</ButtonLink>
      </p>
      </div>
    </div>
  );
}
