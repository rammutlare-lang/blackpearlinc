import { prisma } from "@/lib/prisma";
import { bookingStatusLabels, type BookingStatus } from "@/lib/enums";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({
    include: { client: true, professional: { include: { user: true } }, service: true, payment: true, slot: true },
    orderBy: { createdAt: "desc" },
  });

  const platformRevenueCents = bookings.reduce(
    (sum, b) => sum + (b.payment?.status === "PAID" ? b.payment.platformCents : 0),
    0
  );

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Admin", href: "/admin" },
          { label: "Bookings & Payments" },
        ]}
      />
      <h1 className="text-2xl font-black text-tw-ink">Bookings & Payments</h1>
      <p className="mt-2 text-sm text-tw-muted">
        Platform revenue to date: <span className="font-bold text-tw-ink">R{(platformRevenueCents / 100).toFixed(2)}</span>
      </p>
      <div className="mt-6 overflow-x-auto rounded-xl border border-tw-border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-tw-bg text-left text-xs uppercase text-tw-muted">
            <tr>
              <th className="p-3">Client</th>
              <th className="p-3">Professional</th>
              <th className="p-3">Service</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Total</th>
              <th className="p-3">Payout</th>
              <th className="p-3">Platform Revenue</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-t border-tw-border">
                <td className="p-3 font-semibold text-tw-ink">
                  {b.client.firstName} {b.client.lastName}
                </td>
                <td className="p-3 text-tw-muted">
                  {b.professional.user.firstName} {b.professional.user.lastName}
                </td>
                <td className="p-3 text-tw-muted">{b.service.name}</td>
                <td className="p-3 text-tw-muted">{b.slot.startsAt.toLocaleDateString("en-ZA")}</td>
                <td className="p-3 text-tw-muted">{bookingStatusLabels[b.status as BookingStatus]}</td>
                <td className="p-3 text-tw-muted">{b.payment?.status ?? "—"}</td>
                <td className="p-3 text-tw-muted">R{(b.priceCents / 100).toFixed(2)}</td>
                <td className="p-3 text-tw-muted">
                  {b.payment ? `R${(b.payment.payoutCents / 100).toFixed(2)}` : "—"}
                </td>
                <td className="p-3 font-semibold text-tw-ink">
                  {b.payment ? `R${(b.payment.platformCents / 100).toFixed(2)}` : "—"}
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td className="p-3 text-tw-muted" colSpan={9}>
                  No bookings yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
