"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone, MessageSquare, ArrowRight } from "lucide-react";
import { site } from "@/site.config";

/**
 * Sticky call, text, and quote bar, mobile only.
 *
 * THREE controls. 44px is a HEIGHT minimum, not a width one: measured at 390px
 * each button is 113x46, no wrap, no overflow. Texting stays in the thumb zone
 * because this business explicitly invites texts.
 *
 * ENTRANCE: it slides up once the hero has scrolled past, rather than sitting
 * over the hero from the first frame. It is `fixed`, so the transform cannot
 * shift page layout and contributes no CLS. Reduced motion resets the transform
 * to its final state, so the bar is simply present.
 *
 * Rendered in the initial HTML like everything else; only its transform is
 * driven by scroll.
 */
export default function MobileCtaBar() {
  const { business } = site;
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.55);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      data-shown={shown ? "" : undefined}
      className="cta-bar fixed inset-x-0 bottom-0 z-50 border-t border-steel bg-graphite/95 backdrop-blur md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-3 gap-2.5 px-4 py-2.5">
        <a
          href={business.phoneHref}
          className="btn-secondary w-full !gap-1.5 !px-2"
          aria-label={`Call ${business.name} at ${business.phoneDisplay}`}
        >
          <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
          Call
        </a>
        <a
          href={business.smsHref}
          className="btn-secondary w-full !gap-1.5 !px-2"
          aria-label={`Text ${business.name} at ${business.phoneDisplay}`}
        >
          <MessageSquare className="h-4 w-4 shrink-0" aria-hidden="true" />
          Text
        </a>
        <Link href="/contact" className="btn-primary w-full !gap-1.5 !px-2">
          Quote
          <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
