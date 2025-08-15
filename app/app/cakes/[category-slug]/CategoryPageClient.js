"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { getProductsUrl, getCategoriesUrl, getTagsUrl } from "../../config/api";
import Breadcrumb from "../../components/Breadcrumb";
import ProductFilters from "../../components/ProductFilters";
import ProductCard from "../../components/ProductCard";
import ProductTags from "../../components/ProductTags";
import useProductFilters from "../../hooks/useProductFilters";
import apiCache from "../../utils/cache";

export default function CategoryPageClient({ params }) {
  const categorySlug = params.categorySlug ?? params["category-slug"];
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);
  const [error, setError] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);

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

        const allCategories = Array.isArray(categoriesData?.results) ? categoriesData.results : Array.isArray(categoriesData) ? categoriesData : [];
        const allProducts = Array.isArray(productsData?.results) ? productsData.results : Array.isArray(productsData) ? productsData : [];
        const allTags = Array.isArray(tagsData?.results) ? tagsData.results : Array.isArray(tagsData) ? tagsData : [];

        // Find current category
        const foundCategory = allCategories.find(c => c.slug === categorySlug);
        if (!foundCategory) {
          notFound();
        }

        // Filter products by category
        const categoryProducts = allProducts.filter(p => p.category?.slug === categorySlug);

        setCategories(allCategories);
        setProducts(categoryProducts);
        setTags(allTags);
        setCurrentCategory(foundCategory);
        setSelectedCategory(categorySlug);
        setDataFetched(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load category products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categorySlug, dataFetched, setSelectedCategory]);

  if (loading) {
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

  return (
    <>
      {/* Breadcrumb Begin */}
      <Breadcrumb 
        title={currentCategory?.name || "Category"} 
        items={[
          { label: "Cakes", href: "/cakes" },
          { label: currentCategory?.name || "Category" }
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
                onCategoryChange={handleCategoryChange}
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
                      {searchTerm 
                        ? "Try adjusting your search criteria."
                        : `No ${currentCategory?.name?.toLowerCase() || 'products'} available at the moment.`
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