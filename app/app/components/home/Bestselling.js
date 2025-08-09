import './productgrid.scss';
import { getProductsUrl } from '../../config/api';
import Image from 'next/image';
import Link from 'next/link';

async function fetchBestselling() {
  const res = await fetch(getProductsUrl());
  if (!res.ok) {
    throw new Error('Failed to fetch bestselling');
  }
  const data = await res.json();
  // Filter products where is_best_seller is true
  const bestselling = data.results.filter(product => product.is_best_seller);
  return bestselling;
}

export default async function Bestselling() {
  const products = await fetchBestselling();
  return (
    <section className="product spad">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h2 text-left">Bestselling Cakes</h2>
          <Link href={`/cakes?is_best_seller=true`} className="btn btn-primary">View All</Link>
        </div>
        <div className="row">
          {products.slice(0, 4).map((product) => (
            <div className="col-lg-3 col-md-6 col-sm-6" key={product.id}>
              <div className="product__item">
                <div className="product__item__pic set-bg border-r" style={{ backgroundImage: `url(${product.featured_image?.url || '/img/shop/product-1.jpg'})` }}>
                  <div className="product__label">
                    <span>{product.category?.name || 'Cake'}</span>
                  </div>
                </div>
                <div className="product__item__text">
                  <p className='p '>
                    <Link href={`/product/${product.slug}`} className='p'>
                      {product.name}
                    </Link>
                  </p>
                  <p className="product__item__price">{product.price_range}</p>
                  <div className="cart_add">
                    <Link href={`/product/${product.slug}`}>View Details</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
