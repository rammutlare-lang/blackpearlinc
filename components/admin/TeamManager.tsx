"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type Member = { id: string; name: string; role: string; bio: string; expertise: string | null; linkedIn: string | null };

export function TeamManager({ members }: { members: Member[] }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [expertise, setExpertise] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function add() {
    if (!name || !role || !bio) {
      setError("Fill in name, role and bio.");
      return;
    }
    setSaving(true);
    setError(null);
    const res = await fetch("/api/admin/team", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, role, bio, expertise: expertise || undefined, linkedIn: linkedIn || undefined }),
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
    setExpertise("");
    setLinkedIn("");
    router.refresh();
  }

  async function remove(id: string) {
    await fetch(`/api/admin/team/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div>
      {members.length === 0 && (
        <p className="text-sm text-tw-muted mb-4">
          No leadership profiles yet. Only add genuine, verifiable people here — this
          section is hidden on the public About page until at least one real profile
          exists.
        </p>
      )}
      <div className="space-y-3">
        {members.map((m) => (
          <div key={m.id} className="flex items-center justify-between rounded-lg border border-tw-border p-4">
            <div>
              <p className="font-bold text-tw-ink">{m.name}</p>
              <p className="text-xs text-tw-red font-bold uppercase">{m.role}</p>
              <p className="text-sm text-tw-muted">{m.bio}</p>
              {m.expertise && <p className="mt-1 text-xs text-tw-muted">Expertise: {m.expertise}</p>}
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
        <div className="grid sm:grid-cols-2 gap-3">
          <Input
            placeholder="Expertise (comma separated, optional)"
            value={expertise}
            onChange={(e) => setExpertise(e.target.value)}
          />
          <Input placeholder="LinkedIn URL (optional)" value={linkedIn} onChange={(e) => setLinkedIn(e.target.value)} />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button size="sm" onClick={add} disabled={saving}>
          {saving ? "Adding..." : "Add Member"}
        </Button>
      </div>
    </div>
  );
}
