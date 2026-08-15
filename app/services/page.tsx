import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/site.config";
import { tradeServices, standbyServices, type ServiceContent } from "@/lib/content/services";
import { breadcrumbNode } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import PanelTag from "@/components/PanelTag";
import ClosingCta from "@/components/ClosingCta";

export const metadata: Metadata = pageMeta({
  title: `Electrical Services in ${site.business.areaServed} | ${site.business.name}`,
  description: `Residential, commercial, and industrial electrical work across ${site.business.areaServed}, plus Generac standby generator installation and repair. Call 248-787-0071.`,
  path: "/services",
});

/**
 * This is the page that carries the photographs. Five services, five distinct
 * photos, no repeats on the page, which satisfies the photo budget rule in
 * seo/FACTS.md section 11. The homepage teases the same services
 * typographically for that reason.
 */
function ServiceCard({ service }: { service: ServiceContent }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col overflow-hidden rounded-panel border border-bone-dim bg-white/40 transition-colors hover:border-copper"
    >
      <div className="relative aspect-[4/5] w-full">
        <Image
          src={service.image}
          alt={service.alt}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="h-display text-xl text-ink">{service.navTitle}</h3>
        <p className="mt-2.5 flex-1 text-[0.9375rem] leading-relaxed text-ink-dim">
          {service.short}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 font-panel text-[0.6875rem] uppercase tracking-panelwide text-copper-deep">
          See details
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}

export default function ServicesIndexPage() {
  return (
    <>
      <JsonLd
        nodes={[
          breadcrumbNode([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
        ]}
      />

      <section className="bg-iron pb-14 pt-11 sm:pt-14 lg:pb-16 lg:pt-16">
        <div className="container-page">
          <PanelTag lit>{site.business.areaServed}</PanelTag>
          <h1 className="h-display mt-6 max-w-3xl text-[2rem] text-bone sm:text-[2.75rem] lg:text-[3.25rem]">
            Electrical services across {site.business.areaServed}
          </h1>
          <p className="mt-6 max-w-prose text-[1.0625rem] leading-relaxed text-ash sm:text-lg">
            {site.business.legalName} handles residential, commercial, and
            industrial electrical work, and installs, services, and repairs
            Generac home standby generators. Pick the work you need and you will
            find what it covers, what it costs to find out, and the questions
            people ask most.
          </p>
        </div>
      </section>

      <section className="bg-bone py-16 lg:py-20">
        <div className="container-page">
          <div className="conduit-rule conduit-rule-light" aria-hidden="true" />
          <h2 className="h-display mt-4 text-[1.5rem] text-ink sm:text-3xl">
            Electrical
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tradeServices.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>

          <div className="conduit-rule conduit-rule-light mt-14" aria-hidden="true" />
          <h2 className="h-display mt-4 text-[1.5rem] text-ink sm:text-3xl">
            Standby power
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {standbyServices.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
