# Redline Diecast Toy Cars

Premium diecast model cars for collectors and enthusiasts. A headless Shopify storefront built with Next.js.

**Live domain:** redlinediecasttoycars.com
**Contact:** redlinediecasttoysstore@gmail.com

## Features

- Server-rendered Next.js App Router with React Server Components
- Headless Shopify integration via Storefront API
- Real-time cart management
- Mobile-responsive design
- Dark mode support
- SEO optimized

## Quick Start

### Prerequisites

- Node.js 18.x or later
- pnpm (recommended) or npm
- A Shopify store with Storefront API access

### Installation

```bash
# Install dependencies
pnpm install

# Copy environment template
cp .env.example .env.local

# Start development server
pnpm dev
```

Your app will be running at [localhost:3000](http://localhost:3000/).

## Connecting to Shopify

### Step 1: Get Shopify Credentials

1. Log in to your [Shopify Admin](https://admin.shopify.com)
2. Go to **Settings** > **Apps and sales channels** > **Develop apps**
3. Click **Create an app** and name it (e.g., "Headless Storefront")
4. Under **Configuration**, click **Configure Storefront API scopes**
5. Enable these scopes:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_product_pickup_locations`
   - `unauthenticated_read_product_tags`
   - `unauthenticated_read_checkouts`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_content`
6. Click **Install app** and copy the **Storefront API access token**

### Step 2: Configure Environment Variables

Create a `.env.local` file with your credentials:

```env
# Required
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-token

# Site Configuration
COMPANY_NAME="Redline Diecast Toy Cars"
SITE_NAME="Redline Diecast"

# Optional: For webhook revalidation
SHOPIFY_REVALIDATION_SECRET=your-secret-here
```

### Step 3: Create Required Collections in Shopify

The homepage displays products from specific collections. Create these in Shopify Admin:

1. **`hidden-homepage-featured-items`** - 3 products for the main grid
2. **`hidden-homepage-carousel`** - Products for the scrolling carousel

Collections starting with `hidden-` won't appear in the search/navigation.

### Step 4: Configure Navigation Menus

In Shopify Admin, go to **Online Store** > **Navigation** and create:

1. **`next-js-frontend-header-menu`** - Main navigation links
2. **`next-js-frontend-footer-menu`** - Footer links

## Development

```bash
# Development server
pnpm dev

# Type checking
pnpm type-check

# Linting
pnpm lint

# Production build
pnpm build

# Start production server
pnpm start
```

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage
│   ├── product/[handle]/   # Product detail pages
│   └── search/             # Search and collection pages
├── components/             # React components
│   ├── cart/               # Cart functionality
│   ├── grid/               # Product grid layouts
│   ├── layout/             # Header, footer, nav
│   └── product/            # Product display components
├── lib/
│   ├── shopify/            # Shopify API integration
│   └── mock-data.ts        # Sample data for development
└── public/                 # Static assets
```

## Mock Data

When Shopify isn't configured, the site displays sample diecast car products. This helps with:
- Development without Shopify credentials
- UI testing and design work
- Demonstrating the storefront

Once you add your Shopify credentials, real products will automatically replace the mock data.

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in project settings
4. Deploy

### Other Platforms

The app can be deployed anywhere that supports Next.js:
- Netlify
- AWS Amplify
- Self-hosted with `pnpm build && pnpm start`

## Shopify Webhook Setup (Optional)

For automatic revalidation when products change in Shopify:

1. In Shopify Admin, go to **Settings** > **Notifications** > **Webhooks**
2. Add webhooks for:
   - `Product create/update/delete`
   - `Collection create/update/delete`
3. Set webhook URL to: `https://your-domain.com/api/revalidate?secret=YOUR_SECRET`
4. Set `SHOPIFY_REVALIDATION_SECRET` in your environment

## Troubleshooting

### Products not showing?
- Verify `SHOPIFY_STORE_DOMAIN` and `SHOPIFY_STOREFRONT_ACCESS_TOKEN` are correct
- Check that collections exist with exact names
- Ensure products are published to the Storefront API sales channel

### Cart not working?
- The Storefront API token needs checkout scopes
- Check browser console for errors

### Images not loading?
- Add your Shopify CDN domain to `next.config.ts` under `images.remotePatterns`

## License

MIT
