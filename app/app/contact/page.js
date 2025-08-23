import ContactPageClient from './ContactPageClient';

export const metadata = {
  title: "Contact Serle's Bake | Order Cakes Online in Tenkasi | Cakes Near Me",
  description: "Get in touch with Serle's Bake – order cakes online, request custom designs, or ask about delivery. Your local homemade cake shop in Tenkasi.",
  keywords: "cake shop contact tenkasi, serles bake contact, customer support, best cake shop tenkasi",
  openGraph: {
    title: "Contact Serle's Bake | Order Cakes Online in Tenkasi | Cakes Near Me",
    description: "Get in touch with Serle's Bake – order cakes online, request custom designs, or ask about delivery. Your local homemade cake shop in Tenkasi.",
    url: "https://www.serlesbake.in/contact",
    siteName: "Serle's Bake",
    type: "website",
    images: [
      {
        url: "/img/logo.png",
        width: 1200,
        height: 630,
        alt: "Serle's Bake Logo",
      },
    ],
    locale: "en_US",
    siteName: "Serle's Bake",
    type: "website",
    twitter: {
      card: "summary_large_image",
      title: "Contact Serle's Bake | Order Cakes Online in Tenkasi | Cakes Near Me",
      description: "Get in touch with Serle's Bake – order cakes online, request custom designs, or ask about delivery. Your local homemade cake shop in Tenkasi.",
      images: ["/img/logo.png"],
    },
    alternates: {
      canonical: "/contact",
    },
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}

