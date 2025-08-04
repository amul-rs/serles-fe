// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000',
  PRODUCTS_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT || '/api/products/?format=json',
  PRODUCT_DETAIL_ENDPOINT: '/api/products/{id}/?format=json',
};

export const getProductsUrl = () => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.PRODUCTS_ENDPOINT}`;
};

export const getProductDetailUrl = (id) => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.PRODUCT_DETAIL_ENDPOINT.replace('{id}', id)}`;
}; 