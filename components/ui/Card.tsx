import { ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-tw-border bg-white p-6 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

export function StatCard({
  value,
  label,
  sublabel,
}: {
  value: string;
  label: string;
  sublabel?: string;
}) {
  return (
    <div className="flex flex-col items-center text-center gap-1 px-4">
      <div className="text-2xl md:text-3xl font-black text-tw-ink">{value}</div>
      <div className="text-sm font-semibold text-tw-ink">{label}</div>
      {sublabel && <div className="text-xs text-tw-muted">{sublabel}</div>}
    </div>
  );
}

const iconBg: Record<"red" | "dark", string> = {
  red: "bg-tw-red text-white",
  dark: "bg-tw-charcoal text-tw-red border border-white/10",
};

export function DarkStat({
  icon,
  value,
  label,
  color = "red",
}: {
  icon: ReactNode;
  value: string;
  label: string;
  color?: "red" | "dark";
}) {
  return (
    <div className="flex items-center gap-4">
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${iconBg[color]}`}>
        {icon}
      </div>
      <div>
        <p className="eyebrow text-white/50">{label}</p>
        <p className="text-xl font-black text-white">{value}</p>
      </div>
    </div>
  );
}
