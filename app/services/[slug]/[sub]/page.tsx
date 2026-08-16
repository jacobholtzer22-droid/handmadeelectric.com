import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/site.config";
import { servicesBySlug } from "@/lib/content/services";
import { subServices, subServicesBySlug } from "@/lib/content/subservices";
import { breadcrumbNode, faqNode, serviceNode } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import FaqList from "@/components/FaqList";
import PanelTag from "@/components/PanelTag";
import Reveal from "@/components/motion/Reveal";
import ClosingCta from "@/components/ClosingCta";

export function generateStaticParams() {
  return subServices.map((s) => ({ slug: s.parentSlug, sub: s.slug }));
}

export const dynamicParams = false;

export function generateMetadata({
  params,
}: {
  params: { slug: string; sub: string };
}): Metadata {
  const page = subServicesBySlug.get(`${params.slug}/${params.sub}`);
  if (!page) return {};
  return pageMeta({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/services/${page.parentSlug}/${page.slug}`,
  });
}

export default function SubServicePage({
  params,
}: {
  params: { slug: string; sub: string };
}) {
  const page = subServicesBySlug.get(`${params.slug}/${params.sub}`);
  if (!page) notFound();
  const parent = servicesBySlug.get(page.parentSlug);
  if (!parent) notFound();

  const path = `/services/${page.parentSlug}/${page.slug}`;

  return (
    <>
      <JsonLd
        nodes={[
          serviceNode({
            name: page.navTitle,
            description: page.metaDescription,
            path,
          }),
          faqNode(page.faq),
          breadcrumbNode([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: parent.navTitle, path: `/services/${parent.slug}` },
            { name: page.navTitle, path },
          ]),
        ]}
      />

      {/* --- Intro. Above the fold, so nothing here is revealed on scroll. --- */}
      <section className="bg-iron pb-14 pt-11 sm:pt-14 lg:pb-20 lg:pt-16">
        <div className="container-page">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 font-panel text-[0.6875rem] uppercase tracking-panelwide text-ash">
              <li>
                <Link href="/" className="inline-flex min-h-[44px] items-center transition-colors hover:text-copper-bright">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/services" className="inline-flex min-h-[44px] items-center transition-colors hover:text-copper-bright">
                  Services
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href={`/services/${parent.slug}`}
                  className="inline-flex min-h-[44px] items-center transition-colors hover:text-copper-bright"
                >
                  {parent.navTitle}
                </Link>
              </li>
            </ol>
          </nav>

          <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-14">
            <div className="lg:col-span-7">
              <PanelTag lit>{site.business.areaServed}</PanelTag>
              <h1 className="h-display mt-6 text-[2rem] text-bone sm:text-[2.5rem] lg:text-[3rem]">
                {page.h1}
              </h1>
              <p className="mt-6 max-w-prose text-[1.0625rem] leading-relaxed text-ash sm:text-lg">
                {page.intro}
              </p>
            </div>

            <div className="mt-10 lg:col-span-5 lg:mt-0">
              <div className="relative mx-auto max-w-[20rem] lg:ml-auto lg:mr-0 lg:max-w-none">
                <div
                  className="absolute -bottom-3 -right-3 h-full w-full rounded-panel border-2 border-copper"
                  aria-hidden="true"
                />
                <Image
                  src={page.image}
                  alt={page.alt}
                  width={1050}
                  height={1400}
                  priority
                  sizes="(min-width: 1024px) 400px, (min-width: 640px) 320px, 100vw"
                  className="relative rounded-panel"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- What determines the scope --- */}
      <section className="bg-bone py-16 lg:py-20">
        <div className="container-page">
          <PanelTag tone="light">Scope</PanelTag>
          <h2 className="h-display mt-5 max-w-2xl text-[1.75rem] text-ink sm:text-3xl lg:text-4xl">
            {page.determines.heading}
          </h2>
          <p className="mt-4 max-w-prose text-[0.9375rem] leading-relaxed text-ink-dim">
            {page.determines.lead}
          </p>
          <ul className="mt-9 grid gap-5 lg:grid-cols-2">
            {page.determines.items.map((item, i) => (
              <Reveal
                as="li"
                key={item.title}
                index={i}
                className="rounded-panel border border-bone-dim bg-white/40 p-5"
              >
                <h3 className="h-display text-lg text-ink">{item.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-dim">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* --- What to expect --- */}
      <section className="bg-iron py-16 lg:py-20">
        <div className="container-page">
          <PanelTag>Expectations</PanelTag>
          <h2 className="h-display mt-5 max-w-2xl text-[1.75rem] text-bone sm:text-3xl lg:text-4xl">
            {page.expect.heading}
          </h2>
          <p className="mt-4 max-w-prose text-[0.9375rem] leading-relaxed text-ash">
            {page.expect.lead}
          </p>
          <ul className="mt-8 max-w-3xl space-y-3">
            {page.expect.items.map((item, i) => (
              <Reveal
                as="li"
                key={item}
                index={i}
                className="flex gap-3.5 rounded-panel border border-steel p-5"
              >
                <span
                  className="mt-2 h-[6px] w-[6px] shrink-0 bg-copper"
                  aria-hidden="true"
                />
                <span className="text-[0.9375rem] leading-relaxed text-ash">
                  {item}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* --- Process --- */}
      <section className="bg-bone py-16 lg:py-20">
        <div className="container-page">
          <PanelTag tone="light">Process</PanelTag>
          <h2 className="h-display mt-5 max-w-2xl text-[1.75rem] text-ink sm:text-3xl lg:text-4xl">
            {page.process.heading}
          </h2>
          <ol className="mt-9 space-y-8">
            {page.process.steps.map((step, i) => (
              <li key={step.title} className="lg:grid lg:grid-cols-12 lg:gap-8">
                <div className="lg:col-span-4">
                  <div className="conduit-rule conduit-rule-light" aria-hidden="true" />
                  <p className="mt-3 font-panel text-[0.6875rem] uppercase tracking-panelwide text-copper-deep">
                    Step {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="h-display mt-2 text-xl text-ink">{step.title}</h3>
                </div>
                <p className="mt-3 max-w-prose text-[0.9375rem] leading-relaxed text-ink-dim lg:col-span-8 lg:mt-0">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* --- FAQ, visibly rendered, which is what licenses the FAQPage schema --- */}
      <section className="bg-iron py-16 lg:py-20">
        <div className="container-page">
          <PanelTag>Questions</PanelTag>
          <h2 className="h-display mt-5 max-w-2xl text-[1.75rem] text-bone sm:text-3xl lg:text-4xl">
            Common questions
          </h2>
          <FaqList faq={page.faq} />

          <Link
            href={`/services/${parent.slug}`}
            className="mt-10 inline-flex min-h-[44px] items-center gap-2 font-panel text-[0.6875rem] uppercase tracking-panelwide text-copper-bright"
          >
            All {parent.navTitle.toLowerCase()} work
          </Link>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
