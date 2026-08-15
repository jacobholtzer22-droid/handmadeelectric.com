import type { Config } from "tailwindcss";

/**
 * HANDMADE ELECTRIC - DESIGN TOKENS
 *
 * Direction: "Forged". The brand asset is the name. Handmade + electrical trade
 * means craft, so the site is built out of the materials of the trade: machined
 * steel ground, warm off-white, and one hot copper accent. Copper is not
 * decoration here, it is literally the metal inside every wire this business
 * pulls, and it is the dominant color of the client's own logo.
 *
 * Discipline: the boldness is spent in ONE place, the copper. Everything around
 * it is quiet steel and off-white. No second decorative color.
 *
 * Contrast ratios for every pair used on the site are verified by
 * `node scripts/check-contrast.mjs` and printed at Gate 2.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        /* --- Steel ground, cool cast so the warm copper pops hardest --- */
        iron: "#0F1215", // page ground, deepest
        graphite: "#171B20", // raised panel surface
        steel: "#252C33", // hairline borders on dark
        "steel-light": "#3B444E", // secondary borders, disabled

        /* --- Warm off-white, the "bone" side of the system --- */
        bone: "#F4F1EA", // light section ground, and text on dark
        "bone-dim": "#E4DFD4", // light section borders

        /* --- Body text --- */
        ash: "#AFB6BF", // muted body text on dark ground
        ink: "#14181C", // body text on light ground
        "ink-dim": "#4C555F", // muted body text on light ground

        /* --- The one accent. Copper wire, oxidized to bright. --- */
        /**
         * USAGE RULE, do not widen this.
         * `copper` on `bone` measures 3.05:1 against a 3.0 requirement. That is
         * a 0.05 margin, which is enough for DECORATIVE rules, borders, and
         * fills and nothing else. Anything on a light ground that carries
         * meaning uses `copper-deep` (5.03:1): icons, focus rings, glyphs,
         * link text, status marks, anything a user has to perceive to
         * understand the page. If you are about to put `copper` on `bone` and
         * it means something, you want `copper-deep`.
         */
        copper: "#C8763C", // structural copper, borders, rules, fills
        "copper-bright": "#E8955A", // copper as TEXT on the dark ground (AA)
        "copper-deep": "#9A5526", // copper as TEXT on the light ground (AA)

        /* --- Energized. The filament glow from the logo's bulb. --- */
        /* Used only for live/active states and the hero's lit segment. */
        filament: "#FFC15E",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        panel: ["var(--font-panel)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        forged: "-0.03em", // display face, tight and dense
        panelwide: "0.16em", // breaker-directory micro-labels
      },
      maxWidth: {
        page: "78rem",
        prose: "40rem",
      },
      borderRadius: {
        // Machined, not soft. Small consistent radius, never pill.
        panel: "3px",
      },
    },
  },
  plugins: [],
};

export default config;
