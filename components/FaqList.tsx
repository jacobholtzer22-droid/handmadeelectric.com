"use client";

import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import type { Faq } from "@/lib/content/services";

/**
 * FAQ accordions, native <details> and <summary>.
 *
 * SERVER-RENDERED OPEN, on purpose. Every question and answer is in the static
 * HTML with the `open` attribute set, so crawlers, the FAQPage schema, no-JS
 * visitors, and desktop all see the full text. The ONLY thing that changes is
 * that a small effect collapses them below the md breakpoint, where a seven
 * question FAQ was adding several screens of scroll to the money pages.
 *
 * That ordering matters: the safe state is the default, and the enhancement is
 * the collapse. If the script never runs, nothing is hidden from anyone.
 *
 * Native <details> also gives keyboard operation, find-in-page expansion in
 * modern browsers, and correct semantics for free, which a div-and-state
 * accordion would have to reimplement badly.
 */
export default function FaqList({ faq }: { faq: readonly Faq[] }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const mq = window.matchMedia("(max-width: 767px)");

    const apply = () => {
      const items = root.querySelectorAll<HTMLDetailsElement>("details");
      // Only collapse on mobile. Never force-close on desktop, and never
      // fight a visitor who has opened one themselves on a resize.
      if (mq.matches) {
        items.forEach((d) => {
          if (d.dataset.userToggled !== "true") d.open = false;
        });
      } else {
        items.forEach((d) => {
          d.open = true;
        });
      }
    };

    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <div
      ref={ref}
      className="mt-9 max-w-3xl divide-y divide-steel border-y border-steel"
    >
      {faq.map((item) => (
        <details
          key={item.q}
          open
          onToggle={(e) => {
            (e.currentTarget as HTMLDetailsElement).dataset.userToggled = "true";
          }}
          className="faq-item group py-2"
        >
          <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 py-3 md:cursor-default">
            <span className="h-display text-lg text-bone sm:text-xl">
              {item.q}
            </span>
            <ChevronDown
              className="h-4 w-4 shrink-0 text-copper-bright transition-transform duration-200 group-open:rotate-180 md:hidden"
              aria-hidden="true"
            />
          </summary>
          <div className="pb-5 text-[0.9375rem] leading-relaxed text-ash sm:text-base">
            {item.a}
          </div>
        </details>
      ))}
    </div>
  );
}
