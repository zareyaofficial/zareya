import { Product } from "./products";
import { SiteSettings } from "./siteSettings";

/**
 * Badge is no longer set per-product. It's derived from the Best Seller /
 * New Arrival product lists managed in Sanity Studio under
 * "Website Banner & Settings" — this keeps badge management in one place
 * instead of requiring the admin to open every product individually.
 */
export function applyBadges<T extends Product>(
  products: T[],
  settings: SiteSettings | null
): T[] {
  const bestSellerIds = new Set(settings?.bestSellerProductIds || []);
  const newIds = new Set(settings?.newProductIds || []);

  return products.map((p) => ({
    ...p,
    badge: bestSellerIds.has(p.id) ? "Bestseller" : newIds.has(p.id) ? "New" : undefined,
  }));
}

/** Best Sellers in the order chosen in Settings, in-stock only. */
export function getOrderedBestSellers<T extends Product>(
  products: T[],
  settings: SiteSettings | null
): T[] {
  const order = settings?.bestSellerProductIds || [];
  const byId = new Map(products.map((p) => [p.id, p]));
  return order
    .map((id) => byId.get(id))
    .filter((p): p is T => Boolean(p) && p!.status !== "Sold Out");
}
