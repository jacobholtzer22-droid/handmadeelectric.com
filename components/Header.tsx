import Link from "next/link";
import { Phone } from "lucide-react";
import { site } from "@/site.config";
import Wordmark from "./Wordmark";

/**
 * Phase 1: the nav targets are the Phase 2 routes. They are rendered now
 * because the header is part of judging the hero, but only the homepage
 * exists until Phase 2 builds the rest.
 */
/**
 * No Reviews entry. While site.reviews.enabled is false the /reviews route does
 * not exist, so it must not appear in the nav or anywhere in the internal link
 * graph. Flipping the flag is what adds it back.
 */
const NAV = [
  { label: "Services", href: "/services" },
  { label: "Generators", href: "/services/generac-generator-installation" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

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
            {NAV.map((item) => (
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
