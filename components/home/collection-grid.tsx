import Image from 'next/image';
import Link from 'next/link';
import { featuredCollections } from 'lib/mock-data';

export function CollectionGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
          Shop by Category
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Explore our curated collections
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3 md:gap-6">
        {featuredCollections.map((collection, index) => (
          <Link
            key={collection.handle}
            href={`/search/${collection.handle}`}
            className="group relative aspect-[4/5] overflow-hidden bg-neutral-100 dark:bg-neutral-900"
          >
            <Image
              src={collection.image}
              alt={collection.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(min-width: 768px) 33vw, 100vw"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center">
              <h3 className="mb-2 text-2xl font-bold text-white">
                {collection.title}
              </h3>
              <p className="mb-4 text-sm text-neutral-300">
                {collection.description}
              </p>
              <span className="inline-flex items-center text-sm font-medium text-white transition-transform group-hover:translate-x-1">
                Explore
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
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
