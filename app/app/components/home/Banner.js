import Link from "next/link";
import { getBannersUrl } from "../../config/api";

async function fetchBanners() {
  const res = await fetch(getBannersUrl(), { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch banners");
  const json = await res.json();
  return Array.isArray(json?.results) ? json.results : [];
}

export default async function Banner() {
  const banners = await fetchBanners();

  if (!banners.length) {
    return (
      <section className="container py-4">
        <p>No banners found.</p>
      </section>
    );
  }

  return (
    <section className="container pt-0" >
      <div id="bannerCarousel " className="carousel slide" data-bs-ride="carousel" >
        <div className="carousel-indicators" >
          {banners.map((b, idx) => (
            <button
              key={b.id}
              type="button"
              data-bs-target="#bannerCarousel"
              data-bs-slide-to={idx}
              className={idx === 0 ? "active" : ""}
              aria-current={idx === 0 ? "true" : undefined}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
        <div className="carousel-inner border-r overflow-hidden">
          {banners.map((b, idx) => (
            <div
              className={`carousel-item${idx === 0 ? " active" : ""}`}
              key={b.id}
              style={{
                minHeight: 300,
                backgroundImage: `url(${b.image || "/img/shop/product-1.jpg"})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="d-flex justify-content-center align-items-center h-100 p-5">
                {/* <h2 className="display-5 text-white">{b.title}</h2> */}
                {/* <Link href={b.link || "/"} className="btn btn-primary mt-2">
                  {b.button_text || "Shop Now"}
                </Link> */}
              </div>
            </div>
          ))}
        </div>
        {banners.length > 1 && (
          <>
            <button className="carousel-control-prev" type="button" data-bs-target="#bannerCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#bannerCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </>
        )}
      </div>
    </section>
  );
}
