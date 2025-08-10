import { Suspense } from "react";
import { getProductsUrl, getCategoriesUrl } from "../../../config/api";
import ProductDetailPageClient from "./ProductDetailPageClient";
import apiCache from "../../../utils/cache";

// Generate metadata for the product detail page
export async function generateMetadata({ params }) {
  const categorySlug = params["category-slug"];
  const productSlug = params["product-slug"];
  
  try {
    // Fetch data for metadata
    const [productsData, categoriesData] = await Promise.all([
      apiCache.fetchWithCache(getProductsUrl()),
      apiCache.fetchWithCache(getCategoriesUrl())
    ]);

    const allProducts = Array.isArray(productsData?.results) ? productsData.results : Array.isArray(productsData) ? productsData : [];
    const allCategories = Array.isArray(categoriesData?.results) ? categoriesData.results : Array.isArray(categoriesData) ? categoriesData : [];

    // Find the specific product from the list
    const foundProductFromList = allProducts.find(p => 
      p.slug === productSlug && p.category?.slug === categorySlug
    );

    if (!foundProductFromList) {
      return {
        title: `${productSlug?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} - Serle's Bake | From Our Oven to Your Heart`,
        description: `Discover our delicious ${productSlug?.replace(/-/g, ' ')} cake at Serle's Bake. Fresh homemade cake crafted with care and passion. Perfect for birthdays, weddings, and special celebrations. Fresh cakes delivered in Tenkasi, Tamil Nadu.`,
        keywords: `homemade cakes, ${productSlug?.replace(/-/g, ' ')}, Serle's Bake, Tenkasi cakes, birthday cakes, wedding cakes, custom cakes, Tamil Nadu bakery, fresh cakes delivery`,
        openGraph: {
          title: `${productSlug?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} - Serle's Bake | From Our Oven to Your Heart`,
          description: `Discover our delicious ${productSlug?.replace(/-/g, ' ')} cake at Serle's Bake. Fresh homemade cake crafted with care and passion. Perfect for birthdays, weddings, and special celebrations. Fresh cakes delivered in Tenkasi, Tamil Nadu.`,
          type: 'website',
          url: `https://serlesbake.in/cakes/${categorySlug}/${productSlug}`,
          images: ['https://serlesbake.in/img/logo.png'],
        },
        twitter: {
          card: 'summary_large_image',
          title: `${productSlug?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} - Serle's Bake | From Our Oven to Your Heart`,
          description: `Discover our delicious ${productSlug?.replace(/-/g, ' ')} cake at Serle's Bake. Fresh homemade cake crafted with care and passion. Perfect for birthdays, weddings, and special celebrations. Fresh cakes delivered in Tenkasi, Tamil Nadu.`,
          images: ['https://serlesbake.in/img/logo.png'],
        },
        alternates: {
          canonical: `https://serlesbake.in/cakes/${categorySlug}/${productSlug}`,
        },
      };
    }

    // Fetch individual product data to get complete information
    const individualProductData = await apiCache.fetchWithCache(`http://127.0.0.1:8000/api/products/${foundProductFromList.id}/?format=json`);

    return {
      title: `${individualProductData.name} - Serle's Bake | From Our Oven to Your Heart`,
      description: individualProductData.description || individualProductData.short_description || `Discover our delicious ${individualProductData.name} at Serle's Bake. Fresh homemade cake crafted with care and passion. Perfect for birthdays, weddings, and special celebrations. Fresh cakes delivered in Tenkasi, Tamil Nadu.`,
      keywords: `homemade cakes, ${individualProductData.name.toLowerCase()}, Serle's Bake, Tenkasi cakes, ${individualProductData.category?.name?.toLowerCase() || 'cake'}, birthday cakes, wedding cakes, custom cakes, Tamil Nadu bakery, fresh cakes delivery${individualProductData.tags ? `, ${individualProductData.tags.map(tag => tag.name).join(', ')}` : ''}`,
      openGraph: {
        title: `${individualProductData.name} - Serle's Bake | From Our Oven to Your Heart`,
        description: individualProductData.description || individualProductData.short_description || `Discover our delicious ${individualProductData.name} at Serle's Bake. Fresh homemade cake crafted with care and passion. Perfect for birthdays, weddings, and special celebrations. Fresh cakes delivered in Tenkasi, Tamil Nadu.`,
        type: 'website',
        url: `https://serlesbake.in/cakes/${categorySlug}/${productSlug}`,
        images: [individualProductData.featured_image?.url || individualProductData.images?.[0]?.url || 'https://serlesbake.in/img/logo.png'],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${individualProductData.name} - Serle's Bake | From Our Oven to Your Heart`,
        description: individualProductData.description || individualProductData.short_description || `Discover our delicious ${individualProductData.name} at Serle's Bake. Fresh homemade cake crafted with care and passion. Perfect for birthdays, weddings, and special celebrations. Fresh cakes delivered in Tenkasi, Tamil Nadu.`,
        images: [individualProductData.featured_image?.url || individualProductData.images?.[0]?.url || 'https://serlesbake.in/img/logo.png'],
      },
      alternates: {
        canonical: `https://serlesbake.in/cakes/${categorySlug}/${productSlug}`,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: `${productSlug?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} - Serle's Bake | From Our Oven to Your Heart`,
      description: `Discover our delicious ${productSlug?.replace(/-/g, ' ')} cake at Serle's Bake. Fresh homemade cake crafted with care and passion. Perfect for birthdays, weddings, and special celebrations. Fresh cakes delivered in Tenkasi, Tamil Nadu.`,
      keywords: `homemade cakes, ${productSlug?.replace(/-/g, ' ')}, Serle's Bake, Tenkasi cakes, birthday cakes, wedding cakes, custom cakes, Tamil Nadu bakery, fresh cakes delivery`,
      openGraph: {
        title: `${productSlug?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} - Serle's Bake | From Our Oven to Your Heart`,
        description: `Discover our delicious ${productSlug?.replace(/-/g, ' ')} cake at Serle's Bake. Fresh homemade cake crafted with care and passion. Perfect for birthdays, weddings, and special celebrations. Fresh cakes delivered in Tenkasi, Tamil Nadu.`,
        type: 'website',
        url: `https://serlesbake.in/cakes/${categorySlug}/${productSlug}`,
        images: ['https://serlesbake.in/img/logo.png'],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${productSlug?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} - Serle's Bake | From Our Oven to Your Heart`,
        description: `Discover our delicious ${productSlug?.replace(/-/g, ' ')} cake at Serle's Bake. Fresh homemade cake crafted with care and passion. Perfect for birthdays, weddings, and special celebrations. Fresh cakes delivered in Tenkasi, Tamil Nadu.`,
        images: ['https://serlesbake.in/img/logo.png'],
      },
      alternates: {
        canonical: `https://serlesbake.in/cakes/${categorySlug}/${productSlug}`,
      },
    };
  }
}

export default function ProductDetailPage({ params }) {
  return (
    <Suspense fallback={<div className="text-center py-5">Loading...</div>}>
      <ProductDetailPageClient params={params} />
    </Suspense>
  );
}
