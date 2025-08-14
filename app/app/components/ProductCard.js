import Link from "next/link";
import Image from "next/image";
import { forwardRef } from "react";

const ProductCard = forwardRef(({ product, isLast = false }, ref) => {
  return (
    <div className="col-lg-4 col-md-6 col-sm-6" ref={isLast ? ref : null}>
      <Link 
        href={`/cakes/${product.category?.slug}/${product.slug}`}
        className="text-decoration-none"
        style={{ display: 'block' }}
      >
        <div className="product__item">
          <div className="product__item__pic set-bg">
            <Image
              src={product.featured_image?.url || "/img/placeholder.jpg"}
              alt={product.featured_image?.alt_text || product.name}
              width={300}
              height={300}
              style={{ objectFit: "cover", borderRadius: "20px" }}
            />
            {product.category && (
              <div className="product__label">
                <span>{product.category.name}</span>
              </div>
            )}
          </div>
          <div className="product__item__text">
            <h6>
              {product.name}
            </h6>
            <div className="product__item__price">
              {product.price_range?.replace(/\$/g, '₹') || "Price not available"}
            </div>
            <div className="cart_add">
              <Link href={`/cakes/${product.category?.slug}/${product.slug}`}>View Details</Link>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard; 