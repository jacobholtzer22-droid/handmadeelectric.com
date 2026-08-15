/**
 * Imports Trae's photo drop into public/images/work.
 *
 * Names are descriptive of WHAT IS VISIBLE in each frame, categorised by the
 * kind of building the work is in. Alt text is written from the same
 * observation, never from an invented project narrative.
 *
 * Originals stay in the git-ignored drop folder. These are the derivatives.
 */
import sharp from "sharp";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { statSync } from "node:fs";
import path from "node:path";

const SRC = "Trae Website Photos";
const OUT = "public/images/work";

// [source, output slug, category]
const MAP = [
  // Residential
  ["IMG_0395.jpg", "residential-panel-open", "residential"],
  ["IMG_0825.jpg", "residential-panel-basement", "residential"],
  ["IMG_0649.jpg", "residential-service-exterior", "residential"],
  ["IMG_6222.jpg", "residential-rough-in", "residential"],
  ["IMG_4019.jpg", "residential-panel-circuits", "residential"],
  ["IMG_3641.jpg", "residential-recessed-lighting", "residential"],
  ["IMG_0226.jpg", "outlet-tester", "residential"],
  // Commercial
  ["IMG_0453.jpg", "commercial-corridor-lighting", "commercial"],
  ["IMG_3642.jpg", "commercial-warehouse-lighting", "commercial"],
  ["IMG_3643.jpg", "commercial-warehouse-highbay", "commercial"],
  ["IMG_4075.jpg", "commercial-retail-lighting", "commercial"],
  ["IMG_4714.jpg", "commercial-retail-ceiling", "commercial"],
  ["IMG_4306.jpg", "commercial-office-troffers", "commercial"],
  ["IMG_4307.jpg", "commercial-office-interior", "commercial"],
  ["IMG_4340.jpg", "commercial-exterior-soffit", "commercial"],
  ["IMG_0396.jpg", "commercial-meter-bank", "commercial"],
  ["IMG_3939.jpg", "commercial-panel-board", "commercial"],
  // Industrial
  ["IMG_0375.jpg", "industrial-disconnect-interior", "industrial"],
  ["IMG_0886.jpg", "industrial-conduit-run", "industrial"],
  ["IMG_3107.jpg", "industrial-ceiling-conduit", "industrial"],
  ["IMG_3933.jpg", "industrial-conduit-disconnect", "industrial"],
];

await mkdir(OUT, { recursive: true });

const rows = [];
for (const [src, slug, category] of MAP) {
  const from = path.join(SRC, src);
  const to = path.join(OUT, `${slug}.webp`);
  const before = statSync(from).size;
  const meta = await sharp(from).metadata();
  await sharp(from)
    .resize({ width: 1400, height: 1400, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(to);
  rows.push({ slug, category, src, dims: `${meta.width}x${meta.height}`, before, after: statSync(to).size });
}

// Logos. These arrived on a dark ground already, which is what the site needs.
await mkdir("public/images", { recursive: true });
for (const [src, out, width] of [
  ["IMG_0805.png", "public/images/logo-lockup.webp", 1234],
  ["IMG_0845.png", "public/images/logo-emblem-dark.webp", 676],
]) {
  const from = path.join(SRC, src);
  await sharp(from).resize({ width, withoutEnlargement: true }).webp({ quality: 88 }).toFile(out);
  const m = await sharp(out).metadata();
  rows.push({ slug: path.basename(out), category: "logo", src, dims: `${m.width}x${m.height}`, before: statSync(from).size, after: statSync(out).size });
}

const pad = (s, n) => String(s).padEnd(n);
const padL = (s, n) => String(s).padStart(n);
console.log(pad("OUTPUT", 34) + pad("CATEGORY", 13) + pad("FROM", 15) + pad("DIMS", 12) + padL("BEFORE", 9) + padL("AFTER", 9));
console.log("-".repeat(94));
let tb = 0, ta = 0;
for (const r of rows) {
  tb += r.before; ta += r.after;
  console.log(pad(r.slug, 34) + pad(r.category, 13) + pad(r.src, 15) + pad(r.dims, 12) + padL(r.before.toLocaleString(), 9) + padL(r.after.toLocaleString(), 9));
}
console.log("-".repeat(94));
console.log(pad(`${rows.length} files`, 34) + pad("", 40) + padL(tb.toLocaleString(), 9) + padL(ta.toLocaleString(), 9) + `  (${Math.round((1 - ta / tb) * 100)}% smaller)`);
