'use client'
import Breadcrumb from "../components/Breadcrumb";
import Link from "next/link";

export default function SiteMapPage() {
  return (
    <>
      <Breadcrumb title="Site Map" />
      
      <section style={{ 
        background: "linear-gradient(135deg, #fef7f8 0%, #fff5f6 100%)", 
        padding: "80px 0 60px",
        minHeight: "100vh"
      }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div style={{
                background: "#fff",
                borderRadius: "20px",
                padding: "40px",
                boxShadow: "0 8px 32px rgba(228, 113, 138, 0.1)",
                lineHeight: "1.8"
              }}>
                <h1 className="text-center mb-5" style={{ 
                  color: "#e4718a",
                  fontWeight: "700",
                  fontSize: "2.5rem"
                }}>
                  Site Map
                </h1>
                
                <p className="text-center text-muted mb-5" style={{ fontSize: "1.1rem" }}>
                  Navigate through all pages and sections of serlesbake.in
                </p>

                <div className="row">
                  {/* Main Pages */}
                  <div className="col-md-6 mb-4">
                    <div style={{
                      background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                      borderRadius: "15px",
                      padding: "25px",
                      height: "100%"
                    }}>
                      <h3 style={{ 
                        color: "#e4718a", 
                        marginBottom: "1.5rem",
                        fontSize: "1.5rem",
                        fontWeight: "600"
                      }}>
                        🏠 Main Pages
                      </h3>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                        <li style={{ marginBottom: "0.8rem" }}>
                          <Link href="/" style={{ 
                            color: "#333", 
                            textDecoration: "none",
                            fontSize: "1rem",
                            transition: "color 0.3s ease"
                          }}
                          onMouseEnter={(e) => e.target.style.color = "#e4718a"}
                          onMouseLeave={(e) => e.target.style.color = "#333"}
                          >
                            • Home Page
                          </Link>
                        </li>
                        <li style={{ marginBottom: "0.8rem" }}>
                          <Link href="/contact" style={{ 
                            color: "#333", 
                            textDecoration: "none",
                            fontSize: "1rem",
                            transition: "color 0.3s ease"
                          }}
                          onMouseEnter={(e) => e.target.style.color = "#e4718a"}
                          onMouseLeave={(e) => e.target.style.color = "#333"}
                          >
                            • Contact Us
                          </Link>
                        </li>
                        <li style={{ marginBottom: "0.8rem" }}>
                          <Link href="/privacy-policy" style={{ 
                            color: "#333", 
                            textDecoration: "none",
                            fontSize: "1rem",
                            transition: "color 0.3s ease"
                          }}
                          onMouseEnter={(e) => e.target.style.color = "#e4718a"}
                          onMouseLeave={(e) => e.target.style.color = "#333"}
                          >
                            • Privacy Policy
                          </Link>
                        </li>
                        <li style={{ marginBottom: "0.8rem" }}>
                          <Link href="/terms-conditions" style={{ 
                            color: "#333", 
                            textDecoration: "none",
                            fontSize: "1rem",
                            transition: "color 0.3s ease"
                          }}
                          onMouseEnter={(e) => e.target.style.color = "#e4718a"}
                          onMouseLeave={(e) => e.target.style.color = "#333"}
                          >
                            • Terms & Conditions
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Product Pages */}
                  <div className="col-md-6 mb-4">
                    <div style={{
                      background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                      borderRadius: "15px",
                      padding: "25px",
                      height: "100%"
                    }}>
                      <h3 style={{ 
                        color: "#e4718a", 
                        marginBottom: "1.5rem",
                        fontSize: "1.5rem",
                        fontWeight: "600"
                      }}>
                        🎂 Product Pages
                      </h3>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                        <li style={{ marginBottom: "0.8rem" }}>
                          <Link href="/cakes" style={{ 
                            color: "#333", 
                            textDecoration: "none",
                            fontSize: "1rem",
                            transition: "color 0.3s ease"
                          }}
                          onMouseEnter={(e) => e.target.style.color = "#e4718a"}
                          onMouseLeave={(e) => e.target.style.color = "#333"}
                          >
                            • All Cakes
                          </Link>
                        </li>
                        <li style={{ marginBottom: "0.8rem" }}>
                          <Link href="/cakes/birthday-cakes" style={{ 
                            color: "#333", 
                            textDecoration: "none",
                            fontSize: "1rem",
                            transition: "color 0.3s ease"
                          }}
                          onMouseEnter={(e) => e.target.style.color = "#e4718a"}
                          onMouseLeave={(e) => e.target.style.color = "#333"}
                          >
                            • Birthday Cakes
                          </Link>
                        </li>
                        <li style={{ marginBottom: "0.8rem" }}>
                          <Link href="/cakes/wedding-cakes" style={{ 
                            color: "#333", 
                            textDecoration: "none",
                            fontSize: "1rem",
                            transition: "color 0.3s ease"
                          }}
                          onMouseEnter={(e) => e.target.style.color = "#e4718a"}
                          onMouseLeave={(e) => e.target.style.color = "#333"}
                          >
                            • Wedding Cakes
                          </Link>
                        </li>
                        <li style={{ marginBottom: "0.8rem" }}>
                          <Link href="/cakes/anniversary-cakes" style={{ 
                            color: "#333", 
                            textDecoration: "none",
                            fontSize: "1rem",
                            transition: "color 0.3s ease"
                          }}
                          onMouseEnter={(e) => e.target.style.color = "#e4718a"}
                          onMouseLeave={(e) => e.target.style.color = "#333"}
                          >
                            • Anniversary Cakes
                          </Link>
                        </li>
                        <li style={{ marginBottom: "0.8rem" }}>
                          <Link href="/cakes/custom-cakes" style={{ 
                            color: "#333", 
                            textDecoration: "none",
                            fontSize: "1rem",
                            transition: "color 0.3s ease"
                          }}
                          onMouseEnter={(e) => e.target.style.color = "#e4718a"}
                          onMouseLeave={(e) => e.target.style.color = "#333"}
                          >
                            • Custom Cakes
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Category Pages */}
                  <div className="col-md-6 mb-4">
                    <div style={{
                      background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                      borderRadius: "15px",
                      padding: "25px",
                      height: "100%"
                    }}>
                      <h3 style={{ 
                        color: "#e4718a", 
                        marginBottom: "1.5rem",
                        fontSize: "1.5rem",
                        fontWeight: "600"
                      }}>
                        📂 Categories
                      </h3>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                        <li style={{ marginBottom: "0.8rem" }}>
                          <Link href="/cakes/buttercream-cakes" style={{ 
                            color: "#333", 
                            textDecoration: "none",
                            fontSize: "1rem",
                            transition: "color 0.3s ease"
                          }}
                          onMouseEnter={(e) => e.target.style.color = "#e4718a"}
                          onMouseLeave={(e) => e.target.style.color = "#333"}
                          >
                            • Buttercream Cakes
                          </Link>
                        </li>
                        <li style={{ marginBottom: "0.8rem" }}>
                          <Link href="/cakes/fondant-cakes" style={{ 
                            color: "#333", 
                            textDecoration: "none",
                            fontSize: "1rem",
                            transition: "color 0.3s ease"
                          }}
                          onMouseEnter={(e) => e.target.style.color = "#e4718a"}
                          onMouseLeave={(e) => e.target.style.color = "#333"}
                          >
                            • Fondant Cakes
                          </Link>
                        </li>
                        <li style={{ marginBottom: "0.8rem" }}>
                          <Link href="/cakes/chocolate-cakes" style={{ 
                            color: "#333", 
                            textDecoration: "none",
                            fontSize: "1rem",
                            transition: "color 0.3s ease"
                          }}
                          onMouseEnter={(e) => e.target.style.color = "#e4718a"}
                          onMouseLeave={(e) => e.target.style.color = "#333"}
                          >
                            • Chocolate Cakes
                          </Link>
                        </li>
                        <li style={{ marginBottom: "0.8rem" }}>
                          <Link href="/cakes/eggless-cakes" style={{ 
                            color: "#333", 
                            textDecoration: "none",
                            fontSize: "1rem",
                            transition: "color 0.3s ease"
                          }}
                          onMouseEnter={(e) => e.target.style.color = "#e4718a"}
                          onMouseLeave={(e) => e.target.style.color = "#333"}
                          >
                            • Eggless Cakes
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Information Pages */}
                  <div className="col-md-6 mb-4">
                    <div style={{
                      background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                      borderRadius: "15px",
                      padding: "25px",
                      height: "100%"
                    }}>
                      <h3 style={{ 
                        color: "#e4718a", 
                        marginBottom: "1.5rem",
                        fontSize: "1.5rem",
                        fontWeight: "600"
                      }}>
                        ℹ️ Information
                      </h3>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                        <li style={{ marginBottom: "0.8rem" }}>
                          <Link href="/about" style={{ 
                            color: "#333", 
                            textDecoration: "none",
                            fontSize: "1rem",
                            transition: "color 0.3s ease"
                          }}
                          onMouseEnter={(e) => e.target.style.color = "#e4718a"}
                          onMouseLeave={(e) => e.target.style.color = "#333"}
                          >
                            • About Us
                          </Link>
                        </li>
                        <li style={{ marginBottom: "0.8rem" }}>
                          <Link href="/delivery" style={{ 
                            color: "#333", 
                            textDecoration: "none",
                            fontSize: "1rem",
                            transition: "color 0.3s ease"
                          }}
                          onMouseEnter={(e) => e.target.style.color = "#e4718a"}
                          onMouseLeave={(e) => e.target.style.color = "#333"}
                          >
                            • Delivery Information
                          </Link>
                        </li>
                        <li style={{ marginBottom: "0.8rem" }}>
                          <Link href="/faq" style={{ 
                            color: "#333", 
                            textDecoration: "none",
                            fontSize: "1rem",
                            transition: "color 0.3s ease"
                          }}
                          onMouseEnter={(e) => e.target.style.color = "#e4718a"}
                          onMouseLeave={(e) => e.target.style.color = "#333"}
                          >
                            • Frequently Asked Questions
                          </Link>
                        </li>
                        <li style={{ marginBottom: "0.8rem" }}>
                          <Link href="/allergen-info" style={{ 
                            color: "#333", 
                            textDecoration: "none",
                            fontSize: "1rem",
                            transition: "color 0.3s ease"
                          }}
                          onMouseEnter={(e) => e.target.style.color = "#e4718a"}
                          onMouseLeave={(e) => e.target.style.color = "#333"}
                          >
                            • Allergen Information
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Quick Links Section */}
                <div className="mt-5">
                  <h3 style={{ 
                    color: "#e4718a", 
                    marginBottom: "1.5rem",
                    fontSize: "1.8rem",
                    fontWeight: "600",
                    textAlign: "center"
                  }}>
                    🔗 Quick Links
                  </h3>
                  <div className="row justify-content-center">
                    <div className="col-md-8">
                      <div style={{
                        background: "linear-gradient(135deg, #e4718a 0%, #f8a6b6 100%)",
                        borderRadius: "15px",
                        padding: "30px",
                        textAlign: "center"
                      }}>
                        <div className="row">
                          <div className="col-md-4 mb-3">
                            <Link href="tel:+916383070725" style={{ 
                              color: "#fff", 
                              textDecoration: "none",
                              fontSize: "1.1rem",
                              fontWeight: "600",
                              display: "block"
                            }}>
                              📞 Call Now
                            </Link>
                          </div>
                          <div className="col-md-4 mb-3">
                            <Link href="https://wa.me/916383070725" style={{ 
                              color: "#fff", 
                              textDecoration: "none",
                              fontSize: "1.1rem",
                              fontWeight: "600",
                              display: "block"
                            }}>
                              💬 WhatsApp
                            </Link>
                          </div>
                          <div className="col-md-4 mb-3">
                            <Link href="mailto:serlesbake@gmail.com" style={{ 
                              color: "#fff", 
                              textDecoration: "none",
                              fontSize: "1.1rem",
                              fontWeight: "600",
                              display: "block"
                            }}>
                              ✉️ Email Us
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* XML Sitemap Link */}
                <div className="text-center mt-4">
                  <p className="text-muted mb-2">
                    For search engines and developers:
                  </p>
                  <Link href="/sitemap.xml" style={{ 
                    color: "#e4718a", 
                    textDecoration: "none",
                    fontSize: "1rem",
                    fontWeight: "600"
                  }}>
                    📄 View XML Sitemap
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 