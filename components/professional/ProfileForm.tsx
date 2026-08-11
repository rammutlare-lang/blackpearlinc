"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type Profile = {
  designation: string;
  bio: string;
  qualifications: string;
  specializations: string;
  languages: string;
  location: string;
  yearsExperience: number;
  offersOnline: boolean;
  offersInPerson: boolean;
};

export function ProfileForm({ profile }: { profile: Profile }) {
  const router = useRouter();
  const [form, setForm] = useState(profile);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function save() {
    setSaving(true);
    setMessage(null);
    const res = await fetch("/api/professional/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      setMessage("Profile updated.");
      router.refresh();
    } else {
      setMessage("Could not save changes.");
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-tw-ink">Designation</label>
        <div className="mt-1.5">
          <Input value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-tw-ink">Bio</label>
        <textarea
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
          rows={4}
          className="mt-1.5 w-full rounded-lg border border-tw-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-tw-red/30"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-tw-ink">Qualifications</label>
        <div className="mt-1.5">
          <Input value={form.qualifications} onChange={(e) => setForm({ ...form, qualifications: e.target.value })} />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-tw-ink">Specializations (comma separated)</label>
        <div className="mt-1.5">
          <Input value={form.specializations} onChange={(e) => setForm({ ...form, specializations: e.target.value })} />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-tw-ink">Languages (comma separated)</label>
          <div className="mt-1.5">
            <Input value={form.languages} onChange={(e) => setForm({ ...form, languages: e.target.value })} />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-tw-ink">Location</label>
          <div className="mt-1.5">
            <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          </div>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-tw-ink">Years of Experience</label>
        <div className="mt-1.5 max-w-[120px]">
          <Input
            type="number"
            value={form.yearsExperience}
            onChange={(e) => setForm({ ...form, yearsExperience: Number(e.target.value) })}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <label className="flex items-center gap-2 text-sm text-tw-ink">
          <input
            type="checkbox"
            checked={form.offersOnline}
            onChange={(e) => setForm({ ...form, offersOnline: e.target.checked })}
          />
          Online consultations
        </label>
        <label className="flex items-center gap-2 text-sm text-tw-ink">
          <input
            type="checkbox"
            checked={form.offersInPerson}
            onChange={(e) => setForm({ ...form, offersInPerson: e.target.checked })}
          />
          In-person consultations
        </label>
      </div>

      {message && <p className="text-sm text-tw-red">{message}</p>}
      <Button onClick={save} disabled={saving}>
        {saving ? "Saving..." : "Save Profile"}
      </Button>
    </div>
  );
}
