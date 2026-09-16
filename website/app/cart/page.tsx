"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export default function CartPage() {
  const { items, removeFromCart, updateQty, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <section className="section">
        <div className="wrap empty-state">
          <h1 className="page-title">Your cart is empty</h1>
          <Link href="/shop" className="btn-primary">Browse the Collection</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="wrap">
        <h1 className="page-title">Your Cart</h1>

        <div>
          {items.map((item) => (
            <div className="cart-row" key={`${item.id}-${item.size}`}>
              <img src={item.image} alt={item.name} />
              <div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 17 }}>
                  {item.name}
                </div>
                <div style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>
                  Size: {item.size}
                </div>
              </div>
              <div className="qty-control">
                <button onClick={() => updateQty(item.id, item.size, item.qty - 1)}>−</button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item.id, item.size, item.qty + 1)}>+</button>
              </div>
              <div style={{ fontSize: 15, color: "var(--gold-deep)" }}>
                ₹{(item.price * item.qty).toLocaleString("en-IN")}
              </div>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id, item.size)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div>
            <div style={{ fontSize: 13, color: "var(--ink-soft)" }}>Subtotal</div>
            <div className="total">₹{totalPrice.toLocaleString("en-IN")}</div>
          </div>
          <Link href="/checkout" className="btn-primary">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </section>
  );
}
