"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import Head from "next/head";
import Breadcrumb from "../../../components/Breadcrumb";
import ProductFilters from "../../../components/ProductFilters";
import ProductCard from "../../../components/ProductCard";
import ProductTags from "../../../components/ProductTags";
import useProductFilters from "../../../hooks/useProductFilters";
import apiCache from "../../../utils/cache";
import { getProductsUrl, getCategoriesUrl, getTagsUrl } from "../../../config/api";

export default function TagPage({ params }) {
  const router = useRouter();
  const tagSlug = params["tag-slug"];
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);

  // Filter products by tag
  const filterProductsByTag = useCallback((products, tagSlug) => {
    if (!tagSlug || !products.length) return products;
    
    return products.filter(product => {
      if (!product.tags || !Array.isArray(product.tags)) return false;
      return product.tags.some(tag => tag.slug === tagSlug);
    });
  }, []);

  // Fetch data
  const fetchData = useCallback(async () => {
    if (dataFetched) return;
    
    try {
      setLoading(true);
      setError(null);

      // Fetch all data in parallel
      const [categoriesData, productsData, tagsData] = await Promise.all([
        apiCache.fetchWithCache(getCategoriesUrl()),
        apiCache.fetchWithCache(getProductsUrl()),
        apiCache.fetchWithCache(getTagsUrl())
      ]);

      // Filter products by tag
      const filteredProducts = filterProductsByTag(productsData.results || productsData, tagSlug);

      setCategories(categoriesData.results || categoriesData);
      setProducts(filteredProducts);
      setTags(tagsData.results || tagsData);
      setDataFetched(true);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [tagSlug, filterProductsByTag, dataFetched]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle category change
  const handleCategoryChange = useCallback((newCategory) => {
    if (newCategory) {
      router.push(`/cakes/${newCategory}`);
    }
  }, [router]);

  // Use product filters hook
  const {
    filteredProducts,
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    isFiltering
  } = useProductFilters(products, handleCategoryChange);

  // Get current tag name
  const currentTag = tags.find(tag => tag.slug === tagSlug);

  // Breadcrumb items
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Cakes", href: "/cakes" },
    { name: "Tags", href: "/cakes/tags" },
    { name: currentTag?.name || tagSlug, href: `/cakes/tags/${tagSlug}` }
  ];

  // Meta data - dynamically generated from API with fallback
  const metaData = useMemo(() => ({
    title: currentTag 
      ? `${currentTag.name} Cakes - Serle's Bake | From Our Oven to Your Heart`
      : `${tagSlug?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Cakes - Serle's Bake | From Our Oven to Your Heart`,
    description: currentTag 
      ? `${currentTag.description || `Discover our collection of ${currentTag.name} cakes at Serle's Bake. From Black Forest to Red Velvet, Choco Truffle to Custom Cakes, find the perfect cake for your celebration. Fresh cakes delivered in Tenkasi, Tamil Nadu.`}`
      : `Discover our collection of ${tagSlug?.replace(/-/g, ' ')} cakes at Serle's Bake. From Black Forest to Red Velvet, Choco Truffle to Custom Cakes, find the perfect cake for your celebration. Fresh cakes delivered in Tenkasi, Tamil Nadu.`,
    keywords: currentTag 
      ? `homemade cakes, ${currentTag.name.toLowerCase()} cakes, Serle's Bake, Tenkasi cakes, ${currentTag.name.toLowerCase()}, tagged cakes, birthday cakes, wedding cakes, custom cakes, Tamil Nadu bakery, fresh cakes delivery${currentTag.related_tags ? `, ${currentTag.related_tags.join(', ')}` : ''}`
      : `homemade cakes, ${tagSlug?.replace(/-/g, ' ')} cakes, Serle's Bake, Tenkasi cakes, tagged cakes, birthday cakes, wedding cakes, custom cakes, Tamil Nadu bakery, fresh cakes delivery`,
    ogTitle: currentTag 
      ? `${currentTag.name} Cakes - Serle's Bake | From Our Oven to Your Heart`
      : `${tagSlug?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Cakes - Serle's Bake | From Our Oven to Your Heart`,
    ogDescription: currentTag 
      ? `${currentTag.description || `Discover our collection of ${currentTag.name} cakes at Serle's Bake. From Black Forest to Red Velvet, Choco Truffle to Custom Cakes, find the perfect cake for your celebration. Fresh cakes delivered in Tenkasi, Tamil Nadu.`}`
      : `Discover our collection of ${tagSlug?.replace(/-/g, ' ')} cakes at Serle's Bake. From Black Forest to Red Velvet, Choco Truffle to Custom Cakes, find the perfect cake for your celebration. Fresh cakes delivered in Tenkasi, Tamil Nadu.`,
    ogType: "website",
    ogUrl: `https://serlesbake.in/cakes/tags/${tagSlug}`,
    ogImage: currentTag?.image?.url || "https://serlesbake.in/img/logo.png",
    twitterCard: "summary_large_image",
    twitterTitle: currentTag 
      ? `${currentTag.name} Cakes - Serle's Bake | From Our Oven to Your Heart`
      : `${tagSlug?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Cakes - Serle's Bake | From Our Oven to Your Heart`,
    twitterDescription: currentTag 
      ? `${currentTag.description || `Discover our collection of ${currentTag.name} cakes at Serle's Bake. From Black Forest to Red Velvet, Choco Truffle to Custom Cakes, find the perfect cake for your celebration. Fresh cakes delivered in Tenkasi, Tamil Nadu.`}`
      : `Discover our collection of ${tagSlug?.replace(/-/g, ' ')} cakes at Serle's Bake. From Black Forest to Red Velvet, Choco Truffle to Custom Cakes, find the perfect cake for your celebration. Fresh cakes delivered in Tenkasi, Tamil Nadu.`,
    twitterImage: currentTag?.image?.url || "https://serlesbake.in/img/logo.png",
    canonical: `https://serlesbake.in/cakes/tags/${tagSlug}`
  }), [currentTag, tagSlug]);

  if (loading) {
    return (
      <>
        <Head>
          <title>{metaData.title}</title>
          <meta name="description" content={metaData.description} />
          <meta name="keywords" content={metaData.keywords} />
          <meta property="og:title" content={metaData.ogTitle} />
          <meta property="og:description" content={metaData.ogDescription} />
          <meta property="og:url" content={metaData.ogUrl} />
          <meta name="twitter:title" content={metaData.twitterTitle} />
          <meta name="twitter:description" content={metaData.twitterDescription} />
        </Head>
        <div className="container mt-5">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Head>
          <title>Error - Serles Bake</title>
        </Head>
        <div className="container mt-5">
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Error Loading Products</h4>
            <p>{error}</p>
            <hr />
            <p className="mb-0">
              <button 
                className="btn btn-primary" 
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{metaData.title}</title>
        <meta name="description" content={metaData.description} />
        <meta name="keywords" content={metaData.keywords} />
        <link rel="canonical" href={metaData.canonical} />
        <meta property="og:title" content={metaData.ogTitle} />
        <meta property="og:description" content={metaData.ogDescription} />
        <meta property="og:type" content={metaData.ogType} />
        <meta property="og:url" content={metaData.ogUrl} />
        <meta property="og:image" content={metaData.ogImage} />
        <meta name="twitter:card" content={metaData.twitterCard} />
        <meta name="twitter:title" content={metaData.twitterTitle} />
        <meta name="twitter:description" content={metaData.twitterDescription} />
        <meta name="twitter:image" content={metaData.twitterImage} />
      </Head>

      <div className="container mt-5">
        <Breadcrumb 
          title={currentTag ? `${currentTag.name} Cakes` : "Tagged Cakes"}
          items={breadcrumbItems}
        />

        <div className="row">
          <div className="col-lg-12">
            <div className="shop__option">
              <ProductFilters
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                sortBy={sortBy}
                setSortBy={setSortBy}
                isFiltering={isFiltering}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="shop__product__option">
              <div className="row">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                ) : (
                  <div className="col-12">
                    <div className="text-center py-5">
                      <h4>No products found</h4>
                      <p className="text-muted">
                        {searchTerm 
                          ? `No products found matching "${searchTerm}" in this tag.`
                          : `No products found for the tag "${currentTag?.name || tagSlug}".`
                        }
                      </p>
                      <button 
                        className="btn btn-primary"
                        onClick={() => {
                          setSearchTerm("");
                          setSelectedCategory("");
                          setSortBy("default");
                        }}
                      >
                        Clear Filters
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tags section hidden for now */}
        {/* {tags.length > 0 && (
          <div className="row mt-5">
            <div className="col-lg-12">
              <h5>All Tags</h5>
              <ProductTags tags={tags} maxTags={20} />
            </div>
          </div>
        )} */}
      </div>
    </>
  );
} 