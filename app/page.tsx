import {
  Hero,
  CollectionGrid,
  FeaturedProducts,
  BrandCarousel,
  Newsletter,
} from 'components/home';
import Footer from 'components/layout/footer';

export const metadata = {
  title: 'Redline Diecast | Premium Model Cars for Collectors',
  description:
    'Shop premium diecast model cars from Ferrari, Lamborghini, Porsche, and more. Collector quality scale models for enthusiasts.',
  openGraph: {
    type: 'website',
    title: 'Redline Diecast | Premium Model Cars for Collectors',
    description: 'Shop premium diecast model cars from Ferrari, Lamborghini, Porsche, and more.',
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <CollectionGrid />
      <FeaturedProducts />
      <BrandCarousel />
      <Newsletter />
      <Footer />
    </>
  );
}
