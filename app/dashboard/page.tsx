import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { bookingStatusLabels, type BookingStatus } from "@/lib/enums";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default async function DashboardOverviewPage() {
  const session = await auth();
  const bookings = await prisma.booking.findMany({
    where: { clientId: session!.user.id },
    include: { service: true, professional: { include: { user: true } }, slot: true, payment: true },
    orderBy: { createdAt: "desc" },
  });

  const now = new Date();
  const upcoming = bookings.filter((b) => b.slot.startsAt >= now && b.status !== "CANCELLED");
  const past = bookings.filter((b) => b.slot.startsAt < now || b.status === "CANCELLED");

  return (
    <div>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Dashboard" }]} />
      <h1 className="text-2xl font-black text-tw-ink">My Consultations</h1>

      <div className="mt-6 grid sm:grid-cols-3 gap-4">
        <Card>
          <p className="text-2xl font-black text-tw-ink">{upcoming.length}</p>
          <p className="text-sm text-tw-muted">Upcoming</p>
        </Card>
        <Card>
          <p className="text-2xl font-black text-tw-ink">{past.length}</p>
          <p className="text-sm text-tw-muted">Past</p>
        </Card>
        <Card>
          <p className="text-2xl font-black text-tw-ink">
            R{(bookings.reduce((sum, b) => sum + (b.payment?.status === "PAID" ? b.priceCents : 0), 0) / 100).toFixed(0)}
          </p>
          <p className="text-sm text-tw-muted">Total Paid</p>
        </Card>
      </div>

      <h2 className="mt-8 font-black uppercase text-tw-ink text-sm">Upcoming</h2>
      <div className="mt-3 space-y-3">
        {upcoming.map((b) => (
          <Card key={b.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="font-bold text-tw-ink">{b.service.name}</p>
              <p className="text-sm text-tw-muted">
                with {b.professional.user.firstName} {b.professional.user.lastName} ·{" "}
                {b.slot.startsAt.toLocaleString("en-ZA")}
              </p>
              <span className="mt-1 inline-block text-xs font-bold uppercase text-tw-red">
                {bookingStatusLabels[b.status as BookingStatus]}
              </span>
            </div>
            <ButtonLink href={`/dashboard/bookings/${b.id}`} variant="outline-red" size="sm">
              View & Message
            </ButtonLink>
          </Card>
        ))}
        {upcoming.length === 0 && <p className="text-sm text-tw-muted">No upcoming consultations.</p>}
      </div>

      <h2 className="mt-8 font-black uppercase text-tw-ink text-sm">Past & Cancelled</h2>
      <div className="mt-3 space-y-3">
        {past.map((b) => (
          <Card key={b.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="font-bold text-tw-ink">{b.service.name}</p>
              <p className="text-sm text-tw-muted">
                with {b.professional.user.firstName} {b.professional.user.lastName} ·{" "}
                {b.slot.startsAt.toLocaleString("en-ZA")}
              </p>
              <span className="mt-1 inline-block text-xs font-bold uppercase text-tw-muted">
                {bookingStatusLabels[b.status as BookingStatus]}
              </span>
            </div>
            <ButtonLink href={`/dashboard/bookings/${b.id}`} variant="outline-red" size="sm">
              View
            </ButtonLink>
          </Card>
        ))}
        {past.length === 0 && <p className="text-sm text-tw-muted">No past consultations yet.</p>}
      </div>

      <div className="mt-8">
        <ButtonLink href="/book" variant="red" size="md" arrow>
          Book Another Consultation
        </ButtonLink>
      </div>
    </div>
  );
}
