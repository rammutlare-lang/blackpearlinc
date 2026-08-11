"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Service = { id: string; name: string; defaultPriceCents: number };
type Enabled = { serviceId: string; priceCents: number | null };

export function ServicePricing({ services, enabled }: { services: Service[]; enabled: Enabled[] }) {
  const router = useRouter();
  const [state, setState] = useState(
    Object.fromEntries(services.map((s) => {
      const e = enabled.find((x) => x.serviceId === s.id);
      return [s.id, { on: !!e, price: e?.priceCents ?? s.defaultPriceCents }];
    }))
  );
  const [savingId, setSavingId] = useState<string | null>(null);

  async function toggle(serviceId: string) {
    const next = { ...state[serviceId], on: !state[serviceId].on };
    setState({ ...state, [serviceId]: next });
    setSavingId(serviceId);
    await fetch("/api/professional/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serviceId, enabled: next.on, priceCents: next.price }),
    });
    setSavingId(null);
    router.refresh();
  }

  async function updatePrice(serviceId: string, price: number) {
    setState({ ...state, [serviceId]: { ...state[serviceId], price } });
  }

  async function savePrice(serviceId: string) {
    setSavingId(serviceId);
    await fetch("/api/professional/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serviceId, enabled: state[serviceId].on, priceCents: state[serviceId].price }),
    });
    setSavingId(null);
    router.refresh();
  }

  return (
    <div className="space-y-3">
      {services.map((s) => (
        <div key={s.id} className="flex items-center gap-4 rounded-lg border border-tw-border p-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-tw-ink flex-1">
            <input type="checkbox" checked={state[s.id].on} onChange={() => toggle(s.id)} />
            {s.name}
          </label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-tw-muted">R</span>
            <input
              type="number"
              value={state[s.id].price / 100}
              onChange={(e) => updatePrice(s.id, Number(e.target.value) * 100)}
              onBlur={() => savePrice(s.id)}
              disabled={!state[s.id].on}
              className="w-24 rounded-lg border border-tw-border px-2 py-1.5 text-sm outline-none disabled:bg-tw-bg"
            />
          </div>
          {savingId === s.id && <span className="text-xs text-tw-muted">Saving...</span>}
        </div>
      ))}
    </div>
  );
}
