/**
 * Prepares the site logo from Trae's clean emblem.
 *
 * SOURCE: public/images/logo-emblem-dark.webp, the emblem on a dark ground from
 * Trae's photo drop. It supersedes the Squarespace file, which was lighter,
 * softer, and carried a Gemini AI sparkle watermark. The old hand-keyed version
 * is retired; this script replaces it.
 *
 * NOT USED, DELIBERATELY: public/images/logo-lockup.webp. The lockup has
 * "LICENSED ELECTRICAL CONTRACTOR" baked into the artwork, and shipping it
 * would render the exact claim verify:copy blocks in text. It is held intact
 * and ships the moment the license number lands. See seo/FACTS.md section 11.
 *
 * The ground is pure black (sampled 0,0,0 at all four corners), so the key is a
 * tight luminance threshold gated on low saturation, which protects the bronze
 * metal and the lit bulb.
 */
import sharp from "sharp";

const SRC = "public/images/logo-emblem-dark.webp";
const OUT = "public/images/logo-emblem.png";

const LO = 8; // fully transparent at or below this luminance
const HI = 34; // fully opaque above this
const SAT_MAX = 0.3; // only key desaturated pixels

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

const out = Buffer.alloc(info.width * info.height * 4);
let keyed = 0;
let feathered = 0;

for (let i = 0, o = 0; i < data.length; i += info.channels, o += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const sat = max === 0 ? 0 : (max - min) / max;

  let alpha = 255;
  if (sat < SAT_MAX) {
    if (max <= LO) alpha = 0;
    else if (max < HI) alpha = Math.round((255 * (max - LO)) / (HI - LO));
  }

  if (alpha === 0) keyed++;
  else if (alpha < 255) feathered++;

  out[o] = r;
  out[o + 1] = g;
  out[o + 2] = b;
  out[o + 3] = alpha;
}

await sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } })
  .png()
  .trim({ threshold: 1 })
  .toFile(OUT);

const meta = await sharp(OUT).metadata();
const total = info.width * info.height;
console.log(`source     ${info.width}x${info.height}`);
console.log(`keyed      ${((keyed / total) * 100).toFixed(1)}% transparent`);
console.log(`feathered  ${((feathered / total) * 100).toFixed(1)}% partial`);
console.log(`trimmed    ${meta.width}x${meta.height}`);
console.log(`wrote      ${OUT}`);
console.log(
  "\nUsage rule: badge sizes only on the dark ground (roughly 36 to 80px tall)."
);
