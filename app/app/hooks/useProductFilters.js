import { useState, useEffect, useCallback, useMemo } from "react";

export default function useProductFilters(products = [], onCategoryChange = null) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [isFiltering, setIsFiltering] = useState(false);

  // Memoize the filtering function to prevent unnecessary re-renders
  const filterProducts = useCallback((products, category, search, sort) => {
    let filtered = [...products];

    // Filter by category
    if (category) {
      filtered = filtered.filter(product => 
        product.category?.slug === category
      );
    }

    // Filter by search term
    if (search) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category?.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort products
    switch (sort) {
      case "a-z":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "z-a":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-low-high":
        filtered.sort((a, b) => {
          const priceA = parseFloat(a.price_range?.replace(/[^\d.]/g, '') || '0');
          const priceB = parseFloat(b.price_range?.replace(/[^\d.]/g, '') || '0');
          return priceA - priceB;
        });
        break;
      case "price-high-low":
        filtered.sort((a, b) => {
          const priceA = parseFloat(a.price_range?.replace(/[^\d.]/g, '') || '0');
          const priceB = parseFloat(b.price_range?.replace(/[^\d.]/g, '') || '0');
          return priceB - priceA;
        });
        break;
      default:
        // Keep original order
        break;
    }

    return filtered;
  }, []);

  // Debounced filtering function
  const debouncedFilter = useCallback(
    (products, category, search, sort) => {
      let timeoutId;
      return new Promise((resolve) => {
        clearTimeout(timeoutId);
        setIsFiltering(true);

        timeoutId = setTimeout(() => {
          const filtered = filterProducts(products, category, search, sort);
          setFilteredProducts(filtered);
          setIsFiltering(false);
          resolve(filtered);
        }, 300); // 300ms debounce delay
      });
    },
    [filterProducts]
  );

  // Memoize the effect dependencies to prevent unnecessary re-runs
  const effectDependencies = useMemo(() => ({
    products,
    selectedCategory,
    searchTerm,
    sortBy
  }), [products, selectedCategory, searchTerm, sortBy]);

  useEffect(() => {
    const runFilter = async () => {
      await debouncedFilter(
        effectDependencies.products,
        effectDependencies.selectedCategory,
        effectDependencies.searchTerm,
        effectDependencies.sortBy
      );
    };
    
    runFilter();
  }, [effectDependencies, debouncedFilter]);

  // Handle category change with callback
  const handleCategoryChange = useCallback((newCategory) => {
    setSelectedCategory(newCategory);
    if (onCategoryChange && newCategory) {
      onCategoryChange(newCategory);
    }
  }, [onCategoryChange]);

  return {
    filteredProducts,
    selectedCategory,
    setSelectedCategory: handleCategoryChange,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    isFiltering
  };
} 