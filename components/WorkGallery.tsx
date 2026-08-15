"use client";

import { useState } from "react";
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
 */
export default function WorkGallery() {
  const [filter, setFilter] = useState<Filter>("all");

  return (
    <>
      <div
        className="flex flex-wrap gap-2.5"
        role="group"
        aria-label="Filter work by property type"
      >
        {FILTERS.map((f) => {
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              aria-pressed={active}
              className={`inline-flex min-h-[44px] items-center rounded-panel border px-4 font-panel text-[0.6875rem] uppercase tracking-panelwide transition-colors ${
                active
                  ? "border-copper bg-copper text-iron"
                  : "border-bone-dim text-ink-dim hover:border-copper-deep hover:text-copper-deep"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {workPhotos.map((photo, i) => {
          const visible = filter === "all" || photo.category === filter;
          return (
            <Reveal
              as="li"
              key={photo.src}
              index={i}
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
        })}
      </ul>

      <p className="mt-6 font-panel text-[0.6875rem] uppercase tracking-panelwide text-ink-dim">
        {workPhotos.filter((p) => filter === "all" || p.category === filter).length}{" "}
        photos
      </p>
    </>
  );
}
