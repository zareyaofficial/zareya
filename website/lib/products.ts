import { sanityClient } from "./sanity";

export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  fabric: string;
  description: string;
  sizes: string[];
  status: string;
  badge?: string;
  image: string;
  images: string[];
};

type ProductDoc = {
  _id: string;
  name: string;
  slug: string | { current?: string };
  price: number;
  fabric?: string;
  fabricRef?: string;
  customFabric?: string;
  description?: string;
  sizes?: string[];
  sizeRef?: string;
  sizeRefs?: string[];
  customSizes?: string[];
  status?: string;
  badge?: string;
  image?: string;
  images?: string[];
};

const PROJECTION = `{
  _id,
  name,
  "slug": coalesce(slug.current, slug),
  price,
  "fabric": coalesce(customFabric, fabricRef->name, fabric),
  description,
  "sizes": array::unique(array::compact([sizeRef->name] + coalesce(sizeRefs[]->name, []) + coalesce(customSizes, []) + coalesce(sizes, []))),
  status,
  badge,
  "images": coalesce(images[].asset->url, []),
  "image": coalesce(images[0].asset->url, image.asset->url)
}`;

function toProduct(doc: ProductDoc): Product {
  const images = (doc.images || []).filter(Boolean);
  return {
    id: doc._id,
    name: doc.name,
    slug: typeof doc.slug === "string" ? doc.slug : doc.slug?.current || "",
    price: doc.price || 0,
    fabric: doc.customFabric || doc.fabricRef || doc.fabric || "",
    description: doc.description || "",
    sizes: doc.sizes || [],
    status: doc.status || "In Stock",
    badge: doc.badge,
    image: doc.image || images[0] || "",
    images,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const docs = (await sanityClient.fetch(
    `*[_type == "product"] | order(_createdAt asc) ${PROJECTION}`
  )) as ProductDoc[];
  return docs.map(toProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const doc = (await sanityClient.fetch(
    `*[_type == "product" && (slug.current == $slug || slug == $slug)][0] ${PROJECTION}`,
    { slug }
  )) as ProductDoc | null;
  return doc ? toProduct(doc) : undefined;
}
