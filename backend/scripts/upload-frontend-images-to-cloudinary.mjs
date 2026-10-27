// One-time (and re-runnable) migration: uploads every image in frontend/public
// to Cloudinary and writes a { "/local/path.jpg": "https://res.cloudinary.com/..." }
// mapping to image-mapping.json. Safe to re-run - already-uploaded paths are skipped,
// so it can also be used later to upload any newly added images.
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import cloudinary from "../config/cloudinary.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "..", "..", "frontend", "public");
const mappingPath = path.join(__dirname, "image-mapping.json");

const IMAGE_EXT = /\.(jpe?g|png|avif|webp|gif)$/i;
const SKIP_DIRS = new Set(["streetwear images/streetwear images"]); // guard against accidental self-nesting

function walk(dir, base = "") {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      results = results.concat(walk(full, rel));
    } else if (IMAGE_EXT.test(entry.name)) {
      results.push({ full, rel });
    }
  }
  return results;
}

const files = walk(publicDir);
console.log(`Found ${files.length} images under frontend/public`);

let mapping = {};
if (fs.existsSync(mappingPath)) {
  mapping = JSON.parse(fs.readFileSync(mappingPath, "utf-8"));
  console.log(`Loaded existing mapping with ${Object.keys(mapping).length} entries`);
}

let uploaded = 0;
let skipped = 0;
let failed = 0;

for (const { full, rel } of files) {
  const webPath = "/" + rel;
  if (mapping[webPath]) {
    skipped++;
    continue;
  }

  const publicId =
    "rebelwear/" +
    rel
      .replace(/\.[^./]+$/, "")
      .replace(/\s+/g, "-")
      .toLowerCase();

  try {
    const result = await cloudinary.uploader.upload(full, {
      public_id: publicId,
      overwrite: false,
      resource_type: "image",
    });
    const optimizedUrl = result.secure_url.replace("/upload/", "/upload/f_auto,q_auto/");
    mapping[webPath] = optimizedUrl;
    uploaded++;
    console.log(`✅ [${uploaded + skipped}/${files.length}] ${webPath}`);
  } catch (err) {
    failed++;
    console.error(`❌ FAILED: ${webPath} -> ${err.message}`);
  }

  fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2));
}

console.log(`\nDone. uploaded=${uploaded} skipped(already done)=${skipped} failed=${failed}`);
console.log(`Mapping written to ${mappingPath}`);
