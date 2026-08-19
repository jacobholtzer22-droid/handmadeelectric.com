import { Star } from "lucide-react";

/**
 * Stars, rendered ONLY from a confirmed rating.
 *
 * Pass a null rating and this renders nothing at all. That is deliberate and it
 * is the whole point: the six Google reviews on this site arrived without
 * per-review ratings, and drawing five stars because five is likely would be
 * publishing a number nobody verified. Same rule as the license number, the
 * hours, and the city list.
 *
 * The moment the ratings are confirmed from the Google Business Profile, set
 * them in site.config and every star on the site appears at once.
 */
export default function StarRating({
  rating,
  size = "md",
  label,
}: {
  /** 0 to 5. Null means unconfirmed, so nothing renders. */
  rating: number | null;
  size?: "md" | "lg";
  /** Accessible label, e.g. "Rated 5 out of 5". */
  label?: string;
}) {
  if (rating === null) return null;

  const px = size === "lg" ? "h-6 w-6" : "h-4 w-4";
  const full = Math.round(rating);

  return (
    <span
      className="inline-flex items-center gap-1"
      role="img"
      aria-label={label ?? `Rated ${rating} out of 5`}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className={`${px} ${
            i < full ? "fill-filament text-filament" : "text-steel-light"
          }`}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}
