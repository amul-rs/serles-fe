import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductDetailUrl } from '../../config/api';
import ProductImageGallery from '../../components/ProductImageGallery';
import ProductDetails from '../../components/ProductDetails';

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
    // First try to get product by slug from the products list
    const productsResponse = await fetch(getProductDetailUrl(1), { 
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!productsResponse.ok) {
      return null;
    }
    
    const product = await productsResponse.json();
    
    // Check if the product slug matches
    if (product.slug === slug) {
      return product;
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
    const response = await fetch(getProductDetailUrl(1), { 
      next: { revalidate: 3600 } 
    });
    
    if (!response.ok) {
      return [];
    }
    
    const product = await response.json();
    
    return [
      { slug: product.slug },
    ];
  } catch (error) {
    return [];
  }
}

export default async function ProductDetailPage({ params }) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
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
                <Link href={`/shop/category/${product.category?.slug}`}>{product.category?.name}</Link>
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
      <section className="related-products spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="section-title">
                <h2>Related Products</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="related__products__slider owl-carousel">
              {/* Related products will be loaded dynamically */}
              <div className="col-lg-3">
                <div className="product__item">
                  <div className="product__item__pic set-bg" style={{ backgroundImage: 'url(/img/shop/product-1.jpg)' }}>
                    <div className="product__label">
                      <span>Cupcake</span>
                    </div>
                  </div>
                  <div className="product__item__text">
                    <h6><Link href="#">Dozen Cupcakes</Link></h6>
                    <div className="product__item__price">$32.00</div>
                    <div className="cart_add">
                      <a href="#">Add to cart</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="product__item">
                  <div className="product__item__pic set-bg" style={{ backgroundImage: 'url(/img/shop/product-2.jpg)' }}>
                    <div className="product__label">
                      <span>Cupcake</span>
                    </div>
                  </div>
                  <div className="product__item__text">
                    <h6><Link href="#">Cookies and Cream</Link></h6>
                    <div className="product__item__price">$30.00</div>
                    <div className="cart_add">
                      <a href="#">Add to cart</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="product__item">
                  <div className="product__item__pic set-bg" style={{ backgroundImage: 'url(/img/shop/product-3.jpg)' }}>
                    <div className="product__label">
                      <span>Cupcake</span>
                    </div>
                  </div>
                  <div className="product__item__text">
                    <h6><Link href="#">Gluten Free Mini Dozen</Link></h6>
                    <div className="product__item__price">$31.00</div>
                    <div className="cart_add">
                      <a href="#">Add to cart</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="product__item">
                  <div className="product__item__pic set-bg" style={{ backgroundImage: 'url(/img/shop/product-4.jpg)' }}>
                    <div className="product__label">
                      <span>Cupcake</span>
                    </div>
                  </div>
                  <div className="product__item__text">
                    <h6><Link href="#">Cookie Dough</Link></h6>
                    <div className="product__item__price">$25.00</div>
                    <div className="cart_add">
                      <a href="#">Add to cart</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Related Products Section End */}
    </>
  );
} 