import type { Product } from './shopify/types';

// Mock product images using placeholder service
const createMockImage = (id: number, title: string) => ({
  url: `https://placehold.co/800x800/1a1a1a/DC2626?text=${encodeURIComponent(title.replace(/\s+/g, '+'))}`,
  altText: title,
  width: 800,
  height: 800
});

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'mock-1',
    handle: 'ferrari-458-italia',
    availableForSale: true,
    title: 'Ferrari 458 Italia',
    description: 'Stunning 1:18 scale diecast model of the iconic Ferrari 458 Italia. Features opening doors, hood, and trunk with detailed interior.',
    descriptionHtml: '<p>Stunning 1:18 scale diecast model of the iconic Ferrari 458 Italia. Features opening doors, hood, and trunk with detailed interior.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['Rosso Corsa', 'Giallo Modena', 'Nero'] }
    ],
    priceRange: {
      maxVariantPrice: { amount: '89.99', currencyCode: 'USD' },
      minVariantPrice: { amount: '89.99', currencyCode: 'USD' }
    },
    variants: [
      {
        id: 'variant-1',
        title: 'Rosso Corsa',
        availableForSale: true,
        selectedOptions: [{ name: 'Color', value: 'Rosso Corsa' }],
        price: { amount: '89.99', currencyCode: 'USD' }
      }
    ],
    featuredImage: createMockImage(1, 'Ferrari 458'),
    images: [createMockImage(1, 'Ferrari 458')],
    seo: { title: 'Ferrari 458 Italia', description: '1:18 scale diecast model' },
    tags: ['ferrari', 'supercar', '1:18'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'mock-2',
    handle: 'lamborghini-aventador-svj',
    availableForSale: true,
    title: 'Lamborghini Aventador SVJ',
    description: 'Premium 1:18 scale Lamborghini Aventador SVJ with Verde Mantis finish. Highly detailed with authentic Lamborghini badging.',
    descriptionHtml: '<p>Premium 1:18 scale Lamborghini Aventador SVJ with Verde Mantis finish. Highly detailed with authentic Lamborghini badging.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['Verde Mantis', 'Arancio Atlas', 'Bianco Icarus'] }
    ],
    priceRange: {
      maxVariantPrice: { amount: '129.99', currencyCode: 'USD' },
      minVariantPrice: { amount: '129.99', currencyCode: 'USD' }
    },
    variants: [
      {
        id: 'variant-2',
        title: 'Verde Mantis',
        availableForSale: true,
        selectedOptions: [{ name: 'Color', value: 'Verde Mantis' }],
        price: { amount: '129.99', currencyCode: 'USD' }
      }
    ],
    featuredImage: createMockImage(2, 'Aventador SVJ'),
    images: [createMockImage(2, 'Aventador SVJ')],
    seo: { title: 'Lamborghini Aventador SVJ', description: '1:18 scale diecast model' },
    tags: ['lamborghini', 'supercar', '1:18'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'mock-3',
    handle: 'porsche-911-gt3-rs',
    availableForSale: true,
    title: 'Porsche 911 GT3 RS',
    description: 'Collector-grade 1:18 scale Porsche 911 GT3 RS. Features functional steering, opening components, and detailed engine bay.',
    descriptionHtml: '<p>Collector-grade 1:18 scale Porsche 911 GT3 RS. Features functional steering, opening components, and detailed engine bay.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['GT Silver', 'Guards Red', 'Racing Yellow'] }
    ],
    priceRange: {
      maxVariantPrice: { amount: '109.99', currencyCode: 'USD' },
      minVariantPrice: { amount: '109.99', currencyCode: 'USD' }
    },
    variants: [
      {
        id: 'variant-3',
        title: 'GT Silver',
        availableForSale: true,
        selectedOptions: [{ name: 'Color', value: 'GT Silver' }],
        price: { amount: '109.99', currencyCode: 'USD' }
      }
    ],
    featuredImage: createMockImage(3, 'Porsche GT3 RS'),
    images: [createMockImage(3, 'Porsche GT3 RS')],
    seo: { title: 'Porsche 911 GT3 RS', description: '1:18 scale diecast model' },
    tags: ['porsche', 'sports-car', '1:18'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'mock-4',
    handle: 'mclaren-720s',
    availableForSale: true,
    title: 'McLaren 720S',
    description: 'Exquisite 1:18 scale McLaren 720S in Papaya Spark. Dihedral doors open to reveal a meticulously crafted interior.',
    descriptionHtml: '<p>Exquisite 1:18 scale McLaren 720S in Papaya Spark. Dihedral doors open to reveal a meticulously crafted interior.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['Papaya Spark', 'Onyx Black', 'Silica White'] }
    ],
    priceRange: {
      maxVariantPrice: { amount: '119.99', currencyCode: 'USD' },
      minVariantPrice: { amount: '119.99', currencyCode: 'USD' }
    },
    variants: [
      {
        id: 'variant-4',
        title: 'Papaya Spark',
        availableForSale: true,
        selectedOptions: [{ name: 'Color', value: 'Papaya Spark' }],
        price: { amount: '119.99', currencyCode: 'USD' }
      }
    ],
    featuredImage: createMockImage(4, 'McLaren 720S'),
    images: [createMockImage(4, 'McLaren 720S')],
    seo: { title: 'McLaren 720S', description: '1:18 scale diecast model' },
    tags: ['mclaren', 'supercar', '1:18'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'mock-5',
    handle: 'bugatti-chiron',
    availableForSale: true,
    title: 'Bugatti Chiron',
    description: 'Limited edition 1:18 scale Bugatti Chiron. The ultimate hypercar replica with authentic two-tone finish and detailed W16 engine.',
    descriptionHtml: '<p>Limited edition 1:18 scale Bugatti Chiron. The ultimate hypercar replica with authentic two-tone finish and detailed W16 engine.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['Atlantic Blue/French Racing Blue', 'Nocturne Black'] }
    ],
    priceRange: {
      maxVariantPrice: { amount: '149.99', currencyCode: 'USD' },
      minVariantPrice: { amount: '149.99', currencyCode: 'USD' }
    },
    variants: [
      {
        id: 'variant-5',
        title: 'Atlantic Blue/French Racing Blue',
        availableForSale: true,
        selectedOptions: [{ name: 'Color', value: 'Atlantic Blue/French Racing Blue' }],
        price: { amount: '149.99', currencyCode: 'USD' }
      }
    ],
    featuredImage: createMockImage(5, 'Bugatti Chiron'),
    images: [createMockImage(5, 'Bugatti Chiron')],
    seo: { title: 'Bugatti Chiron', description: '1:18 scale diecast model' },
    tags: ['bugatti', 'hypercar', '1:18'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'mock-6',
    handle: 'ford-gt-heritage',
    availableForSale: true,
    title: 'Ford GT Heritage Edition',
    description: '1:18 scale Ford GT in stunning Gulf Heritage livery. A tribute to the legendary Le Mans winning GT40.',
    descriptionHtml: '<p>1:18 scale Ford GT in stunning Gulf Heritage livery. A tribute to the legendary Le Mans winning GT40.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['Gulf Heritage', 'Liquid Blue', 'Shadow Black'] }
    ],
    priceRange: {
      maxVariantPrice: { amount: '99.99', currencyCode: 'USD' },
      minVariantPrice: { amount: '99.99', currencyCode: 'USD' }
    },
    variants: [
      {
        id: 'variant-6',
        title: 'Gulf Heritage',
        availableForSale: true,
        selectedOptions: [{ name: 'Color', value: 'Gulf Heritage' }],
        price: { amount: '99.99', currencyCode: 'USD' }
      }
    ],
    featuredImage: createMockImage(6, 'Ford GT Heritage'),
    images: [createMockImage(6, 'Ford GT Heritage')],
    seo: { title: 'Ford GT Heritage Edition', description: '1:18 scale diecast model' },
    tags: ['ford', 'supercar', '1:18', 'heritage'],
    updatedAt: new Date().toISOString()
  }
];

export const MOCK_COLLECTIONS = [
  {
    handle: 'ferrari',
    title: 'Ferrari',
    description: 'Premium Ferrari diecast models',
    seo: { title: 'Ferrari Collection', description: 'Premium Ferrari diecast models' },
    path: '/search/ferrari',
    updatedAt: new Date().toISOString()
  },
  {
    handle: 'lamborghini',
    title: 'Lamborghini',
    description: 'Premium Lamborghini diecast models',
    seo: { title: 'Lamborghini Collection', description: 'Premium Lamborghini diecast models' },
    path: '/search/lamborghini',
    updatedAt: new Date().toISOString()
  },
  {
    handle: 'porsche',
    title: 'Porsche',
    description: 'Premium Porsche diecast models',
    seo: { title: 'Porsche Collection', description: 'Premium Porsche diecast models' },
    path: '/search/porsche',
    updatedAt: new Date().toISOString()
  }
];
