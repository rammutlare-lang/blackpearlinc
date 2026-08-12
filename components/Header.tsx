"use client";

import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { ButtonLink, Button } from "@/components/ui/Button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/employees", label: "Employees" },
  { href: "/employers", label: "Employers" },
  { href: "/professionals", label: "Professionals" },
  { href: "/services", label: "Services" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
];

const dashboardHref: Record<string, string> = {
  ADMIN: "/admin",
  PROFESSIONAL: "/professional",
  CLIENT: "/dashboard",
};

export function Header() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const myDashboard = session?.user?.role ? dashboardHref[session.user.role] : "/dashboard";

  return (
    <header className="sticky top-0 z-50 bg-tw-black">
      <div className="container-page flex h-16 items-center justify-between">
        <Logo dark />

        <div className="hidden lg:flex items-center gap-3">
          {status === "authenticated" ? (
            <>
              <ButtonLink href={myDashboard} variant="outline-white" size="md">
                Dashboard
              </ButtonLink>
              <Button variant="red" size="md" onClick={() => signOut({ callbackUrl: "/" })}>
                Log Out
              </Button>
            </>
          ) : (
            <>
              <ButtonLink href="/login" variant="outline-white" size="md">
                Log In
              </ButtonLink>
              <ButtonLink href="/book" variant="red" size="md">
                Get Help
              </ButtonLink>
            </>
          )}
        </div>

        <button
          className="lg:hidden text-white"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeWidth="2" strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Nav row shares the same container-page as every page's content, so
          the first link's left edge always matches the site's global
          content edge — never position nav links inside the row above,
          since the logo already occupies that row's left slot. */}
      <nav className="hidden lg:block border-t border-white/10">
        <div className="container-page flex h-12 items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition-colors border-b-2 pb-1 ${
                pathname === link.href
                  ? "text-tw-red border-tw-red"
                  : "border-transparent text-white/80 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>

      {menuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-tw-black px-6 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-semibold text-white/80 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3 pt-3 border-t border-white/10">
            {status === "authenticated" ? (
              <>
                <ButtonLink href={myDashboard} variant="outline-white" size="md" className="flex-1">
                  Dashboard
                </ButtonLink>
                <Button
                  variant="red"
                  size="md"
                  className="flex-1"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <ButtonLink href="/login" variant="outline-white" size="md" className="flex-1">
                  Log In
                </ButtonLink>
                <ButtonLink href="/book" variant="red" size="md" className="flex-1">
                  Get Help
                </ButtonLink>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
