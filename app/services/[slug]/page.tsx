import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, servicesBySlug } from "@/lib/content/services";
import { breadcrumbNode, faqNode, serviceNode } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import ServiceDetail from "@/components/ServiceDetail";

/** Fully pre-rendered at build time. No dynamic rendering, no JS required. */
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const service = servicesBySlug.get(params.slug);
  if (!service) return {};
  return pageMeta({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = servicesBySlug.get(params.slug);
  if (!service) notFound();

  const path = `/services/${service.slug}`;

  return (
    <>
      <JsonLd
        nodes={[
          serviceNode({
            name: service.navTitle,
            description: service.metaDescription,
            path,
          }),
          // Only emitted because the FAQ is visibly rendered on this page.
          faqNode(service.faq),
          breadcrumbNode([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.navTitle, path },
          ]),
        ]}
      />
      <ServiceDetail service={service} />
    </>
  );
}
