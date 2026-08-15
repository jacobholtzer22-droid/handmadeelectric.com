"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll reveal, built to two hard constraints.
 *
 * ZERO CLS: only `opacity` and `transform` are animated. Neither affects
 * layout, so the element occupies its final box from first paint and the
 * reveal contributes nothing to Cumulative Layout Shift. Never animate height,
 * width, margin, or padding here.
 *
 * NEVER ABOVE THE FOLD: do not wrap hero content in this. The LCP element must
 * paint immediately and must never be revealed. This is for content below the
 * first viewport only.
 *
 * NO-JS SAFE: the hidden state is scoped to `.js` on the root element, which is
 * set by a synchronous inline script before paint. With JavaScript off, nothing
 * is ever hidden, which matters because crawlers largely do not run JS and this
 * site's whole value is in its static HTML.
 *
 * REDUCED MOTION: globals.css disables the hidden state entirely, so the
 * content is simply present. No fade, no movement, no dependence on the
 * observer firing.
 */
export default function Reveal({
  children,
  /** Stagger position within a group. 40ms per step, capped so long lists do not crawl. */
  index = 0,
  as: Tag = "div",
  className = "",
}: {
  children: React.ReactNode;
  index?: number;
  as?: "div" | "li" | "section" | "article";
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If the browser cannot observe, show immediately rather than trap content.
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    /**
     * Show when the element intersects, OR when it is already at or above the
     * viewport.
     *
     * The second condition is not cosmetic, it prevents permanently invisible
     * content. An element can go from below the viewport to above it without
     * ever being observed as intersecting: a deep link or anchor jump, browser
     * scroll restoration on back navigation, a fast fling on a phone, or
     * find-in-page. Without this branch that content stays at opacity 0
     * forever. Caught by measuring, not by reading the code.
     */
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 }
    );

    observer.observe(el);

    /**
     * FAIL-SAFE. The reveal is decorative; the content is the entire point of
     * the site. If the observer never fires, this guarantees the content still
     * appears rather than sitting at opacity 0 forever.
     *
     * That is not hypothetical. IntersectionObserver callbacks do not fire
     * while a document is not being rendered, which covers a background or
     * hidden tab at load, some prerender and bfcache paths, and at least one
     * headless environment where this was caught by measuring.
     *
     * Worst case the content fades in a beat late. Best case nobody ever sees
     * this fire, because the observer got there first.
     */
    const failsafe = window.setTimeout(() => setShown(true), 1200);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  return (
    <Tag
      // A polymorphic `as` cannot produce a ref type that satisfies every tag
      // in the union at once, so the ref is widened here. The runtime value is
      // always the rendered element.
      ref={ref as React.Ref<any>}
      data-reveal=""
      data-shown={shown ? "" : undefined}
      style={{ transitionDelay: `${Math.min(index, 6) * 40}ms` }}
      className={className}
    >
      {children}
    </Tag>
  );
}
