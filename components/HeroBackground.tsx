import Image from "next/image";

export function HeroBackground({ src, alt = "" }: { src: string; alt?: string }) {
  return (
    <div className="absolute inset-0">
      <Image src={src} alt={alt} fill priority className="object-cover opacity-45" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-b from-tw-black/85 via-tw-black/80 to-tw-black" />
    </div>
  );
}
