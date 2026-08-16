import Link from "next/link";
import { Phone, MessageSquare, ArrowRight } from "lucide-react";
import { site } from "@/site.config";

/**
 * Sticky call, text, and quote bar, mobile only.
 *
 * THREE controls, not two. 44px is a HEIGHT minimum, not a width one: at 390px
 * with 16px gutters and two 10px gaps, each button is roughly 113px wide and
 * 44px tall, which clears the target comfortably. Dropping texting from here
 * would have been wrong, because this business explicitly invites texts.
 *
 * Labels are single words so nothing wraps at 390px. The quote button keeps the
 * copper primary treatment, matching CtaPair everywhere else; call and text are
 * outlined, so the hierarchy still reads.
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
