import { site } from "@/site.config";
import PanelTag from "./PanelTag";

/**
 * Wired, and rendering nothing.
 *
 * seo/FACTS.md section 7: only reviews supplied verbatim may appear, and none
 * were. So this returns null. There is no placeholder, no "reviews coming
 * soon", and no empty state, because an empty state publishes the fact that
 * this business has no reviews yet.
 *
 * There is also NO Review or aggregateRating JSON-LD here and there never will
 * be, even once real reviews exist. Visible on-page reviews only.
 */
export default function ReviewsStrip() {
  const { reviews } = site;

  if (!reviews.enabled || reviews.quotes.length === 0) return null;

  return (
    <section className="bg-bone py-16">
      <div className="container-page">
        <PanelTag tone="light">Reviews</PanelTag>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.quotes.map((quote) => (
            <li
              key={`${quote.name}-${quote.source}`}
              className="rounded-panel border border-bone-dim bg-white/40 p-6"
            >
              <blockquote className="text-[0.9375rem] leading-relaxed text-ink">
                {quote.text}
              </blockquote>
              <p className="mt-4 font-panel text-[0.6875rem] uppercase tracking-panelwide text-ink-dim">
                {quote.name}, {quote.source}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
