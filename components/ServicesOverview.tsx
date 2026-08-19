import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/site.config";
import {
  tradeServices,
  standbyServices,
  type ServiceContent,
} from "@/lib/content/services";
import { workPhoto } from "@/lib/content/work";
import PanelTag from "./PanelTag";
import Reveal from "./motion/Reveal";

/**
 * PHOTOGRAPHS CARRY THIS SECTION. It used to be a typographic list, which was
 * correct when the site had five photos and the homepage had six slots. With 21
 * real job photos that constraint is gone, and a list of links was reading as a
 * template.
 *
 * The two groups deliberately use DIFFERENT TREATMENTS rather than one uniform
 * grid: the trades are photographic cards, standby power is typographic. That
 * is where the asymmetry comes from, not from cropping. Every photo here is
 * portrait and stays portrait, because squeezing a portrait phone photo into a
 * wide crop is what makes a site look cheap.
 *
 * Alt text is resolved through workPhoto() so it can never drift from the frame.
 * Group order is unchanged: trades read as a set and stay first.
 */
const TRADE_PHOTOS: Record<string, string> = {
  residential: "/images/work/residential-panel-open.webp",
  commercial: "/images/work/commercial-warehouse-highbay.webp",
  industrial: "/images/work/industrial-ceiling-conduit.webp",
};

function TradeCard({ service, src }: { service: ServiceContent; src: string }) {
  const photo = workPhoto(src);
  return (
    <Link
      href={`/services/${service.slug}`}
      /* Horizontal at 390, vertical from sm up. Three full-width portrait
         cards stacked to 3.3 screens on a phone and pushed the generator
         feature, the growth push, down to 4.6 screens. Measured, not guessed. */
      className="card-lift group flex overflow-hidden rounded-panel border border-bone-dim bg-white/50 sm:flex-col"
    >
      <div className="relative aspect-[3/4] w-24 shrink-0 overflow-hidden sm:w-full">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 96px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center p-4 sm:p-5 sm:justify-start">
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

/**
 * Standby cards are TYPOGRAPHIC, not photographic, and that is deliberate.
 * There is no generator photograph in the set, and a panel or a meter sitting
 * beside "Generac generator installation" reads as the product to anyone
 * skimming. The different treatment also separates standby from the trades
 * more sharply than a different card shape did.
 */
function StandbyCard({ service, index }: { service: ServiceContent; index: number }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="card-lift group flex flex-col justify-between rounded-panel border border-bone-dim bg-white/50 p-6 sm:p-7"
    >
      <div>
        <span
          className="font-panel text-[0.6875rem] tracking-panelwide text-copper-deep"
          aria-hidden="true"
        >
          {String(index).padStart(2, "0")}
        </span>
        <h3 className="h-display mt-3 text-xl text-ink sm:text-2xl">
          {service.navTitle}
        </h3>
        <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-dim">
          {service.short}
        </p>
      </div>
      <span className="mt-6 inline-flex items-center gap-1.5 font-panel text-[0.6875rem] uppercase tracking-panelwide text-copper-deep">
        See details
        <ArrowRight
          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}

export default function ServicesOverview() {
  return (
    <section className="bg-bone py-9 lg:py-24">
      <div className="container-page">
        <PanelTag tone="light">Services</PanelTag>
        <h2 className="h-display mt-4 max-w-2xl text-[1.875rem] text-ink sm:text-4xl lg:text-[2.75rem]">
          Electrical services across {site.business.areaServed}
        </h2>

        {/* The one animated conduit run on this page. */}
        <Reveal className="mt-6 block">
          <div
            className="conduit-rule conduit-rule-light conduit-draw"
            aria-hidden="true"
          />
        </Reveal>

        <p className="mt-4 font-panel text-[0.6875rem] uppercase tracking-panelwide text-ink-dim">
          Electrical
        </p>
        <div className="mt-4 grid gap-3 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tradeServices.map((s, i) => (
            <Reveal key={s.slug} index={i} className="block">
              <TradeCard service={s} src={TRADE_PHOTOS[s.slug]} />
            </Reveal>
          ))}
        </div>

        <p className="mt-6 font-panel text-[0.6875rem] uppercase tracking-panelwide text-ink-dim">
          Standby power
        </p>
        <div className="mt-4 grid gap-3 sm:gap-5 lg:grid-cols-2">
          {standbyServices.map((s, i) => (
            <Reveal key={s.slug} index={i} className="block">
              <StandbyCard service={s} index={tradeServices.length + i + 1} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
