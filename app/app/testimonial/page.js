import Social from "../components/home/Social";
import Breadcrumb from "../components/Breadcrumb";
import { Metadata } from "next";

export const metadata = {
  title: "Customer Reviews | Best Homemade Cakes Near Me – Serle’s Bake Tenkasi",
  description: "See what our happy customers say about Serle’s Bake – Tenkasi’s trusted cake shop for birthday cakes, brownies & custom creations with same-day delivery.",
  keywords: "cake shop reviews tenkasi, serles bake testimonials, customer feedback, best cake shop tenkasi",
  openGraph: {
    title: "Customer Reviews | Best Homemade Cakes Near Me – Serle’s Bake Tenkasi",
    description: "See what our happy customers say about Serle’s Bake – Tenkasi’s trusted cake shop for birthday cakes, brownies & custom creations with same-day delivery.",
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