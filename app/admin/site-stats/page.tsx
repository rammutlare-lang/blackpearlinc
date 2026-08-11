import { prisma } from "@/lib/prisma";
import { SiteStatEditor } from "@/components/admin/SiteStatEditor";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default async function AdminSiteStatsPage() {
  const stats = await prisma.siteStat.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Admin", href: "/admin" }, { label: "Site Stats" }]} />
      <h1 className="text-2xl font-black text-tw-ink">Site Stats</h1>
      <p className="text-sm text-tw-muted mt-1">
        These values power the homepage and How It Works statistics strips.
      </p>
      <div className="mt-6 space-y-3">
        {stats.map((s) => (
          <SiteStatEditor key={s.id} stat={s} />
        ))}
      </div>
    </div>
  );
}
