"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type Service = { id: string; slug: string; name: string; description: string; defaultPriceCents: number; active: boolean };

export function ServiceManager({ services }: { services: Service[] }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function addService() {
    if (!name || !description || !price) {
      setError("Fill in all fields.");
      return;
    }
    setSaving(true);
    setError(null);
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const res = await fetch("/api/admin/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, name, description, defaultPriceCents: Number(price) * 100 }),
    });
    setSaving(false);
    if (!res.ok) {
      const body = await res.json();
      setError(body.error ?? "Could not add service.");
      return;
    }
    setName("");
    setDescription("");
    setPrice("");
    router.refresh();
  }

  async function toggleActive(id: string, active: boolean) {
    await fetch(`/api/admin/services/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !active }),
    });
    router.refresh();
  }

  return (
    <div>
      <div className="space-y-3">
        {services.map((s) => (
          <div key={s.id} className="flex items-center justify-between rounded-lg border border-tw-border p-4">
            <div>
              <p className="font-bold text-tw-ink">{s.name}</p>
              <p className="text-sm text-tw-muted">{s.description}</p>
              <p className="text-sm font-semibold text-tw-red">R{(s.defaultPriceCents / 100).toFixed(0)}</p>
            </div>
            <button
              onClick={() => toggleActive(s.id, s.active)}
              className={`text-xs font-bold uppercase rounded-full px-3 py-1.5 ${
                s.active ? "bg-green-100 text-green-700" : "bg-tw-bg text-tw-muted"
              }`}
            >
              {s.active ? "Active" : "Inactive"}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-tw-border pt-6">
        <p className="font-bold text-tw-ink mb-3">Add New Service</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Input placeholder="Service name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <Input placeholder="Price (R)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <Button className="mt-3" size="sm" onClick={addService} disabled={saving}>
          {saving ? "Adding..." : "Add Service"}
        </Button>
      </div>
    </div>
  );
}
