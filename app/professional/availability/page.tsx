import { Card } from "@/components/ui/Card";
import { AvailabilityManager } from "@/components/professional/AvailabilityManager";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default function ProfessionalAvailabilityPage() {
  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Professional Portal", href: "/professional" },
          { label: "Availability" },
        ]}
      />
      <h1 className="text-2xl font-black text-tw-ink">Availability</h1>
      <p className="text-sm text-tw-muted mt-1">
        Add time slots you&apos;re available for. Clients can book any open slot.
      </p>
      <Card className="mt-6">
        <AvailabilityManager />
      </Card>
    </div>
  );
}
