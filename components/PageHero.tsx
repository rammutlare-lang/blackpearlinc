import Image from "next/image";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";

type Crumb = { label: string; href?: string };

/**
 * Global hero frame used by every top-level marketing page (Employees,
 * Employers, Professionals, Services, Resources, About). Height, overlay,
 * spacing and typography are fixed here and only here — pages supply a
 * photo, breadcrumb, eyebrow, title and one short description. Anything
 * page-specific beyond that (CTAs, search forms, extra copy) belongs in a
 * section below the hero, not inside it, so the frame itself never grows
 * or shrinks based on content.
 */
export function PageHero({
  breadcrumb,
  eyebrow,
  title,
  description,
  image,
  imagePosition = "center",
}: {
  breadcrumb: Crumb[];
  eyebrow: string;
  title: ReactNode;
  description: string;
  image: string;
  imagePosition?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-tw-black h-[360px] sm:h-[420px] lg:h-[480px]">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-75"
        style={{ objectPosition: imagePosition }}
      />
      <div className="absolute inset-0 bg-tw-black/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-tw-black/70 via-transparent to-tw-black/40" />
      <div className="relative z-10 flex h-full items-center">
        <div className="container-page">
          <Breadcrumbs dark items={breadcrumb} />
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-black leading-tight text-white max-w-2xl">
            {title}
          </h1>
          <p className="mt-4 text-white/60 max-w-xl leading-relaxed">{description}</p>
        </div>
      </div>
    </section>
  );
}
