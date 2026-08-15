/**
 * Micro-label styled like the directory tag inside a breaker panel door.
 * The `lit` variant carries the only filament-colored pixel in the system.
 */
export default function PanelTag({
  children,
  tone = "dark",
  lit = false,
  className = "",
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
  lit?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`panel-tag ${
        tone === "dark" ? "panel-tag-dark" : "panel-tag-light"
      } ${className}`}
    >
      {lit && <span className="panel-tag-led" aria-hidden="true" />}
      {children}
    </span>
  );
}
