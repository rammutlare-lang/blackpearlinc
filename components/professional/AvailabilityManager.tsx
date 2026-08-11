"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

type Slot = { id: string; startsAt: string; isBooked: boolean };

export function AvailabilityManager() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function load() {
    fetch("/api/professional/availability")
      .then((r) => r.json())
      .then(setSlots);
  }

  useEffect(load, []);

  async function addSlot() {
    if (!date || !time) {
      setError("Choose a date and time.");
      return;
    }
    setError(null);
    setLoading(true);
    const res = await fetch("/api/professional/availability", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ startsAt: new Date(`${date}T${time}`).toISOString(), durationMins: 45 }),
    });
    setLoading(false);
    const body = await res.json();
    if (!res.ok) {
      setError(body.error ?? "Could not add slot.");
      return;
    }
    load();
  }

  async function removeSlot(id: string) {
    await fetch(`/api/professional/availability/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <div className="flex flex-wrap items-end gap-3">
        <div>
          <label className="text-sm font-medium text-tw-ink">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1.5 block rounded-lg border border-tw-border px-3 py-2 text-sm outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-tw-ink">Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mt-1.5 block rounded-lg border border-tw-border px-3 py-2 text-sm outline-none"
          />
        </div>
        <Button onClick={addSlot} disabled={loading} size="sm">
          Add Slot
        </Button>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {slots.map((s) => (
          <div key={s.id} className="flex items-center justify-between rounded-lg border border-tw-border p-3 text-sm">
            <div>
              <p className="font-semibold text-tw-ink">
                {new Date(s.startsAt).toLocaleDateString("en-ZA", { weekday: "short", day: "numeric", month: "short" })}
              </p>
              <p className="text-tw-muted">{new Date(s.startsAt).toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" })}</p>
            </div>
            {s.isBooked ? (
              <span className="text-xs font-bold text-tw-red">Booked</span>
            ) : (
              <button onClick={() => removeSlot(s.id)} className="text-xs font-bold text-tw-muted hover:text-tw-red">
                Remove
              </button>
            )}
          </div>
        ))}
        {slots.length === 0 && <p className="text-sm text-tw-muted">No upcoming availability yet.</p>}
      </div>
    </div>
  );
}
