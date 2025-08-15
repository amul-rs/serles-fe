// Image utility functions for better error handling and logging

export const logImageError = (imageSrc, componentName, error) => {
  // Only log in client environment
  if (typeof window !== 'undefined') {
    console.error(`Image failed to load in ${componentName}:`, {
      src: imageSrc,
      error: error?.message || 'Unknown error',
      timestamp: new Date().toISOString(),
      userAgent: window.navigator.userAgent
    });
  }
};

export const getFallbackImage = (type = 'product') => {
  const fallbacks = {
    product: '/img/shop/product-1.jpg',
    team: '/img/placeholder.jpg',
    banner: '/img/placeholder.jpg',
    default: '/img/placeholder.jpg'
  };
  
  return fallbacks[type] || fallbacks.default;
};

export const validateImageUrl = (url) => {
  if (!url) return false;
  
  // Check if it's a valid URL
  try {
    new URL(url);
    return true;
  } catch {
    // If it's a relative path, it's still valid
    return url.startsWith('/') || url.startsWith('./');
  }
};

export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      // Server-side, just resolve
      resolve();
      return;
    }
    
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to preload image: ${src}`));
    img.src = src;
  });
};

// Client-side only functions
export const isClient = typeof window !== 'undefined';

export const getImageLoadTime = async (src) => {
  if (!isClient) return 0;
  
  return new Promise((resolve) => {
    const img = new Image();
    const startTime = performance.now();
    
    img.onload = () => {
      const loadTime = performance.now() - startTime;
      resolve(Math.round(loadTime));
    };
    
    img.onerror = () => {
      resolve(-1); // Error loading
    };
    
    img.src = src;
  });
}; 