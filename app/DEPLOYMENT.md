# 🚀 Vercel Deployment Guide

This guide will help you deploy the Serles Bake website to Vercel.

## 📋 Prerequisites

1. **GitHub Account**: Your code should be in a GitHub repository
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **Domain**: `serlesbake.in` (optional but recommended)

## 🔧 Step-by-Step Deployment

### 1. Prepare Your Repository

Ensure your repository structure is correct:
```
serles-fe/
├── app/                    # Your Next.js app
│   ├── package.json
│   ├── next.config.mjs
│   ├── vercel.json
│   └── ... (other files)
└── README.md
```

### 2. Connect to Vercel

1. **Login to Vercel Dashboard**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Sign in with GitHub

2. **Import Repository**
   - Click "New Project"
   - Select your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Project**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `app` (if your Next.js app is in the app folder)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

### 3. Environment Variables

Add these environment variables in Vercel dashboard:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com
NEXT_PUBLIC_API_ENDPOINT=/api/products/?format=json

# Website Configuration
NEXT_PUBLIC_SITE_URL=https://www.serlesbake.in
NEXT_PUBLIC_SITE_NAME=Serles Bake

# Contact Information
NEXT_PUBLIC_PHONE=+916383070725
NEXT_PUBLIC_EMAIL=serlesbake@gmail.com
NEXT_PUBLIC_ADDRESS=Tenkasi - Sengottai Main Road, Ilanji, Tenkasi, Tamil Nadu

# Social Media
NEXT_PUBLIC_INSTAGRAM=https://www.instagram.com/serles_bake
NEXT_PUBLIC_FACEBOOK=https://www.facebook.com/serlesbake
NEXT_PUBLIC_WHATSAPP=https://wa.me/916383070725
```

### 4. Deploy

1. **Click "Deploy"**
   - Vercel will build and deploy your project
   - First deployment takes 2-5 minutes

2. **Check Build Logs**
   - Monitor the build process
   - Fix any errors if they occur

### 5. Custom Domain Setup

1. **Add Domain in Vercel**
   - Go to Project Settings → Domains
   - Add `serlesbake.in`

2. **Update DNS Records**
   Add these records to your domain provider:
   ```
   Type: A
   Name: @
   Value: 76.76.19.34
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **Verify Domain**
   - Vercel will verify the domain
   - This may take up to 24 hours

## 🔍 Post-Deployment Checklist

### ✅ Verify Functionality
- [ ] Home page loads correctly
- [ ] All navigation links work
- [ ] Product pages display properly
- [ ] Contact page is accessible
- [ ] Social media links work
- [ ] Mobile responsiveness

### ✅ SEO Verification
- [ ] XML sitemap accessible: `serlesbake.in/sitemap.xml`
- [ ] Robots.txt accessible: `serlesbake.in/robots.txt`
- [ ] Meta tags are present
- [ ] Page titles are correct

### ✅ Performance Check
- [ ] Page load times are acceptable
- [ ] Images are optimized
- [ ] No console errors
- [ ] Mobile performance is good

## 🛠️ Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Check build locally first
   npm run build
   ```

2. **Environment Variables**
   - Ensure all `NEXT_PUBLIC_` variables are set
   - Check for typos in variable names

3. **Image Optimization**
   - Verify image domains in `next.config.mjs`
   - Check image URLs are accessible

4. **API Issues**
   - Ensure API endpoints are accessible
   - Check CORS settings on your backend

### Performance Optimization

1. **Enable Vercel Analytics**
   - Go to Project Settings → Analytics
   - Enable Web Analytics

2. **Image Optimization**
   - Use Next.js Image component
   - Optimize image formats (WebP, AVIF)

3. **Caching**
   - Leverage Vercel's edge caching
   - Set appropriate cache headers

## 📊 Monitoring

### Vercel Dashboard
- **Analytics**: Page views, performance metrics
- **Functions**: Serverless function logs
- **Deployments**: Build history and rollbacks

### External Tools
- **Google Search Console**: SEO monitoring
- **Google Analytics**: User behavior
- **PageSpeed Insights**: Performance monitoring

## 🔄 Continuous Deployment

### Automatic Deployments
- Every push to `main` branch triggers deployment
- Preview deployments for pull requests
- Automatic rollback on build failures

### Manual Deployments
- Redeploy from Vercel dashboard
- Rollback to previous versions
- Promote preview deployments

## 📞 Support

### Vercel Support
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

### Project Support
- Email: serlesbake@gmail.com
- Phone: +91 63830 70725

---

**Your website is now live at: https://www.serlesbake.in** 🎉 