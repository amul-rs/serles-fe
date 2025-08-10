import { Suspense } from "react";
import { getProductsUrl, getCategoriesUrl, getTagsUrl } from "../../config/api";
import CategoryPageClient from "./CategoryPageClient";
import apiCache from "../../utils/cache";

// Generate metadata for the category page
export async function generateMetadata({ params }) {
  // Await params in Next.js 15
  const resolvedParams = await params;
  const categorySlug = resolvedParams["category-slug"];
  
  try {
    // Fetch data for metadata
    const [categoriesData, productsData, tagsData] = await Promise.all([
      apiCache.fetchWithCache(getCategoriesUrl()),
      apiCache.fetchWithCache(getProductsUrl()),
      apiCache.fetchWithCache(getTagsUrl())
    ]);

    const allCategories = Array.isArray(categoriesData?.results) ? categoriesData.results : Array.isArray(categoriesData) ? categoriesData : [];
    const allProducts = Array.isArray(productsData?.results) ? productsData.results : Array.isArray(productsData) ? productsData : [];
    const allTags = Array.isArray(tagsData?.results) ? tagsData.results : Array.isArray(tagsData) ? tagsData : [];

    // Find current category
    const currentCategory = allCategories.find(c => c.slug === categorySlug);
    
    if (!currentCategory) {
      return {
        title: `${categorySlug?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Cakes - Serle's Bake | From Our Oven to Your Heart`,
        description: `Discover our collection of ${categorySlug?.replace(/-/g, ' ')} cakes at Serle's Bake. From Black Forest to Red Velvet, Choco Truffle to Custom Cakes, find the perfect cake for your celebration. Fresh cakes delivered in Tenkasi, Tamil Nadu.`,
        keywords: `homemade cakes, ${categorySlug?.replace(/-/g, ' ')} cakes, Serle's Bake, Tenkasi cakes, birthday cakes, wedding cakes, custom cakes, Tamil Nadu bakery, fresh cakes delivery`,
        openGraph: {
          title: `${categorySlug?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Cakes - Serle's Bake | From Our Oven to Your Heart`,
          description: `Discover our collection of ${categorySlug?.replace(/-/g, ' ')} cakes at Serle's Bake. From Black Forest to Red Velvet, Choco Truffle to Custom Cakes, find the perfect cake for your celebration. Fresh cakes delivered in Tenkasi, Tamil Nadu.`,
          type: 'website',
          url: `https://serlesbake.in/cakes/${categorySlug}`,
          images: ['https://serlesbake.in/img/logo.png'],
        },
        twitter: {
          card: 'summary_large_image',
          title: `${categorySlug?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Cakes - Serle's Bake | From Our Oven to Your Heart`,
          description: `Discover our collection of ${categorySlug?.replace(/-/g, ' ')} cakes at Serle's Bake. From Black Forest to Red Velvet, Choco Truffle to Custom Cakes, find the perfect cake for your celebration. Fresh cakes delivered in Tenkasi, Tamil Nadu.`,
          images: ['https://serlesbake.in/img/logo.png'],
        },
        alternates: {
          canonical: `https://serlesbake.in/cakes/${categorySlug}`,
        },
      };
    }

    return {
      title: `${currentCategory.name} Cakes - Serle's Bake | From Our Oven to Your Heart`,
      description: currentCategory.description || `Discover our collection of ${currentCategory.name} cakes at Serle's Bake. From Black Forest to Red Velvet, Choco Truffle to Custom Cakes, find the perfect ${currentCategory.name.toLowerCase()} cake for your celebration. Fresh cakes delivered in Tenkasi, Tamil Nadu.`,
      keywords: `homemade cakes, ${currentCategory.name.toLowerCase()} cakes, Serle's Bake, Tenkasi cakes, ${currentCategory.name.toLowerCase()}, birthday cakes, wedding cakes, custom cakes, Tamil Nadu bakery, fresh cakes delivery${currentCategory.tags ? `, ${currentCategory.tags.join(', ')}` : ''}`,
      openGraph: {
        title: `${currentCategory.name} Cakes - Serle's Bake | From Our Oven to Your Heart`,
        description: currentCategory.description || `Discover our collection of ${currentCategory.name} cakes at Serle's Bake. From Black Forest to Red Velvet, Choco Truffle to Custom Cakes, find the perfect ${currentCategory.name.toLowerCase()} cake for your celebration. Fresh cakes delivered in Tenkasi, Tamil Nadu.`,
        type: 'website',
        url: `https://serlesbake.in/cakes/${categorySlug}`,
        images: [currentCategory.image?.url || 'https://serlesbake.in/img/logo.png'],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${currentCategory.name} Cakes - Serle's Bake | From Our Oven to Your Heart`,
        description: currentCategory.description || `Discover our collection of ${currentCategory.name} cakes at Serle's Bake. From Black Forest to Red Velvet, Choco Truffle to Custom Cakes, find the perfect ${currentCategory.name.toLowerCase()} cake for your celebration. Fresh cakes delivered in Tenkasi, Tamil Nadu.`,
        images: [currentCategory.image?.url || 'https://serlesbake.in/img/logo.png'],
      },
      alternates: {
        canonical: `https://serlesbake.in/cakes/${categorySlug}`,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: `${categorySlug?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Cakes - Serle's Bake | From Our Oven to Your Heart`,
      description: `Discover our collection of ${categorySlug?.replace(/-/g, ' ')} cakes at Serle's Bake. From Black Forest to Red Velvet, Choco Truffle to Custom Cakes, find the perfect cake for your celebration. Fresh cakes delivered in Tenkasi, Tamil Nadu.`,
      keywords: `homemade cakes, ${categorySlug?.replace(/-/g, ' ')} cakes, Serle's Bake, Tenkasi cakes, birthday cakes, wedding cakes, custom cakes, Tamil Nadu bakery, fresh cakes delivery`,
      openGraph: {
        title: `${categorySlug?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Cakes - Serle's Bake | From Our Oven to Your Heart`,
        description: `Discover our collection of ${categorySlug?.replace(/-/g, ' ')} cakes at Serle's Bake. From Black Forest to Red Velvet, Choco Truffle to Custom Cakes, find the perfect cake for your celebration. Fresh cakes delivered in Tenkasi, Tamil Nadu.`,
        type: 'website',
        url: `https://serlesbake.in/cakes/${categorySlug}`,
        images: ['https://serlesbake.in/img/logo.png'],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${categorySlug?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Cakes - Serle's Bake | From Our Oven to Your Heart`,
        description: `Discover our collection of ${categorySlug?.replace(/-/g, ' ')} cakes at Serle's Bake. From Black Forest to Red Velvet, Choco Truffle to Custom Cakes, find the perfect cake for your celebration. Fresh cakes delivered in Tenkasi, Tamil Nadu.`,
        images: ['https://serlesbake.in/img/logo.png'],
      },
      alternates: {
        canonical: `https://serlesbake.in/cakes/${categorySlug}`,
      },
    };
  }
}

export default async function CategoryPage({ params }) {
  // Await params in Next.js 15
  const resolvedParams = await params;
  
  return (
    <Suspense fallback={<div className="text-center py-5">Loading...</div>}>
      <CategoryPageClient params={resolvedParams} />
    </Suspense>
  );
}
