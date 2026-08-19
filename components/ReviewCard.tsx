import { Quote } from "lucide-react";
import StarRating from "./StarRating";

export type ReviewQuote = {
  name: string;
  source: string;
  text: string;
  truncated?: boolean;
  /** Null until confirmed from the Google Business Profile. Null renders no stars. */
  rating?: number | null;
};

/**
 * One review, verbatim.
 *
 * NO STAR RATING. Google's list view did not expose a per-review rating, and
 * defaulting to five would be inventing a fact. Copper appears on the quote
 * mark and nowhere else on the card.
 *
 * Reviews Google itself truncated are marked as such, so a reader understands
 * the text stops mid-thought because Google cut it, not because we did.
 */
/**
 * Extra props are forwarded to the <figure>. The carousel drives the crossfade
 * with data-active and aria-hidden on this element, and without the spread they
 * were silently dropped, which left every slide at opacity 0 and the section
 * blank. A component that swallows unknown props fails quietly, which is the
 * worst way to fail.
 */
export default function ReviewCard({
  quote,
  className = "",
  ...rest
}: {
  quote: ReviewQuote;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<"figure">, "className">) {
  return (
    <figure
      {...rest}
      className={`rounded-panel border border-steel bg-graphite p-5 sm:p-7 ${className}`}
    >
      <Quote className="h-5 w-5 text-copper" aria-hidden="true" />
      <blockquote className="mt-3 text-[0.9375rem] leading-relaxed text-bone sm:text-base">
        {quote.text}
      </blockquote>
      <figcaption className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 font-panel text-[0.6875rem] uppercase tracking-panelwide text-ash">
        <span className="text-copper-bright">{quote.name}</span>
        <span aria-hidden="true">/</span>
        <span>{quote.source}</span>
      </figcaption>
      {quote.truncated && (
        <p className="mt-2 text-[0.6875rem] text-ash/60">
          Shown as Google displays it, cut off on their listing.
        </p>
      )}
    </figure>
  );
}
