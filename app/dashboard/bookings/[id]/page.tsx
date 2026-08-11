import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { MessageThread } from "@/components/dashboard/MessageThread";
import { CancelBookingButton } from "@/components/dashboard/CancelBookingButton";
import { bookingStatusLabels, type BookingStatus } from "@/lib/enums";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default async function ClientBookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const { id } = await params;
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { service: true, professional: { include: { user: true } }, slot: true, payment: true },
  });

  if (!booking || booking.clientId !== session!.user.id) notFound();

  const canCancel = booking.status === "CONFIRMED" && booking.slot.startsAt.getTime() - Date.now() > 24 * 60 * 60 * 1000;

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Dashboard", href: "/dashboard" },
          { label: booking.service.name },
        ]}
      />
      <h1 className="text-2xl font-black text-tw-ink">{booking.service.name}</h1>
      <span className="text-xs font-bold uppercase text-tw-red">{bookingStatusLabels[booking.status as BookingStatus]}</span>

      <Card className="mt-4">
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-tw-muted">Professional</dt>
            <dd className="font-semibold text-tw-ink">
              {booking.professional.user.firstName} {booking.professional.user.lastName}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-tw-muted">Date & Time</dt>
            <dd className="font-semibold text-tw-ink">{booking.slot.startsAt.toLocaleString("en-ZA")}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-tw-muted">Type</dt>
            <dd className="font-semibold text-tw-ink">{booking.consultationType === "ONLINE" ? "Online" : "In Person"}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-tw-muted">Amount</dt>
            <dd className="font-semibold text-tw-ink">R{(booking.priceCents / 100).toFixed(2)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-tw-muted">Receipt Reference</dt>
            <dd className="font-semibold text-tw-ink">{booking.payment?.reference}</dd>
          </div>
        </dl>
        <p className="mt-4 text-sm text-tw-muted border-t border-tw-border pt-3">{booking.issueDescription}</p>
        {canCancel && (
          <div className="mt-4">
            <CancelBookingButton bookingId={booking.id} />
          </div>
        )}
      </Card>

      <h2 className="mt-8 font-black uppercase text-tw-ink text-sm">Messages</h2>
      <Card className="mt-3">
        <MessageThread bookingId={booking.id} currentUserId={session!.user.id} />
      </Card>
    </div>
  );
}
