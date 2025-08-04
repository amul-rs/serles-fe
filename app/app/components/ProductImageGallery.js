'use client';
import { useState, useEffect } from 'react';

export default function ProductImageGallery({ images, productName }) {
  const [activeImage, setActiveImage] = useState(0);
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    if (images && images.length > 0) {
      setMainImage(images[0].image);
    }
  }, [images]);

  const handleThumbnailClick = (image, index) => {
    setMainImage(image);
    setActiveImage(index);
  };

  if (!images || images.length === 0) {
    return (
      <div className="product__details__img">
        <div className="product__details__big__img">
          <img 
            className="big_img" 
            src="/img/shop/details/product-big-1.jpg" 
            alt={productName}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="product__details__img">
      <div className="product__details__big__img">
        <img 
          className="big_img" 
          src={mainImage} 
          alt={productName}
        />
      </div>
      {images.length > 1 && (
        <div className="product__details__thumb">
          {images.map((image, index) => (
            <div 
              key={image.id} 
              className={`pt__item ${activeImage === index ? 'active' : ''}`}
              onClick={() => handleThumbnailClick(image.image, index)}
              style={{ cursor: 'pointer' }}
            >
              <img 
                data-imgbigurl={image.image}
                src={image.image} 
                alt={image.alt_text || productName}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 