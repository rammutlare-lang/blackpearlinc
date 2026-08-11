import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "red" | "outline-red" | "outline-white" | "dark" | "white";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  red: "bg-tw-red text-white hover:bg-tw-red-dark border border-tw-red",
  "outline-red": "bg-transparent text-tw-red border border-tw-red hover:bg-tw-red hover:text-white",
  "outline-white": "bg-transparent text-white border border-white/40 hover:bg-white/10",
  dark: "bg-tw-black text-white hover:bg-tw-charcoal border border-tw-black",
  white: "bg-white text-tw-black hover:bg-tw-bg border border-white",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-sm",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-bold uppercase tracking-wide transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Button({
  children,
  variant = "red",
  size = "md",
  arrow = false,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
}) {
  return (
    <button
      className={`${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
      {arrow && <Arrow />}
    </button>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "red",
  size = "md",
  arrow = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}
