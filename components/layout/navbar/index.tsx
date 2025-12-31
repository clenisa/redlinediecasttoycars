import CartModal from 'components/cart/modal';
import { getMenu } from 'lib/shopify';
import { mockMenu } from 'lib/mock-data';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';

const SITE_NAME = process.env.SITE_NAME || 'Redline Diecast';

export async function Navbar() {
  let menu: Menu[] = [];

  try {
    menu = await getMenu('next-js-frontend-header-menu');
  } catch {
    // Fallback to mock menu if Shopify isn't configured
    menu = mockMenu;
  }

  if (!menu.length) {
    menu = mockMenu;
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-100 bg-white/80 backdrop-blur-lg dark:border-neutral-800 dark:bg-neutral-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Mobile menu */}
        <div className="flex md:hidden">
          <Suspense fallback={null}>
            <MobileMenu menu={menu} />
          </Suspense>
        </div>

        {/* Logo - centered on mobile, left on desktop */}
        <Link
          href="/"
          prefetch={true}
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <span className="text-xl font-bold tracking-tight text-red-600">REDLINE</span>
          <span className="hidden text-xl font-light tracking-wide sm:inline">DIECAST</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-8 md:flex">
          {menu.map((item: Menu) => (
            <li key={item.title}>
              <Link
                href={item.path}
                prefetch={true}
                className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side: Search + Cart */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>
          </div>
          <CartModal />
        </div>
      </div>
    </nav>
  );
}
