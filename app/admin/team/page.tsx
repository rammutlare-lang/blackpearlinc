import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { TeamManager } from "@/components/admin/TeamManager";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default async function AdminTeamPage() {
  const members = await prisma.teamMember.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Admin", href: "/admin" }, { label: "Team" }]} />
      <h1 className="text-2xl font-black text-tw-ink">Leadership Team</h1>
      <Card className="mt-6">
        <TeamManager members={members} />
      </Card>
    </div>
  );
}
