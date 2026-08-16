import Link from "next/link";
import { Phone } from "lucide-react";
import { site } from "@/site.config";
import Wordmark from "./Wordmark";
import HeaderNav from "./HeaderNav";

/**
 * Nav comes from site.config.nav, which is the ONLY nav source. A local copy
 * here previously shadowed it, so editing the config silently did nothing and
 * /work never appeared in the link graph despite being configured.
 *
 * No Reviews entry: while site.reviews.enabled is false that route does not
 * exist, so it must not appear in the nav or anywhere in the link graph.
 */

/**
 * NOTE: this header must NOT use backdrop-blur.
 *
 * A backdrop-filter on an ancestor creates a containing block for
 * position:fixed descendants. The mobile nav drawer lives inside this header
 * and is fixed inset-0; with backdrop-blur here it was clipped to the header's
 * own 64px box instead of covering the viewport. Caught by measuring the
 * drawer's bounding rect, not by reading the markup.
 *
 * The ground is solid bg-iron instead, which also reads better where the header
 * sits over a photograph.
 */
export default function Header() {
  const { business } = site;

  return (
    <header className="sticky top-0 z-40 border-b border-steel bg-iron">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex min-h-[44px] items-center"
          aria-label={`${business.name}, home`}
        >
          <Wordmark />
        </Link>


        <div className="flex items-center gap-3 lg:gap-7">
          <HeaderNav />
        {/* The phone is the conversion path, so it is a control, not a link.
            Below sm it collapses to an icon so the header never looks empty. */}
        <a
          href={business.phoneHref}
          className="btn-primary !px-4 sm:!px-6"
          aria-label={`Call ${business.name} at ${business.phoneDisplay}`}
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">{business.phoneDisplay}</span>
        </a>
        </div>
      </div>
    </header>
  );
}
