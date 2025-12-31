import { CartProvider } from 'components/cart/cart-context';
import { Navbar } from 'components/layout/navbar';
import { GeistSans } from 'geist/font/sans';
import { getCart } from 'lib/shopify';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import './globals.css';
import { baseUrl } from 'lib/utils';

const SITE_NAME = process.env.SITE_NAME || 'Redline Diecast';

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${SITE_NAME} | Premium Diecast Model Cars`,
    template: `%s | ${SITE_NAME}`
  },
  description: 'Shop premium diecast model cars from Ferrari, Lamborghini, Porsche, and more. Collector quality scale models for enthusiasts.',
  keywords: ['diecast cars', 'model cars', 'Ferrari diecast', 'Lamborghini model', 'collector cars', 'scale models'],
  robots: {
    follow: true,
    index: true
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Premium Diecast Model Cars`,
    description: 'Shop premium diecast model cars from Ferrari, Lamborghini, Porsche, and more.',
  },
};

export default async function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  // Don't await the fetch, pass the Promise to the context provider
  const cart = getCart();

  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="bg-white text-neutral-900 selection:bg-red-100 dark:bg-neutral-950 dark:text-white dark:selection:bg-red-900">
        <CartProvider cartPromise={cart}>
          <Navbar />
          <main className="min-h-screen">
            {children}
            <Toaster closeButton position="bottom-right" />
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
