"use client";

import { useState } from "react";
import { Product } from "@/lib/products";
import { useCart } from "@/components/CartProvider";
import { useRouter } from "next/navigation";

export default function ProductDetailClient({ product }: { product: Product }) {
  const photos = product.images.length ? product.images : [product.image];
  const [activeImage, setActiveImage] = useState(photos[0]);
  const [size, setSize] = useState(product.sizes[0] ?? "Free Size");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const router = useRouter();
  const soldOut = product.status === "Sold Out";

  function handleAdd() {
    if (soldOut) return;
    addToCart({ id: product.id, name: product.name, price: product.price, size, qty, image: activeImage });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <section className="section product-detail">
      <div className="wrap product-detail-grid">
        <div>
          <div className="card-frame product-main-image">
            <img src={activeImage} alt={product.name} />
            {soldOut && <span className="sold-out-overlay">Sold Out</span>}
          </div>
          {photos.length > 1 && (
            <div className="product-thumbs">
              {photos.map((photo, index) => (
                <button key={`${photo}-${index}`} className={photo === activeImage ? "active" : ""} onClick={() => setActiveImage(photo)}>
                  <img src={photo} alt={`${product.name} ${index + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          {product.badge && <span className="badge">{product.badge}</span>}
          <h1 className="product-title">{product.name}</h1>
          <p className="product-fabric">{product.fabric}</p>
          <div className="product-price">₹{product.price.toLocaleString("en-IN")}</div>
          {soldOut && <div className="sold-out-detail">Sold Out</div>}

          <p className="product-description">{product.description}</p>

          {!soldOut && (
            <>
              <div className="product-option">
                <label>Size</label>
                <div className="size-options">
                  {product.sizes.map((s) => (
                    <button key={s} onClick={() => setSize(s)} className={size === s ? "selected" : ""}>{s}</button>
                  ))}
                </div>
              </div>

              <div className="product-option">
                <label>Quantity</label>
                <div className="qty-control product-qty">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                  <span>{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)}>+</button>
                </div>
              </div>

              <button className="btn-primary" onClick={handleAdd} style={{ marginRight: 14 }}>
                {added ? "Added ✓" : "Add to Cart"}
              </button>
              <button className="btn-ghost product-buy" onClick={() => { handleAdd(); router.push("/cart"); }}>
                Buy Now
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
