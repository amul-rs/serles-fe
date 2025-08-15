'use client';

import React, { useEffect, useState } from 'react';
import './productgrid.scss';
import { getProductsUrl } from '../../config/api';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Bestselling.module.css';
import { logImageError, getFallbackImage } from '../../utils/imageUtils';

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

export default function Bestselling({ initialProducts = [] }) {
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(initialProducts.length === 0);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch if we don't have initial products
    if (initialProducts.length === 0) {
      const loadProducts = async () => {
        try {
          setLoading(true);
          const data = await fetchBestselling();
          setProducts(data);
        } catch (err) {
          setError(err.message);
          console.error('Error loading bestselling products:', err);
        } finally {
          setLoading(false);
        }
      };

      loadProducts();
    }
  }, [initialProducts.length]);
  
  // If loading, show loading message
  if (loading) {
    return (
      <section className="product spad">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h1 text-left">Bestselling Cakes</h2>
            <Link href={`/cakes`} className="btn bg-primary-light">View All</Link>
          </div>
          <div className="row">
            <div className="col-12">
              <p className={styles.loadingMessage}>Loading bestselling products...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // If error, show error message
  if (error) {
    return (
      <section className="product spad">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h1 text-left">Bestselling Cakes</h2>
            <Link href={`/cakes`} className="btn bg-primary-light">View All</Link>
          </div>
          <div className="row">
            <div className="col-12">
              <p className={styles.loadingMessage}>Unable to load products. Please try again later.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // If no products, show a message
  if (!products || products.length === 0) {
    return (
      <section className="product spad">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h1 text-left">Bestselling Cakes</h2>
            <Link href={`/cakes`} className="btn bg-primary-light">View All</Link>
          </div>
          <div className="row">
            <div className="col-12">
              <p className={styles.loadingMessage}>No bestselling products available at the moment.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  function ProductCard({ product }) {
    const handleImageError = (e) => {
      logImageError(product.featured_image?.url, 'Bestselling', new Error('Product image failed to load'));
      e.target.src = getFallbackImage('product');
    };

    return (
      <div className="col-lg-3 col-6" key={product.id}>
        <Link href={`/cakes/${product.category?.slug}/${product.slug}`}>  
          <div className={`product__item ${styles.productItem}`}>
            <div className="product__item__pic set-bg border-r">
              <Image
                src={product.featured_image?.url || getFallbackImage('product')}
                alt={product.name || 'Cake'}
                width={300}
                height={300}
                className={styles.productImage}
                onError={handleImageError}
                priority={true}
              />
              <div className={`product__label ${styles.productLabel}`}>
                <span>{product.category?.name || 'Cake'}</span>
              </div>
            </div>
            <div className="product__item__text">
              <p className='p '>
                <span className='p text-decoration-none text-black'>
                  {product.name}
                </span>
              </p>
              <p className="product__item__price">{product.price_range}</p>
              <div className="cart_add">
                <p>View Details</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <section className="product spad">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h1 text-left">Bestselling Cakes</h2>
          <Link href={`/cakes?is_best_seller=true`} className="btn bg-primary-light">View All</Link>
        </div>
        <div className="row">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
