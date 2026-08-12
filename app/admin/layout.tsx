import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SignOutButton } from "@/components/dashboard/SignOutButton";

const navLinks = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/professionals", label: "Verification Queue" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/bookings", label: "Bookings & Payments" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/resources", label: "Resources" },
  { href: "/admin/team", label: "Team" },
  { href: "/admin/site-stats", label: "Site Stats" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="container-page py-10 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
      <aside>
        <p className="text-sm text-tw-muted">Admin Console</p>
        <p className="font-black text-tw-ink">{session.user.name}</p>
        <nav className="mt-6 flex flex-col gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-tw-muted hover:bg-tw-bg hover:text-tw-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="mt-6">
          <SignOutButton />
        </div>
      </aside>
      <main>{children}</main>
    </div>
  );
}
