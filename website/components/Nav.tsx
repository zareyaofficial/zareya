"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export default function Nav() {
  const { totalItems } = useCart();

  return (
    <header className="site-header">
      <div className="nav-wrap">
        <Link href="/" className="brandmark brand-logo"><img src="/zareya-logo-horizontal.png" alt="Zaréya" /></Link>

        <nav className="nav-links">
          <Link href="/shop">Shop</Link>
          <Link href="/#about">Our Story</Link>
          <Link href="/#contact">Contact</Link>
        </nav>

        <Link href="/cart" className="cart-link" aria-label="View cart">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <circle cx="9" cy="21" r="1.5" />
            <circle cx="19" cy="21" r="1.5" />
            <path d="M2 3h2l2.6 12.6a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L21 7H6" />
          </svg>
          <span>Cart</span>
          {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        </Link>
      </div>
    </header>
  );
}
