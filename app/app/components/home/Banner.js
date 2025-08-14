'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { getBannersUrl } from "../../config/api";

export default function Banner() {
  const [banners, setBanners] = useState([]);
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
        borderRadius: "12px", 
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
      }}>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            }
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            el: '.swiper-pagination-custom',
          }}
          loop={banners.length > 1}
        
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <Link href={banner.link || "/"} style={{ display: 'block', height: '100%' }}>
                <div 
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url(${banner.image || "/img/shop/product-1.jpg"})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative"
                  }}
                >
                
                  
                 
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Custom pagination below the slider */}
        <div className="swiper-pagination-custom" style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginTop: '15px',
          padding: '0 20px',
          margin: 'auto',
        }}></div>
      </div>

      <style jsx global>{`
        .swiper {
          height: 180px;
        }
        
        @media (min-width: 768px) {
          .swiper {
            height: 250px;
          }
        }
        
        .swiper-pagination-bullet {
          background: rgba(255,255,255,0.5);
          opacity: 1;
        }
        
        .swiper-pagination-bullet-active {
          background: #e4718a;
        }
        

      `}</style>
    </section>
  );
}
