import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { site } from "@/site.config";

/**
 * THE DUAL CTA. Never ship a lone call button anywhere on this site.
 *
 * Quote is primary copper, call is outlined, equal visual weight, both always
 * visible. Calling only captures people willing to talk to a stranger; the
 * quote path captures everyone else. Neither is allowed to become the
 * afterthought.
 *
 * `tone` picks the outline treatment for the ground it sits on. The copper
 * primary is identical on both, because it is the one moment of colour the
 * section is allowed to spend.
 */
export default function CtaPair({
  tone = "dark",
  className = "",
  quoteLabel = "Get a quote",
  full = false,
}: {
  tone?: "dark" | "light";
  className?: string;
  quoteLabel?: string;
  /** Full-width stacked buttons, for narrow columns and cards. */
  full?: boolean;
}) {
  const { business } = site;

  return (
    <div
      className={`flex gap-3 ${
        full ? "flex-col" : "flex-col sm:flex-row sm:flex-wrap"
      } ${className}`}
    >
      <Link href="/contact" className={`btn-primary ${full ? "w-full" : ""}`}>
        {quoteLabel}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
      <a
        href={business.phoneHref}
        className={`${tone === "dark" ? "btn-secondary" : "btn-secondary-light"} ${
          full ? "w-full" : ""
        }`}
      >
        <Phone className="h-4 w-4" aria-hidden="true" />
        {business.phoneDisplay}
      </a>
    </div>
  );
}
