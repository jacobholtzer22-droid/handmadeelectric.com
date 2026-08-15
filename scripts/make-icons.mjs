/**
 * Favicon and app icons.
 *
 * NOT the full emblem. At 32px the whole badge is mud: gears, banner text, and
 * bulb all collapse into brown noise (verified by compositing it at real size).
 * The bulb alone, which is the one high-contrast element and the only lit one,
 * stays legible all the way down. So the icon is a crop of the client's own
 * emblem, not a redraw and not a new mark.
 *
 * The iron ground is baked in rather than left transparent, because the bronze
 * would disappear against a light browser tab.
 */
import sharp from "sharp";

const SRC = "public/images/logo-emblem.png";
const IRON = { r: 15, g: 18, b: 21, alpha: 1 };

const meta = await sharp(SRC).metadata();
const side = Math.round(meta.height * 0.42);
const crop = {
  left: Math.round(meta.width / 2 - side / 2),
  top: Math.round(meta.height * 0.06),
  width: side,
  height: side,
};

for (const [file, size, pad] of [
  ["app/icon.png", 512, 0.10],
  ["app/apple-icon.png", 180, 0.14],
]) {
  const inner = Math.round(size * (1 - pad * 2));
  const bulb = await sharp(SRC).extract(crop).resize(inner, inner, { fit: "contain", background: IRON }).toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: IRON } })
    .composite([{ input: bulb, top: Math.round((size - inner) / 2), left: Math.round((size - inner) / 2) }])
    .png()
    .toFile(file);
  console.log(`wrote ${file} at ${size}x${size}`);
}
