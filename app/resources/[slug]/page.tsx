import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { prisma } from "@/lib/prisma";
import { resourceCategoryLabels, type ResourceCategory } from "@/lib/enums";

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = await prisma.resource.findUnique({ where: { slug } });
  if (!resource) notFound();

  return (
    <div className="container-page py-16 max-w-3xl">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: resource.title },
        ]}
      />
      <span className="eyebrow">{resourceCategoryLabels[resource.category as ResourceCategory]}</span>
      <h1 className="mt-2 text-3xl md:text-4xl font-black text-tw-ink">{resource.title}</h1>
      <p className="mt-2 text-sm text-tw-muted">
        By {resource.author} · {resource.publishedAt.toLocaleDateString("en-ZA")}
      </p>
      <p className="mt-6 text-tw-muted leading-relaxed">{resource.body}</p>

      <div className="mt-10 rounded-2xl border border-tw-border bg-white p-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase text-tw-muted">Price</p>
          <p className="text-2xl font-black text-tw-ink">
            {resource.priceCents ? `R${(resource.priceCents / 100).toFixed(0)}` : "Free"}
          </p>
        </div>
        <ButtonLink href="/contact" variant="red" size="md" arrow>
          {resource.priceCents ? "Buy This Resource" : "Download"}
        </ButtonLink>
      </div>

      <div className="mt-6 rounded-2xl bg-tw-black p-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-white font-bold">Have a question about this topic?</p>
        <ButtonLink href="/book" variant="red" size="md" arrow>
          Book a Consultation
        </ButtonLink>
      </div>
    </div>
  );
}
