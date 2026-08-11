"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export function CompleteBookingButton({ bookingId }: { bookingId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function complete() {
    setLoading(true);
    await fetch(`/api/bookings/${bookingId}/complete`, { method: "POST" });
    setLoading(false);
    router.refresh();
  }

  return (
    <Button size="sm" onClick={complete} disabled={loading}>
      {loading ? "Marking..." : "Mark as Completed"}
    </Button>
  );
}
