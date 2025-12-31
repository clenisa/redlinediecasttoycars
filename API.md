# API.md - Shopify Storefront API Patterns

## Client Setup

```typescript
// lib/shopify/index.ts

const domain = process.env.SHOPIFY_STORE_DOMAIN!;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
const apiVersion = '2024-01';

const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

export async function shopifyFetch<T>({
  query,
  variables,
  cache = 'force-cache',
  tags,
}: {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
  tags?: string[];
}): Promise<{ data: T; errors?: unknown[] }> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
    cache,
    ...(tags && { next: { tags } }),
  });

  const json = await response.json();

  if (json.errors) {
    console.error('Shopify API Error:', json.errors);
    throw new Error(json.errors[0]?.message || 'Shopify API error');
  }

  return json;
}
```

---

## Product Queries

### Get Single Product

```typescript
// lib/shopify/queries.ts

export const getProductQuery = `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      descriptionHtml
      vendor
      productType
      tags
      availableForSale
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
            width
            height
          }
        }
      }
      variants(first: 100) {
        edges {
          node {
            id
            title
            availableForSale
            quantityAvailable
            price {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
            image {
              url
              altText
            }
          }
        }
      }
      seo {
        title
        description
      }
    }
  }
`;

// Usage
export async function getProduct(handle: string) {
  const { data } = await shopifyFetch<{ product: Product }>({
    query: getProductQuery,
    variables: { handle },
    tags: [`product-${handle}`],
  });
  return data.product;
}
```

### Get Products (List)

```typescript
export const getProductsQuery = `
  query getProducts($first: Int!, $sortKey: ProductSortKeys, $reverse: Boolean, $query: String) {
    products(first: $first, sortKey: $sortKey, reverse: $reverse, query: $query) {
      edges {
        node {
          id
          handle
          title
          vendor
          productType
          availableForSale
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          featuredImage {
            url
            altText
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

// Usage
export async function getProducts({
  first = 20,
  sortKey = 'BEST_SELLING',
  reverse = false,
  query = '',
}: {
  first?: number;
  sortKey?: string;
  reverse?: boolean;
  query?: string;
} = {}) {
  const { data } = await shopifyFetch<{ products: Connection<Product> }>({
    query: getProductsQuery,
    variables: { first, sortKey, reverse, query },
    tags: ['products'],
  });
  return data.products.edges.map(edge => edge.node);
}
```

---

## Collection Queries

### Get Single Collection with Products

```typescript
export const getCollectionQuery = `
  query getCollection($handle: String!, $first: Int!, $sortKey: ProductCollectionSortKeys, $reverse: Boolean) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      descriptionHtml
      image {
        url
        altText
      }
      seo {
        title
        description
      }
      products(first: $first, sortKey: $sortKey, reverse: $reverse) {
        edges {
          node {
            id
            handle
            title
            vendor
            productType
            availableForSale
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            featuredImage {
              url
              altText
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

// Usage
export async function getCollection(handle: string, first = 20) {
  const { data } = await shopifyFetch<{ collection: Collection }>({
    query: getCollectionQuery,
    variables: { handle, first, sortKey: 'BEST_SELLING', reverse: false },
    tags: [`collection-${handle}`],
  });
  return data.collection;
}
```

### Get All Collections

```typescript
export const getCollectionsQuery = `
  query getCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          handle
          title
          description
          image {
            url
            altText
          }
        }
      }
    }
  }
`;

// Usage
export async function getCollections() {
  const { data } = await shopifyFetch<{ collections: Connection<Collection> }>({
    query: getCollectionsQuery,
    variables: { first: 100 },
    tags: ['collections'],
  });
  return data.collections.edges.map(edge => edge.node);
}
```

---

## Cart Operations

### Create Cart

```typescript
export const createCartMutation = `
  mutation createCart($lineItems: [CartLineInput!]) {
    cartCreate(input: { lines: $lineItems }) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          subtotalAmount {
            amount
            currencyCode
          }
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    title
                    handle
                    featuredImage {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

// Usage
export async function createCart(lineItems?: CartLineInput[]) {
  const { data } = await shopifyFetch<{ cartCreate: { cart: Cart } }>({
    query: createCartMutation,
    variables: { lineItems },
    cache: 'no-store',
  });
  return data.cartCreate.cart;
}
```

### Add to Cart

```typescript
export const addToCartMutation = `
  mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          subtotalAmount {
            amount
            currencyCode
          }
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    title
                    handle
                    featuredImage {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

// Usage
export async function addToCart(cartId: string, lines: CartLineInput[]) {
  const { data } = await shopifyFetch<{ cartLinesAdd: { cart: Cart } }>({
    query: addToCartMutation,
    variables: { cartId, lines },
    cache: 'no-store',
  });
  return data.cartLinesAdd.cart;
}
```

### Update Cart Line

```typescript
export const updateCartMutation = `
  mutation updateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          subtotalAmount {
            amount
            currencyCode
          }
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    title
                    handle
                    featuredImage {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
```

### Remove from Cart

```typescript
export const removeFromCartMutation = `
  mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          subtotalAmount {
            amount
            currencyCode
          }
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    title
                    handle
                    featuredImage {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
```

### Get Cart

```typescript
export const getCartQuery = `
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      totalQuantity
      cost {
        subtotalAmount {
          amount
          currencyCode
        }
        totalAmount {
          amount
          currencyCode
        }
        totalTaxAmount {
          amount
          currencyCode
        }
      }
      lines(first: 100) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                price {
                  amount
                  currencyCode
                }
                product {
                  title
                  handle
                  featuredImage {
                    url
                    altText
                  }
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
    }
  }
`;
```

---

## Search Query

```typescript
export const searchProductsQuery = `
  query searchProducts($query: String!, $first: Int!) {
    search(query: $query, first: $first, types: [PRODUCT]) {
      edges {
        node {
          ... on Product {
            id
            handle
            title
            vendor
            productType
            availableForSale
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            featuredImage {
              url
              altText
            }
          }
        }
      }
      totalCount
    }
  }
`;

// Usage
export async function searchProducts(query: string, first = 20) {
  const { data } = await shopifyFetch<{ search: { edges: Array<{ node: Product }>, totalCount: number } }>({
    query: searchProductsQuery,
    variables: { query, first },
    cache: 'no-store',
  });
  return {
    products: data.search.edges.map(edge => edge.node),
    totalCount: data.search.totalCount,
  };
}
```

---

## TypeScript Types

```typescript
// lib/shopify/types.ts

export interface Money {
  amount: string;
  currencyCode: string;
}

export interface Image {
  url: string;
  altText: string | null;
  width?: number;
  height?: number;
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable: number;
  price: Money;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
  image?: Image;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  vendor: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  images: {
    edges: Array<{ node: Image }>;
  };
  variants: {
    edges: Array<{ node: ProductVariant }>;
  };
  featuredImage?: Image;
  seo?: {
    title: string;
    description: string;
  };
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml?: string;
  image?: Image;
  products?: {
    edges: Array<{ node: Product }>;
    pageInfo: PageInfo;
  };
  seo?: {
    title: string;
    description: string;
  };
}

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    price: Money;
    product: {
      title: string;
      handle: string;
      featuredImage?: Image;
    };
    selectedOptions?: Array<{
      name: string;
      value: string;
    }>;
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount?: Money;
  };
  lines: {
    edges: Array<{ node: CartLine }>;
  };
}

export interface CartLineInput {
  merchandiseId: string;
  quantity: number;
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string;
}

export interface Connection<T> {
  edges: Array<{ node: T }>;
  pageInfo?: PageInfo;
}
```

---

## Cart Cookie Management

```typescript
// lib/shopify/cart.ts
import { cookies } from 'next/headers';

const CART_COOKIE = 'shopify_cart_id';

export function getCartId(): string | undefined {
  return cookies().get(CART_COOKIE)?.value;
}

export function setCartId(cartId: string) {
  cookies().set(CART_COOKIE, cartId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
}

export function removeCartId() {
  cookies().delete(CART_COOKIE);
}
```

---

## Server Actions for Cart

```typescript
// lib/shopify/actions.ts
'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { createCart, addToCart, updateCart, removeFromCart, getCart } from './index';

export async function addItem(variantId: string) {
  const cartId = cookies().get('shopify_cart_id')?.value;
  
  if (!cartId) {
    const cart = await createCart([{ merchandiseId: variantId, quantity: 1 }]);
    cookies().set('shopify_cart_id', cart.id);
    return cart;
  }
  
  return addToCart(cartId, [{ merchandiseId: variantId, quantity: 1 }]);
}

export async function updateItemQuantity(lineId: string, quantity: number) {
  const cartId = cookies().get('shopify_cart_id')?.value;
  if (!cartId) return null;
  
  if (quantity === 0) {
    return removeFromCart(cartId, [lineId]);
  }
  
  return updateCart(cartId, [{ id: lineId, quantity }]);
}

export async function removeItem(lineId: string) {
  const cartId = cookies().get('shopify_cart_id')?.value;
  if (!cartId) return null;
  
  return removeFromCart(cartId, [lineId]);
}
```

---

## Utility Functions

```typescript
// lib/shopify/utils.ts

export function formatPrice(amount: string, currencyCode: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(parseFloat(amount));
}

export function getProductImages(product: Product): Image[] {
  return product.images.edges.map(edge => edge.node);
}

export function getProductVariants(product: Product): ProductVariant[] {
  return product.variants.edges.map(edge => edge.node);
}

export function getCartLines(cart: Cart): CartLine[] {
  return cart.lines.edges.map(edge => edge.node);
}

export function isAvailable(product: Product): boolean {
  return product.availableForSale && 
    product.variants.edges.some(edge => edge.node.availableForSale);
}
```
