# Serles Bake - Custom Cake Shop Website

A modern, responsive website for Serles Bake, a custom cake shop in Tenkasi, Tamil Nadu. Built with Next.js 15 and React.

## 🎂 Features

- **Responsive Design**: Mobile-first approach with Bootstrap
- **Product Catalog**: Dynamic cake categories and products
- **Contact Integration**: WhatsApp, phone, and email integration
- **SEO Optimized**: XML sitemap, robots.txt, and meta tags
- **Modern UI**: Gradient designs and smooth animations
- **Performance**: Optimized images and fast loading

## 🚀 Tech Stack

- **Framework**: Next.js 15
- **Language**: JavaScript (ES6+)
- **Styling**: Bootstrap 5 + Custom CSS
- **Icons**: React Icons (Font Awesome)
- **Deployment**: Vercel

## 📁 Project Structure

```
app/
├── app/                    # Next.js app directory
│   ├── components/         # Reusable components
│   ├── cakes/             # Product pages
│   ├── contact/           # Contact page
│   ├── privacy-policy/    # Legal pages
│   ├── terms-conditions/  # Legal pages
│   ├── site-map/          # Site map page
│   ├── sitemap.xml/       # XML sitemap route
│   ├── robots.txt/        # Robots.txt route
│   └── layout.js          # Root layout
├── public/                # Static assets
├── package.json           # Dependencies
├── next.config.mjs        # Next.js config
├── vercel.json           # Vercel deployment config
└── README.md             # This file
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd serles-fe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   - Push code to GitHub
   - Connect repository in Vercel dashboard
   - Deploy automatically

2. **Environment Variables** (if needed)
   ```env
   NEXT_PUBLIC_API_URL=https://your-api-domain.com
   ```

3. **Custom Domain**
   - Add `serlesbake.in` in Vercel dashboard
   - Update DNS records

### Manual Build

```bash
npm run build
npm start
```

## 📱 Pages

- **Home** (`/`) - Landing page with menu and promotions
- **Cakes** (`/cakes`) - All products listing
- **Categories** (`/cakes/[category]`) - Category-specific products
- **Product Details** (`/cakes/[category]/[product]`) - Individual product pages
- **Contact** (`/contact`) - Contact information and social links
- **Legal Pages** - Privacy Policy, Terms & Conditions
- **Site Map** (`/site-map`) - Visual site navigation

## 🔧 Configuration

### API Configuration
Update API endpoints in `app/config/api.js`:
```javascript
export const API_BASE_URL = 'https://your-api-domain.com/api';
```

### Image Domains
Update allowed image domains in `next.config.mjs`:
```javascript
images: {
  domains: ['your-domain.com', 'cdn-domain.com']
}
```

## 📊 SEO Features

- **XML Sitemap**: `/sitemap.xml`
- **Robots.txt**: `/robots.txt`
- **Meta Tags**: Dynamic meta information
- **Structured Data**: Product schema markup
- **Performance**: Optimized loading and caching

## 🎨 Customization

### Colors
Primary brand colors in `app/styles/_variables.scss`:
```scss
$primary-color: #e4718a;
$secondary-color: #f8a6b6;
$dark-color: #231f20;
```

### Styling
- **Bootstrap**: Main framework
- **Custom CSS**: Component-specific styles
- **SCSS**: Variables and mixins
- **Inline Styles**: Dynamic styling

## 📞 Contact Information

- **Phone**: +91 63830 70725
- **Email**: serlesbake@gmail.com
- **Address**: Tenkasi - Sengottai Main Road, Ilanji, Tenkasi, Tamil Nadu
- **Website**: serlesbake.in

## 🔗 Social Media

- **Instagram**: @serles_bake
- **Facebook**: Serle's Bake
- **WhatsApp**: +91 63830 70725

## 📄 License

This project is proprietary to Serles Bake.

## 🤝 Support

For technical support or questions:
- Email: serlesbake@gmail.com
- Phone: +91 63830 70725

---

**Built with ❤️ for Serles Bake**
