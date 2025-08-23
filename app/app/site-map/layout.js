export async function generateMetadata() {
  return {
    title: "Site Map - Serle's Bake | Complete Navigation Guide",
    description: "Explore the complete site map of Serle's Bake. Navigate through all our cake categories, products, and pages. Find your perfect cake with our comprehensive navigation guide.",
    keywords: "site map, navigation, cake categories, products, Serle's Bake, Tenkasi cakes, bakery navigation",
    openGraph: {
      title: "Site Map - Serle's Bake | Complete Navigation Guide",
      description: "Explore the complete site map of Serle's Bake. Navigate through all our cake categories, products, and pages.",
      type: 'website',
      url: 'https://www.serlesbake.in/site-map',
      images: ['https://www.serlesbake.in/img/logo.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: "Site Map - Serle's Bake | Complete Navigation Guide",
      description: "Explore the complete site map of Serle's Bake. Navigate through all our cake categories, products, and pages.",
      images: ['https://www.serlesbake.in/img/logo.png'],
    },
    alternates: {
      canonical: 'https://www.serlesbake.in/site-map',
    },
  };
}

export default function SiteMapLayout({ children }) {
  return children;
} 