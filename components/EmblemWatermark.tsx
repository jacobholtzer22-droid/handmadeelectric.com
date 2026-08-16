import Image from "next/image";

/**
 * The emblem at watermark scale, as a background element.
 *
 * ONE PER PAGE, on the iron ground only. The emblem is detailed metalwork, so
 * it earns size only where it has room and nothing is competing with it. Never
 * over a photograph, never over body copy at a legible opacity, never stretched
 * (the aspect ratio is fixed by width/height).
 *
 * Decorative only: aria-hidden, absolutely positioned so it contributes no
 * layout and therefore no CLS, and it never animates.
 */
export default function EmblemWatermark({
  className = "",
  size = 620,
}: {
  /** Positioning, supplied by the section that owns it. */
  className?: string;
  size?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute select-none ${className}`}
    >
      <Image
        src="/images/logo-emblem.png"
        alt=""
        width={size}
        height={Math.round(size * (353 / 388))}
        priority={false}
        className="opacity-[0.055] mix-blend-luminosity"
      />
    </div>
  );
}
