'use client';

import Image from 'next/image';
import Link from 'next/link';

const heroImage = 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1920&q=80';

export function Hero() {
  return (
    <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden bg-neutral-900 lg:h-[85vh]">
      {/* Background Image */}
      <Image
        src={heroImage}
        alt="Premium diecast model cars"
        fill
        priority
        className="object-cover opacity-60"
        sizes="100vw"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 text-center md:pb-24">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Precision in Every Detail
          </h1>
          <p className="mb-8 text-lg text-neutral-300 md:text-xl">
            Premium diecast model cars for collectors and enthusiasts
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/search"
              className="inline-flex items-center justify-center rounded-none bg-red-600 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-red-700"
            >
              Shop Collection
            </Link>
            <Link
              href="/search/limited-edition"
              className="inline-flex items-center justify-center border border-white/30 bg-transparent px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-white/10"
            >
              Limited Editions
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 animate-bounce md:block">
        <svg
          className="h-6 w-6 text-white/50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
