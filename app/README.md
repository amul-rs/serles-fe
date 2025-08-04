# Cake Shop - Next.js Application

A modern, responsive cake shop website built with Next.js, featuring a beautiful design inspired by the provided HTML template.

## Features

- **Responsive Design**: Mobile-first approach with Bootstrap integration
- **Modern UI**: Beautiful gradient backgrounds and smooth animations
- **Product Catalog**: Dynamic product listing with search and filtering
- **Header & Footer**: Professional navigation and footer sections
- **API Integration**: Ready for backend integration with product data

## Project Structure
 
```
app/
├── app/
│   ├── components/
│   │   ├── Header.js          # Header component with navigation
│   │   ├── Footer.js          # Footer component
│   │   └── ProductCard.js     # Individual product card component
│   ├── config/
│   │   └── api.js             # API configuration
│   ├── shop/
│   │   └── page.js            # Shop page with product listing
│   ├── api/
│   │   └── products/
│   │       └── route.js       # API endpoint for products
│   ├── layout.js              # Root layout with Header/Footer
│   ├── page.js                # Home page
│   └── globals.css            # Global styles
├── public/                    # Static assets
├── .env.local                 # Environment variables (create this)
└── package.json
```

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Navigate to the app directory:
   ```bash
   cd app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment configuration:
   ```bash
   # Create .env.local file
   echo "NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000" > .env.local
   echo "NEXT_PUBLIC_API_ENDPOINT=/api/products/?format=json" >> .env.local
   ```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Pages

### Home Page (`/`)
- Hero section with call-to-action
- Feature highlights
- Links to shop page

### Shop Page (`/shop`)
- Product grid layout
- Search functionality
- Category filtering
- Product cards with images and prices

## API Integration

The application is configured to fetch products from an external API endpoint. The API configuration is managed through environment variables:

### Environment Configuration

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
NEXT_PUBLIC_API_ENDPOINT=/api/products/?format=json
```

### API Configuration

The application uses the API configuration from `app/config/api.js`:

- **Base URL**: Points to your backend server
- **Products Endpoint**: The specific endpoint for fetching products
- **Format**: JSON format for API responses

### API Response Format

Your API should return data in the following format:

```json
{
  "count": 2,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "name": "Product Name",
      "slug": "product-slug",
      "sku": "SKU123",
      "category": {
        "id": 1,
        "name": "Category Name",
        "slug": "category-slug"
      },
      "short_description": "Product description",
      "price_range": "$10.00 - $20.00",
      "featured_image": {
        "url": "http://example.com/image.jpg",
        "alt_text": "Image description"
      },
      "tags_list": ["Tag1", "Tag2"]
    }
  ]
}
```

## Styling

The application uses:
- **Bootstrap 5**: For responsive grid and components
- **Font Awesome**: For icons
- **Google Fonts**: Playfair Display and Montserrat
- **Custom CSS**: Comprehensive styling matching the original template

## Key Components

### Header Component
- Sticky navigation
- Mobile-responsive menu
- Search, cart, and user account links
- Dropdown navigation

### Footer Component
- Working hours
- Social media links
- Newsletter subscription
- Copyright information

### ProductCard Component
- Product image display
- Product information
- Add to cart functionality
- Category labels

## Customization

### Adding New Products
1. Update the API endpoint or mock data
2. Ensure product images are available
3. Product data should include: name, slug, price_range, featured_image, category, etc.

### Styling Changes
- Modify `app/globals.css` for global styles
- Component-specific styles are included in the CSS file
- Color scheme uses purple gradient (#667eea to #764ba2)

### Adding New Pages
1. Create new page files in the `app` directory
2. Update navigation in `Header.js`
3. Add any necessary styling

## Deployment

The application is ready for deployment on platforms like:
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
