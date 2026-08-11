"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export function CancelBookingButton({ bookingId }: { bookingId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function cancel() {
    setLoading(true);
    setError(null);
    const res = await fetch(`/api/bookings/${bookingId}/cancel`, { method: "POST" });
    const body = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(body.error ?? "Could not cancel this booking.");
      return;
    }
    router.refresh();
  }

  return (
    <div>
      <Button variant="outline-red" size="sm" onClick={cancel} disabled={loading}>
        {loading ? "Cancelling..." : "Cancel Booking"}
      </Button>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}
