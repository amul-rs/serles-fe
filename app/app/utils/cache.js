// Cache utility for API calls
class APICache {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  // Generate cache key
  generateKey(url) {
    return `api_${url}`;
  }

  // Get cached data
  get(key) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    return null;
  }

  // Set cache data
  set(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  // Clear cache
  clear() {
    this.cache.clear();
  }

  // Clear expired cache entries
  clearExpired() {
    const now = Date.now();
    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp > this.cacheTimeout) {
        this.cache.delete(key);
      }
    }
  }

  // Fetch with cache
  async fetchWithCache(url, options = {}) {
    const key = this.generateKey(url);
    const cached = this.get(key);
    
    if (cached) {
      return cached;
    }

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      this.set(key, data);
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }
}

// Create singleton instance
const apiCache = new APICache();

// Clear expired cache entries periodically
setInterval(() => {
  apiCache.clearExpired();
}, 60000); // Every minute

export default apiCache; 