import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./ProductFilters.module.scss";

export default function ProductFilters({ 
  categories = [], 
  selectedCategory, 
  setSelectedCategory, 
  searchTerm, 
  setSearchTerm, 
  sortBy, 
  setSortBy,
  isLoading = false,
  onCategoryChange = null
}) {
  const [isFiltering, setIsFiltering] = useState(false);
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled by parent component
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setIsFiltering(true);
    setSelectedCategory(newCategory);
    
    // Navigate to category page if category is selected, or to main cakes page if "All Categories"
    if (onCategoryChange) {
      if (newCategory) {
        // Navigate to specific category
        onCategoryChange(newCategory);
      } else {
        // Navigate to main cakes page for "All Categories"
        router.push('/cakes');
      }
    }
    
    // Reset filtering state after a short delay
    setTimeout(() => setIsFiltering(false), 300);
  };

  const handleSearchChange = (e) => {
    setIsFiltering(true);
    setSearchTerm(e.target.value);
    // Reset filtering state after a short delay
    setTimeout(() => setIsFiltering(false), 300);
  };

  const handleSortChange = (e) => {
    setIsFiltering(true);
    setSortBy(e.target.value);
    // Reset filtering state after a short delay
    setTimeout(() => setIsFiltering(false), 300);
  };

  return (
    <div className="shop__option">
      <div className="row">
        <div className="col-lg-7 col-md-7">
          <div className="shop__option__search">
            <form onSubmit={handleSearch}>
              <select 
                value={selectedCategory} 
                onChange={handleCategoryChange}
                disabled={isLoading}
                className={`nice-select ${isFiltering ? styles.filtering : ""}`}
                style={{
                  float: 'left',
                  border: 'none',
                  background: 'transparent',
                  display: 'inline-block',
                  width: '25%',
                  height: '44px',
                  lineHeight: '44px',
                  paddingLeft: '30px',
                  borderRadius: '0',
                  fontSize: '16px',
                  color: '#000000'
                }}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
              <input 
                type="text" 
                placeholder="Search" 
                value={searchTerm}
                onChange={handleSearchChange}
                disabled={isLoading}
                className={isFiltering ? styles.filtering : ""}
                style={{
                  width: '75%',
                  height: '100%',
                  border: 'none',
                  fontSize: '16px',
                  color: '#000000',
                  paddingLeft: '30px'
                }}
              />
              <button 
                type="submit" 
                disabled={isLoading}
                style={{
                  color: '#000000',
                  fontSize: '16px',
                  fontWeight: '700',
                  position: 'absolute',
                  right: '0',
                  top: '0',
                  border: 'none',
                  background: 'transparent',
                  height: '100%',
                  padding: '0 15px'
                }}
              >
                <i className="fa fa-search"></i>
              </button>
            </form>
          </div>
        </div>
        <div className="col-lg-5 col-md-5">
          <div className="shop__option__right">
            <select 
              value={sortBy} 
              onChange={handleSortChange}
              disabled={isLoading}
              className={`nice-select ${isFiltering ? styles.filtering : ""}`}
              style={{
                border: 'none',
                background: '#f5f5f5',
                display: 'inline-block',
                width: '205px',
                height: '46px',
                lineHeight: '46px',
                paddingLeft: '30px',
                borderRadius: '0',
                float: 'none',
                marginRight: '18px',
                fontSize: '16px',
                color: '#000000'
              }}
            >
              <option value="default">Default sorting</option>
              <option value="a-z">A to Z</option>
              <option value="z-a">Z to A</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
            </select>
            <a href="#" className={isLoading ? styles.disabled : ""} style={{
              display: 'inline-block',
              fontSize: '18px',
              color: '#000000',
              marginLeft: '8px',
              transition: 'all 0.3s ease'
            }}>
              <i className="fa fa-list"></i>
            </a>
            <a href="#" className={isLoading ? styles.disabled : ""} style={{
              display: 'inline-block',
              fontSize: '18px',
              color: '#000000',
              marginLeft: '8px',
              transition: 'all 0.3s ease'
            }}>
              <i className="fa fa-reorder"></i>
            </a>
          </div>
        </div>
      </div>
      {/* Spinner removed for sorting and filtering */}
    </div>
  );
} 