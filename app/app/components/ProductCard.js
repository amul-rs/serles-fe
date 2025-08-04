'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const getImageUrl = () => {
    if (imageError || !product.featured_image?.url) {
      // Use a placeholder image from the template
      return '/img/shop/product-1.jpg';
    }
    return product.featured_image.url;
  };

  return (
    <div className="col-lg-3 col-md-6 col-sm-6">
      <div className="product__item">
        <div 
          className="product__item__pic set-bg" 
          style={{ 
            backgroundImage: `url(${getImageUrl()})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '250px',
            position: 'relative'
          }}
        >
          <div className="product__label">
            <span>{product.category?.name || 'Product'}</span>
          </div>
        </div>
        <div className="product__item__text">
          <h6>
            <Link href={`/${product.category?.slug}/${product.slug}`}>{product.name}</Link>
          </h6>
          <div className="product__item__price">{product.price_range}</div>
          <div className="product__item__category" style={{ marginBottom: '10px' }}>
            <Link 
              href={`/shop/category/${product.category?.slug}`}
              style={{
                fontSize: '12px',
                color: '#667eea',
                textDecoration: 'none'
              }}
            >
              {product.category?.name}
            </Link>
          </div>
          <div className="cart_add">
            <Link href={`/${product.category?.slug}/${product.slug}`}>View Details</Link>
          </div>
        </div>
      </div>
    </div>
  );
} 