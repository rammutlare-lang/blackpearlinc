import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { VerifyButtons } from "@/components/admin/VerifyButtons";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default async function AdminProfessionalsPage() {
  const professionals = await prisma.professionalProfile.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Admin", href: "/admin" },
          { label: "Verification Queue" },
        ]}
      />
      <h1 className="text-2xl font-black text-tw-ink">Professional Verification</h1>
      <div className="mt-6 space-y-3">
        {professionals.map((p) => (
          <Card key={p.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-bold text-tw-ink">
                {p.user.firstName} {p.user.lastName} — {p.designation}
              </p>
              <p className="text-sm text-tw-muted">{p.user.email} · {p.location || "No location set"}</p>
              <span
                className={`mt-1 inline-block text-xs font-bold uppercase ${
                  p.verificationStatus === "APPROVED"
                    ? "text-green-600"
                    : p.verificationStatus === "REJECTED"
                    ? "text-red-600"
                    : "text-tw-red"
                }`}
              >
                {p.verificationStatus}
              </span>
            </div>
            <VerifyButtons professionalId={p.id} />
          </Card>
        ))}
        {professionals.length === 0 && <p className="text-sm text-tw-muted">No professionals registered yet.</p>}
      </div>
    </div>
  );
}
