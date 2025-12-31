'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from 'lib/shopify/types';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: product.priceRange.minVariantPrice.currencyCode,
  }).format(price);

  return (
    <Link
      href={`/product/${product.handle}`}
      className="group block"
    >
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-900">
        <Image
          src={product.featuredImage.url}
          alt={product.featuredImage.altText || product.title}
          fill
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
        />
        {/* Quick view overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100">
          <span className="translate-y-4 rounded-none bg-white px-6 py-2 text-sm font-medium text-neutral-900 transition-transform duration-300 group-hover:translate-y-0">
            View Details
          </span>
        </div>
      </div>

      {/* Product info */}
      <div className="mt-4 space-y-1">
        <h3 className="text-sm font-medium text-neutral-900 dark:text-white">
          {product.title}
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formattedPrice}
        </p>
      </div>
    </Link>
  );
}
