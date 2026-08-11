import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default async function AdminOverviewPage() {
  const [users, professionals, pendingVerification, bookings, paidPayments] = await Promise.all([
    prisma.user.count(),
    prisma.professionalProfile.count(),
    prisma.professionalProfile.count({ where: { verificationStatus: "PENDING" } }),
    prisma.booking.count(),
    prisma.payment.findMany({ where: { status: "PAID" } }),
  ]);

  const revenueCents = paidPayments.reduce((sum, p) => sum + p.amountCents, 0);
  const completedBookings = await prisma.booking.count({ where: { status: "COMPLETED" } });
  const cancelledBookings = await prisma.booking.count({ where: { status: "CANCELLED" } });

  return (
    <div>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Admin" }]} />
      <h1 className="text-2xl font-black text-tw-ink">Platform Overview</h1>

      <div className="mt-6 grid sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <Card>
          <p className="text-2xl font-black text-tw-ink">{users}</p>
          <p className="text-sm text-tw-muted">Total Users</p>
        </Card>
        <Card>
          <p className="text-2xl font-black text-tw-ink">{professionals}</p>
          <p className="text-sm text-tw-muted">Professionals</p>
        </Card>
        <Card>
          <p className="text-2xl font-black text-tw-red">{pendingVerification}</p>
          <p className="text-sm text-tw-muted">Pending Verification</p>
        </Card>
        <Card>
          <p className="text-2xl font-black text-tw-ink">{bookings}</p>
          <p className="text-sm text-tw-muted">Total Bookings</p>
        </Card>
        <Card>
          <p className="text-2xl font-black text-tw-ink">{completedBookings}</p>
          <p className="text-sm text-tw-muted">Completed Consultations</p>
        </Card>
        <Card>
          <p className="text-2xl font-black text-tw-ink">{cancelledBookings}</p>
          <p className="text-sm text-tw-muted">Cancelled Bookings</p>
        </Card>
        <Card>
          <p className="text-2xl font-black text-tw-ink">R{(revenueCents / 100).toFixed(0)}</p>
          <p className="text-sm text-tw-muted">Revenue Collected</p>
        </Card>
        <Card>
          <p className="text-2xl font-black text-tw-ink">
            {bookings > 0 ? ((completedBookings / bookings) * 100).toFixed(0) : 0}%
          </p>
          <p className="text-sm text-tw-muted">Completion Rate</p>
        </Card>
      </div>
    </div>
  );
}
