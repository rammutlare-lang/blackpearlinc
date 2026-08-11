import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default async function AdminResourcesPage() {
  const resources = await prisma.resource.findMany({ orderBy: { publishedAt: "desc" } });

  return (
    <div>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Admin", href: "/admin" }, { label: "Resources" }]} />
      <h1 className="text-2xl font-black text-tw-ink">Resources</h1>
      <Card className="mt-6">
        <ResourceManager resources={resources} />
      </Card>
    </div>
  );
}
