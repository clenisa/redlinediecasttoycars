# Pre-Development Checklist

## Decisions Required Before Starting

Complete this checklist before beginning development. Each item needs a decision or information from the client.

---

## 🔑 Shopify Access (Required)

- [ ] **Storefront API Access Token**
  - Go to: Shopify Admin → Settings → Apps and sales channels → Develop apps
  - Create a new app or use existing
  - Configure Storefront API scopes:
    - `unauthenticated_read_product_listings`
    - `unauthenticated_read_product_inventory`
    - `unauthenticated_read_product_tags`
    - `unauthenticated_read_checkouts`
    - `unauthenticated_write_checkouts`
    - `unauthenticated_read_customer_tags`
  - Copy the Storefront API access token
  - **Provide:** `SHOPIFY_STOREFRONT_ACCESS_TOKEN=_______`

- [ ] **Store Domain**
  - Format: `your-store.myshopify.com`
  - **Provide:** `SHOPIFY_STORE_DOMAIN=_______`

- [ ] **Install Headless Sales Channel**
  - Go to: Shopify Admin → Sales channels → Add sales channel → Headless
  - This enables the Storefront API properly

---

## 🎨 Design Decisions

- [ ] **Primary Brand Color**
  - Current site uses red. Keep `#DC2626` or change?
  - **Decision:** `_______`

- [ ] **Font Choice**
  - Options:
    - [ ] Inter (clean, modern)
    - [ ] Montserrat (bold, impactful)
    - [ ] System fonts (fastest loading)
    - [ ] Other: `_______`

- [ ] **Homepage Hero**
  - Keep current banner image?
  - Want new hero design?
  - **Decision:** `_______`

- [ ] **Product Card Style**
  - [ ] Simple (image + title + price)
  - [ ] Detailed (image + title + brand + scale + price)
  - [ ] With quick-add button

---

## 🔍 Search Solution

Choose one:

- [ ] **Meilisearch (Self-hosted)**
  - Cost: $0 (included in VPS)
  - Pros: Full control, fast, good typo tolerance
  - Cons: Requires initial setup

- [ ] **Algolia**
  - Cost: Free up to 10k searches/month, then ~$1/1k searches
  - Pros: Easier setup, excellent docs
  - Cons: Can get expensive at scale

- [ ] **Shopify Native Search**
  - Cost: $0
  - Pros: No setup, always synced
  - Cons: Basic features, no typo tolerance

**Decision:** `_______`

---

## ⭐ Reviews Solution

- [ ] **Keep Judge.me**
  - Already have data
  - Use their widget or API
  - **If yes:** Provide Judge.me API token (if using API approach)

- [ ] **Switch to Stamped.io**
  - Cleaner API
  - $19-249/month
  - Would need to migrate reviews

- [ ] **No reviews initially**
  - Can add later

**Decision:** `_______`

---

## 🌐 Hosting Decision

Choose one:

- [ ] **Coolify on Hetzner (Self-hosted)**
  - Cost: ~€10/month
  - Pros: Full control, no vendor lock-in
  - Cons: You manage the server
  - Need: Server provisioned, Coolify installed

- [ ] **Vercel**
  - Cost: $20/month + bandwidth
  - Pros: Zero DevOps, excellent DX
  - Cons: Vendor lock-in, can get expensive

- [ ] **Cloudflare Pages**
  - Cost: $0 (free tier generous)
  - Pros: Free, fast edge network
  - Cons: Some Next.js features need adaptation

**Decision:** `_______`

---

## 📧 Forms & Communication

- [ ] **Contact Form Handler**
  - Options:
    - [ ] Formspree (free tier available)
    - [ ] Resend (free tier: 100 emails/day)
    - [ ] Simple mailto link
    - [ ] Other: `_______`

- [ ] **Newsletter Signup**
  - Current provider? Mailchimp, Klaviyo, etc.
  - **Provide integration details if keeping:** `_______`

---

## 📊 Analytics

- [ ] **Google Analytics**
  - Have existing GA4 property?
  - **Provide:** `GA_MEASUREMENT_ID=_______`

- [ ] **Other Analytics**
  - Plausible, Fathom, Mixpanel?
  - **Decision:** `_______`

---

## 🔗 Domain & DNS

- [ ] **Current DNS Provider**
  - Where is DNS managed? (Cloudflare, GoDaddy, Namecheap, Shopify, etc.)
  - **Provider:** `_______`

- [ ] **DNS Access**
  - Can you update DNS records?
  - **Confirm:** [ ] Yes [ ] No, need help

- [ ] **SSL/HTTPS**
  - Will be handled automatically by hosting provider
  - **Confirm understood:** [ ]

---

## 📋 Content Decisions

- [ ] **Static Page Content**
  - Review CONTENT.md for extracted content
  - Any changes needed to FAQ, About, Returns?
  - **Decision:** [ ] Keep as-is [ ] Will provide updates

- [ ] **Announcement Bar**
  - Keep "FAST & FREE SHIPPING NATIONWIDE"?
  - **Decision:** `_______`

- [ ] **Footer Content**
  - Any additional links needed?
  - Social media links to add?
  - **Provide URLs:** `_______`

---

## 🚀 Launch Preferences

- [ ] **Target Launch Date**
  - Ideal timeline?
  - **Date:** `_______`

- [ ] **Staging Domain**
  - Want preview before going live?
  - Suggested: `staging.redlinediecasttoycars.com`
  - **Confirm:** [ ]

- [ ] **Maintenance Window**
  - Best time for DNS cutover?
  - Low-traffic period preferred
  - **Decision:** `_______`

---

## ✅ Final Confirmations

- [ ] **syncX Stock Sync will continue working** (backend app, unaffected)
- [ ] **DSers will continue working** (backend app, unaffected)
- [ ] **Orders will continue processing** (Shopify checkout unchanged)
- [ ] **Shopify admin stays the same** (only storefront changes)

**Client confirms understanding:** [ ]

---

## Handoff

Once completed, provide this checklist to your developer with:

1. ✅ All decisions marked
2. 📋 API tokens and credentials
3. 🔑 DNS access details
4. 📝 Any content updates

---

## Quick Start After Checklist Complete

```bash
# 1. Clone template
git clone https://github.com/vercel/commerce.git redline-diecast
cd redline-diecast

# 2. Install dependencies
npm install

# 3. Create .env.local with provided credentials
cp .env.example .env.local
# Edit with actual values

# 4. Start development
npm run dev

# 5. Open http://localhost:3000
```
