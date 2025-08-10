"use client"
import Link from "next/link";

export default function FeaturedCakeCTA() {
  return (
    <section className="cta-section container-fluid p-0"
      style={{
        backgroundImage: "url('/img/hero/hero-1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        textAlign: "center",
        position: "relative",
        color: "#fff",
        minHeight: "340px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div 
        style={{
          background: "rgba(35, 31, 32, 0.68)",
          padding: "40px 10% 36px 10%",

          margin: "0 auto",
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)"
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          <span
            style={{
              color: "#ffb6c1",
              fontFamily: "'Pacifico', cursive",
              fontSize: "2rem",
              fontWeight: 700,
              letterSpacing: "1px"
            }}
          >
            Black Forest
          </span>
        </div>
        <h2
          className="h1 text-white"
        >
          OUR FEATURED HOMEMADE CAKE
        </h2>
        <div
          style={{
            width: "60px",
            height: "4px",
            background: "#ffb6c1",
            margin: "0 auto 22px auto",
            borderRadius: "2px"
          }}
        ></div>
        <p
          style={{
            fontSize: "1.08rem",
            color: "#f3eaea",
            margin: "0 0 28px 0",
            lineHeight: "1.6"
          }}
        >
          Introducing our signature Black Forest Cake, a timeless favorite and the star of our menu. Crafted with layers of rich chocolate sponge, velvety whipped cream, and topped with juicy cherries, this cake is the perfect choice for any celebration or indulgence. Experience the taste that everyone is talking about!
        </p>
        <h3 className="text-pink h2 mb-4 text-white">10% OFF on First Order</h3>
        <Link
          href="https://wa.me/916383070725?text=I%20want%20to%20order%20the%20Black%20Forest%20cake"
          style={{
            display: "inline-block",
            background: "#ff6f91",
            color: "#fff",
            fontWeight: 700,
            fontSize: "1.1rem",
            padding: "12px 36px",
            borderRadius: "6px",
            textDecoration: "none",
            boxShadow: "0 2px 8px rgba(255, 111, 145, 0.18)",
            transition: "background 0.2s"
          }}
          onMouseEnter={e => (e.target.style.background = "#e4718a")}
          onMouseLeave={e => (e.target.style.background = "#ff6f91")}
        >
          Order Now
        </Link>
      </div>
    </section>
  );
}
