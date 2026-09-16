// One-time script: pushes the existing data/products.json into Sanity as
// "product" documents, uploading each product's image file as a real
// Sanity image asset (the Studio's "image" field needs an asset, not a
// plain path string).
//
// Usage — from inside scripts/:
//   cd scripts
//   npm install
//   SANITY_PROJECT_ID=xxxx SANITY_DATASET=production SANITY_API_TOKEN=xxxx \
//     node migrate-to-sanity.mjs
//
// This needs a write token (this is a plain script, not the Studio, so it
// can't use `sanity login`). Create one at sanity.io/manage → your project
// → API → Tokens → Add API token → "Editor" permission. This token is only
// needed for this one-time migration — delete it afterwards if you like.

import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error(
    "Set SANITY_PROJECT_ID and SANITY_API_TOKEN (and optionally SANITY_DATASET) " +
      "as environment variables before running this script."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const repoRoot = path.join(__dirname, "..");
const dataPath = path.join(repoRoot, "data", "products.json");
const products = JSON.parse(readFileSync(dataPath, "utf-8"));

// Resolves a product's `image` value (a local "/images/xxx.jpg" path into
// website/public, or a full http(s) URL) to a Buffer + filename to upload.
async function loadImage(imagePath) {
  if (/^https?:\/\//.test(imagePath)) {
    const res = await fetch(imagePath);
    if (!res.ok) throw new Error(`Failed to fetch ${imagePath}: ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    return { buffer, filename: path.basename(new URL(imagePath).pathname) };
  }

  const localPath = path.join(repoRoot, "website", "public", imagePath);
  if (!existsSync(localPath)) {
    throw new Error(`Image not found at ${localPath}`);
  }
  return { buffer: readFileSync(localPath), filename: path.basename(localPath) };
}

async function run() {
  console.log(
    `Migrating ${products.length} product(s) to Sanity project "${projectId}" (dataset: ${dataset})...`
  );

  for (const p of products) {
    const { buffer, filename } = await loadImage(p.image);
    const asset = await client.assets.upload("image", buffer, { filename });

    const doc = {
      _type: "product",
      name: p.name,
      slug: p.slug,
      price: p.price,
      fabric: p.fabric,
      description: p.description,
      sizes: p.sizes || [],
      status: p.status,
      ...(p.badge ? { badge: p.badge } : {}),
      image: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
    };

    const created = await client.create(doc);
    console.log(`  ✓ ${p.name}  →  ${created._id}`);
  }

  console.log("Done. Open the Studio (admin) and you'll see them there.");
}

run().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
