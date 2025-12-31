# CLAUDE.md - Redline Diecast Toy Cars

## Project Overview

This is a **headless Shopify + Next.js** e-commerce site for Redline Diecast Toy Cars, a diecast model car retailer. The frontend is decoupled from Shopify, which remains the backend for inventory, orders, and fulfillment.

**Live domain:** redlinediecasttoycars.com  
**Shopify Store ID:** 92972581140  
**Contact email:** redlinediecasttoysstore@gmail.com

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CUSTOMER FACING                          │
│  ┌─────────────────────────────────────────────────────┐    │
│  │           Next.js Frontend (This Repo)              │    │
│  │  - Product pages, collections, search               │    │
│  │  - Cart management via Storefront API               │    │
│  │  - Static pages (FAQ, About, Returns)               │    │
│  └─────────────────────────────────────────────────────┘    │
│                           │                                  │
│                           ▼                                  │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Shopify Checkout                        │    │
│  │  - Redirect to checkout.shopify.com                 │    │
│  │  - Payment processing                                │    │
│  │  - Order confirmation                                │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      ADMIN BACKEND                           │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                Shopify Admin                         │    │
│  │  - Inventory management                              │    │
│  │  - Order fulfillment                                 │    │
│  │  - Product catalog                                   │    │
│  │  - syncX (inventory sync) ← continues working        │    │
│  │  - DSers (dropshipping) ← continues working          │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## Directory Structure

```
├── app/                      # Next.js App Router
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Root layout with providers
│   ├── products/
│   │   └── [handle]/         # Product detail pages
│   │       └── page.tsx
│   ├── collections/
│   │   └── [handle]/         # Collection pages
│   │       └── page.tsx
│   ├── pages/
│   │   ├── about-us/
│   │   ├── faq/
│   │   ├── return-policy/
│   │   └── contact/
│   ├── search/               # Search results
│   └── cart/                 # Cart page (optional, slide cart preferred)
│
├── components/
│   ├── layout/
│   │   ├── header.tsx        # Navigation with mega menu
│   │   ├── footer.tsx
│   │   ├── announcement-bar.tsx
│   │   └── mega-menu.tsx     # Shop dropdown menus
│   ├── product/
│   │   ├── product-card.tsx
│   │   ├── product-gallery.tsx
│   │   ├── variant-selector.tsx
│   │   └── add-to-cart.tsx
│   ├── cart/
│   │   ├── cart-drawer.tsx   # Slide-out cart
│   │   ├── cart-line.tsx
│   │   └── cart-summary.tsx
│   ├── collection/
│   │   ├── collection-grid.tsx
│   │   └── filter-sidebar.tsx
│   └── search/
│       ├── search-modal.tsx
│       └── search-results.tsx
│
├── lib/
│   └── shopify/              # ALL Shopify API logic here
│       ├── index.ts          # Client setup, main exports
│       ├── queries.ts        # GraphQL queries
│       ├── mutations.ts      # Cart mutations
│       ├── types.ts          # TypeScript interfaces
│       └── utils.ts          # Helper functions
│
├── content/                  # Static content (can migrate to CMS later)
│   ├── faq.ts
│   ├── about.ts
│   └── return-policy.ts
│
├── docs/                     # Project documentation
│   ├── PROJECT.md            # Migration details, decisions
│   ├── CONTENT.md            # Original site content reference
│   └── API.md                # Shopify API patterns
│
└── public/
    └── images/               # Static assets
```

---

## Code Conventions

### TypeScript
- **Strict mode enabled** - all code must be fully typed
- Use interfaces over types for object shapes
- Export types from `lib/shopify/types.ts`

### Components
- **Server Components by default** - only add `'use client'` when needed
- Keep components under 150 lines - extract into smaller pieces
- Use descriptive names: `ProductVariantSelector` not `Selector`

### Styling
- **Tailwind CSS only** - no CSS modules or styled-components
- Use CSS variables for brand colors (defined in `globals.css`)
- Mobile-first responsive design

### Data Fetching
- All Shopify queries go through `lib/shopify/`
- Use React Server Components for initial data
- Client-side mutations use Server Actions

---

## Shopify API Patterns

### Storefront API (Public - used in frontend)
```typescript
// lib/shopify/index.ts
const endpoint = `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`;

export async function shopifyFetch<T>({ query, variables }: { 
  query: string; 
  variables?: Record<string, unknown> 
}): Promise<T> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
    },
    body: JSON.stringify({ query, variables }),
  });
  return response.json();
}
```

### Key Operations
- **Products**: `getProduct(handle)`, `getProducts()`, `getProductRecommendations(id)`
- **Collections**: `getCollection(handle)`, `getCollections()`
- **Cart**: `createCart()`, `addToCart()`, `updateCart()`, `removeFromCart()`
- **Search**: `searchProducts(query)`

### Cart Flow
1. Create cart with `cartCreate` mutation → returns `cartId`
2. Store `cartId` in cookie
3. Add/update items with `cartLinesAdd`, `cartLinesUpdate`
4. Get `checkoutUrl` from cart query
5. Redirect to Shopify checkout

---

## Environment Variables

```env
# Required
SHOPIFY_STORE_DOMAIN=redlinediecasttoycars.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=xxxxx

# Optional (for webhooks, admin operations)
SHOPIFY_ADMIN_ACCESS_TOKEN=xxxxx
SHOPIFY_WEBHOOK_SECRET=xxxxx

# Search (choose one)
MEILISEARCH_HOST=https://...
MEILISEARCH_API_KEY=xxxxx
# OR
ALGOLIA_APP_ID=xxxxx
ALGOLIA_SEARCH_KEY=xxxxx

# Analytics
NEXT_PUBLIC_GA_ID=xxxxx
```

---

## Common Tasks

### Add a new static page
1. Create `app/pages/[page-name]/page.tsx`
2. Add content to `content/[page-name].ts`
3. Update navigation in `components/layout/header.tsx`

### Modify the navigation menu
Edit `components/layout/mega-menu.tsx` - the menu structure is defined in `NAVIGATION_DATA`

### Change product card layout
Edit `components/product/product-card.tsx`

### Update cart behavior
Cart logic is in `components/cart/cart-drawer.tsx` with mutations in `lib/shopify/mutations.ts`

### Add a new collection filter
1. Add filter option to `components/collection/filter-sidebar.tsx`
2. Update query in `lib/shopify/queries.ts` to accept filter params

---

## URL Structure (Must Match Shopify for SEO)

| Route | Next.js Path | Example |
|-------|--------------|---------|
| Product | `/products/[handle]` | `/products/ferrari-458-spider` |
| Collection | `/collections/[handle]` | `/collections/lamborghini` |
| Page | `/pages/[handle]` | `/pages/about-us` |
| Search | `/search` | `/search?q=porsche` |

**Critical:** Maintain these URL patterns exactly to preserve SEO.

---

## Brand Guidelines

### Colors
- **Primary Red:** `#DC2626` (Tailwind `red-600`)
- **Black:** `#0A0A0A`
- **White:** `#FFFFFF`
- **Gray (text):** `#6B7280`

### Typography
- **Headings:** Bold, uppercase for emphasis
- **Body:** Clean sans-serif

### Voice
- Enthusiast-friendly, passionate about cars
- Professional but not stuffy
- Use emojis sparingly (🚗 🔥 in marketing copy only)

---

## Do Not Modify

- `lib/shopify/` core client setup without discussion
- URL route structure (SEO critical)
- Checkout flow (Shopify handles this)

---

## Quick Commands

```bash
# Development
npm run dev

# Build
npm run build

# Type check
npm run type-check

# Lint
npm run lint

# Format
npm run format
```

---

## Links

- [Shopify Storefront API Docs](https://shopify.dev/docs/api/storefront)
- [Next.js Commerce Template](https://github.com/vercel/commerce)
- [PROJECT.md](./docs/PROJECT.md) - Full migration plan
- [CONTENT.md](./docs/CONTENT.md) - Original site content
