'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ProductDetails({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState('');
  const [customMessage, setCustomMessage] = useState('');

  // Generate weight options based on available data
  const generateWeightOptions = () => {
    if (product?.weight_options?.length > 0) {
      return product.weight_options;
    }
    
    // Create multiple weight options based on available price data
    const options = [];
    
    // Option 1: Standard Weight (using base_price or min_price)
    if (product?.base_price || product?.min_price) {
      options.push({
        id: 'standard',
        display_name: 'Standard Weight',
        price: product.base_price || product.min_price
      });
    }
    
    // Option 2: Half Weight (50% of base price)
    if (product?.base_price || product?.min_price) {
      const basePrice = parseFloat(product.base_price || product.min_price);
      options.push({
        id: 'half',
        display_name: 'Half Weight',
        price: (basePrice * 0.5).toFixed(2)
      });
    }
    
    // Option 3: Double Weight (200% of base price)
    if (product?.base_price || product?.min_price) {
      const basePrice = parseFloat(product.base_price || product.min_price);
      options.push({
        id: 'double',
        display_name: 'Double Weight',
        price: (basePrice * 2).toFixed(2)
      });
    }
    
    // Option 4: Large Size (150% of base price)
    if (product?.base_price || product?.min_price) {
      const basePrice = parseFloat(product.base_price || product.min_price);
      options.push({
        id: 'large',
        display_name: 'Large Size',
        price: (basePrice * 1.5).toFixed(2)
      });
    }
    
    // If no price data available, create options based on price_range
    if (options.length === 0 && product?.price_range) {
      const match = product.price_range.match(/[₹$]([\d,]+(?:\.\d{2})?)/);
      if (match) {
        const basePrice = parseFloat(match[1].replace(',', ''));
        options.push(
          {
            id: 'small',
            display_name: 'Small Size',
            price: (basePrice * 0.7).toFixed(2)
          },
          {
            id: 'standard',
            display_name: 'Standard Size',
            price: basePrice.toFixed(2)
          },
          {
            id: 'large',
            display_name: 'Large Size',
            price: (basePrice * 1.3).toFixed(2)
          }
        );
      }
    }
    
    return options.length > 0 ? options : [
      {
        id: 'standard',
        display_name: 'Standard Weight',
        price: '0.00'
      }
    ];
  };

  const weightOptions = generateWeightOptions();

  useEffect(() => {
    if (weightOptions.length > 0) {
      setSelectedWeight(String(weightOptions[0].id));
    }
  }, [weightOptions]);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) setQuantity(newQuantity);
  };

  const handleWeightChange = (weightId) => {
    setSelectedWeight(String(weightId));
  };

  const getSelectedWeightOption = () => {
    return weightOptions.find(opt => String(opt.id) === selectedWeight) || weightOptions[0];
  };

  const getSelectedWeightPrice = () => {
    const selectedOption = getSelectedWeightOption();
    if (selectedOption?.price) return `₹${parseFloat(selectedOption.price).toFixed(2)}`;
    if (product?.base_price) return `₹${parseFloat(product.base_price).toFixed(2)}`;
    if (product?.min_price) return `₹${parseFloat(product.min_price).toFixed(2)}`;
    if (product?.price_range) {
      // Extract price from price_range string
      const match = product.price_range.match(/[₹$]([\d,]+(?:\.\d{2})?)/);
      if (match) {
        return `₹${parseFloat(match[1].replace(',', '')).toFixed(2)}`;
      }
    }
    return '₹0.00';
  };

  const calculateTotalPrice = () => {
    const selectedOption = getSelectedWeightOption();
    let unitPrice = 0;
    
    if (selectedOption?.price) {
      unitPrice = parseFloat(selectedOption.price);
    } else if (product?.base_price) {
      unitPrice = parseFloat(product.base_price);
    } else if (product?.min_price) {
      unitPrice = parseFloat(product.min_price);
    } else if (product?.price_range) {
      // Extract price from price_range string
      const match = product.price_range.match(/[₹$]([\d,]+(?:\.\d{2})?)/);
      if (match) {
        unitPrice = parseFloat(match[1].replace(',', ''));
      }
    }
    
    return isNaN(unitPrice) ? '₹0.00' : `₹${(unitPrice * quantity).toFixed(2)}`;
  };

  const handleWhatsAppEnquiry = () => {
    const selectedOption = getSelectedWeightOption();
    const weightText = selectedOption ? selectedOption.display_name : 'Standard Weight';
    const enquiryMessage = `Hi! I'm interested in ordering:\n\nProduct: ${product.name}\nWeight: ${weightText}\nQuantity: ${quantity}\nPrice: ${calculateTotalPrice()}\n${customMessage ? `Message: ${customMessage}` : ''}\n\nProduct URL: ${window.location.href}\n\nCould you please provide more details about availability and delivery?`;

    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(enquiryMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="product__details__text">
      <div className="product__label">
        <Link href={`/shop/${product.category?.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
          {product.category?.name || 'Product'}
        </Link>
      </div>
      <h4>{product.name}</h4>
      <h5>{getSelectedWeightPrice()}</h5>
      <p>{product.short_description}</p>
      <ul>
        <li>SKU: <span>{product.sku}</span></li>
        <li>Category: <span>
          <Link href={`/shop/${product.category?.slug}`} style={{ color: '#667eea', textDecoration: 'none' }}>
            {product.category?.name}
          </Link>
        </span></li>
        <li>Tags: <span>{product.tags_list?.join(', ')}</span></li>
      </ul>

      <div className="product__details__option">
        <div style={{ marginBottom: '20px' }}>
          <h6 style={{ marginBottom: '10px', fontSize: '16px', fontWeight: '600' }}>Quantity</h6>
          <div className="pro-qty" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button onClick={() => handleQuantityChange(quantity - 1)} style={{ border: '1px solid #ddd', background: '#fff', padding: '8px 12px', cursor: 'pointer', borderRadius: '4px', fontSize: '16px' }}>-</button>
            <input type="number" value={quantity} onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)} style={{ width: '60px', textAlign: 'center', border: '1px solid #ddd', padding: '8px', borderRadius: '4px', fontSize: '16px' }} />
            <button onClick={() => handleQuantityChange(quantity + 1)} style={{ border: '1px solid #ddd', background: '#fff', padding: '8px 12px', cursor: 'pointer', borderRadius: '4px', fontSize: '16px' }}>+</button>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h6 style={{ marginBottom: '10px', fontSize: '16px', fontWeight: '600' }}>Select Weight</h6>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', flexWrap: 'wrap' }}>
            {weightOptions.map(option => (
              <label key={option.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '15px', border: String(option.id) === selectedWeight ? '2px solid #667eea' : '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', backgroundColor: String(option.id) === selectedWeight ? '#f8f9ff' : '#fff', transition: 'all 0.3s ease', minWidth: '120px', textAlign: 'center' }}>
                <input 
                  type="radio" 
                  name="weight" 
                  value={option.id} 
                  checked={String(option.id) === selectedWeight} 
                  onChange={(e) => handleWeightChange(e.target.value)} 
                  style={{ marginBottom: '8px' }} 
                />
                <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '5px' }}>{option.display_name}</div>
                <div style={{ color: '#667eea', fontSize: '14px', fontWeight: '600' }}>₹{option?.price ? parseFloat(option.price).toFixed(2) : '0.00'}</div>
              </label>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h6 style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>Message</h6>
            <span style={{ fontSize: '12px', color: '#666' }}>{customMessage.length}/50</span>
          </div>
          <textarea value={customMessage} onChange={(e) => setCustomMessage(e.target.value.slice(0, 50))} placeholder="Eg: Happy Birthday Sweet Heart ❤️" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', resize: 'vertical', minHeight: '80px' }} />
        </div>

        <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #e9ecef' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: '600' }}>Total Price:</span>
            <span style={{ fontSize: '18px', fontWeight: '700', color: '#667eea' }}>{calculateTotalPrice()}</span>
          </div>
        </div>

        <button onClick={handleWhatsAppEnquiry} className="primary-btn" style={{ border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', backgroundColor: '#25D366', color: '#fff', borderRadius: '8px', fontSize: '16px', fontWeight: '600', width: '100%', justifyContent: 'center', marginBottom: '10px' }}>
          <i className="fab fa-whatsapp" style={{ fontSize: '20px' }}></i> Enquiry via WhatsApp
        </button>

        <a href="#" className="heart__btn">
          <span className="icon_heart_alt"></span>
        </a>
      </div>

      {product?.additional_information && (
        <div className="product__details__additional__info" style={{ marginTop: '30px' }}>
          <h5>Additional Information</h5>
          <p>{product.additional_information}</p>
        </div>
      )}
    </div>
  );
}
