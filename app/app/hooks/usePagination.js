import { useState, useEffect, useCallback, useRef } from 'react';
import { getProductsUrl } from '../config/api';
import apiCache from '../utils/cache';

export default function usePagination(initialPageSize = 12) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState(null);
  const observerRef = useRef();

  // Load products for a specific page
  const loadProducts = useCallback(async (page, pageSize = initialPageSize) => {
    try {
      setLoading(true);
      setError(null);
      
      const url = getProductsUrl(page, pageSize);
      const data = await apiCache.fetchWithCache(url);
      
      const newProducts = Array.isArray(data?.results) ? data.results : Array.isArray(data) ? data : [];
      const total = data?.count || 0;
      
      if (page === 1) {
        setProducts(newProducts);
      } else {
        setProducts(prev => [...prev, ...newProducts]);
      }
      
      setTotalCount(total);
      setCurrentPage(page);
      setHasMore(newProducts.length === pageSize && products.length + newProducts.length < total);
      
    } catch (err) {
      console.error('Error loading products:', err);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [initialPageSize, products.length]);

  // Load next page
  const loadNextPage = useCallback(() => {
    if (!loading && hasMore) {
      loadProducts(currentPage + 1);
    }
  }, [loading, hasMore, currentPage, loadProducts]);

  // Reset pagination
  const resetPagination = useCallback(() => {
    setProducts([]);
    setCurrentPage(1);
    setHasMore(true);
    setError(null);
    loadProducts(1);
  }, [loadProducts]);

  // Intersection Observer for infinite scrolling
  const lastProductRef = useCallback(node => {
    if (loading) return;
    
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadNextPage();
      }
    });
    
    if (node) {
      observerRef.current.observe(node);
    }
  }, [loading, hasMore, loadNextPage]);

  // Initial load
  useEffect(() => {
    loadProducts(1);
  }, []);

  return {
    products,
    loading,
    hasMore,
    currentPage,
    totalCount,
    error,
    loadNextPage,
    resetPagination,
    lastProductRef,
    loadProducts
  };
} 