/**
 * Prepares the client's logo emblem for use on the dark ground.
 *
 * Two problems in the source (see seo/FACTS.md section 11):
 *   1. A Gemini AI-generation sparkle watermark in the bottom-right margin.
 *   2. A baked-in flat light-gray background, no alpha, so it cannot sit on a
 *      dark section without a light box around it.
 *
 * Both are solved by the same pass. The background is desaturated and light;
 * the emblem is saturated bronze and copper with a warm lit bulb. So we key on
 * "desaturated AND light" and the watermark, being lighter than its own
 * background, keys out for free.
 *
 * The drop shadow under the emblem is desaturated but DARK, so it survives the
 * key. On a dark ground a retained dark shadow is invisible, which is exactly
 * what we want. Keying it out instead would chew into the metal edges.
 */
import sharp from "sharp";

const SRC = "public/images/source/logo.webp";
const OUT_KEYED = "public/images/logo-emblem.png";

// Soft threshold on lightness. Fully transparent above HI, fully opaque below
// LO, linear ramp between so edges stay smooth instead of stair-stepping.
const L_HI = 200;
const L_LO = 168;
// Only key pixels this desaturated. Protects the bronze metal and the bulb.
const SAT_MAX = 0.1;

const { data, info } = await sharp(SRC)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const ch = info.channels;
const out = Buffer.alloc(info.width * info.height * 4);

let keyed = 0;
let partial = 0;

for (let i = 0, o = 0; i < data.length; i += ch, o += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const lightness = (max + min) / 2;
  const sat = max === 0 ? 0 : (max - min) / max;

  let alpha = 255;
  if (sat < SAT_MAX) {
    if (lightness >= L_HI) alpha = 0;
    else if (lightness > L_LO) {
      alpha = Math.round(255 * (1 - (lightness - L_LO) / (L_HI - L_LO)));
    }
  }

  if (alpha === 0) keyed++;
  else if (alpha < 255) partial++;

  out[o] = r;
  out[o + 1] = g;
  out[o + 2] = b;
  out[o + 3] = alpha;
}

// Trim the now-transparent margin so the emblem fills its box, then cap height.
await sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } })
  .png()
  .trim({ threshold: 1 })
  .toFile(OUT_KEYED);

const meta = await sharp(OUT_KEYED).metadata();
const total = info.width * info.height;
console.log(`source        ${info.width}x${info.height}`);
console.log(`keyed out     ${((keyed / total) * 100).toFixed(1)}% of pixels fully transparent`);
console.log(`feathered     ${((partial / total) * 100).toFixed(1)}% of pixels partially transparent`);
console.log(`trimmed to    ${meta.width}x${meta.height}`);
console.log(`wrote         ${OUT_KEYED}`);
