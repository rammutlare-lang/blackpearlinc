"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type Member = { id: string; name: string; role: string; bio: string };

export function TeamManager({ members }: { members: Member[] }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function add() {
    if (!name || !role || !bio) {
      setError("Fill in all fields.");
      return;
    }
    setSaving(true);
    setError(null);
    const res = await fetch("/api/admin/team", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, role, bio }),
    });
    setSaving(false);
    if (!res.ok) {
      const b = await res.json();
      setError(b.error ?? "Could not add team member.");
      return;
    }
    setName("");
    setRole("");
    setBio("");
    router.refresh();
  }

  async function remove(id: string) {
    await fetch(`/api/admin/team/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div>
      <div className="space-y-3">
        {members.map((m) => (
          <div key={m.id} className="flex items-center justify-between rounded-lg border border-tw-border p-4">
            <div>
              <p className="font-bold text-tw-ink">{m.name}</p>
              <p className="text-xs text-tw-red font-bold uppercase">{m.role}</p>
              <p className="text-sm text-tw-muted">{m.bio}</p>
            </div>
            <button onClick={() => remove(m.id)} className="text-xs font-bold text-tw-muted hover:text-tw-red">
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-tw-border pt-6 space-y-3">
        <p className="font-bold text-tw-ink">Add Team Member</p>
        <div className="grid sm:grid-cols-2 gap-3">
          <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} />
        </div>
        <textarea
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-tw-border px-4 py-2.5 text-sm outline-none"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button size="sm" onClick={add} disabled={saving}>
          {saving ? "Adding..." : "Add Member"}
        </Button>
      </div>
    </div>
  );
}
