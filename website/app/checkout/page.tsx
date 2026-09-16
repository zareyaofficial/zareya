"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { WHATSAPP_NUMBER } from "@/lib/config";

type FormState = {
  name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  country: string;
  notes: string;
};

const initialForm: FormState = {
  name: "",
  phone: "",
  address: "",
  city: "",
  pincode: "",
  country: "India",
  notes: "",
};

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState<FormState>(initialForm);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function buildWhatsAppMessage() {
    const lines: string[] = [];
    lines.push("New order from Zaréya website");
    lines.push("");
    lines.push("*Items:*");
    items.forEach((item) => {
      lines.push(
        `• ${item.name} (Size: ${item.size}) x${item.qty} — ₹${(
          item.price * item.qty
        ).toLocaleString("en-IN")}`
      );
    });
    lines.push("");
    lines.push(`*Total: ₹${totalPrice.toLocaleString("en-IN")}*`);
    lines.push("");
    lines.push("*Delivery Details:*");
    lines.push(`Name: ${form.name}`);
    lines.push(`Phone: ${form.phone}`);
    lines.push(`Address: ${form.address}`);
    lines.push(`City: ${form.city}`);
    lines.push(`Pincode: ${form.pincode}`);
    lines.push(`Country: ${form.country}`);
    if (form.notes) {
      lines.push("");
      lines.push(`Notes: ${form.notes}`);
    }
    return lines.join("\n");
  }

  function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault();

    if (!form.name || !form.phone || !form.address || !form.city || !form.pincode) {
      alert("Please fill in your name, phone, address, city, and pincode.");
      return;
    }

    const message = buildWhatsAppMessage();
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    clearCart();
  }

  if (items.length === 0) {
    return (
      <section className="section">
        <div className="wrap empty-state">
          <h1 className="page-title">Nothing to check out</h1>
          <Link href="/shop" className="btn-primary">Browse the Collection</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="wrap">
        <h1 className="page-title">Checkout</h1>

        <div className="checkout-summary">
          {items.map((item) => (
            <div className="checkout-summary-row" key={`${item.id}-${item.size}`}>
              <span>
                {item.name} ({item.size}) x{item.qty}
              </span>
              <span>₹{(item.price * item.qty).toLocaleString("en-IN")}</span>
            </div>
          ))}
          <div className="checkout-summary-total">
            <span>Total</span>
            <span>₹{totalPrice.toLocaleString("en-IN")}</span>
          </div>
        </div>

        <form className="checkout-form" onSubmit={handlePlaceOrder}>
          <div>
            <label>Full Name *</label>
            <input name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div>
            <label>Phone Number *</label>
            <input name="phone" value={form.phone} onChange={handleChange} required />
          </div>
          <div>
            <label>Address *</label>
            <textarea
              name="address"
              rows={3}
              value={form.address}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            <div>
              <label>City *</label>
              <input name="city" value={form.city} onChange={handleChange} required />
            </div>
            <div>
              <label>Pincode *</label>
              <input name="pincode" value={form.pincode} onChange={handleChange} required />
            </div>
          </div>
          <div>
            <label>Country</label>
            <input name="country" value={form.country} onChange={handleChange} />
          </div>
          <div>
            <label>Order Notes (optional)</label>
            <textarea
              name="notes"
              rows={2}
              placeholder="Custom sizing, delivery instructions, etc."
              value={form.notes}
              onChange={handleChange}
            />
          </div>

          <button className="btn-primary" type="submit" style={{ width: "fit-content" }}>
            Place Order on WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
}
