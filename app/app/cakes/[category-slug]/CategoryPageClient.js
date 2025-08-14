"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { getCategoriesUrl, getTagsUrl } from "../../config/api";
import Breadcrumb from "../../components/Breadcrumb";
import ProductFilters from "../../components/ProductFilters";
import ProductCard from "../../components/ProductCard";
import ProductTags from "../../components/ProductTags";
import PaginationStatus from "../../components/PaginationStatus";
import useProductFilters from "../../hooks/useProductFilters";
import usePagination from "../../hooks/usePagination";
import apiCache from "../../utils/cache";

export default function CategoryPageClient({ params }) {
  const categorySlug = params.categorySlug ?? params["category-slug"];
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [error, setError] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);

  // Use pagination hook with category filtering
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
    if (newCategory && newCategory !== categorySlug) {
      router.push(`/cakes/${newCategory}`);
    }
  }, [categorySlug, router]);

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

        const allCategories = Array.isArray(categoriesData?.results) ? categoriesData.results : Array.isArray(categoriesData) ? categoriesData : [];
        const allTags = Array.isArray(tagsData?.results) ? tagsData.results : Array.isArray(tagsData) ? tagsData : [];

        // Find current category
        const foundCategory = allCategories.find(c => c.slug === categorySlug);
        if (!foundCategory) {
          notFound();
        }

        setCategories(allCategories);
        setTags(allTags);
        setCurrentCategory(foundCategory);
        setSelectedCategory(categorySlug);
        setDataFetched(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load category data. Please try again later.");
      }
    };

    fetchData();
  }, [categorySlug, dataFetched, setSelectedCategory]);

  // Filter products by category when products change
  useEffect(() => {
    if (products.length > 0 && categorySlug) {
      const categoryProducts = products.filter(p => p.category?.slug === categorySlug);
      // The filtering is handled by useProductFilters hook
    }
  }, [products, categorySlug]);

  // Handle filter changes - reset pagination when filters change
  const handleFilterChange = useCallback(() => {
    resetPagination();
  }, [resetPagination]);

  if (loading && products.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
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
    );
  }

  if (!currentCategory) {
    return <div className="text-center py-5">Category not found</div>;
  }

  // Display products with infinite scrolling
  const displayProducts = filteredProducts.length > 0 ? filteredProducts : products.filter(p => p.category?.slug === categorySlug);

  return (
    <>
      {/* Breadcrumb Begin */}
      <Breadcrumb 
        title={currentCategory.name} 
        items={[
          { label: "Home", href: "/" },
          { label: "Cakes", href: "/cakes" },
          { label: currentCategory.name }
        ]} 
      />
      {/* Breadcrumb End */}

      {/* Shop Section Begin */}
      <section className="shop spad">
        <div className="container">
          <div className="row">
            <div className="col-12">
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
                      <p>Showing {displayProducts.length} of {totalCount} results in {currentCategory.name}</p>
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
                    <h4>No products found in {currentCategory.name}</h4>
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