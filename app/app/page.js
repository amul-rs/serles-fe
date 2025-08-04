import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className="hero-section" style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: 'white',
          padding: '2rem'
        }}>
          <div className="container">
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontFamily: 'Playfair Display, serif' }}>
              Welcome to Our Cake Shop
            </h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem', fontFamily: 'Montserrat, sans-serif' }}>
              Discover our delicious collection of cakes, brownies, and sweet treats
            </p>
            <Link href="/shop" style={{
              display: 'inline-block',
              padding: '1rem 2rem',
              backgroundColor: '#fff',
              color: '#667eea',
              textDecoration: 'none',
              borderRadius: '50px',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease'
            }}>
              Shop Now
            </Link>
          </div>
        </div>

        <div className="features-section" style={{ padding: '4rem 0', backgroundColor: '#f8f9fa' }}>
          <div className="container">
            <div className="row">
              <div className="col-md-4 text-center mb-4">
                <i className="fas fa-birthday-cake" style={{ fontSize: '3rem', color: '#667eea', marginBottom: '1rem' }}></i>
                <h3>Fresh Baked</h3>
                <p>All our products are freshly baked daily with the finest ingredients</p>
              </div>
              <div className="col-md-4 text-center mb-4">
                <i className="fas fa-shipping-fast" style={{ fontSize: '3rem', color: '#667eea', marginBottom: '1rem' }}></i>
                <h3>Fast Delivery</h3>
                <p>Quick and reliable delivery to your doorstep</p>
              </div>
              <div className="col-md-4 text-center mb-4">
                <i className="fas fa-heart" style={{ fontSize: '3rem', color: '#667eea', marginBottom: '1rem' }}></i>
                <h3>Made with Love</h3>
                <p>Every product is crafted with care and passion</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
