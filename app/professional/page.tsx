import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { bookingStatusLabels, type BookingStatus } from "@/lib/enums";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default async function ProfessionalOverviewPage() {
  const session = await auth();
  const profile = await prisma.professionalProfile.findUnique({ where: { userId: session!.user.id } });
  if (!profile) return null;

  const bookings = await prisma.booking.findMany({
    where: { professionalId: profile.id },
    include: { service: true, client: true, slot: true, payment: true },
    orderBy: { createdAt: "desc" },
  });

  const now = new Date();
  const upcoming = bookings.filter((b) => b.status === "CONFIRMED" && b.slot.startsAt >= now);
  const completed = bookings.filter((b) => b.status === "COMPLETED");
  const earningsCents = completed.reduce((sum, b) => sum + b.priceCents, 0);

  return (
    <div>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Professional Portal" }]} />
      <h1 className="text-2xl font-black text-tw-ink">Overview</h1>

      <div className="mt-6 grid sm:grid-cols-4 gap-4">
        <Card>
          <p className="text-2xl font-black text-tw-ink">{upcoming.length}</p>
          <p className="text-sm text-tw-muted">Upcoming Bookings</p>
        </Card>
        <Card>
          <p className="text-2xl font-black text-tw-ink">{completed.length}</p>
          <p className="text-sm text-tw-muted">Completed</p>
        </Card>
        <Card>
          <p className="text-2xl font-black text-tw-ink">R{(earningsCents / 100).toFixed(0)}</p>
          <p className="text-sm text-tw-muted">Earnings</p>
        </Card>
        <Card>
          <p className="text-2xl font-black text-tw-ink">
            {profile.ratingAvg.toFixed(1)} ({profile.ratingCount})
          </p>
          <p className="text-sm text-tw-muted">Rating</p>
        </Card>
      </div>

      <h2 className="mt-8 font-black uppercase text-tw-ink text-sm">Bookings</h2>
      <div className="mt-3 space-y-3">
        {bookings.map((b) => (
          <Card key={b.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="font-bold text-tw-ink">{b.service.name}</p>
              <p className="text-sm text-tw-muted">
                {b.client.firstName} {b.client.lastName} · {b.slot.startsAt.toLocaleString("en-ZA")}
              </p>
              <span className="mt-1 inline-block text-xs font-bold uppercase text-tw-red">
                {bookingStatusLabels[b.status as BookingStatus]}
              </span>
            </div>
            <ButtonLink href={`/professional/bookings/${b.id}`} variant="outline-red" size="sm">
              View & Message
            </ButtonLink>
          </Card>
        ))}
        {bookings.length === 0 && <p className="text-sm text-tw-muted">No bookings yet.</p>}
      </div>
    </div>
  );
}
