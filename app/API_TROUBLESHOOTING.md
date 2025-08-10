# API Troubleshooting Guide

## 404 Errors

If you're seeing 404 errors when trying to fetch products and categories, here are the steps to fix it:

### 1. Check Your Backend API

Make sure your backend API is running and accessible at the configured URL. The default configuration expects:

- **Base URL**: `http://127.0.0.1:8000`
- **Products Endpoint**: `/api/products/?format=json`
- **Categories Endpoint**: `/api/categories/?format=json`

### 2. Environment Variables

Create a `.env.local` file in the root of your project with:

```env
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
NEXT_PUBLIC_PRODUCTS_ENDPOINT=/api/products/?format=json
NEXT_PUBLIC_CATEGORIES_ENDPOINT=/api/categories/?format=json
```

### 3. Verify API Endpoints

Test your API endpoints directly in the browser or with curl:

```bash
# Test products endpoint
curl http://127.0.0.1:8000/api/products/?format=json

# Test categories endpoint  
curl http://127.0.0.1:8000/api/categories/?format=json
```

### 4. Common Issues

- **CORS**: Make sure your backend allows requests from your frontend domain
- **Port**: Verify the API is running on the correct port (8000 by default)
- **Endpoints**: Check that the API endpoints match exactly (including trailing slashes)

### 5. Fallback Mode

If the API is not available, the shop page will show mock data to demonstrate the functionality.

### 6. Debug Information

The console will show detailed information about:
- The exact URLs being called
- Response status codes
- Response data structure

This helps identify if the issue is with the URL, the API response format, or network connectivity. 