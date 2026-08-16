"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  workPhotos,
  WORK_CATEGORY_LABELS,
  type WorkCategory,
} from "@/lib/content/work";
import Reveal from "@/components/motion/Reveal";

type Filter = "all" | WorkCategory;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All work" },
  { key: "residential", label: WORK_CATEGORY_LABELS.residential },
  { key: "commercial", label: WORK_CATEGORY_LABELS.commercial },
  { key: "industrial", label: WORK_CATEGORY_LABELS.industrial },
];

/**
 * Filtering is client-side over a list that is fully present in the static
 * HTML. Every photo ships in the initial markup regardless of the active
 * filter, so a crawler with no JavaScript sees all 21 images and their alt
 * text. The filter only hides.
 *
 * The grid uses a fixed aspect ratio per tile, so images reserve their space
 * before they load and the page never shifts.
 *
 * MOTION: an indicator slides between tabs rather than each tab flipping
 * colour, and the visible tiles restagger on a filter change so the new set
 * reads as arriving rather than as a jump cut. The indicator is absolutely
 * positioned inside the tab strip, so its transform cannot shift page layout.
 */
export default function WorkGallery() {
  const [filter, setFilter] = useState<Filter>("all");
  const stripRef = useRef<HTMLDivElement | null>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicator, setIndicator] = useState<{ x: number; w: number } | null>(
    null
  );

  /* Measure the active tab and move the indicator to it. useLayoutEffect so
     the first paint already has it in the right place rather than snapping. */
  useLayoutEffect(() => {
    function measure() {
      const i = FILTERS.findIndex((f) => f.key === filter);
      const btn = btnRefs.current[i];
      const strip = stripRef.current;
      if (!btn || !strip) return;
      setIndicator({
        // offsetLeft is relative to the scroller (position: relative), so the
        // indicator scrolls with the tabs and must NOT subtract scrollLeft.
        x: btn.offsetLeft,
        w: btn.offsetWidth,
      });
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [filter]);

  return (
    <>
      <div
        ref={stripRef}
        className="scroll-fade relative -mx-5 flex gap-2.5 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        role="group"
        aria-label="Filter work by property type"
      >
        {/* Sliding indicator. Decorative: the accessible state is aria-pressed
            on each button, not this element. */}
        {indicator && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-0 h-[44px] rounded-panel bg-copper transition-[transform,width] duration-200 ease-out"
            style={{
              transform: `translateX(${indicator.x}px)`,
              width: indicator.w,
            }}
          />
        )}

        {FILTERS.map((f, i) => {
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              ref={(el) => {
                btnRefs.current[i] = el;
              }}
              type="button"
              onClick={() => setFilter(f.key)}
              aria-pressed={active}
              className={`relative z-10 inline-flex min-h-[44px] shrink-0 items-center rounded-panel border px-4 font-panel text-[0.6875rem] uppercase tracking-panelwide transition-colors duration-200 ${
                active
                  ? "border-copper text-iron"
                  : "border-bone-dim text-ink-dim hover:border-copper-deep hover:text-copper-deep"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {(() => {
          let visibleIndex = -1;
          return workPhotos.map((photo) => {
            const visible = filter === "all" || photo.category === filter;
            if (visible) visibleIndex += 1;
            return (
            <Reveal
              as="li"
              /* Keyed on the filter so a change remounts the reveal and the new
                 set staggers in, rather than the survivors sitting still while
                 the grid reflows around them. */
              key={`${filter}-${photo.src}`}
              index={visible ? visibleIndex : 0}
              className={visible ? "" : "hidden"}
            >
              <figure className="relative aspect-[3/4] overflow-hidden rounded-panel border border-bone-dim bg-white/40">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
                <figcaption className="absolute bottom-0 left-0 right-0 bg-iron/75 px-2.5 py-1.5 font-panel text-[0.5625rem] uppercase tracking-panelwide text-bone backdrop-blur-sm">
                  {WORK_CATEGORY_LABELS[photo.category]}
                </figcaption>
              </figure>
            </Reveal>
            );
          });
        })()}
      </ul>

      <p className="mt-6 font-panel text-[0.6875rem] uppercase tracking-panelwide text-ink-dim">
        {workPhotos.filter((p) => filter === "all" || p.category === filter).length}{" "}
        photos
      </p>
    </>
  );
}
