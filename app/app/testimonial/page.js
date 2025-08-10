import Social from "../components/home/Social";
import Breadcrumb from "../components/Breadcrumb";
import { Metadata } from "next";

export const metadata = {
  title: "Customer Reviews - Serles Bake | Tenkasi's Favorite Cake Shop",
  description: "Read what our happy customers say about Serles Bake in Tenkasi. Discover why we're trusted for custom cakes, birthday cakes, and wedding cakes.",
  keywords: "cake shop reviews tenkasi, serles bake testimonials, customer feedback, best cake shop tenkasi",
  openGraph: {
    title: "Customer Reviews - Serles Bake | Tenkasi's Favorite Cake Shop",
    description: "Read what our happy customers say about Serles Bake in Tenkasi. Discover why we're trusted for custom cakes, birthday cakes, and wedding cakes.",
    url: "https://www.instagram.com/serlesbake/",
    siteName: "Serles Bake",
    type: "website",
  },
  alternates: {
    canonical: "/testimonial",
  },
};
export default function SocialPage() {
  return (
    <>
      <Breadcrumb title="Testimonials" />
      <Social />
    </>
  );
}