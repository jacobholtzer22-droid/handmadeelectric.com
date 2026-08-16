import PanelTag from "./PanelTag";

/**
 * TYPOGRAPHIC BLOCK, USED WHERE A GENERATOR PHOTO WOULD GO.
 *
 * There is not one photograph of a generator in the whole set. Twenty one real
 * job photos, and none of them is the product. Putting a meter socket or a
 * panel board next to the words "Generac generator installation" makes a
 * skimming visitor believe they are looking at a generator, and honest alt text
 * does not fix that, because nobody reads alt text with their eyes.
 *
 * So the generator blocks are built out of type instead. This panel states the
 * three things that define a correct standby installation, all of which already
 * appear as claims elsewhere on these pages, so it introduces nothing new.
 *
 * REPLACE THIS with a real photograph the moment Trae supplies one. Generator
 * photos are the top item on the client photo request list.
 */
type Spec = { label: string; value: string; note: string };

/** Installation. Every line restates a claim already on the install page. */
const INSTALL_SPECS: Spec[] = [
  {
    label: "Sized",
    value: "By load calculation",
    note: "Not by square footage, and not off the neighbour's unit.",
  },
  {
    label: "Switched",
    value: "Automatic transfer switch",
    note: "The house disconnects from the utility before the generator picks it up.",
  },
  {
    label: "Signed off",
    value: "Permitted and inspected",
    note: "An independent check on equipment that runs while you are asleep.",
  },
];

/**
 * Repair and service. Every line restates a claim already on the repair page's
 * process section. An installation panel on a repair page is a mismatch, which
 * is exactly what shipped for one build before it was caught on screen.
 */
const REPAIR_SPECS: Spec[] = [
  {
    label: "Tested",
    value: "Diagnosed, not guessed",
    note: "Battery and charging, fuel, oil and its safety shutdowns, controller, transfer switch.",
  },
  {
    label: "Told first",
    value: "Findings before any repair",
    note: "You get what is wrong and what the options are before work starts.",
  },
  {
    label: "Proven",
    value: "Tested on a real transfer",
    note: "Starting and carrying the house are two different things.",
  },
];

export default function StandbySpecPanel({
  variant = "install",
  className = "",
}: {
  variant?: "install" | "repair";
  className?: string;
}) {
  const specs = variant === "repair" ? REPAIR_SPECS : INSTALL_SPECS;
  const heading =
    variant === "repair"
      ? "How a service call runs"
      : "What a correct install means";

  return (
    <div className={`panel-raised relative overflow-hidden p-6 sm:p-8 ${className}`}>
      <PanelTag>{heading}</PanelTag>

      <dl className="mt-7 space-y-7">
        {specs.map((spec) => (
          <div key={spec.label}>
            <div className="conduit-rule" aria-hidden="true" />
            <dt className="mt-3 font-panel text-[0.6875rem] uppercase tracking-panelwide text-copper-bright">
              {spec.label}
            </dt>
            <dd>
              <span className="h-display mt-1.5 block text-xl text-bone sm:text-2xl">
                {spec.value}
              </span>
              <span className="mt-2 block text-[0.9375rem] leading-relaxed text-ash">
                {spec.note}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
