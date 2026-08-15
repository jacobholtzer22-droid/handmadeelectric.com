import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/site.config";
import PanelTag from "./PanelTag";

type Service = (typeof site.services)[number];

/**
 * The section flips to the light ground on purpose. The whole site being dark
 * would fatigue, and these photos are already dim, so they need a light frame
 * to read against.
 *
 * Services are split into two labelled groups rather than one flat grid, so the
 * generator line reads as its own business rather than as two more cards.
 */
function ServiceCard({ service, wide = false }: { service: Service; wide?: boolean }) {
  return (
    <Link
      href={service.href}
      className="group flex flex-col overflow-hidden rounded-panel border border-bone-dim bg-white/40 transition-colors hover:border-copper"
    >
      <div className={`relative w-full ${wide ? "aspect-[16/10]" : "aspect-[4/5]"}`}>
        <Image
          src={service.image}
          alt={service.alt}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="h-display text-xl text-ink">{service.title}</h3>
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

export default function ServicesOverview() {
  const trades = site.services.filter((s) => !("featured" in s && s.featured));
  const generators = site.services.filter((s) => "featured" in s && s.featured);

  return (
    <section className="bg-bone py-16 lg:py-24">
      <div className="container-page">
        <PanelTag tone="light">Services</PanelTag>
        <h2 className="h-display mt-5 max-w-2xl text-[1.875rem] text-ink sm:text-4xl lg:text-[2.75rem]">
          Electrical services across {site.business.areaServed}
        </h2>

        {/* --- Trades --- */}
        <div className="mt-10">
          <div className="conduit-rule conduit-rule-light" aria-hidden="true" />
          <p className="mt-4 font-panel text-[0.6875rem] uppercase tracking-panelwide text-ink-dim">
            Electrical
          </p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {trades.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>

        {/* --- Standby power --- */}
        <div className="mt-12">
          <div className="conduit-rule conduit-rule-light" aria-hidden="true" />
          <p className="mt-4 font-panel text-[0.6875rem] uppercase tracking-panelwide text-ink-dim">
            Standby power
          </p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {generators.map((s) => (
              <ServiceCard key={s.slug} service={s} wide />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
