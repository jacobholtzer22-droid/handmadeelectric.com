"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { site } from "@/site.config";
import PanelTag from "./PanelTag";
import StarRating from "./StarRating";
import ReviewCard from "./ReviewCard";

/**
 * Auto-rotating reviews, on the homepage directly below the hero.
 *
 * ALL SIX ARE ALWAYS IN THE DOM. They are stacked in a single CSS grid cell
 * and cross-faded, never conditionally rendered, so a crawler reading the
 * static HTML sees every review regardless of which one is visible. The stack
 * sizes to the tallest card, so switching slides cannot change the container
 * height and cannot contribute CLS.
 *
 * ROTATION STOPS when the pointer is over it, when focus is inside it, and when
 * the tab is hidden. A carousel that keeps advancing while someone is reading
 * or while nobody is looking is just motion for its own sake.
 *
 * REDUCED MOTION disables rotation entirely and the whole thing becomes a
 * static, horizontally scrollable rail with every card visible and no controls.
 * That branch is decided in JS, not only in CSS, because the aria-hidden and
 * tabIndex bookkeeping has to change with it: in the rail every card is real
 * content, not a hidden slide.
 */
const INTERVAL_MS = 6500;

export default function ReviewsCarousel() {
  const { reviews } = site;
  const quotes = reviews.quotes;

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const go = useCallback(
    (next: number) => setIndex(((next % quotes.length) + quotes.length) % quotes.length),
    [quotes.length]
  );
  const prev = useCallback(() => go(index - 1), [go, index]);
  const next = useCallback(() => go(index + 1), [go, index]);

  /* Reduced motion is a behaviour switch, not just a style switch. */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  /* Pause while the tab is hidden. */
  useEffect(() => {
    const onVis = () => setPaused(document.visibilityState !== "visible");
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  /* The rotation itself. */
  useEffect(() => {
    if (reduced || paused || quotes.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % quotes.length), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduced, paused, quotes.length]);

  if (!reviews.enabled || quotes.length === 0) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (reduced) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  return (
    <section className="relative border-y border-steel bg-iron py-12 lg:py-20">
      {/* Copper hairline across the top edge, so the band reads as its own
          thing rather than as more hero. */}
      <span
        className="absolute inset-x-0 top-0 h-px bg-copper/70"
        aria-hidden="true"
      />
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <PanelTag lit>Reviews</PanelTag>
            <h2 className="h-display mt-4 max-w-xl text-[2rem] text-bone sm:text-4xl lg:text-[2.75rem]">
              What customers say
            </h2>
            {/* Renders nothing until the rating is confirmed from the Google
                Business Profile. See site.config reviews.averageRating. */}
            {reviews.averageRating !== null && (
              <p className="mt-4 flex flex-wrap items-center gap-3">
                <StarRating
                  rating={reviews.averageRating}
                  size="lg"
                  tone="dark"
                  label={`Rated ${reviews.averageRating} out of 5 on Google`}
                />
                <span className="font-panel text-[0.8125rem] uppercase tracking-panelwide text-bone">
                  <span className="h-display text-xl text-filament">
                    {reviews.averageRating.toFixed(1)}
                  </span>{" "}
                  out of 5 on Google
                  {reviews.reviewCount !== null
                    ? `, from ${reviews.reviewCount} reviews`
                    : ""}
                </span>
              </p>
            )}
          </div>
          <Link
            href="/reviews"
            className="inline-flex min-h-[44px] items-center gap-2 font-panel text-[0.6875rem] uppercase tracking-panelwide text-copper-bright"
          >
            Read all reviews
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div
          className="mt-8"
          role="group"
          aria-roledescription={reduced ? undefined : "carousel"}
          aria-label="Customer reviews"
          tabIndex={reduced ? undefined : 0}
          onKeyDown={onKeyDown}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(document.visibilityState !== "visible")}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(document.visibilityState !== "visible")}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (reduced || touchStartX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
            touchStartX.current = null;
          }}
        >
          <div className="review-stack" aria-live="polite">
            {quotes.map((q, i) => {
              const active = reduced || i === index;
              return (
                <ReviewCard
                  key={q.name + i}
                  quote={q}
                  className="review-slide"
                  // data-active drives the crossfade; in the reduced-motion rail
                  // every card is active so nothing is hidden.
                  {...{ "data-active": active ? "" : undefined }}
                  aria-hidden={reduced ? undefined : i !== index}
                />
              );
            })}
          </div>

          {/* Controls are meaningless on a static rail, so they are not rendered. */}
          {!reduced && quotes.length > 1 && (
            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous review"
                className="inline-flex h-11 w-11 items-center justify-center rounded-panel border border-steel-light text-bone transition-colors hover:border-copper hover:text-copper-bright"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next review"
                className="inline-flex h-11 w-11 items-center justify-center rounded-panel border border-steel-light text-bone transition-colors hover:border-copper hover:text-copper-bright"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <ul className="ml-1 flex items-center gap-2">
                {quotes.map((q, i) => (
                  <li key={q.name + i} className="flex">
                    <button
                      type="button"
                      onClick={() => go(i)}
                      aria-label={`Show review ${i + 1} of ${quotes.length}, ${q.name}`}
                      aria-current={i === index ? "true" : undefined}
                      className="flex h-11 w-5 items-center justify-center"
                    >
                      <span
                        className={`block h-[6px] w-[6px] transition-colors ${
                          i === index ? "bg-copper" : "bg-steel-light"
                        }`}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
