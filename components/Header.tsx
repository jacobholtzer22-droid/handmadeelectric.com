import Link from "next/link";
import { Phone } from "lucide-react";
import { site } from "@/site.config";
import Wordmark from "./Wordmark";

/**
 * Nav comes from site.config.nav, which is the ONLY nav source. A local copy
 * here previously shadowed it, so editing the config silently did nothing and
 * /work never appeared in the link graph despite being configured.
 *
 * No Reviews entry: while site.reviews.enabled is false that route does not
 * exist, so it must not appear in the nav or anywhere in the link graph.
 */

export default function Header() {
  const { business } = site;

  return (
    <header className="sticky top-0 z-40 border-b border-steel bg-iron/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex min-h-[44px] items-center"
          aria-label={`${business.name}, home`}
        >
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-panel text-[0.6875rem] uppercase tracking-panelwide text-ash transition-colors hover:text-copper-bright"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

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
    </header>
  );
}
