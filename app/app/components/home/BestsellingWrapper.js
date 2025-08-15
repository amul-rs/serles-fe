import { getProductsUrl } from '../../config/api';
import Bestselling from './Bestselling';

async function fetchBestselling() {
  try {
    const res = await fetch(getProductsUrl(), {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      }
    });
    
    if (!res.ok) {
      console.error('Failed to fetch bestselling products:', res.status, res.statusText);
      return [];
    }
    
    const data = await res.json();
    // Filter products where is_best_seller is true
    const bestselling = data.results?.filter(product => product.is_best_seller) || [];
    return bestselling;
  } catch (error) {
    console.error('Error fetching bestselling products:', error);
    return [];
  }
}

export default async function BestsellingWrapper() {
  // Fetch initial data on the server
  const initialProducts = await fetchBestselling();
  
  return <Bestselling initialProducts={initialProducts} />;
} 