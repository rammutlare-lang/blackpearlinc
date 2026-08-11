"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { resourceCategoryLabels, type ResourceCategory } from "@/lib/enums";

type Resource = { id: string; title: string; category: string; summary: string };

export function ResourceManager({ resources }: { resources: Resource[] }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<ResourceCategory>("GUIDE");
  const [summary, setSummary] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function add() {
    if (!title || !summary || !body) {
      setError("Fill in all fields.");
      return;
    }
    setSaving(true);
    setError(null);
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const res = await fetch("/api/admin/resources", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, slug, category, summary, body }),
    });
    setSaving(false);
    if (!res.ok) {
      const b = await res.json();
      setError(b.error ?? "Could not add resource.");
      return;
    }
    setTitle("");
    setSummary("");
    setBody("");
    router.refresh();
  }

  async function remove(id: string) {
    await fetch(`/api/admin/resources/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div>
      <div className="space-y-3">
        {resources.map((r) => (
          <div key={r.id} className="flex items-center justify-between rounded-lg border border-tw-border p-4">
            <div>
              <p className="font-bold text-tw-ink">{r.title}</p>
              <p className="text-xs text-tw-red font-bold uppercase">
                {resourceCategoryLabels[r.category as ResourceCategory]}
              </p>
              <p className="text-sm text-tw-muted">{r.summary}</p>
            </div>
            <button onClick={() => remove(r.id)} className="text-xs font-bold text-tw-muted hover:text-tw-red">
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-tw-border pt-6 space-y-3">
        <p className="font-bold text-tw-ink">Add New Resource</p>
        <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as ResourceCategory)}
          className="w-full rounded-lg border border-tw-border px-4 py-2.5 text-sm outline-none"
        >
          {(Object.keys(resourceCategoryLabels) as ResourceCategory[]).map((c) => (
            <option key={c} value={c}>
              {resourceCategoryLabels[c]}
            </option>
          ))}
        </select>
        <Input placeholder="Summary" value={summary} onChange={(e) => setSummary(e.target.value)} />
        <textarea
          placeholder="Full content"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-tw-border px-4 py-2.5 text-sm outline-none"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button size="sm" onClick={add} disabled={saving}>
          {saving ? "Adding..." : "Add Resource"}
        </Button>
      </div>
    </div>
  );
}
