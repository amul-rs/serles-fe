'use client';
import { useState, useEffect } from 'react';
import ProductCard from '../../../components/ProductCard';
import { getProductsUrl } from '../../../config/api';
import Link from 'next/link';

export default function CategoryPage({ params }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 30;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const apiUrl = getProductsUrl();
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data && data.results) {
          // Filter products by category
          const categoryProducts = data.results.filter(
            product => product.category?.slug === params.slug
          );
          setProducts(categoryProducts);
        } else {
          throw new Error('Invalid data format received from API');
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [params.slug]);

  // Helper function to extract price from price_range string
  const extractPrice = (priceRange) => {
    if (!priceRange) return 0;
    
    // Handle single price like "₹1.00" or "$1.00"
    if ((priceRange.includes('₹') || priceRange.includes('$')) && !priceRange.includes('-')) {
      const match = priceRange.match(/[₹$]([\d,]+(?:\.\d{2})?)/);
      return match ? parseFloat(match[1].replace(',', '')) : 0;
    }
    
    // Handle price range like "₹999.00 - ₹2000.00" or "$999.00 - $2000.00"
    const match = priceRange.match(/[₹$]([\d,]+(?:\.\d{2})?)/);
    return match ? parseFloat(match[1].replace(',', '')) : 0;
  };

  // Sorting function
  const sortProducts = (productsToSort) => {
    const sortedProducts = [...productsToSort];
    
    switch (sortBy) {
      case 'price-low-high':
        return sortedProducts.sort((a, b) => {
          const priceA = extractPrice(a.price_range);
          const priceB = extractPrice(b.price_range);
          return priceA - priceB;
        });
      
      case 'price-high-low':
        return sortedProducts.sort((a, b) => {
          const priceA = extractPrice(a.price_range);
          const priceB = extractPrice(b.price_range);
          return priceB - priceA;
        });
      
      case 'weight-low-high':
        // Since weight_options don't exist in current API, sort by name for now
        return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      
      case 'weight-high-low':
        // Since weight_options don't exist in current API, sort by name reverse for now
        return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
      
      case 'name-a-z':
        return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      
      case 'name-z-a':
        return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
      
      default:
        return sortedProducts;
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.short_description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const sortedAndFilteredProducts = sortProducts(filteredProducts);

  // Pagination logic
  const totalPages = Math.ceil(sortedAndFilteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = sortedAndFilteredProducts.slice(startIndex, endIndex);

  const categoryName = products[0]?.category?.name || params.slug;

  const clearFilters = () => {
    setSearchTerm('');
    setSortBy('default');
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const generatePaginationNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <>
      {/* Breadcrumb Begin */}
      <div className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="breadcrumb__text">
                <h2>{categoryName}</h2>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="breadcrumb__links">
                <Link href="/">Home</Link>
                <Link href="/shop">Shop</Link>
                <span>{categoryName}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Breadcrumb End */}

      {/* Shop Section Begin */}
      <section className="shop spad">
        <div className="container">
          <div className="shop__option">
            <div className="row">
              <div className="col-lg-7 col-md-7">
                <div className="shop__option__search">
                  <form onSubmit={(e) => e.preventDefault()}>
                    <input 
                      type="text" 
                      placeholder={`Search in ${categoryName}`}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit"><i className="fa fa-search"></i></button>
                  </form>
                </div>
              </div>
              <div className="col-lg-5 col-md-5">
                <div className="shop__option__right">
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="default">Default sorting</option>
                    <option value="name-a-z">Name: A to Z</option>
                    <option value="name-z-a">Name: Z to A</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="weight-low-high">Weight: Low to High</option>
                    <option value="weight-high-low">Weight: High to Low</option>
                  </select>
                  <a href="#"><i className="fa fa-list"></i></a>
                  <a href="#"><i className="fa fa-reorder"></i></a>
                </div>
              </div>
            </div>
          </div>

          {/* Clear Filters */}
          {(searchTerm || sortBy !== 'default') && (
            <div className="filter-section" style={{ marginBottom: '30px' }}>
              <div className="row">
                <div className="col-lg-12">
                  <div className="clear-filters" style={{ marginTop: '15px' }}>
                    <button 
                      onClick={clearFilters}
                      style={{
                        padding: '8px 15px',
                        backgroundColor: '#667eea',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                      }}
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {loading ? (
            <div className="text-center" style={{ padding: '50px 0' }}>
              <div className="loader" style={{ margin: '0 auto' }}></div>
              <p style={{ marginTop: '20px' }}>Loading products...</p>
            </div>
          ) : error ? (
            <div className="text-center" style={{ padding: '50px 0' }}>
              <p style={{ color: '#dc3545', fontSize: '18px' }}>{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                style={{
                  marginTop: '20px',
                  padding: '10px 20px',
                  backgroundColor: '#667eea',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="row">
              {currentProducts.length > 0 ? (
                currentProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-12 text-center" style={{ padding: '50px 0' }}>
                  <p>No products found in this category.</p>
                </div>
              )}
            </div>
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="shop__last__option">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="shop__pagination">
                    {currentPage > 1 && (
                      <a 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(currentPage - 1);
                        }}
                      >
                        <span className="arrow_carrot-left"></span>
                      </a>
                    )}
                    
                    {generatePaginationNumbers().map((page, index) => (
                      <span key={index}>
                        {page === '...' ? (
                          <span style={{ padding: '0 10px' }}>...</span>
                        ) : (
                          <a 
                            href="#"
                            className={page === currentPage ? 'active' : ''}
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(page);
                            }}
                          >
                            {page}
                          </a>
                        )}
                      </span>
                    ))}
                    
                    {currentPage < totalPages && (
                      <a 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(currentPage + 1);
                        }}
                      >
                        <span className="arrow_carrot-right"></span>
                      </a>
                    )}
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="shop__last__text">
                    <p>Showing {startIndex + 1}-{Math.min(endIndex, sortedAndFilteredProducts.length)} of {sortedAndFilteredProducts.length} results (Page {currentPage} of {totalPages})</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      {/* Shop Section End */}
    </>
  );
} 