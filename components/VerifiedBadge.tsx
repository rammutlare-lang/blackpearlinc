const checklist = ["Identity", "Qualifications", "Professional registration", "Experience"];

export function VerifiedBadge({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase text-tw-red bg-tw-red/10 rounded-full px-2 py-1">
        ✓ Black Pearl Verified
      </span>
    );
  }

  return (
    <div className="inline-block">
      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-tw-red bg-tw-red/10 border border-tw-red/30 rounded-full px-3 py-1.5">
        ✓ Black Pearl Verified™
      </span>
      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-tw-muted">
        {checklist.map((c) => (
          <li key={c} className="flex items-center gap-1">
            <span className="text-tw-red">✓</span> {c}
          </li>
        ))}
      </ul>
    </div>
  );
}
