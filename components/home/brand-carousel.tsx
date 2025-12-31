'use client';

import Link from 'next/link';
import { brandLogos } from 'lib/mock-data';

export function BrandCarousel() {
  return (
    <section className="border-y border-neutral-100 bg-neutral-50 py-12 dark:border-neutral-800 dark:bg-neutral-900/50 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="mb-8 text-center text-sm font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
          Shop by Brand
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
          {brandLogos.map((brand) => (
            <Link
              key={brand.handle}
              href={`/search/${brand.handle}`}
              className="group flex flex-col items-center gap-2 transition-opacity hover:opacity-70"
            >
              {/* Brand name as text (placeholder for actual logos) */}
              <span className="text-lg font-semibold tracking-wide text-neutral-400 transition-colors group-hover:text-red-600 dark:text-neutral-500 dark:group-hover:text-red-500 md:text-xl">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
