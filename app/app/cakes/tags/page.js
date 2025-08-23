"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Link from "next/link";
import Breadcrumb from "../../components/Breadcrumb";
import apiCache from "../../utils/cache";
import { getProductsUrl, getTagsUrl } from "../../config/api";

export default function TagsPage() {
  const router = useRouter();
  const [tags, setTags] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  // Calculate product count for each tag
  const calculateTagCounts = useCallback((tags, products) => {
    return tags.map(tag => {
      const count = products.filter(product => 
        product.tags && Array.isArray(product.tags) && 
        product.tags.some(t => t.slug === tag.slug)
      ).length;
      return { ...tag, productCount: count };
    }).filter(tag => tag.productCount > 0); // Only show tags with products
  }, []);

  // Fetch data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all data in parallel
      const [tagsData, productsData] = await Promise.all([
        apiCache.fetchWithCache(getTagsUrl()),
        apiCache.fetchWithCache(getProductsUrl())
      ]);

      const tagsList = tagsData.results || tagsData;
      const productsList = productsData.results || productsData;

      // Calculate tag counts
      const tagsWithCounts = calculateTagCounts(tagsList, productsList);

      setTags(tagsWithCounts);
      setProducts(productsList);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load tags. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [calculateTagCounts]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Breadcrumb items
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Cakes", href: "/cakes" },
    { name: "Tags", href: "/cakes/tags" }
  ];

  // Meta data - dynamically generated from API with fallback
  const metaData = useMemo(() => ({
    title: "All Cake Tags - Serle's Bake | From Our Oven to Your Heart",
    description: tags.length > 0 
      ? `Browse all cake tags and categories at Serle's Bake. From ${tags.slice(0, 5).map(t => t.name).join(', ')} and more, find the perfect cake for your special occasion. Fresh cakes delivered in Tenkasi, Tamil Nadu.`
      : "Browse all cake tags and categories at Serle's Bake. From Black Forest to Red Velvet, Choco Truffle to Custom Cakes, find the perfect cake for your special occasion. Fresh cakes delivered in Tenkasi, Tamil Nadu.",
    keywords: tags.length > 0 
      ? `cake tags, cake categories, Serle's Bake, Tenkasi cakes, ${tags.map(t => t.name.toLowerCase()).join(', ')}, birthday cakes, wedding cakes, custom cakes, Tamil Nadu bakery, fresh cakes delivery`
      : "cake tags, cake categories, Serle's Bake, Tenkasi cakes, Black Forest cake, Red Velvet cake, Choco Truffle cake, custom cakes, birthday cakes, wedding cakes, brownies, Tamil Nadu bakery, fresh cakes delivery",
    ogTitle: "All Cake Tags - Serle's Bake | From Our Oven to Your Heart",
    ogDescription: tags.length > 0 
      ? `Browse all cake tags and categories at Serle's Bake. From ${tags.slice(0, 5).map(t => t.name).join(', ')} and more, find the perfect cake for your special occasion. Fresh cakes delivered in Tenkasi, Tamil Nadu.`
      : "Browse all cake tags and categories at Serle's Bake. From Black Forest to Red Velvet, Choco Truffle to Custom Cakes, find the perfect cake for your special occasion. Fresh cakes delivered in Tenkasi, Tamil Nadu.",
    ogType: "website",
    ogUrl: "https://www.serlesbake.in/cakes/tags",
    ogImage: "https://www.serlesbake.in/img/logo.png",
    twitterCard: "summary_large_image",
    twitterTitle: "All Cake Tags - Serle's Bake | From Our Oven to Your Heart",
    twitterDescription: tags.length > 0 
      ? `Browse all cake tags and categories at Serle's Bake. From ${tags.slice(0, 5).map(t => t.name).join(', ')} and more, find the perfect cake for your special occasion. Fresh cakes delivered in Tenkasi, Tamil Nadu.`
      : "Browse all cake tags and categories at Serle's Bake. From Black Forest to Red Velvet, Choco Truffle to Custom Cakes, find the perfect cake for your special occasion. Fresh cakes delivered in Tenkasi, Tamil Nadu.",
    twitterImage: "https://www.serlesbake.in/img/logo.png",
    canonical: "https://www.serlesbake.in/cakes/tags"
  }), [tags]);

  if (loading) {
    return (
      <>
        <Head>
          <title>{metaData.title}</title>
          <meta name="description" content={metaData.description} />
          <meta name="keywords" content={metaData.keywords} />
          <link rel="canonical" href={metaData.canonical} />
          <meta property="og:title" content={metaData.ogTitle} />
          <meta property="og:description" content={metaData.ogDescription} />
          <meta property="og:type" content={metaData.ogType} />
          <meta property="og:url" content={metaData.ogUrl} />
          <meta property="og:image" content={metaData.ogImage} />
          <meta name="twitter:card" content={metaData.twitterCard} />
          <meta name="twitter:title" content={metaData.twitterTitle} />
          <meta name="twitter:description" content={metaData.twitterDescription} />
          <meta name="twitter:image" content={metaData.twitterImage} />
        </Head>
        <div className="container mt-5">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Head>
          <title>Error - Serles Bake</title>
        </Head>
        <div className="container mt-5">
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Error Loading Tags</h4>
            <p>{error}</p>
            <hr />
            <p className="mb-0">
              <button 
                className="btn btn-primary" 
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>All Tags - Serles Bake</title>
        <meta name="description" content="Browse all cake tags and categories. Find the perfect cake for your special occasion." />
        <meta name="keywords" content="cake tags, cake categories, bakery tags, Serles Bake" />
        <meta property="og:title" content="All Tags - Serles Bake" />
        <meta property="og:description" content="Browse all cake tags and categories. Find the perfect cake for your special occasion." />
        <meta property="og:url" content="https://www.serlesbake.in/cakes/tags" />
        <meta name="twitter:title" content="All Tags - Serles Bake" />
        <meta name="twitter:description" content="Browse all cake tags and categories. Find the perfect cake for your special occasion." />
      </Head>

      <div className="container mt-5">
        <Breadcrumb 
          title="All Tags"
          items={breadcrumbItems}
        />

        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <h2>Browse by Tags</h2>
              <p>Discover our cakes organized by tags and categories</p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            {tags.length > 0 ? (
              <div className="tags-grid">
                <div className="row">
                  {tags.map((tag) => (
                    <div key={tag.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                      <Link 
                        href={`/cakes/tags/${tag.slug}`}
                        className="tag-card text-decoration-none"
                        style={{
                          display: 'block',
                          padding: '20px',
                          border: '1px solid #e0e0e0',
                          borderRadius: '8px',
                          textAlign: 'center',
                          transition: 'all 0.3s ease',
                          backgroundColor: '#fff',
                          color: '#333',
                          textDecoration: 'none'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-5px)';
                          e.target.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                          e.target.style.borderColor = '#b61123';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = 'none';
                          e.target.style.borderColor = '#e0e0e0';
                        }}
                      >
                        <h5 className="mb-2" style={{ color: '#b61123', fontWeight: '600' }}>
                          {tag.name}
                        </h5>
                        <p className="mb-0 text-muted">
                          {tag.productCount} {tag.productCount === 1 ? 'product' : 'products'}
                        </p>
                        {tag.description && (
                          <p className="mt-2 text-muted small">
                            {tag.description.length > 50 
                              ? `${tag.description.substring(0, 50)}...` 
                              : tag.description
                            }
                          </p>
                        )}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-5">
                <h4>No tags found</h4>
                <p className="text-muted">There are no tags available at the moment.</p>
                <Link href="/cakes" className="btn btn-primary">
                  Browse All Cakes
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-lg-12">
            <div className="text-center">
              <Link href="/cakes" className="btn btn-outline-primary">
                ← Back to All Cakes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 