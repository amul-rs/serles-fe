"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import { getCategoriesUrl, getTagsUrl } from "../config/api";
import Breadcrumb from "../components/Breadcrumb";
import ProductFilters from "../components/ProductFilters";
import ProductCard from "../components/ProductCard";
import ProductTags from "../components/ProductTags";
import PaginationStatus from "../components/PaginationStatus";
import useProductFilters from "../hooks/useProductFilters";
import usePagination from "../hooks/usePagination";
import apiCache from "../utils/cache";

export default function CakesIndexPage() {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [error, setError] = useState(null);

  // Use pagination hook
  const {
    products,
    loading,
    hasMore,
    currentPage,
    totalCount,
    error: paginationError,
    loadNextPage,
    resetPagination,
    lastProductRef,
    loadProducts
  } = usePagination(12);

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

  // Fetch categories and tags only once
  useEffect(() => {
    if (dataFetched) return;

    const fetchData = async () => {
      try {
        setError(null);

        // Use cached API calls for categories and tags
        const [categoriesData, tagsData] = await Promise.all([
          apiCache.fetchWithCache(getCategoriesUrl()),
          apiCache.fetchWithCache(getTagsUrl())
        ]);

        setCategories(Array.isArray(categoriesData?.results) ? categoriesData.results : Array.isArray(categoriesData) ? categoriesData : []);
        setTags(Array.isArray(tagsData?.results) ? tagsData.results : Array.isArray(tagsData) ? tagsData : []);
        setDataFetched(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load categories. Please try again later.");
      }
    };

    fetchData();
  }, [dataFetched]);

  // Meta data - dynamically generated from API with fallback
  const metaData = useMemo(() => {
    const title = "Cakes - Serle's Bake";
    const description = "Explore our delicious collection of cakes. From birthday cakes to wedding cakes, we have something for every occasion.";
    const keywords = "cakes, birthday cakes, wedding cakes, chocolate cakes, vanilla cakes, Serle's Bake";
    
    return {
      title,
      description,
      keywords
    };
  }, []);

  // Handle filter changes - reset pagination when filters change
  const handleFilterChange = useCallback(() => {
    resetPagination();
  }, [resetPagination]);

  // Display products with infinite scrolling
  const displayProducts = filteredProducts.length > 0 ? filteredProducts : products;

  return (
    <>
      <Head>
        <title>{metaData.title}</title>
        <meta name="description" content={metaData.description} />
        <meta name="keywords" content={metaData.keywords} />
        <meta property="og:title" content={metaData.title} />
        <meta property="og:description" content={metaData.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://serlesbake.com/cakes" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaData.title} />
        <meta name="twitter:description" content={metaData.description} />
      </Head>

      {/* Breadcrumb Begin */}
      <Breadcrumb 
        title="Our Cakes" 
        items={[
          { label: "Home", href: "/" },
          { label: "Cakes" }
        ]} 
      />
      {/* Breadcrumb End */}

      {/* Shop Section Begin */}
      <section className="shop spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="shop__sidebar">
                <div className="shop__sidebar__search">
                  <ProductFilters
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    onFilterChange={handleFilterChange}
                  />
                </div>
                <div className="shop__sidebar__accordion">
                  <ProductTags tags={tags} />
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="shop__product__option">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="shop__product__option__left">
                      <p>Showing {displayProducts.length} of {totalCount} results</p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="shop__product__option__right">
                      <p>Sort by:</p>
                      <select 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value)}
                        className="form-select"
                      >
                        <option value="default">Default</option>
                        <option value="a-z">Name: A to Z</option>
                        <option value="z-a">Name: Z to A</option>
                        <option value="price-low-high">Price: Low to High</option>
                        <option value="price-high-low">Price: High to Low</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Pagination Status */}
              <PaginationStatus
                currentPage={currentPage}
                totalCount={totalCount}
                displayedCount={displayProducts.length}
                hasMore={hasMore}
                loading={loading}
                onLoadMore={loadNextPage}
              />
              <div className="row">
                {displayProducts.length > 0 ? (
                  displayProducts.map((product, index) => (
                    <ProductCard 
                      key={`${product.id}-${index}`} 
                      product={product} 
                      isLast={index === displayProducts.length - 1}
                      ref={lastProductRef}
                    />
                  ))
                ) : (
                  <div className="col-12 text-center py-5">
                    <h4>No products found</h4>
                    <p className="text-muted">Try adjusting your filters or search terms.</p>
                  </div>
                )}
              </div>
              
              {/* Loading indicator for initial load */}
              {loading && displayProducts.length === 0 && (
                <div className="row">
                  <div className="col-12 text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading products...</span>
                    </div>
                    <p className="mt-2">Loading products...</p>
                  </div>
                </div>
              )}
              
              {/* Error display */}
              {(error || paginationError) && (
                <div className="row">
                  <div className="col-12 text-center py-4">
                    <div className="alert alert-danger" role="alert">
                      {error || paginationError}
                      <button 
                        className="btn btn-outline-danger ms-3"
                        onClick={() => {
                          setError(null);
                          resetPagination();
                        }}
                      >
                        Try Again
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Shop Section End */}
    </>
  );
}
