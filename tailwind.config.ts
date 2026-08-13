import type { Config } from "tailwindcss";

/**
 * PHASE 0 SCAFFOLD ONLY.
 * The real brand tokens (color, type scale, signature element) are defined in
 * Phase 1 and must be approved at Gate 2 before they roll across the site.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
