import { site } from "@/site.config";
import PanelTag from "./PanelTag";

/**
 * Renders ONLY facts confirmed in seo/FACTS.md, and renders nothing at all when
 * none are.
 *
 * As of this build every item here is TODO: no license number, no insured or
 * bonded confirmation, and the "more than a decade" claim from the old site is
 * quarantined pending a real founding year. So this section is currently absent
 * from the page, which is the correct behavior and not a bug.
 *
 * An empty trust row is better than a padded one. The moment FACTS section 6
 * lands, the items appear here with no other change needed.
 */
export default function TrustRow() {
  const { facts } = site;

  const items: { label: string; value: string }[] = [];

  if (facts.licenseNumber) {
    items.push({ label: "Michigan license", value: facts.licenseNumber });
  }
  if (facts.insured) {
    items.push({ label: "Insured", value: "Yes" });
  }
  if (facts.bonded) {
    items.push({ label: "Bonded", value: "Yes" });
  }
  if (facts.yearFounded) {
    items.push({
      label: "Serving since",
      value: String(facts.yearFounded),
    });
  }

  if (items.length === 0) return null;

  return (
    <section className="bg-bone py-14">
      <div className="container-page">
        <PanelTag tone="light">Credentials</PanelTag>
        <dl className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.label}
              className="rounded-panel border border-bone-dim p-5"
            >
              <dt className="font-panel text-[0.6875rem] uppercase tracking-panelwide text-ink-dim">
                {item.label}
              </dt>
              <dd className="h-display mt-2 text-xl text-ink">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
