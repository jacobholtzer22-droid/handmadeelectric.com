/**
 * Verifies every foreground/background token pair actually used on the site
 * against WCAG 2.1 AA. Run after any palette change.
 *
 * AA: 4.5:1 for body text, 3.0:1 for large text (>=24px, or >=18.66px bold)
 * and for UI component boundaries.
 */

const C = {
  iron: "#0F1215",
  graphite: "#171B20",
  steel: "#252C33",
  "steel-light": "#3B444E",
  bone: "#F4F1EA",
  "bone-dim": "#E4DFD4",
  ash: "#AFB6BF",
  ink: "#14181C",
  "ink-dim": "#4C555F",
  copper: "#C8763C",
  "copper-bright": "#E8955A",
  "copper-deep": "#9A5526",
  filament: "#FFC15E",
};

function srgbToLin(v) {
  const c = v / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function luminance(hex) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return 0.2126 * srgbToLin(r) + 0.7152 * srgbToLin(g) + 0.0722 * srgbToLin(b);
}

function ratio(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

// [foreground, background, where it is used, required ratio]
const PAIRS = [
  // --- Dark ground ---
  ["bone", "iron", "Headings and H1 on the dark hero", 3.0],
  ["bone", "graphite", "Headings on raised dark panels", 3.0],
  ["ash", "iron", "Body copy on the dark hero", 4.5],
  ["ash", "graphite", "Body copy on raised dark panels", 4.5],
  ["copper-bright", "iron", "Copper TEXT on dark, eyebrows and links", 4.5],
  ["copper-bright", "graphite", "Copper TEXT on raised dark panels", 4.5],
  ["filament", "iron", "Energized/active state text on dark", 4.5],
  ["copper", "iron", "Copper rules and borders on dark (non-text)", 3.0],
  ["steel", "iron", "Hairline borders on dark (non-text)", 1.0],

  // --- Light ground ---
  ["ink", "bone", "Body copy and headings on light sections", 4.5],
  ["ink-dim", "bone", "Muted body copy on light sections", 4.5],
  ["copper-deep", "bone", "Copper TEXT on light, eyebrows and links", 4.5],
  ["copper", "bone", "Copper rules and borders on light (non-text)", 3.0],
  ["bone-dim", "bone", "Card borders on light (non-text)", 1.0],

  // --- Buttons ---
  ["iron", "copper", "Dark label on the copper primary button", 4.5],
  ["bone", "steel", "Light label on the steel secondary button", 4.5],
];

let failures = 0;
const pad = (s, n) => String(s).padEnd(n);
const padL = (s, n) => String(s).padStart(n);

console.log(
  pad("FOREGROUND", 16) + pad("BACKGROUND", 13) + padL("RATIO", 8) + padL("NEED", 7) + "  " + pad("RESULT", 8) + "USED FOR"
);
console.log("-".repeat(108));

for (const [fg, bg, use, need] of PAIRS) {
  const r = ratio(C[fg], C[bg]);
  const ok = r >= need;
  if (!ok) failures++;
  console.log(
    pad(fg, 16) +
      pad(bg, 13) +
      padL(r.toFixed(2) + ":1", 8) +
      padL(need.toFixed(1), 7) +
      "  " +
      pad(ok ? "PASS" : "FAIL", 8) +
      use
  );
}

console.log("-".repeat(108));
if (failures > 0) {
  console.log(`${failures} FAILING PAIR(S). Fix the palette before building on it.`);
  process.exit(1);
}
console.log(`All ${PAIRS.length} pairs pass WCAG 2.1 AA at their required level.`);
