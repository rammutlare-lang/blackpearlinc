import Image from "next/image";

export function HeroBackground({ src, alt = "" }: { src: string; alt?: string }) {
  return (
    <div className="absolute inset-0">
      <Image src={src} alt={alt} fill priority className="object-cover opacity-75" sizes="100vw" />
      <div className="absolute inset-0 bg-tw-black/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-tw-black/70 via-transparent to-tw-black/40" />
    </div>
  );
}
