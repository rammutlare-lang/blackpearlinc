"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export function VerifyButtons({ professionalId }: { professionalId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  async function setStatus(status: "APPROVED" | "REJECTED") {
    setLoading(status);
    await fetch(`/api/admin/professionals/${professionalId}/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setLoading(null);
    router.refresh();
  }

  return (
    <div className="flex gap-2">
      <Button size="sm" onClick={() => setStatus("APPROVED")} disabled={!!loading}>
        {loading === "APPROVED" ? "Approving..." : "Approve"}
      </Button>
      <Button size="sm" variant="outline-red" onClick={() => setStatus("REJECTED")} disabled={!!loading}>
        {loading === "REJECTED" ? "Rejecting..." : "Reject"}
      </Button>
    </div>
  );
}
