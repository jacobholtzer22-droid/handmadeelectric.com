import { site } from "@/site.config";

/**
 * The primary lockup is typographic, not the emblem.
 *
 * The client's emblem is a detailed 1024px raster and turns to mud below about
 * 80px tall, which is exactly the size a header lockup needs to be. So the
 * header gets a stamped nameplate instead: heavy Archivo over a mono
 * subline, which is the same visual language as the panel tags.
 */
export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-block leading-none ${className}`}>
      <span className="h-display block text-[1.0625rem] text-bone sm:text-lg">
        HANDMADE
      </span>
      <span className="mt-[3px] block font-panel text-[0.5rem] font-medium tracking-panelwide text-copper-bright sm:text-[0.5625rem]">
        ELECTRIC LLC
      </span>
    </span>
  );
}
