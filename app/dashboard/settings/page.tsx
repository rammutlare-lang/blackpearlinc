import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default async function DashboardSettingsPage() {
  const session = await auth();
  const user = await prisma.user.findUnique({ where: { id: session!.user.id } });

  return (
    <div>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Dashboard", href: "/dashboard" }, { label: "Settings" }]} />
      <h1 className="text-2xl font-black text-tw-ink">Profile Settings</h1>
      <Card className="mt-6 max-w-lg">
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between border-b border-tw-border pb-2">
            <dt className="text-tw-muted">Name</dt>
            <dd className="font-semibold text-tw-ink">
              {user?.firstName} {user?.lastName}
            </dd>
          </div>
          <div className="flex justify-between border-b border-tw-border pb-2">
            <dt className="text-tw-muted">Email</dt>
            <dd className="font-semibold text-tw-ink">{user?.email}</dd>
          </div>
          <div className="flex justify-between border-b border-tw-border pb-2">
            <dt className="text-tw-muted">Phone</dt>
            <dd className="font-semibold text-tw-ink">{user?.phone ?? "—"}</dd>
          </div>
          <div className="flex justify-between border-b border-tw-border pb-2">
            <dt className="text-tw-muted">Account Type</dt>
            <dd className="font-semibold text-tw-ink">{user?.accountType}</dd>
          </div>
          {user?.organisation && (
            <div className="flex justify-between pb-2">
              <dt className="text-tw-muted">Organisation</dt>
              <dd className="font-semibold text-tw-ink">{user.organisation}</dd>
            </div>
          )}
        </dl>
      </Card>
    </div>
  );
}
