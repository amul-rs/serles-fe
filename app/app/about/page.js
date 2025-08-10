import About from "../components/home/About";
import Milestones from "../components/home/milestone";
import Team from "../components/home/Team";
import Breadcrumb from "../components/Breadcrumb";

import { Metadata } from "next";
export const metadata = {
  title: "About Us - Serles Bake | Homemade Cakes in Tenkasi",
  description: "Learn about Serles Bake, your trusted homemade cake shop in Tenkasi. Our passion for baking and commitment to quality makes every celebration special.",
  keywords: "about serles bake, tenkasi bakery, cake shop history, custom cake makers, homemade cake shop tenkasi",
  openGraph: {
    title: "About Us - Serles Bake | Homemade Cakes in Tenkasi",
    description: "Learn about Serles Bake, your trusted homemade cake shop in Tenkasi. Our passion for baking and commitment to quality makes every celebration special.",
    images: "/img/hero/hero-1.jpg",
  },
};
export default function AboutPage() {
  return (
    <>
      <Breadcrumb title="About Us" />
      <About />
      <Milestones />
      <Team />
    </>
  );
}