import Image from "next/image";

/**
 * The lockup is the emblem badge plus a typographic nameplate.
 *
 * The emblem is Trae's own mark, keyed off its dark ground. It runs at badge
 * size only: it is a detailed raster and turns to mud much below 36px, and it
 * is never scaled large on a dark section. The wordmark carries the legibility.
 *
 * NOT the full branded lockup, which has "LICENSED ELECTRICAL CONTRACTOR" baked
 * into it. See seo/FACTS.md section 11.
 */
export default function Wordmark({
  className = "",
  emblemClass = "h-9 w-auto sm:h-10",
}: {
  className?: string;
  emblemClass?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 leading-none ${className}`}>
      <Image
        src="/images/logo-emblem.png"
        alt=""
        width={388}
        height={353}
        priority
        className={emblemClass}
        aria-hidden="true"
      />
      <span className="inline-block">
        <span className="h-display block text-[1.0625rem] text-bone sm:text-lg">
          HANDMADE
        </span>
        <span className="mt-[3px] block font-panel text-[0.5rem] font-medium tracking-panelwide text-copper-bright sm:text-[0.5625rem]">
          ELECTRIC LLC
        </span>
      </span>
    </span>
  );
}
