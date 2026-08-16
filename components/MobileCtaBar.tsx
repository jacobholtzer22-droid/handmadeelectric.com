import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { site } from "@/site.config";

/**
 * Sticky quote and call bar, mobile only.
 *
 * Two buttons, side by side, each half the width and clearing 44px, sitting in
 * the thumb zone at the bottom of the screen. Quote is primary copper, call is
 * outlined, matching CtaPair everywhere else on the site.
 *
 * NOTE ON TEXTING: this bar previously carried Call and Text. Texting is a
 * confirmed behaviour of this business, so it did not disappear, it moved. It
 * is one tap away in the footer of every page and at the top of /contact. If
 * the bar should carry three controls instead of two, that is a design call to
 * revisit, but three buttons at this width start failing the 44px rule.
 *
 * Sits above the iOS home indicator via env(safe-area-inset-bottom).
 */
export default function MobileCtaBar() {
  const { business } = site;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-steel bg-graphite/95 backdrop-blur md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-2 gap-2.5 px-4 py-2.5">
        <Link href="/contact" className="btn-primary w-full !px-3">
          Get a quote
          <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
        </Link>
        <a
          href={business.phoneHref}
          className="btn-secondary w-full !px-3"
          aria-label={`Call ${business.name} at ${business.phoneDisplay}`}
        >
          <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
          Call
        </a>
      </div>
    </div>
  );
}
