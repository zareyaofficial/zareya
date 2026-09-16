import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || "production";
// Only needed if your Sanity dataset is private. Public datasets (the
// default) don't require a token to read.
const token = process.env.SANITY_API_TOKEN;

if (!projectId) {
  throw new Error(
    "Missing SANITY_PROJECT_ID. Set it in website/.env.local (see .env.local.example)."
  );
}

export const sanityClient = createClient({
  projectId,
  dataset,
  ...(token ? { token } : {}),
  apiVersion: "2024-01-01",
  useCdn: true, // fast, cached reads are fine for the storefront
});
