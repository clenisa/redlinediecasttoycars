// Mock data for development - Replace with Shopify API when keys are available
import type { Product, Collection, Image } from 'lib/shopify/types';

// Placeholder images from Unsplash (diecast/car photography)
const placeholderImages = {
  ferrari: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80',
  lamborghini: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&q=80',
  porsche: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
  f1: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80',
  mercedes: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
  bmw: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
  audi: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
  vintage: 'https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?w=800&q=80',
  collection1: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
  collection2: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80',
  collection3: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&q=80',
};

function createImage(url: string, alt: string): Image {
  return {
    url,
    altText: alt,
    width: 800,
    height: 800,
  };
}

function createProduct(
  id: string,
  handle: string,
  title: string,
  price: string,
  imageUrl: string,
  description: string = '',
  tags: string[] = []
): Product {
  return {
    id: `gid://shopify/Product/${id}`,
    handle,
    availableForSale: true,
    title,
    description: description || `Premium diecast model of ${title}. Highly detailed collector's item.`,
    descriptionHtml: `<p>Premium diecast model of ${title}. Highly detailed collector's item.</p>`,
    options: [
      {
        id: 'scale',
        name: 'Scale',
        values: ['1:18', '1:24', '1:43'],
      },
    ],
    priceRange: {
      maxVariantPrice: { amount: price, currencyCode: 'USD' },
      minVariantPrice: { amount: price, currencyCode: 'USD' },
    },
    variants: [
      {
        id: `gid://shopify/ProductVariant/${id}1`,
        title: '1:18',
        availableForSale: true,
        selectedOptions: [{ name: 'Scale', value: '1:18' }],
        price: { amount: price, currencyCode: 'USD' },
      },
      {
        id: `gid://shopify/ProductVariant/${id}2`,
        title: '1:24',
        availableForSale: true,
        selectedOptions: [{ name: 'Scale', value: '1:24' }],
        price: { amount: (parseFloat(price) * 0.7).toFixed(2), currencyCode: 'USD' },
      },
      {
        id: `gid://shopify/ProductVariant/${id}3`,
        title: '1:43',
        availableForSale: true,
        selectedOptions: [{ name: 'Scale', value: '1:43' }],
        price: { amount: (parseFloat(price) * 0.5).toFixed(2), currencyCode: 'USD' },
      },
    ],
    featuredImage: createImage(imageUrl, title),
    images: [
      createImage(imageUrl, title),
      createImage(imageUrl, `${title} - Side View`),
      createImage(imageUrl, `${title} - Detail`),
    ],
    seo: {
      title,
      description: `Shop ${title} diecast model at Redline Diecast Toy Cars`,
    },
    tags,
    updatedAt: new Date().toISOString(),
  };
}

// Featured Products
export const mockProducts: Product[] = [
  createProduct('1001', 'ferrari-sf90-stradale', 'Ferrari SF90 Stradale', '189.99', placeholderImages.ferrari, '', ['ferrari', 'supercar', 'bestseller']),
  createProduct('1002', 'lamborghini-huracan-evo', 'Lamborghini Huracan EVO', '179.99', placeholderImages.lamborghini, '', ['lamborghini', 'supercar', 'bestseller']),
  createProduct('1003', 'porsche-911-gt3-rs', 'Porsche 911 GT3 RS', '169.99', placeholderImages.porsche, '', ['porsche', 'sports-car', 'bestseller']),
  createProduct('1004', 'mercedes-amg-f1-w14', 'Mercedes AMG F1 W14', '249.99', placeholderImages.f1, '', ['f1', 'mercedes', 'racing']),
  createProduct('1005', 'bmw-m4-competition', 'BMW M4 Competition', '149.99', placeholderImages.bmw, '', ['bmw', 'sports-car']),
  createProduct('1006', 'audi-rs-e-tron-gt', 'Audi RS e-tron GT', '159.99', placeholderImages.audi, '', ['audi', 'electric']),
  createProduct('1007', 'mercedes-amg-gt-black', 'Mercedes AMG GT Black Series', '199.99', placeholderImages.mercedes, '', ['mercedes', 'supercar']),
  createProduct('1008', 'classic-ferrari-250-gto', 'Classic Ferrari 250 GTO', '299.99', placeholderImages.vintage, '', ['ferrari', 'vintage', 'limited-edition']),
];

// Collections
export const mockCollections: Collection[] = [
  {
    handle: 'all',
    title: 'All Products',
    description: 'Browse our complete collection of premium diecast models',
    seo: { title: 'All Products', description: 'Shop all diecast models' },
    updatedAt: new Date().toISOString(),
    path: '/search',
  },
  {
    handle: 'ferrari',
    title: 'Ferrari Collection',
    description: 'Iconic Italian supercars in stunning detail',
    seo: { title: 'Ferrari Diecast Models', description: 'Shop Ferrari diecast models' },
    updatedAt: new Date().toISOString(),
    path: '/search/ferrari',
  },
  {
    handle: 'lamborghini',
    title: 'Lamborghini Collection',
    description: 'Bold, dramatic, and unmistakably Italian',
    seo: { title: 'Lamborghini Diecast Models', description: 'Shop Lamborghini diecast models' },
    updatedAt: new Date().toISOString(),
    path: '/search/lamborghini',
  },
  {
    handle: 'porsche',
    title: 'Porsche Collection',
    description: 'German engineering excellence',
    seo: { title: 'Porsche Diecast Models', description: 'Shop Porsche diecast models' },
    updatedAt: new Date().toISOString(),
    path: '/search/porsche',
  },
  {
    handle: 'formula-1',
    title: 'Formula 1',
    description: 'The pinnacle of motorsport',
    seo: { title: 'F1 Diecast Models', description: 'Shop Formula 1 diecast models' },
    updatedAt: new Date().toISOString(),
    path: '/search/formula-1',
  },
  {
    handle: 'limited-edition',
    title: 'Limited Edition',
    description: 'Exclusive collector pieces',
    seo: { title: 'Limited Edition Diecast', description: 'Shop limited edition diecast' },
    updatedAt: new Date().toISOString(),
    path: '/search/limited-edition',
  },
];

// Homepage featured collections (for the grid)
export const featuredCollections = [
  {
    handle: 'supercars',
    title: 'Supercars',
    image: placeholderImages.collection1,
    description: 'The world\'s most exotic machines',
  },
  {
    handle: 'formula-1',
    title: 'Formula 1',
    image: placeholderImages.collection2,
    description: 'Racing legends in miniature',
  },
  {
    handle: 'vintage',
    title: 'Vintage Classics',
    image: placeholderImages.collection3,
    description: 'Timeless automotive icons',
  },
];

// Brand logos for carousel
export const brandLogos = [
  { name: 'Ferrari', handle: 'ferrari' },
  { name: 'Lamborghini', handle: 'lamborghini' },
  { name: 'Porsche', handle: 'porsche' },
  { name: 'BMW', handle: 'bmw' },
  { name: 'Mercedes', handle: 'mercedes' },
  { name: 'Audi', handle: 'audi' },
  { name: 'McLaren', handle: 'mclaren' },
  { name: 'Aston Martin', handle: 'aston-martin' },
];

// Navigation menu
export const mockMenu = [
  { title: 'Shop', path: '/search' },
  { title: 'Collections', path: '/search' },
  { title: 'About', path: '/about' },
];

export const mockFooterMenu = [
  { title: 'About Us', path: '/about' },
  { title: 'FAQ', path: '/faq' },
  { title: 'Returns', path: '/return-policy' },
  { title: 'Contact', path: '/contact' },
];
