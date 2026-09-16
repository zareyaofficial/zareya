"use client";

import Link from "next/link";
import { Product } from "@/lib/products";
import { useCart } from "./CartProvider";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const soldOut = product.status === "Sold Out";

  function quickAdd(e: React.MouseEvent) {
    e.preventDefault();
    if (soldOut) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size: product.sizes[0] ?? "Free Size",
      qty: 1,
      image: product.image,
    });
  }

  return (
    <Link href={`/product/${product.slug}`} className={`card ${soldOut ? "is-sold-out" : ""}`}>
      <div className="card-frame">
        <img src={product.image} alt={product.name} />
        {soldOut && <span className="sold-out-overlay">Sold Out</span>}
        {!soldOut && <button className="card-add" onClick={quickAdd}>Add to Cart</button>}
      </div>
      <div className="card-meta">
        <div>
          <div className="card-name">{product.name}</div>
          <div className="card-sub-row">
            {product.badge && <span className="badge">{product.badge}</span>}
            <div className="card-sub">{product.fabric}</div>
          </div>
        </div>
        <div className="card-price">₹{product.price.toLocaleString("en-IN")}</div>
      </div>
    </Link>
  );
}
