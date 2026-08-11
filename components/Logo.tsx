import Link from "next/link";
import Image from "next/image";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex items-center">
      <span className={`inline-flex items-center rounded-md px-3 py-1.5 ${dark ? "bg-white" : ""}`}>
        <Image src="/logo.jpg" alt="Black Pearl Inc." width={220} height={34} className="h-8 w-auto" priority />
      </span>
    </Link>
  );
}
