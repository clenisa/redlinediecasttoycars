import Link from 'next/link';
import { ProductCard } from './product-card';
import { mockProducts } from 'lib/mock-data';

export function FeaturedProducts() {
  // Get first 8 products for the featured section
  const products = mockProducts.slice(0, 8);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
      <div className="mb-12 flex items-end justify-between">
        <div>
          <h2 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">
            Featured Models
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Our most popular collector pieces
          </p>
        </div>
        <Link
          href="/search"
          className="hidden items-center text-sm font-medium text-neutral-900 transition-colors hover:text-red-600 dark:text-white dark:hover:text-red-500 md:flex"
        >
          View All
          <svg
            className="ml-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            priority={index < 4}
          />
        ))}
      </div>

      {/* Mobile View All link */}
      <div className="mt-8 text-center md:hidden">
        <Link
          href="/search"
          className="inline-flex items-center justify-center rounded-none border border-neutral-900 px-8 py-3 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-neutral-900"
        >
          View All Products
        </Link>
      </div>
    </section>
  );
}
