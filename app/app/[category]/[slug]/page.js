import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductDetailUrl, getProductsUrl } from '../../config/api';
import ProductImageGallery from '../../components/ProductImageGallery';
import ProductDetails from '../../components/ProductDetails';
import ProductCard from '../../components/ProductCard';

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  try {
    const product = await getProduct(params.slug);
    
    if (!product) {
      return {
        title: 'Product Not Found',
        description: 'The requested product could not be found.',
      };
    }

    // Verify that the category in URL matches the product's category
    if (product.category?.slug !== params.category) {
      return {
        title: 'Product Not Found',
        description: 'The requested product could not be found.',
      };
    }

    return {
      title: product.meta_data?.meta_title || product.name,
      description: product.meta_data?.meta_description || product.short_description,
      openGraph: {
        title: product.meta_data?.og_title || product.name,
        description: product.meta_data?.og_description || product.short_description,
        images: product.meta_data?.og_image_url ? [product.meta_data.og_image_url] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: product.meta_data?.twitter_title || product.name,
        description: product.meta_data?.twitter_description || product.short_description,
        images: product.meta_data?.twitter_image_url ? [product.meta_data.twitter_image_url] : [],
      },
    };
  } catch (error) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }
}

// Fetch product data with caching
async function getProduct(slug) {
  try {
    // Fetch all products to find the one with matching slug
    const productsResponse = await fetch(getProductsUrl(), { 
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!productsResponse.ok) {
      return null;
    }
    
    const data = await productsResponse.json();
    
    if (data && data.results) {
      // Find product by slug
      const product = data.results.find(p => p.slug === slug);
      return product || null;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// Generate static params for known products
export async function generateStaticParams() {
  try {
    const response = await fetch(getProductsUrl(), { 
      next: { revalidate: 3600 } 
    });
    
    if (!response.ok) {
      return [];
    }
    
    const data = await response.json();
    
    if (data && data.results) {
      return data.results.map(product => ({
        category: product.category?.slug || 'brownie',
        slug: product.slug 
      }));
    }
    
    return [];
  } catch (error) {
    return [];
  }
}

export default async function ProductDetailPage({ params }) {
  const product = await getProduct(params.slug);
  
  if (!product) {
    notFound();
  }

  // Verify that the category in URL matches the product's category
  if (product.category?.slug !== params.category) {
    notFound();
  }

  // Fetch related products from the same category
  let relatedProducts = [];
  try {
    const response = await fetch(getProductsUrl(), { 
      next: { revalidate: 3600 } 
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data && data.results) {
        // Filter products from the same category, excluding current product
        relatedProducts = data.results.filter(p => 
          p.category?.slug === product.category?.slug && 
          p.id !== product.id
        ).slice(0, 4); // Show max 4 related products
      }
    }
  } catch (error) {
    console.error('Error fetching related products:', error);
  }

  return (
    <>
      {/* Breadcrumb Begin */}
      <div className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="breadcrumb__text">
                <h2>Product detail</h2>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="breadcrumb__links">
                <Link href="/">Home</Link>
                <Link href="/shop">Shop</Link>
                <Link href={`/shop/${product.category?.slug}`}>{product.category?.name}</Link>
                <span>{product.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Breadcrumb End */}

      {/* Shop Details Section Begin */}
      <section className="product-details spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <ProductImageGallery images={product.images} productName={product.name} />
            </div>
            <div className="col-lg-6">
              <ProductDetails product={product} />
            </div>
          </div>
          
          <div className="product__details__tab">
            <div className="col-lg-12">
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" data-toggle="tab" href="#tabs-1" role="tab">Description</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#tabs-2" role="tab">Additional information</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#tabs-3" role="tab">Reviews</a>
                </li>
              </ul>
              <div className="tab-content">
                <div className="tab-pane active" id="tabs-1" role="tabpanel">
                  <div className="row d-flex justify-content-center">
                    <div className="col-lg-8">
                      <p>{product.description}</p>
                    </div>
                  </div>
                </div>
                <div className="tab-pane" id="tabs-2" role="tabpanel">
                  <div className="row d-flex justify-content-center">
                    <div className="col-lg-8">
                      <p>{product.additional_information}</p>
                    </div>
                  </div>
                </div>
                <div className="tab-pane" id="tabs-3" role="tabpanel">
                  <div className="row d-flex justify-content-center">
                    <div className="col-lg-8">
                      <p>No reviews yet. Be the first to review this product!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Shop Details Section End */}

      {/* Related Products Section Begin */}
      {relatedProducts.length > 0 && (
        <section className="related-products spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <div className="section-title">
                  <h2>Related Products from {product.category?.name}</h2>
                </div>
              </div>
            </div>
            <div className="row">
              {relatedProducts.map(relatedProduct => (
                <div key={relatedProduct.id} className="col-lg-3 col-md-6 col-sm-6">
                  <ProductCard product={relatedProduct} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* Related Products Section End */}
    </>
  );
} 