import { getAllProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export const revalidate = 30; // refetch from Sanity at most every 30s

export default async function ShopPage() {
  const products = await getAllProducts();

  return (
    <section className="section">
      <div className="wrap">
        <h1 className="page-title">Pret Collection</h1>
        <p style={{ color: "var(--ink-soft)", maxWidth: 560, marginBottom: 40 }}>
          Curated Pakistani pret — chikankari cottons, embellished nets, and
          hand-worked organzas. {products.length} pieces, all made to order.
        </p>
        <div className="grid grid-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
