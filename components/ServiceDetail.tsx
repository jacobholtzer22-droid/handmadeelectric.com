import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { site } from "@/site.config";
import type { ServiceContent } from "@/lib/content/services";
import PanelTag from "./PanelTag";
import ClosingCta from "./ClosingCta";

/**
 * One shape for all five service pages, so none of them is thin and none
 * drifts. Section order is fixed in seo/PAGE-PLAN.md section 3:
 * direct-answer intro, what is included, signs you need it, how it works, FAQ,
 * CTA.
 *
 * The FAQ is rendered VISIBLY here, which is the precondition for emitting
 * FAQPage schema on the page. Schema must describe what is on the page.
 */
export default function ServiceDetail({ service }: { service: ServiceContent }) {
  return (
    <>
      {/* --- Intro --- */}
      <section className="bg-iron pb-14 pt-11 sm:pt-14 lg:pb-20 lg:pt-16">
        <div className="container-page">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 font-panel text-[0.6875rem] uppercase tracking-panelwide text-ash">
              <li>
                <Link href="/" className="transition-colors hover:text-copper-bright">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/services" className="transition-colors hover:text-copper-bright">
                  Services
                </Link>
              </li>
            </ol>
          </nav>

          <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-14">
            <div className="lg:col-span-7">
              <PanelTag lit>{site.business.areaServed}</PanelTag>
              <h1 className="h-display mt-6 text-[2rem] text-bone sm:text-[2.75rem] lg:text-[3.25rem]">
                {service.h1}
              </h1>
              <p className="mt-6 max-w-prose text-[1.0625rem] leading-relaxed text-ash sm:text-lg">
                {service.intro}
              </p>
            </div>

            <div className="mt-10 lg:col-span-5 lg:mt-0">
              <div className="relative mx-auto max-w-[20rem] lg:ml-auto lg:mr-0 lg:max-w-none">
                <div
                  className="absolute -bottom-3 -right-3 h-full w-full rounded-panel border-2 border-copper"
                  aria-hidden="true"
                />
                <Image
                  src={service.image}
                  alt={service.alt}
                  width={998}
                  height={1330}
                  priority
                  sizes="(min-width: 1024px) 400px, (min-width: 640px) 320px, 100vw"
                  className="relative rounded-panel"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- What is included --- */}
      <section className="bg-bone py-16 lg:py-20">
        <div className="container-page">
          <div className="lg:grid lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <PanelTag tone="light">Scope</PanelTag>
              <h2 className="h-display mt-5 text-[1.75rem] text-ink sm:text-3xl lg:text-4xl">
                {service.included.heading}
              </h2>
            </div>
            <ul className="mt-8 space-y-4 lg:col-span-7 lg:mt-0">
              {service.included.items.map((item) => (
                <li key={item} className="flex gap-3.5">
                  <Check
                    className="mt-1 h-4 w-4 shrink-0 text-copper-deep"
                    aria-hidden="true"
                  />
                  <span className="text-[0.9375rem] leading-relaxed text-ink-dim sm:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* --- Signs --- */}
      <section className="bg-iron py-16 lg:py-20">
        <div className="container-page">
          <PanelTag>Symptoms</PanelTag>
          <h2 className="h-display mt-5 max-w-2xl text-[1.75rem] text-bone sm:text-3xl lg:text-4xl">
            {service.signs.heading}
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {service.signs.items.map((item) => (
              <li
                key={item}
                className="rounded-panel border border-steel p-5 text-[0.9375rem] leading-relaxed text-ash"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* --- Process --- */}
      <section className="bg-bone py-16 lg:py-20">
        <div className="container-page">
          <PanelTag tone="light">Process</PanelTag>
          <h2 className="h-display mt-5 max-w-2xl text-[1.75rem] text-ink sm:text-3xl lg:text-4xl">
            {service.process.heading}
          </h2>
          <ol className="mt-9 space-y-8">
            {service.process.steps.map((step, i) => (
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

      {/* --- FAQ. Rendered visibly, which is what licenses the FAQPage schema. --- */}
      <section className="bg-iron py-16 lg:py-20">
        <div className="container-page">
          <PanelTag>Questions</PanelTag>
          <h2 className="h-display mt-5 max-w-2xl text-[1.75rem] text-bone sm:text-3xl lg:text-4xl">
            Common questions
          </h2>
          <dl className="mt-9 max-w-3xl divide-y divide-steel border-y border-steel">
            {service.faq.map((item) => (
              <div key={item.q} className="py-7">
                <dt className="h-display text-lg text-bone sm:text-xl">{item.q}</dt>
                <dd className="mt-3 text-[0.9375rem] leading-relaxed text-ash sm:text-base">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>

          <Link
            href="/services"
            className="mt-10 inline-flex items-center gap-2 font-panel text-[0.6875rem] uppercase tracking-panelwide text-copper-bright"
          >
            All services
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
