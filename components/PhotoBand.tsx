import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { workPhoto } from "@/lib/content/work";
import PanelTag from "./PanelTag";
import Reveal from "./motion/Reveal";

/**
 * A band of real job photographs on the homepage, on the iron ground.
 *
 * The point is evidence. Twenty one photographs of actual panels, lighting, and
 * conduit are the strongest asset this business has, and until now almost all
 * of them were parked on /work where most visitors never go.
 *
 * Portrait is respected: three tall frames in a row, which is what these photos
 * actually are. On mobile it scrolls horizontally rather than stacking into a
 * column several screens tall.
 *
 * Three, not four. The fourth tile added scroll on mobile for no extra
 * information; this band is evidence, not a gallery, and /work is one tap away.
 */
const BAND = [
  "/images/work/commercial-retail-lighting.webp",
  "/images/work/residential-recessed-lighting.webp",
  "/images/work/industrial-conduit-run.webp",
];

export default function PhotoBand() {
  return (
    <section className="border-y border-steel bg-iron py-12 lg:py-20">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <PanelTag>Recent work</PanelTag>
            <h2 className="h-display mt-5 max-w-xl text-[1.75rem] text-bone sm:text-3xl lg:text-[2.25rem]">
              Real jobs, photographed on site
            </h2>
          </div>
          <Link
            href="/work"
            className="inline-flex min-h-[44px] items-center gap-2 font-panel text-[0.6875rem] uppercase tracking-panelwide text-copper-bright"
          >
            See all 21 photos
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        {/* Horizontal scroll on mobile, three across from sm up. */}
        <ul className="mt-9 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {BAND.map((src, i) => {
            const photo = workPhoto(src);
            return (
              <Reveal key={src} index={i} as="li" className="block">
                <div className="relative aspect-[3/4] w-[68vw] shrink-0 snap-start overflow-hidden rounded-panel border border-steel sm:w-auto">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 640px) 380px, 68vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
