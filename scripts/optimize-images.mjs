/**
 * Phase 0: optimize the client's source images into /public/images.
 *
 * Sources in public/images/source/ are the raw downloads from the retired
 * Squarespace CDN (they arrive as WebP despite the .jpg URLs). Originals are
 * kept untouched so a re-encode is always reversible.
 *
 * The logo is copied through at full quality, never re-encoded.
 */
import sharp from "sharp";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { statSync } from "node:fs";
import path from "node:path";

const SRC = "public/images/source";
const OUT = "public/images";

// [source file, output name, max long edge, quality] - logo handled separately
const PHOTOS = [
  ["panel-open.webp", "panel-open.webp", 1600, 80],
  ["panel-wood-wall.webp", "panel-wood-wall.webp", 1600, 80],
  ["residential.webp", "residential.webp", 1600, 80],
  ["commercial.webp", "commercial.webp", 1600, 80],
  ["industrial.webp", "industrial.webp", 1600, 80],
];

const rows = [];

await mkdir(OUT, { recursive: true });

for (const [src, out, maxEdge, quality] of PHOTOS) {
  const srcPath = path.join(SRC, src);
  const outPath = path.join(OUT, out);
  const before = statSync(srcPath).size;

  const meta = await sharp(srcPath).metadata();
  await sharp(srcPath)
    .resize({
      width: maxEdge,
      height: maxEdge,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality })
    .toFile(outPath);

  const after = statSync(outPath).size;
  const outMeta = await sharp(outPath).metadata();
  rows.push({
    file: out,
    dims: `${meta.width}x${meta.height} -> ${outMeta.width}x${outMeta.height}`,
    before,
    after,
  });
}

// Logo: pass through byte-for-byte at source quality (already WebP, 1024x559).
const logoSrc = path.join(SRC, "logo.webp");
const logoOut = path.join(OUT, "logo.webp");
const logoBefore = statSync(logoSrc).size;
await writeFile(logoOut, await readFile(logoSrc));
const logoMeta = await sharp(logoOut).metadata();
rows.push({
  file: "logo.webp (copied, not re-encoded)",
  dims: `${logoMeta.width}x${logoMeta.height} -> ${logoMeta.width}x${logoMeta.height}`,
  before: logoBefore,
  after: statSync(logoOut).size,
});

const pad = (s, n) => String(s).padEnd(n);
const padL = (s, n) => String(s).padStart(n);
console.log(
  pad("FILE", 38) + pad("DIMENSIONS", 24) + padL("BEFORE", 10) + padL("AFTER", 10) + padL("SAVED", 9)
);
console.log("-".repeat(91));
let tb = 0;
let ta = 0;
for (const r of rows) {
  tb += r.before;
  ta += r.after;
  const pct = r.before === r.after ? "0%" : `${Math.round((1 - r.after / r.before) * 100)}%`;
  console.log(
    pad(r.file, 38) + pad(r.dims, 24) + padL(r.before.toLocaleString(), 10) + padL(r.after.toLocaleString(), 10) + padL(pct, 9)
  );
}
console.log("-".repeat(91));
console.log(
  pad("TOTAL", 38) + pad("", 24) + padL(tb.toLocaleString(), 10) + padL(ta.toLocaleString(), 10) + padL(`${Math.round((1 - ta / tb) * 100)}%`, 9)
);
