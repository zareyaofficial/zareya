import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import Nav from "@/components/Nav";

export const metadata: Metadata = { title: "Zaréya — Pakistani Couture & Kurtis", description: "The art of Pakistani elegance. Curated, contemporary, timeless." };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><CartProvider><Nav />{children}<footer id="contact"><div className="wrap footer-grid"><div><div className="footer-brand">ZARÉYA</div><p>The art of Pakistani elegance. Curated, contemporary, timeless couture and kurtis — India & UAE.</p></div><div><h4>SHOP</h4><Link href="/shop">Best Sellers</Link><Link href="/shop">New Arrivals</Link><Link href="/shop">Pret Collection</Link></div><div><h4>SUPPORT</h4><a href="#">Size Guide</a><a href="#">Shipping — India & UAE</a><Link href="/cart">Order on WhatsApp</Link></div><div><h4>FOLLOW</h4><a href="https://www.instagram.com/zareya.fashion/" target="_blank" rel="noreferrer">Instagram — @zareya.fashion</a><a href="#">WhatsApp</a></div></div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} Zaréya. All rights reserved.</span><span>Pakistani Couture &amp; Kurtis</span></div></footer></CartProvider></body></html>;
}
