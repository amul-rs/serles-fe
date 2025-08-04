import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
      <div className="row">
        <div className="col-lg-12">
          <h1 style={{ fontSize: '3rem', marginBottom: '20px', color: '#333' }}>
            Product Not Found
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '30px' }}>
            Sorry, the product you're looking for doesn't exist or has been removed.
          </p>
          <div style={{ marginBottom: '30px' }}>
            <Link 
              href="/shop" 
              style={{
                display: 'inline-block',
                padding: '15px 30px',
                backgroundColor: '#667eea',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '5px',
                fontWeight: '500',
                marginRight: '15px'
              }}
            >
              Continue Shopping
            </Link>
            <Link 
              href="/" 
              style={{
                display: 'inline-block',
                padding: '15px 30px',
                backgroundColor: '#f8f9fa',
                color: '#333',
                textDecoration: 'none',
                borderRadius: '5px',
                fontWeight: '500'
              }}
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 