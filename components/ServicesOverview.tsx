import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/site.config";
import { tradeServices, standbyServices, type ServiceContent } from "@/lib/content/services";
import PanelTag from "./PanelTag";
import Reveal from "./motion/Reveal";

/**
 * TYPOGRAPHIC ON PURPOSE, see the photo budget rule in seo/FACTS.md section 11.
 *
 * The homepage has six image slots (a hero plus five service cards) and the
 * site has five usable photos, so a photographic grid here would repeat an
 * image on a single page. Rather than repeat one, the homepage teases the
 * services as numbered panel entries and the photographs live on /services and
 * on the individual service pages, where every page uses distinct images.
 *
 * The numbering reads as a panel directory, which is the same vocabulary as the
 * panel tags, so the constraint produced a better section than a photo grid.
 */
function ServiceRow({ service, index }: { service: ServiceContent; index: number }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex items-start gap-4 rounded-panel border border-bone-dim bg-white/40 p-5 transition-colors hover:border-copper sm:gap-5 sm:p-6"
    >
      <span
        className="mt-0.5 font-panel text-[0.6875rem] tracking-panelwide text-copper-deep"
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="flex-1">
        <span className="h-display block text-lg text-ink sm:text-xl">
          {service.navTitle}
        </span>
        <span className="mt-2 block text-[0.9375rem] leading-relaxed text-ink-dim">
          {service.short}
        </span>
      </span>
      <ArrowRight
        className="mt-1 h-4 w-4 shrink-0 text-copper-deep transition-transform group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </Link>
  );
}

export default function ServicesOverview() {
  return (
    <section className="bg-bone py-16 lg:py-24">
      <div className="container-page">
        <PanelTag tone="light">Services</PanelTag>
        <h2 className="h-display mt-5 max-w-2xl text-[1.875rem] text-ink sm:text-4xl lg:text-[2.75rem]">
          Electrical services across {site.business.areaServed}
        </h2>

        <div className="mt-10">
          <div className="conduit-rule conduit-rule-light" aria-hidden="true" />
          <p className="mt-4 font-panel text-[0.6875rem] uppercase tracking-panelwide text-ink-dim">
            Electrical
          </p>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {tradeServices.map((s, i) => (
              <Reveal key={s.slug} index={i}>
                <ServiceRow service={s} index={i} />
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <div className="conduit-rule conduit-rule-light" aria-hidden="true" />
          <p className="mt-4 font-panel text-[0.6875rem] uppercase tracking-panelwide text-ink-dim">
            Standby power
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {standbyServices.map((s, i) => (
              <Reveal key={s.slug} index={i}>
                <ServiceRow service={s} index={tradeServices.length + i} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
