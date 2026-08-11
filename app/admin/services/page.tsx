import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { ServiceManager } from "@/components/admin/ServiceManager";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Admin", href: "/admin" }, { label: "Services" }]} />
      <h1 className="text-2xl font-black text-tw-ink">Services</h1>
      <Card className="mt-6">
        <ServiceManager services={services} />
      </Card>
    </div>
  );
}
