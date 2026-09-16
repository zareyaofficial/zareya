# Zaréya — Pakistani Couture & Kurtis

Monorepo containing the Zaréya storefront and Sanity Studio.

## Local development

### Admin / Sanity Studio

```powershell
cd admin
npm install
npm run dev
```

Admin runs at **http://localhost:3335**.

### Website

Open a second terminal:

```powershell
cd website
npm install
npm run dev
```

Website runs at **http://localhost:3001**.

## Sanity project

`admin/.env.local` and `website/.env.local` are local-only environment files. The current project is configured for the existing Zaréya Sanity project and `production` dataset.

## Admin features

- Products with automatic slug generation from product name
- Product status including Sold Out
- Multiple product photos / gallery
- Fabric master list with product Fabric reference and Custom Fabric field
- Size master list with product Size references and Custom Sizes field
- Website Banner & Settings document for changing the homepage banner image and copy
- Bottom CTA banner copy/button settings

## Website features

- Homepage hero banner controlled from Sanity
- Full footer with Shop, Support and Follow columns
- Sold Out label on product cards and product detail pages
- Sold Out products cannot be added to cart
- Multiple product photos with clickable thumbnails
- Local Zaréya logo at `website/public/zareya-logo.png`
