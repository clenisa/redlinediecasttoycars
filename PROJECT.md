# PROJECT.md - Headless Shopify Migration Plan

## Executive Summary

Migrate Redline Diecast Toy Cars from a Shopify theme-based store to a headless architecture using Next.js as the frontend while keeping Shopify as the commerce backend for inventory, orders, and fulfillment.

**Goal:** Full frontend control with Claude Code while maintaining operational stability in Shopify.

---

## Current State

### Shopify Store
- **Domain:** redlinediecasttoycars.com
- **Store ID:** 92972581140
- **Status:** Partially functional (deprecated plugins causing issues)
- **Orders:** Still processing and fulfilling normally

### Active Plugins (Backend - Will Continue Working)
| Plugin | Function | Headless Compatible |
|--------|----------|-------------------|
| syncX: Stock Sync | Inventory synchronization | ✅ Yes - Admin API only |
| DSers-AliExpress | Dropshipping management | ✅ Yes - Admin API only |
| Judge.me Reviews | Product reviews | ⚠️ Needs widget/API integration |

### Deprecated/Replacing Plugins (Frontend - Need Alternatives)
| Plugin | Function | Replacement |
|--------|----------|-------------|
| Rapid Search Bar & Filter | Search | Meilisearch or Algolia |
| GemPages Builder | Page builder | Next.js components |
| PageFly Page Builder | Page builder | Next.js components |
| qikify Slide Cart | Cart drawer | Custom React component |
| Tidio Chat | Live chat | Not needed (external) |
| Messaging | Email marketing | Not needed (external) |

---

## Target Architecture

### Technology Stack
```
Frontend:        Next.js 14+ (App Router)
Styling:         Tailwind CSS
API:             Shopify Storefront API (GraphQL)
Search:          Meilisearch (self-hosted) or Algolia
Reviews:         Judge.me API or Stamped.io
Hosting:         Coolify on Hetzner VPS (or Vercel)
CDN:             Cloudflare (free tier)
```

### Why This Stack
- **Next.js:** Best headless Shopify support, React Server Components, excellent DX
- **Tailwind:** Fast iteration, no CSS overhead, Claude Code handles well
- **Meilisearch:** Open source, fast, good typo tolerance, cheap to self-host
- **Coolify:** Self-hosted PaaS, no vendor lock-in, ~€10/month

---

## Shopify API Strategy

### Storefront API (Frontend Operations)
Used for all customer-facing operations. Public access token safe for client-side.

**Read Operations:**
- Products (catalog, details, variants, metafields)
- Collections (listing, products within)
- Cart (contents, totals)
- Customer (if logged in)

**Write Operations:**
- Cart create/update/delete
- Customer login (via Customer Account API)

### Admin API (Backend Only)
Used by Shopify apps and webhooks. Private token, never exposed to frontend.

**Operations:**
- Inventory updates (syncX uses this)
- Order management (DSers uses this)
- Webhook subscriptions

### Checkout
Shopify does NOT allow custom checkout UI for payment processing. Flow:
1. Build cart via Storefront API
2. Get `checkoutUrl` from cart
3. Redirect customer to Shopify checkout
4. Customer pays on Shopify
5. Redirect back to your site's order confirmation

---

## Data Model

### Products
```typescript
interface Product {
  id: string;
  handle: string;              // URL slug
  title: string;
  description: string;
  descriptionHtml: string;
  vendor: string;              // Brand (AUTOart, Maisto, etc.)
  productType: string;         // Scale (1/18, 1/24, etc.)
  tags: string[];              // Make (Ferrari, Porsche, etc.)
  images: Image[];
  variants: Variant[];
  priceRange: PriceRange;
  availableForSale: boolean;
  metafields?: Metafield[];    // Custom data (scale details, etc.)
}
```

### Collections
Used for navigation categories:
- **By Brand:** autoart, maisto, jada, bburago, etc.
- **By Scale:** 1-12, 1-18, 1-24, 1-32, 1-43, 1-64, 1-87
- **By Make:** ferrari, lamborghini, porsche, etc.
- **Special:** best-sellers, limited-edition, accessories

### Cart
```typescript
interface Cart {
  id: string;
  checkoutUrl: string;
  lines: CartLine[];
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
  };
  totalQuantity: number;
}
```

---

## Navigation Structure

Based on current site crawl:

```typescript
const NAVIGATION = {
  shop: {
    byBrand: [
      'AUTOart', 'Autoworld', 'BBR', 'Bburago', 'BM Creations',
      'Brekina', 'BRP Models', 'GT Spirit', 'Jada', 'Greenlight',
      'Iconic Replicas', 'Maisto', 'Solido'
    ],
    byScale: ['1/12', '1/16', '1/18', '1/24', '1/32', '1/43', '1/64', '1/87'],
    byMake: [
      'Acura', 'Alfa Romeo', 'Aston Martin', 'Audi', 'Bentley', 'BMW',
      'Bugatti', 'Buick', 'Cadillac', 'Chevrolet', 'Dodge', 'Ducati',
      'Ferrari', 'Ford', 'GMC', 'Harley Davidson', 'Honda', 'Jaguar',
      'Lamborghini', 'Lotus', 'Maserati', 'Maybach', 'McLaren', 'Mercedes',
      'Nissan', 'Pagani', 'Police', 'Porsche', 'Rolls Royce', 'Shelby',
      'Subaru', 'Toyota'
    ],
    accessories: 'Displays & Accessories'
  },
  featured: ['Best Sellers', 'Limited Edition'],
  pages: ['About Us', 'FAQ']
};
```

---

## Page Templates Needed

### 1. Homepage (`/`)
- Hero banner
- Collection cards (Shop Diecast, Formula 1, Accessories)
- Bestsellers product grid
- Brand logos carousel
- Newsletter signup

### 2. Collection Page (`/collections/[handle]`)
- Collection title/description
- Filter sidebar (price, availability)
- Sort dropdown
- Product grid with pagination
- Products: 12-24 per page

### 3. Product Page (`/products/[handle]`)
- Image gallery with zoom
- Title, price, availability
- Variant selector (if applicable)
- Add to cart button
- Description tabs
- Reviews section (Judge.me)
- Related products

### 4. Search Results (`/search`)
- Search input
- Filter options
- Results grid
- "No results" state

### 5. Cart Drawer (Slide-out)
- Line items with quantity controls
- Subtotal
- Checkout button → Shopify checkout
- Continue shopping link

### 6. Static Pages
- About Us (`/pages/about-us`)
- FAQ (`/pages/faq`)
- Return Policy (`/pages/return-policy`)
- Contact (`/pages/contact`)
- Privacy/Terms (link to Shopify policies)

---

## Search Implementation

### Option A: Meilisearch (Recommended for Budget)
```typescript
// Sync products to Meilisearch on build or webhook
import { MeiliSearch } from 'meilisearch';

const client = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST,
  apiKey: process.env.MEILISEARCH_API_KEY,
});

// Index structure
interface SearchableProduct {
  id: string;
  handle: string;
  title: string;
  vendor: string;      // Brand
  productType: string; // Scale
  tags: string[];      // Make
  price: number;
  image: string;
}
```

**Sync Strategy:**
1. Full sync on build
2. Webhook on `products/update` to update index
3. React InstantSearch for frontend

### Option B: Algolia (Easier, Higher Cost)
- Use official Shopify Algolia app for automatic sync
- React InstantSearch components
- Free tier: 10k searches/month

---

## Reviews Integration

### Judge.me (Keep Existing)
Judge.me provides:
1. **Widget Script** - Add to head, renders in placeholder divs
2. **REST API** - Fetch reviews server-side for custom rendering

```typescript
// Option 1: Widget (easier)
// Add to layout.tsx <head>
<script src="https://cdn.judge.me/widget_preloader.js" />

// In product page
<div 
  className="jdgm-widget jdgm-review-widget" 
  data-id={product.id.split('/').pop()} 
/>

// Option 2: API (full control)
const reviews = await fetch(
  `https://judge.me/api/v1/reviews?shop_domain=${domain}&product_id=${id}`,
  { headers: { Authorization: `Bearer ${token}` } }
);
```

---

## SEO Preservation

### Critical URL Matching
Current Shopify URLs must be preserved exactly:
```
/products/[handle]     → Product pages
/collections/[handle]  → Collection pages
/pages/[handle]        → Static pages
```

### Meta Tags
```typescript
// app/products/[handle]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const product = await getProduct(params.handle);
  return {
    title: `${product.title} | Redline Diecast Toy Cars`,
    description: product.description,
    openGraph: {
      images: [product.images[0]?.url],
    },
  };
}
```

### Structured Data
Add JSON-LD for:
- Product schema
- Organization schema
- BreadcrumbList schema

### Sitemap
Dynamic sitemap at `/sitemap.xml`:
```typescript
// app/sitemap.ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  const collections = await getCollections();
  
  return [
    { url: 'https://redlinediecasttoycars.com', lastModified: new Date() },
    ...products.map(p => ({
      url: `https://redlinediecasttoycars.com/products/${p.handle}`,
      lastModified: p.updatedAt,
    })),
    ...collections.map(c => ({
      url: `https://redlinediecasttoycars.com/collections/${c.handle}`,
      lastModified: c.updatedAt,
    })),
  ];
}
```

---

## Hosting Setup

### Coolify on Hetzner (Self-Hosted)

1. **Provision VPS**
   - Hetzner CX21 (2 vCPU, 4GB RAM): €5.50/month
   - Or CX31 (2 vCPU, 8GB RAM): €9.35/month

2. **Install Coolify**
   ```bash
   curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
   ```

3. **Connect GitHub Repo**
   - Add repo in Coolify dashboard
   - Set environment variables
   - Enable auto-deploy on push

4. **DNS Configuration**
   - Point domain to VPS IP
   - Coolify handles SSL via Let's Encrypt

5. **Cloudflare CDN**
   - Add site to Cloudflare
   - Enable proxying for caching
   - Set cache rules for static assets

### Alternative: Vercel

Simpler but costs more at scale:
- Pro plan: $20/month base
- Bandwidth: $0.15/GB after 1TB

---

## Implementation Phases

### Phase 1: Setup (Week 1-2)
- [ ] Fork Vercel Commerce template
- [ ] Connect to Shopify Storefront API
- [ ] Set up development environment
- [ ] Verify product/collection data fetching

### Phase 2: Core Pages (Week 3-6)
- [ ] Homepage with collections and bestsellers
- [ ] Collection pages with product grid
- [ ] Product detail pages
- [ ] Navigation mega menu
- [ ] Cart drawer

### Phase 3: Features (Week 7-9)
- [ ] Search integration (Meilisearch)
- [ ] Reviews integration (Judge.me)
- [ ] Static pages (FAQ, About, Returns, Contact)
- [ ] Footer with links

### Phase 4: Polish (Week 10-11)
- [ ] SEO (meta tags, structured data, sitemap)
- [ ] Performance optimization
- [ ] Mobile responsiveness
- [ ] Error handling and 404 pages

### Phase 5: Launch (Week 12-13)
- [ ] Staging deployment
- [ ] QA testing
- [ ] DNS cutover
- [ ] Monitor for issues

---

## Cost Breakdown

| Item | Monthly Cost |
|------|-------------|
| Shopify (existing) | Current plan |
| Hetzner VPS | €10 |
| Cloudflare | $0 |
| Meilisearch (self-hosted) | $0 |
| Domain | Existing |
| **Total Additional** | **~€10/month** |

---

## Rollback Plan

If issues occur after launch:
1. DNS TTL lowered to 300s before launch
2. Keep Shopify theme intact but unpublished
3. Revert DNS to Shopify IP (5-30 min propagation)
4. Shopify store immediately functional

---

## Success Metrics

- [ ] All products display correctly
- [ ] Cart → Checkout flow works
- [ ] Search returns relevant results
- [ ] Page load < 3 seconds
- [ ] Mobile experience smooth
- [ ] No 404 errors in Search Console
- [ ] Orders processing normally
