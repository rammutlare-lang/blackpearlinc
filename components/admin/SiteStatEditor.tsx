"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type Stat = { id: string; key: string; label: string; value: string };

export function SiteStatEditor({ stat }: { stat: Stat }) {
  const router = useRouter();
  const [label, setLabel] = useState(stat.label);
  const [value, setValue] = useState(stat.value);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    await fetch(`/api/admin/site-stats/${stat.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label, value }),
    });
    setSaving(false);
    router.refresh();
  }

  return (
    <div className="flex items-end gap-3 rounded-lg border border-tw-border p-4">
      <div>
        <label className="text-xs text-tw-muted">Key</label>
        <p className="text-sm font-mono text-tw-ink">{stat.key}</p>
      </div>
      <div>
        <label className="text-xs text-tw-muted">Label</label>
        <Input value={label} onChange={(e) => setLabel(e.target.value)} />
      </div>
      <div>
        <label className="text-xs text-tw-muted">Value</label>
        <Input value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
      <Button size="sm" onClick={save} disabled={saving}>
        {saving ? "Saving..." : "Save"}
      </Button>
    </div>
  );
}
