import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/site.config";
import {
  tradeServices,
  standbyServices,
  type ServiceContent,
} from "@/lib/content/services";
import { breadcrumbNode } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import PanelTag from "@/components/PanelTag";
import CtaPair from "@/components/CtaPair";
import EmblemWatermark from "@/components/EmblemWatermark";
import StandbySpecPanel from "@/components/StandbySpecPanel";
import ClosingCta from "@/components/ClosingCta";
import Reveal from "@/components/motion/Reveal";

export const metadata: Metadata = pageMeta({
  title: `Electrical Services in ${site.business.areaServed} | ${site.business.name}`,
  description: `Residential, commercial, and industrial electrical work across ${site.business.areaServed}, plus Generac standby generator installation and repair. Call 248-787-0071.`,
  path: "/services",
});

/**
 * THE HUB. Not a link list.
 *
 * Generators lead, because that is where the business is growing, and they get
 * a full-width feature with both CTAs before anything else. The trades follow
 * as a set, which is how they read, and their order is unchanged.
 *
 * The standby feature is TYPOGRAPHIC, not photographic: there is no generator
 * in the photo set, and a meter or a panel beside generator copy reads as the
 * product. The trades carry the photographs. Four distinct images on this page,
 * three trade cards plus the closing band, no repeats, every alt resolved from
 * the service content rather than retyped here.
 */
function StandbyCard({ service }: { service: ServiceContent }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="card-lift group flex flex-col justify-between rounded-panel border border-steel bg-iron p-6 sm:p-7"
    >
      <div>
        <h3 className="h-display text-xl text-bone sm:text-2xl">
          {service.navTitle}
        </h3>
        <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ash">
          {service.short}
        </p>
      </div>
      <span className="mt-6 inline-flex items-center gap-1.5 font-panel text-[0.6875rem] uppercase tracking-panelwide text-copper-bright">
        See details
        <ArrowRight
          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}

function TradeCard({ service }: { service: ServiceContent }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="card-lift group flex flex-col overflow-hidden rounded-panel border border-bone-dim bg-white/50"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <Image
          src={service.image}
          alt={service.alt}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
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

      {/* --- Intro. The one large emblem placement on this page. --- */}
      <section className="relative overflow-hidden bg-iron pb-14 pt-11 sm:pt-14 lg:pb-16 lg:pt-16">
        <EmblemWatermark
          size={560}
          className="-right-32 -top-24 hidden lg:block"
        />
        <div className="container-page relative">
          <PanelTag lit>{site.business.areaServed}</PanelTag>
          <h1 className="h-display mt-6 max-w-3xl text-[2rem] text-bone sm:text-[2.75rem] lg:text-[3.25rem]">
            Electrical services across {site.business.areaServed}
          </h1>
          <p className="mt-6 max-w-prose text-[1.0625rem] leading-relaxed text-ash sm:text-lg">
            {site.business.legalName} handles residential, commercial, and
            industrial electrical work, and installs, services, and repairs
            Generac home standby generators. Pick the work you need and you will
            find what it covers, what determines the cost, and the questions
            people ask most.
          </p>
          <CtaPair className="mt-8" />
        </div>
      </section>

      {/* --- STANDBY POWER LEADS. Full-width feature. --- */}
      <section className="bg-graphite py-16 lg:py-24">
        <div className="container-page">
          <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-14">
            <div className="lg:col-span-6">
              <PanelTag lit>Standby power</PanelTag>
              <h2 className="h-display mt-5 text-[1.875rem] text-bone sm:text-4xl lg:text-[2.75rem]">
                When the power goes out, the house{" "}
                <span className="conduit-underline whitespace-nowrap text-copper-bright">
                  stays on
                </span>
              </h2>
              <p className="mt-6 max-w-prose text-[1.0625rem] leading-relaxed text-ash">
                We install, service, and repair Generac home standby generators.
                A standby unit sits outside, watches the utility power, and
                starts on its own when it drops, so the furnace, the sump pump,
                and the refrigerator keep running whether or not anyone is home.
              </p>
              <CtaPair className="mt-8" />
            </div>

            <div className="mt-12 lg:col-span-6 lg:mt-0">
              {/* NO PHOTOGRAPH. No generator exists in the photo set, and a
                  meter or a panel beside generator copy reads as the product. */}
              <StandbySpecPanel />
            </div>
          </div>

          {/* The two dedicated generator pages. */}
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {standbyServices.map((s, i) => (
              <Reveal key={s.slug} index={i} className="block">
                <StandbyCard service={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- Trades, as a set. --- */}
      <section className="bg-bone py-16 lg:py-24">
        <div className="container-page">
          <PanelTag tone="light">Electrical</PanelTag>
          <h2 className="h-display mt-5 max-w-2xl text-[1.875rem] text-ink sm:text-4xl">
            Residential, commercial, and industrial
          </h2>

          {/* The one animated conduit run on this page. */}
          <Reveal className="mt-9 block">
            <div
              className="conduit-rule conduit-rule-light conduit-draw"
              aria-hidden="true"
            />
          </Reveal>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tradeServices.map((s, i) => (
              <Reveal key={s.slug} index={i} className="block">
                <TradeCard service={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta
        bgImage="/images/work/commercial-warehouse-lighting.webp"
        bgAlt=""
      />
    </>
  );
}
