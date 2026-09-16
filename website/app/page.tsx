import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import { getSiteSettings } from "@/lib/siteSettings";
import ProductCard from "@/components/ProductCard";

export const revalidate = 30;

export default async function HomePage() {
  const [products, settings] = await Promise.all([getAllProducts(), getSiteSettings()]);
  const inStockProducts = products.filter((p) => p.status !== "Sold Out");
  const bestSellers = inStockProducts.filter((p) => p.badge === "Bestseller");
  const featured = inStockProducts.slice(0, 8);
  const heroImage = settings?.heroImage || "/images/hero.jpg";

  return (
    <>
      <section className="hero">
        <img src={heroImage} alt="Zaréya couture ensemble" />
        <div className="hero-content">
          <div className="hero-eyebrow">{settings?.heroEyebrow || "PAKISTANI COUTURE & KURTIS"}</div>
          <h1>{settings?.heroTitle || "The art of Pakistani elegance, made to be worn."}</h1>
          <p className="hero-sub">{settings?.heroSubtitle || "Curated, contemporary, timeless ensembles — handpicked from Pakistan's finest ateliers, delivered across India and the UAE."}</p>
          <div className="hero-actions">
            <Link href={settings?.heroPrimaryLink || "/shop"} className="btn-primary">{settings?.heroPrimaryLabel || "Shop the Collection"}</Link>
            <Link href={settings?.heroSecondaryLink || "/#bestsellers"} className="btn-ghost">{settings?.heroSecondaryLabel || "View Best Sellers"}</Link>
          </div>
        </div>
      </section>

      <section className="section best-sellers" id="bestsellers">
        <div className="wrap">
          <div className="section-head"><div><div className="section-tag">MOST LOVED</div><h2>Best Sellers</h2></div><Link href="/shop" className="section-link">View all products</Link></div>
          <div className="grid">{bestSellers.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        </div>
      </section>

      <section className="section featured">
        <div className="wrap">
          <div className="section-head"><div><div className="section-tag">THE EDIT</div><h2>Featured Pret</h2></div><Link href="/shop" className="section-link">Browse full collection</Link></div>
          <div className="grid grid-4">{featured.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        </div>
      </section>

      <section className="intro" id="about">
        <div className="wrap intro-inner">
          <div className="intro-image">
            <img
              src={settings?.storyImage || "/images/product-2044a.jpg"}
              alt="Zaréya craftsmanship"
            />
          </div>
          <div>
            <div className="flourish"></div>
            <div className="section-tag">{settings?.storyTag || "OUR STORY"}</div>
            <h2>{settings?.storyTitle || "Tradition meets timeless elegance."}</h2>
            <p>
              {settings?.storyParagraph1 ||
                "Zaréya was born from a simple belief — that Pakistani craftsmanship deserves a home outside the wedding season and the gallery shelf. Every piece we carry is chosen for its handwork, its fabric, and the way it moves."}
            </p>
            <p>
              {settings?.storyParagraph2 ||
                "From heavy chikankari cottons to fine embellished nets, our edit spans everyday pret to occasion couture — sourced from Pakistan's ateliers, styled for wardrobes in India and the UAE."}
            </p>
          </div>
        </div>
      </section>

      <section className="strip">
        <div className="wrap">
          <h3>{settings?.ctaTitle || "Found something you love? Add it to your cart and check out in one message on WhatsApp — no forms, no waiting."}</h3>
          <Link href={settings?.ctaButtonLink || "/shop"} className="btn-primary">{settings?.ctaButtonLabel || "Start Shopping"}</Link>
        </div>
      </section>
    </>
  );
}
