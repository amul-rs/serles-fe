'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import { getBannersUrl } from "../../config/api";

export default function Banner() {
  const [banners, setBanners] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch(getBannersUrl());
        if (!res.ok) throw new Error("Failed to fetch banners");
        const json = await res.json();
        const bannerData = Array.isArray(json?.results) ? json.results : [];
        setBanners(bannerData);
      } catch (error) {
        console.error("Error fetching banners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // Auto-advance slides
  useEffect(() => {
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [banners.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  if (loading) {
    return (
      <section className="container pt-0">
        <div style={{ 
          height: 300, 
          background: "#f8f9fa", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          borderRadius: "12px"
        }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </section>
    );
  }

  if (!banners.length) {
    return (
      <section className="container pt-0">
        <div style={{ 
          height: 300, 
          background: "linear-gradient(135deg, #fff5f7 0%, #ffeef2 100%)", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          borderRadius: "12px",
          border: "2px dashed #e4718a"
        }}>
          <div className="text-center">
            <h4 style={{ color: "#e4718a" }}>No banners available</h4>
            <p className="text-muted">Check back later for exciting offers!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container pt-0">
      <div style={{ 
        position: "relative", 
        borderRadius: "12px", 
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
      }}>
        {/* Carousel Container */}
        <div style={{ 
          position: "relative", 
          height: 400, 
          overflow: "hidden"
        }}>
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundImage: `url(${banner.image || "/img/shop/product-1.jpg"})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: index === currentSlide ? 1 : 0,
                transition: "opacity 0.5s ease-in-out",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {/* Overlay for better text readability */}
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0,0,0,0.3)"
              }}></div>
              
              {/* Content */}
              <div className="text-center text-white" style={{ position: "relative", zIndex: 2 }}>
                {banner.title && (
                  <h2 style={{ 
                    fontSize: "2.5rem", 
                    fontWeight: "700", 
                    marginBottom: "1rem",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.5)"
                  }}>
                    {banner.title}
                  </h2>
                )}
                {banner.button_text && (
                  <Link 
                    href={banner.link || "/"} 
                    style={{
                      display: "inline-block",
                      background: "#e4718a",
                      color: "white",
                      padding: "12px 30px",
                      borderRadius: "25px",
                      textDecoration: "none",
                      fontWeight: "600",
                      fontSize: "1.1rem",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 15px rgba(228, 113, 138, 0.4)"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "#d1627a";
                      e.target.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "#e4718a";
                      e.target.style.transform = "translateY(0)";
                    }}
                  >
                    {banner.button_text}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Indicators */}
        {banners.length > 1 && (
          <div style={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "8px",
            zIndex: 3
          }}>
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  border: "none",
                  background: index === currentSlide ? "#e4718a" : "rgba(255,255,255,0.5)",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Navigation Arrows */}
        {banners.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              style={{
                position: "absolute",
                left: "20px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.8)",
                border: "none",
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 3,
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(255,255,255,1)";
                e.target.style.transform = "translateY(-50%) scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255,255,255,0.8)";
                e.target.style.transform = "translateY(-50%) scale(1)";
              }}
              aria-label="Previous slide"
            >
              <span style={{ fontSize: "1.5rem", color: "#333" }}>‹</span>
            </button>
            
            <button
              onClick={goToNext}
              style={{
                position: "absolute",
                right: "20px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.8)",
                border: "none",
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 3,
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(255,255,255,1)";
                e.target.style.transform = "translateY(-50%) scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255,255,255,0.8)";
                e.target.style.transform = "translateY(-50%) scale(1)";
              }}
              aria-label="Next slide"
            >
              <span style={{ fontSize: "1.5rem", color: "#333" }}>›</span>
            </button>
          </>
        )}
      </div>
    </section>
  );
}
