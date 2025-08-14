# Pagination Implementation

This document describes the pagination implementation for the Serle's Bake frontend application.

## Overview

The application now supports pagination to load products in batches, improving performance and user experience. Instead of loading all products at once, the system loads products in pages and provides infinite scrolling functionality.

## Features

### 1. Infinite Scrolling
- Products are loaded automatically as the user scrolls to the bottom
- Uses Intersection Observer API for efficient detection
- Smooth loading experience with loading indicators

### 2. Load More Button
- Alternative to infinite scrolling
- Manual control for loading more products
- Clear indication when all products are loaded

### 3. Pagination Status
- Shows current page and total count
- Displays loading states
- Provides retry functionality for failed requests

## Implementation Details

### API Configuration (`app/config/api.js`)
```javascript
export const getProductsUrl = (page = 1, pageSize = 12) => {
  const baseUrl = `${API_CONFIG.BASE_URL}${API_CONFIG.PRODUCTS_ENDPOINT}`;
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}page=${page}&page_size=${pageSize}`;
};
```

### Pagination Hook (`app/hooks/usePagination.js`)
The `usePagination` hook manages:
- Product loading state
- Page tracking
- Infinite scrolling with Intersection Observer
- Error handling
- Cache management

### Components

#### ProductCard (`app/components/ProductCard.js`)
- Updated to support `forwardRef` for intersection observer
- Accepts `isLast` prop to identify the last product for infinite scrolling

#### PaginationStatus (`app/components/PaginationStatus.js`)
- Displays pagination information
- Shows loading states
- Provides load more button

## Usage

### Basic Implementation
```javascript
import usePagination from '../hooks/usePagination';

const {
  products,
  loading,
  hasMore,
  currentPage,
  totalCount,
  error,
  loadNextPage,
  resetPagination,
  lastProductRef
} = usePagination(12); // 12 products per page
```

### In Product Lists
```javascript
{products.map((product, index) => (
  <ProductCard 
    key={`${product.id}-${index}`} 
    product={product} 
    isLast={index === products.length - 1}
    ref={lastProductRef}
  />
))}
```

## Cache Strategy

- **Paginated requests**: 2-minute cache time
- **Non-paginated requests**: 5-minute cache time
- Automatic cache cleanup for expired entries

## Performance Benefits

1. **Faster Initial Load**: Only loads first page of products
2. **Reduced Memory Usage**: Products loaded on demand
3. **Better User Experience**: Smooth infinite scrolling
4. **Network Efficiency**: Smaller payloads per request

## Error Handling

- Automatic retry for failed requests
- Fallback data for critical endpoints
- User-friendly error messages
- Retry buttons for manual recovery

## Browser Support

- Uses Intersection Observer API (supported in all modern browsers)
- Graceful fallback to manual "Load More" button
- Progressive enhancement approach

## Configuration

### Page Size
Default page size is 12 products per page. This can be adjusted in the `usePagination` hook:

```javascript
const pagination = usePagination(20); // 20 products per page
```

### Cache Time
Cache times can be adjusted in `app/utils/cache.js`:

```javascript
const cacheTimeout = isPaginated ? 2 * 60 * 1000 : this.cacheTimeout;
```

## Testing

To test pagination:

1. Navigate to `/cakes` or any category page
2. Scroll to the bottom to trigger infinite scrolling
3. Check the pagination status component
4. Verify that more products load automatically
5. Test the "Load More" button functionality

## Troubleshooting

### Products Not Loading
- Check API endpoint configuration
- Verify pagination parameters in URL
- Check browser console for errors
- Ensure cache is not corrupted

### Infinite Scrolling Not Working
- Verify Intersection Observer support
- Check if `lastProductRef` is properly attached
- Ensure `hasMore` state is correct
- Check for JavaScript errors

### Performance Issues
- Reduce page size if needed
- Check cache configuration
- Monitor network requests
- Verify API response times 