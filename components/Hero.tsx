import Image from "next/image";
import { site } from "@/site.config";
import PanelTag from "./PanelTag";
import CtaPair from "./CtaPair";
import EmblemWatermark from "./EmblemWatermark";

/**
 * The H1 and the first paragraph together are the direct answer: who, what,
 * where. Written to be extracted, not to be a slogan. Every claim traces to a
 * CONFIRMED row in seo/FACTS.md, and the Generac sentence is the exact
 * permitted wording while GENERAC STATUS is TODO.
 *
 * DEPTH: three grounds stacked, iron behind, graphite panel around the
 * photograph, steel hairline between them. The emblem sits behind everything at
 * watermark scale, which is the one place on this page it gets to be large.
 *
 * NOTHING HERE ANIMATES ON LOAD. No Reveal wrapper, no entrance transition. The
 * LCP element is the photograph and it paints immediately at fetchpriority
 * high. The emblem watermark is static.
 */
export default function Hero() {
  const { business } = site;

  return (
    <section className="relative overflow-hidden bg-iron">
      {/* The one large emblem placement on this page. */}
      <EmblemWatermark
        size={680}
        className="-right-40 top-1/2 hidden -translate-y-1/2 lg:block"
      />

      <div className="container-page relative pb-14 pt-11 sm:pt-14 lg:pb-24 lg:pt-20">
        <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-12">
          {/* --- Copy --- */}
          <div className="lg:col-span-7">
            <PanelTag lit>{business.trade}</PanelTag>

            <h1 className="h-display mt-6 text-[2.125rem] text-bone sm:text-5xl lg:text-[3.85rem]">
              Electrical work and Generac generators in{" "}
              <span className="conduit-underline whitespace-nowrap text-copper-bright">
                Metro Detroit
              </span>
            </h1>

            <p className="mt-6 max-w-prose text-[1.0625rem] leading-relaxed text-ash sm:text-lg">
              {business.legalName} is an electrical contractor serving{" "}
              {business.areaServed}, covering residential, commercial, and
              industrial work. We install, service, and repair Generac home
              standby generators.
            </p>

            <CtaPair className="mt-8" />
          </div>

          {/* --- Photograph, on a raised graphite panel --- */}
          <div className="mt-12 lg:col-span-5 lg:mt-0">
            <div className="panel-raised relative mx-auto max-w-[23rem] p-2.5 lg:ml-auto lg:mr-0 lg:max-w-none">
              <Image
                src="/images/panel-wood-wall.webp"
                alt="A subpanel mounted on a stained wood wall with a yellow cable run to an outlet and switch below"
                width={998}
                height={1330}
                priority
                fetchPriority="high"
                sizes="(min-width: 1024px) 420px, (min-width: 640px) 368px, 100vw"
                className="rounded-panel"
              />
              {/* Copper corner, the machined detail rather than a full frame. */}
              <span
                className="absolute -bottom-px -right-px h-14 w-14 border-b-2 border-r-2 border-copper"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
