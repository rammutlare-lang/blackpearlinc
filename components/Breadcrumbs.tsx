import Link from "next/link";

type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items, dark = false }: { items: Crumb[]; dark?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-xs">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {i > 0 && <span className={dark ? "text-white/30" : "text-tw-border"}>/</span>}
            {item.href ? (
              <Link
                href={item.href}
                className={dark ? "text-white/50 hover:text-white" : "text-tw-muted hover:text-tw-red"}
              >
                {item.label}
              </Link>
            ) : (
              <span className={`font-semibold ${dark ? "text-white" : "text-tw-ink"}`}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
