import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { SignOutButton } from "@/components/dashboard/SignOutButton";

const navLinks = [
  { href: "/professional", label: "Overview" },
  { href: "/professional/profile", label: "Profile & Pricing" },
  { href: "/professional/availability", label: "Availability" },
];

export default async function ProfessionalLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const profile = await prisma.professionalProfile.findUnique({ where: { userId: session.user.id } });

  return (
    <div className="container-page py-10 grid md:grid-cols-[220px_1fr] gap-8">
      <aside>
        <p className="text-sm text-tw-muted">Professional Portal</p>
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
      <main>
        {profile?.verificationStatus !== "APPROVED" && (
          <div className="mb-6 rounded-lg border border-tw-red/40 bg-tw-red/5 p-4 text-sm text-tw-red">
            {profile?.verificationStatus === "REJECTED"
              ? "Your professional verification was not approved. Please contact support."
              : "Your account is pending verification. You will not appear in the public directory or receive bookings until an administrator approves your profile."}
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
