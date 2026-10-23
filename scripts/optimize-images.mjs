// Generates responsive WebP derivatives of the original studio photos.
// Originals in docs/source-audit/original-assets are read-only inputs.
// Run with `npm run images`; output is committed, so builds don't need it.
import { mkdir, readdir, rm, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "docs/source-audit/original-assets");
const OUT = path.join(ROOT, "public/images");
const WIDTHS = [480, 800, 1200, 1600, 2400];

const PHOTOS = {
  "studio-crunch": "DSCF0503-scaled.jpg",
  "studio-lunge": "DSCF0509.jpg",
  "studio-swan": "DSCF0531.jpg",
  "studio-straps": "DSCF0579-scaled.jpg",
  "studio-portrait": "DSCF0835-scaled.jpg",
};

// Start clean so no stale or duplicate derivatives ship.
await mkdir(OUT, { recursive: true });
for (const f of await readdir(OUT)) await rm(path.join(OUT, f));

const manifest = {};

for (const [slug, file] of Object.entries(PHOTOS)) {
  const input = path.join(SRC, "images", file);
  const { width, height } = await sharp(input).metadata();
  const widths = WIDTHS.filter((w) => w <= width);
  for (const w of widths) {
    await sharp(input)
      .rotate()
      .resize({ width: w })
      .webp({ quality: 76, effort: 6 })
      .toFile(path.join(OUT, `${slug}-${w}.webp`));
  }
  manifest[slug] = { source: file, width, height, widths };
}

// Build-time data only: kept out of public/ so it isn't served.
await writeFile(path.join(ROOT, "lib/photo-manifest.json"), JSON.stringify(manifest, null, 2) + "\n");

// Open Graph image: 1200x630 crop of the landscape swan photo.
await sharp(path.join(SRC, "images/DSCF0531.jpg"))
  .resize({ width: 1200, height: 630, fit: "cover", position: "attention" })
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile(path.join(ROOT, "app/opengraph-image.jpg"));

// Icons from the original raster logo crops (never upscaled).
const logo = (name) => path.join(SRC, "logo", name);
await copyFile(logo("cropped-Copy-of-ERA-200-x-200px-40-x-40-px-1-192x192.png"), path.join(ROOT, "app/icon.png"));
await copyFile(logo("cropped-Copy-of-ERA-200-x-200px-40-x-40-px-1-180x180.png"), path.join(ROOT, "app/apple-icon.png"));

console.log(JSON.stringify(manifest, null, 2));
