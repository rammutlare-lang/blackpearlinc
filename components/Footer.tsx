import Link from "next/link";
import { Logo } from "@/components/Logo";

const columns = [
  {
    title: "Services",
    links: [
      { href: "/employees", label: "Employees" },
      { href: "/employers", label: "Employers" },
      { href: "/professionals", label: "Professionals" },
      { href: "/book", label: "Book a Consultation" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/how-it-works", label: "How It Works" },
      { href: "/resources", label: "Resources" },
      { href: "/join-as-professional", label: "Become a Professional" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/complaints", label: "Complaints" },
      { href: "/cancellation-refund-policy", label: "Cancellation & Refunds" },
      { href: "/contact", label: "Client Support" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/terms", label: "Terms & Conditions" },
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/popia", label: "POPIA Notice" },
      { href: "/consultation-terms", label: "Consultation Terms" },
      { href: "/professional-disclaimer", label: "Professional Disclaimer" },
    ],
  },
];

const trustStrip = [
  ["100% Confidential", "Your information is protected"],
  ["Verified Professionals", "Qualified & vetted experts"],
  ["Secure Payments", "Safe & encrypted checkout"],
  ["Dedicated Support", "We're here to help"],
];

export function Footer() {
  return (
    <footer className="bg-tw-black text-white/70">
      <div className="border-b border-white/10">
        <div className="container-page py-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {trustStrip.map(([title, desc]) => (
            <div key={title} className="flex items-center gap-3">
              <span className="h-9 w-9 shrink-0 rounded-full border border-tw-red flex items-center justify-center text-tw-red">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <circle cx="8" cy="8" r="6" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-bold text-white">{title}</p>
                <p className="text-xs text-white/50">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container-page py-14 grid grid-cols-1 md:grid-cols-6 gap-10">
        <div className="md:col-span-2">
          <Logo dark />
          <p className="mt-4 text-sm text-white/50 max-w-xs">
            Employee relations and workplace solutions, connecting employees and
            employers with verified professionals across South Africa.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-white/50">
            <li>087 550 0278</li>
            <li>hello@blackpearlinc.co.za</li>
            <li>123 Rivonia Road, Sandton, Johannesburg, 2196</li>
          </ul>
          <div className="flex gap-3 mt-5">
            {["FB", "X", "IN", "IG", "WA"].map((s) => (
              <span
                key={s}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-[10px] text-white/60"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="text-white text-sm font-bold mb-4 uppercase tracking-wide">{col.title}</h4>
            <ul className="space-y-2.5">
              {col.links.map((l, i) => (
                <li key={l.label + i}>
                  <Link href={l.href} className="text-sm text-white/50 hover:text-tw-red">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-5 flex items-center justify-center text-xs text-white/40">
          <p>© 2026 Black Pearl Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
