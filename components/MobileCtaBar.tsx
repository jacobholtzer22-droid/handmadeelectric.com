import { Phone, MessageSquare } from "lucide-react";
import { site } from "@/site.config";

/**
 * Sticky call and text bar, mobile only.
 *
 * The business explicitly invites text messages (the old site said "text
 * 248-787-0071"), so texting is a first-class CTA, not an afterthought.
 * Both controls clear 44px. Sits above the iOS home indicator via
 * env(safe-area-inset-bottom).
 */
export default function MobileCtaBar() {
  const { business } = site;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-steel bg-graphite/95 backdrop-blur md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-2 gap-2.5 px-4 py-2.5">
        <a href={business.phoneHref} className="btn-primary w-full">
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call
        </a>
        <a href={business.smsHref} className="btn-secondary w-full">
          <MessageSquare className="h-4 w-4" aria-hidden="true" />
          Text
        </a>
      </div>
    </div>
  );
}
