"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import { getCategoriesUrl, getProductsUrl, getTagsUrl } from "../config/api";
import Breadcrumb from "../components/Breadcrumb";
import ProductFilters from "../components/ProductFilters";
import ProductCard from "../components/ProductCard";
import ProductTags from "../components/ProductTags";
import useProductFilters from "../hooks/useProductFilters";
import apiCache from "../utils/cache";

export default function CakesIndexPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);
  const [error, setError] = useState(null);

  // Memoized callback for category change
  const handleCategoryChange = useCallback((newCategory) => {
    // This will be handled by the filter hook
  }, []);

  // Use the product filters hook
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

  // Fetch data only once with caching
  useEffect(() => {
    if (dataFetched) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use cached API calls
        const [categoriesData, productsData, tagsData] = await Promise.all([
          apiCache.fetchWithCache(getCategoriesUrl()),
          apiCache.fetchWithCache(getProductsUrl()),
          apiCache.fetchWithCache(getTagsUrl())
        ]);

        setCategories(Array.isArray(categoriesData?.results) ? categoriesData.results : Array.isArray(categoriesData) ? categoriesData : []);
        setProducts(Array.isArray(productsData?.results) ? productsData.results : Array.isArray(productsData) ? productsData : []);
        setTags(Array.isArray(tagsData?.results) ? tagsData.results : Array.isArray(tagsData) ? tagsData : []);
        setDataFetched(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dataFetched]);

  // Meta data - dynamically generated from API with fallback
  const metaData = useMemo(() => ({
    title: "Cakes in Tenkasi | Birthday, Custom & Photo Cakes Near Me – Serle’s Bake",
    description: categories.length > 0 
      ? `Explore our premium collection of homemade cakes at Serle's Bake. From ${categories.slice(0, 3).map(c => c.name).join(', ')} and more, find the perfect cake for your celebration. Fresh cakes delivered in Tenkasi, Tamil Nadu.`
      : "Explore our premium collection of homemade cakes at Serle's Bake. From Black Forest to Red Velvet, Choco Truffle to Custom Cakes, find the perfect cake for your celebration. Fresh cakes delivered in Tenkasi, Tamil Nadu.",
    keywords: categories.length > 0 
      ? `homemade cakes, Serle's Bake, Tenkasi cakes, ${categories.map(c => c.name.toLowerCase()).join(', ')}, birthday cakes, wedding cakes, custom cakes, Tamil Nadu bakery, fresh cakes delivery`
      : "homemade cakes, Serle's Bake, Tenkasi cakes, Black Forest cake, Red Velvet cake, Choco Truffle cake, custom cakes, birthday cakes, wedding cakes, brownies, Tamil Nadu bakery, fresh cakes delivery",
    ogTitle: "Cakes in Tenkasi | Birthday, Custom & Photo Cakes Near Me – Serle’s Bake",
    ogDescription: categories.length > 0 
      ? `Explore our premium collection of homemade cakes at Serle's Bake. From ${categories.slice(0, 3).map(c => c.name).join(', ')} and more, find the perfect cake for your celebration. Fresh cakes delivered in Tenkasi, Tamil Nadu.`
      : "Explore our premium collection of homemade cakes at Serle's Bake. From Black Forest to Red Velvet, Choco Truffle to Custom Cakes, find the perfect cake for your celebration. Fresh cakes delivered in Tenkasi, Tamil Nadu.",
    ogType: "website",
    ogUrl: "https://www.serlesbake.in/cakes",
    ogImage: "https://www.serlesbake.in/img/logo.png",
    twitterCard: "summary_large_image",
    twitterTitle: "Cakes in Tenkasi | Birthday, Custom & Photo Cakes Near Me – Serle’s Bake",
    twitterDescription: categories.length > 0 
      ? `Explore our premium collection of homemade cakes at Serle's Bake. From ${categories.slice(0, 3).map(c => c.name).join(', ')} and more, find the perfect cake for your celebration. Fresh cakes delivered in Tenkasi, Tamil Nadu.`
      : "Explore our premium collection of homemade cakes at Serle's Bake. From Black Forest to Red Velvet, Choco Truffle to Custom Cakes, find the perfect cake for your celebration. Fresh cakes delivered in Tenkasi, Tamil Nadu.",
    twitterImage: "https://www.serlesbake.in/img/logo.png",
    canonical: "https://www.serlesbake.in/cakes"
  }), [categories]);

  if (loading) {
    return (
      <>
        <Head>
          <title>{metaData.title}</title>
          <meta name="description" content={metaData.description} />
          <meta name="keywords" content={metaData.keywords} />
          <meta property="og:title" content={metaData.ogTitle} />
          <meta property="og:description" content={metaData.ogDescription} />
          <meta property="og:type" content="website" />
          <meta property="og:image" content={metaData.ogImage} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={metaData.ogTitle} />
          <meta name="twitter:description" content={metaData.ogDescription} />
          <meta name="twitter:image" content={metaData.ogImage} />
        </Head>
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Head>
          <title>{metaData.title}</title>
          <meta name="description" content={metaData.description} />
          <meta name="keywords" content={metaData.keywords} />
          <meta property="og:title" content={metaData.ogTitle} />
          <meta property="og:description" content={metaData.ogDescription} />
          <meta property="og:type" content="website" />
          <meta property="og:image" content={metaData.ogImage} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={metaData.ogTitle} />
          <meta name="twitter:description" content={metaData.ogDescription} />
          <meta name="twitter:image" content={metaData.ogImage} />
        </Head>
        <div className="text-center py-5">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
          <button 
            className="btn btn-primary mt-3" 
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
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

      {/* Breadcrumb Begin */}
      <Breadcrumb 
        title="Our Cakes" 
        items={[
          { label: "Cakes" }
        ]} 
      />
      {/* Breadcrumb End */}

      {/* Shop Section Begin */}
      <section className="shop spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/* Product Filters */}
              <ProductFilters
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                sortBy={sortBy}
                setSortBy={setSortBy}
                isLoading={loading}
              />

              {/* Product Tags - Hidden for now */}
              {/* <ProductTags tags={tags} maxTags={10} />
              
              <View All Tags Link - Hidden for now />
              {tags.length > 0 && (
                <div className="row mb-4">
                  <div className="col-12 text-center">
                    <Link href="/cakes/tags" className="btn btn-outline-primary">
                      View All Tags
                    </Link>
                  </div>
                </div>
              )} */}

              {/* Products Grid */}
              <div className="row">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                ) : (
                  <div className="col-12 text-center py-5">
                    <h4>No products found</h4>
                    <p className="text-muted">
                      {searchTerm || selectedCategory 
                        ? "Try adjusting your search or filter criteria."
                        : "No products available at the moment."
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Shop Section End */}
    </>
  );
}
