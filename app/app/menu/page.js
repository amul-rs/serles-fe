import AllProductsMenu from "@/app/components/AllProductsMenu";
import Breadcrumb from "@/app/components/Breadcrumb";
import { Metadata } from "next";
import Cta from "@/app/components/home/cta";

export const metadata = {
  title: "Menu & Pricing - Serles Bake | Custom Cakes Tenkasi",
  description: "Explore our delicious cake menu at Serles Bake, Tenkasi. From birthday cakes to wedding cakes, find prices for all our homemade custom cakes and desserts.",
  keywords: "cake menu tenkasi, cake prices, custom cake cost, birthday cake pricing, wedding cake menu, homemade cakes tenkasi",
};

export default function MenuPage() {
  return (
    <>
      <Breadcrumb title="Menu & Pricing" />
      <AllProductsMenu />
      <Cta />
    </>
  );
}