export async function GET() {
  // Mock API data - replace with actual database call
  const products = {
    "count": 3,
    "next": null,
    "previous": null,
    "results": [
      {
        "id": 1,
        "name": "Classic Fudgy Brownie",
        "slug": "classic-fudgy-brownie",
        "sku": "PRD0004",
        "category": {
          "id": 1,
          "name": "Brownie",
          "slug": "brownie",
          "description": "",
          "image": null,
          "sku_prefix": ""
        },
        "short_description": "A brownie contains nuts or chocolate chips",
        "description": "A brownie is a small, square-shaped, chocolate baked good with a dense, chewy, or fudgy texture, often with a glossy top and sometimes containing nuts or chocolate chips",
        "additional_information": "e-shaped, chocolate baked good with a dense, chewy, or fudgy texture, often with a glossy top and sometimes containing nuts or chocolate chips",
        "price_range": "₹999.00 - ₹2000.00",
        "featured_image": {
          "url": "http://127.0.0.1:8000/media/products/brownie/classic-fudgy-brownie/20250804_155520.jpg",
          "alt_text": "brownie"
        },
        "weight_options": [
          {
            "id": 1,
            "display_name": "0.5 KG",
            "price": "₹499.00",
            "weight_in_grams": 500
          },
          {
            "id": 2,
            "display_name": "1 KG + 1 KG FREE",
            "price": "₹999.00",
            "weight_in_grams": 1000
          }
        ],
        "tags": [
          {
            "id": 1,
            "name": "Brownie",
            "slug": "brownie",
            "description": "",
            "color": "#007bff",
            "is_active": true,
            "products_count": 2
          }
        ],
        "tags_list": ["Brownie"],
        "is_active": true,
        "is_featured": false,
        "is_new": false,
        "is_best_seller": false
      },
      {
        "id": 2,
        "name": "Chocolate Truffle Cake",
        "slug": "choco-truffle-cake",
        "sku": "PRD0005",
        "category": {
          "id": 2,
          "name": "Flavored Cakes",
          "slug": "flavored-cakes",
          "description": "",
          "image": null,
          "sku_prefix": ""
        },
        "short_description": "Rich chocolate truffle cake with ganache",
        "description": "A decadent chocolate truffle cake made with premium dark chocolate and rich ganache frosting. Perfect for special occasions.",
        "additional_information": "Made with premium Belgian chocolate and fresh cream. Contains nuts and dairy.",
        "price_range": "₹799.00 - ₹1599.00",
        "featured_image": {
          "url": "http://127.0.0.1:8000/media/products/flavored-cakes/choco-truffle-cake/20250804_162525.jpg",
          "alt_text": "chocolate truffle cake"
        },
        "weight_options": [
          {
            "id": 3,
            "display_name": "0.5 KG",
            "price": "₹399.00",
            "weight_in_grams": 500
          },
          {
            "id": 4,
            "display_name": "1 KG + 1 KG FREE",
            "price": "₹799.00",
            "weight_in_grams": 1000
          }
        ],
        "tags": [
          {
            "id": 2,
            "name": "Chocolate",
            "slug": "chocolate",
            "description": "",
            "color": "#8B4513",
            "is_active": true,
            "products_count": 1
          }
        ],
        "tags_list": ["Chocolate", "Truffle"],
        "is_active": true,
        "is_featured": true,
        "is_new": false,
        "is_best_seller": true
      },
      {
        "id": 3,
        "name": "Vanilla Sponge Cake",
        "slug": "vanilla-sponge-cake",
        "sku": "PRD0006",
        "category": {
          "id": 2,
          "name": "Flavored Cakes",
          "slug": "flavored-cakes",
          "description": "",
          "image": null,
          "sku_prefix": ""
        },
        "short_description": "Light and fluffy vanilla sponge cake",
        "description": "A classic vanilla sponge cake that's light, fluffy, and perfect for any celebration. Topped with fresh cream and seasonal fruits.",
        "additional_information": "Made with pure vanilla extract and fresh eggs. Can be customized with different toppings.",
        "price_range": "₹599.00 - ₹1199.00",
        "featured_image": {
          "url": "http://127.0.0.1:8000/media/products/flavored-cakes/vanilla-sponge-cake/20250804_162525.jpg",
          "alt_text": "vanilla sponge cake"
        },
        "weight_options": [
          {
            "id": 5,
            "display_name": "0.5 KG",
            "price": "₹299.00",
            "weight_in_grams": 500
          },
          {
            "id": 6,
            "display_name": "1 KG + 1 KG FREE",
            "price": "₹599.00",
            "weight_in_grams": 1000
          }
        ],
        "tags": [
          {
            "id": 3,
            "name": "Vanilla",
            "slug": "vanilla",
            "description": "",
            "color": "#F5DEB3",
            "is_active": true,
            "products_count": 1
          }
        ],
        "tags_list": ["Vanilla", "Sponge"],
        "is_active": true,
        "is_featured": false,
        "is_new": true,
        "is_best_seller": false
      }
    ]
  };

  return Response.json(products);
} 