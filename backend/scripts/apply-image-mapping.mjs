// Replaces every local image path reference in frontend/src with its
// Cloudinary URL, using the mapping produced by
// upload-frontend-images-to-cloudinary.mjs. Matches both "/path/to.jpg" and
// bare "path/to.jpg" (no leading slash) string literals, in single, double,
// and backtick quotes.
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mapping = JSON.parse(
  fs.readFileSync(path.join(__dirname, "image-mapping.json"), "utf-8"),
);
const srcDir = path.join(__dirname, "..", "..", "frontend", "src");
const indexHtmlPath = path.join(__dirname, "..", "..", "frontend", "index.html");

function walk(dir) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results = results.concat(walk(full));
    else if (/\.(jsx?|css|html)$/.test(entry.name)) results.push(full);
  }
  return results;
}

const files = walk(srcDir);
if (fs.existsSync(indexHtmlPath)) files.push(indexHtmlPath);

// Longer keys first so "/streetwear images/foo.jpg" doesn't get partially
// shadowed by a shorter accidental match.
const keys = Object.keys(mapping).sort((a, b) => b.length - a.length);

let totalReplacements = 0;
const changedFiles = [];

for (const file of files) {
  let content = fs.readFileSync(file, "utf-8");
  let fileChanged = false;

  for (const key of keys) {
    const url = mapping[key];
    const withoutSlash = key.replace(/^\//, "");
    const variants = [key, withoutSlash];

    for (const variant of variants) {
      for (const quote of ['"', "'", "`"]) {
        const needle = `${quote}${variant}${quote}`;
        if (content.includes(needle)) {
          const count = content.split(needle).length - 1;
          content = content.split(needle).join(`${quote}${url}${quote}`);
          totalReplacements += count;
          fileChanged = true;
        }
      }
    }
  }

  if (fileChanged) {
    fs.writeFileSync(file, content, "utf-8");
    changedFiles.push(path.relative(path.join(__dirname, "..", ".."), file));
  }
}

console.log(`Replaced ${totalReplacements} references across ${changedFiles.length} files:`);
changedFiles.forEach((f) => console.log(" -", f));
