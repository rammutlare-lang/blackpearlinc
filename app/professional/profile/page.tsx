import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { ProfileForm } from "@/components/professional/ProfileForm";
import { ServicePricing } from "@/components/professional/ServicePricing";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default async function ProfessionalProfilePage() {
  const session = await auth();
  const profile = await prisma.professionalProfile.findUnique({
    where: { userId: session!.user.id },
    include: { services: true },
  });
  if (!profile) return null;

  const services = await prisma.service.findMany({ where: { active: true }, orderBy: { order: "asc" } });

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Professional Portal", href: "/professional" },
          { label: "Profile & Pricing" },
        ]}
      />
      <h1 className="text-2xl font-black text-tw-ink">Profile & Pricing</h1>

      <Card className="mt-6">
        <ProfileForm profile={profile} />
      </Card>

      <h2 className="mt-8 font-black uppercase text-tw-ink text-sm">Services You Offer</h2>
      <Card className="mt-3">
        <ServicePricing
          services={services}
          enabled={profile.services.map((s) => ({ serviceId: s.serviceId, priceCents: s.priceCents }))}
        />
      </Card>
    </div>
  );
}
