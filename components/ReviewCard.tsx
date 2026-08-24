import { Quote } from "lucide-react";
import StarRating from "./StarRating";

export type ReviewQuote = {
  name: string;
  source: string;
  text: string;
  truncated?: boolean;
  rating?: number | null;
};

/**
 * One review, verbatim, on a LIGHT card.
 *
 * The card is bone on the iron ground on purpose. Graphite cards on a graphite
 * band were nearly invisible: the card and the section behind it were the same
 * colour, so the reviews read as loose text rather than as testimonials. Light
 * cards on the darkest ground is the highest contrast this palette offers, and
 * it makes the section impossible to scroll past.
 *
 * Stars use `gold-deep`, not `filament`. Filament is tuned for the dark ground
 * and falls to roughly 1.3:1 on bone, which is invisible. gold-deep measures
 * 4.91:1 and clears the 3:1 minimum for a meaningful graphic.
 *
 * Ratings still render from data only. A null rating draws no stars.
 */
/**
 * Extra props are forwarded to the <figure>. The carousel drives the crossfade
 * with `data-active` and hides inactive slides with `aria-hidden`, and both
 * have to reach the DOM node the CSS targets.
 *
 * They did not, once. The carousel passed them, this component accepted only
 * `quote` and `className`, and React dropped the rest silently. `.review-slide`
 * is opacity 0 until `[data-active]` matches, so every card on the homepage was
 * invisible while the heading, the stars, and the arrows all rendered normally.
 * That is why the props are spread rather than destructured away.
 */
export default function ReviewCard({
  quote,
  className = "",
  ...rest
}: {
  quote: ReviewQuote;
  className?: string;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <figure
      {...rest}
      className={`flex flex-col rounded-panel border border-bone-dim bg-bone p-6 shadow-[0_1px_0_0_rgba(200,118,60,0.35)] sm:p-7 ${className}`}
    >
      <div className="flex items-center justify-between gap-4">
        <StarRating
          rating={quote.rating ?? null}
          label={`Rated ${quote.rating} out of 5`}
        />
        <Quote className="h-6 w-6 shrink-0 text-copper" aria-hidden="true" />
      </div>

      <blockquote className="mt-5 flex-1 text-base leading-relaxed text-ink sm:text-[1.0625rem]">
        {quote.text}
      </blockquote>

      <figcaption className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-bone-dim pt-4 font-panel text-[0.6875rem] uppercase tracking-panelwide">
        <span className="font-semibold text-ink">{quote.name}</span>
        <span className="text-ink-dim" aria-hidden="true">/</span>
        <span className="text-ink-dim">{quote.source}</span>
      </figcaption>

      {quote.truncated && (
        <p className="mt-2 text-[0.6875rem] text-ink-dim/70">
          Shown as Google displays it, cut off on their listing.
        </p>
      )}
    </figure>
  );
}
