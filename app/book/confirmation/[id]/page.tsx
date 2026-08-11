import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default async function BookingConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { id } = await params;
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: {
      service: true,
      professional: { include: { user: true } },
      slot: true,
      payment: true,
    },
  });

  if (!booking || booking.clientId !== session.user.id) notFound();

  return (
    <div className="container-page py-16 max-w-2xl">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Book Consultation", href: "/book" },
          { label: "Confirmation" },
        ]}
      />
      <div className="rounded-2xl border border-tw-border bg-white p-8 text-center">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-tw-red/10 text-tw-red text-3xl">
          ✓
        </span>
        <h1 className="mt-4 text-2xl font-black text-tw-ink">Booking Confirmed</h1>
        <p className="mt-2 text-sm text-tw-muted">
          A confirmation has been sent to your account. Here are your consultation
          details.
        </p>

        <dl className="mt-6 text-left space-y-2 text-sm border-t border-tw-border pt-6">
          <div className="flex justify-between">
            <dt className="text-tw-muted">Service</dt>
            <dd className="font-semibold text-tw-ink">{booking.service.name}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-tw-muted">Professional</dt>
            <dd className="font-semibold text-tw-ink">
              {booking.professional.user.firstName} {booking.professional.user.lastName}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-tw-muted">Date & Time</dt>
            <dd className="font-semibold text-tw-ink">
              {booking.slot.startsAt.toLocaleString("en-ZA")}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-tw-muted">Type</dt>
            <dd className="font-semibold text-tw-ink">
              {booking.consultationType === "ONLINE" ? "Online" : "In Person"}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-tw-muted">Reference</dt>
            <dd className="font-semibold text-tw-ink">{booking.payment?.reference}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-tw-muted">Amount Paid</dt>
            <dd className="font-black text-tw-red">R{(booking.priceCents / 100).toFixed(2)}</dd>
          </div>
        </dl>

        <ButtonLink href="/dashboard" variant="red" size="lg" arrow className="mt-8">
          Go to My Dashboard
        </ButtonLink>
      </div>
    </div>
  );
}
