import { Inter } from "next/font/google";
import "./globals.scss";
import Header from './components/Header';
import Footer from './components/Footer';
import DebugInfo from './components/DebugInfo';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Serle's Bake - Home Made Cakes | From Our Oven to Your Heart",
  description: "At Serle's Bake, we bring you the warmth and love of homemade cakes crafted with care and passion. Premium cakes, flavored cakes, custom cakes, and brownies in Tenkasi, Tamil Nadu.",
  keywords: "homemade cakes, Serle's Bake, Tenkasi cakes, birthday cakes, wedding cakes, custom cakes, brownies, Tamil Nadu bakery, fresh cakes, premium cakes, flavored cakes",
  authors: [{ name: "Serle's Bake" }],
  creator: "Serle's Bake",
  publisher: "Serle's Bake",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://serlesbake.pages.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Serle's Bake - Home Made Cakes | From Our Oven to Your Heart",
    description: "At Serle's Bake, we bring you the warmth and love of homemade cakes crafted with care and passion. Premium cakes, flavored cakes, custom cakes, and brownies in Tenkasi, Tamil Nadu.",
    url: 'https://serlesbake.in',
    siteName: "Serle's Bake",
    images: [
      {
        url: '/img/logo.png',
        width: 1200,
        height: 630,
        alt: "Serle's Bake Logo",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Serle's Bake - Home Made Cakes | From Our Oven to Your Heart",
    description: "At Serle's Bake, we bring you the warmth and love of homemade cakes crafted with care and passion. Premium cakes, flavored cakes, custom cakes, and brownies in Tenkasi, Tamil Nadu.",
    images: ['/img/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/serlesfavicon.ico" />
        {/* <link rel="manifest" href="/site.webmanifest" /> */}
        <meta name="theme-color" content="#b61123" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Oswald:wght@500;600;700&family=Pacifico&display=swap" rel="stylesheet" />
        
        {/* Google Analytics - Fixed referrer policy */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-PXF11QPRMS" referrerPolicy="no-referrer-when-downgrade"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-PXF11QPRMS', {
                page_path: window.location.pathname,
                anonymize_ip: true,
                send_page_view: true
              });
            `
          }}
        />
        
        {/* Template CSS Files */}
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="/css/flaticon.css" />
        <link rel="stylesheet" href="/css/barfiller.css" />
        <link rel="stylesheet" href="/css/magnific-popup.css" />
        <link rel="stylesheet" href="/css/elegant-icons.css" />
        <link rel="stylesheet" href="/css/nice-select.css" />
        <link rel="stylesheet" href="/css/owl.carousel.min.css" />
        <link rel="stylesheet" href="/css/slicknav.min.css" />
      </head>
      <body className={inter.className}>
        {/* Page Preloder */}
        <div id="preloder">
          <div className="loader"></div>
        </div>

        <Header />
        
        <main>
          {children}
        </main>
        
        <Footer />
        
        {/* Debug Info - Only in development */}
        <DebugInfo />

        {/* Scripts - Loaded asynchronously */}
        <script src="/js/jquery-3.3.1.min.js" async></script>
        <script src="/js/bootstrap.min.js" async></script>
        <script src="/js/jquery.magnific-popup.min.js" async></script>
        <script src="/js/jquery.nice-select.min.js" async></script>
        <script src="/js/jquery.slicknav.js" async></script>
        <script src="/js/owl.carousel.min.js" async></script>
        <script src="/js/jquery.barfiller.js" async></script>
        <script src="/js/jquery.nicescroll.min.js" async></script>
        <script src="/js/main.js" async></script>
        
        {/* Preloader Script */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Prevent double execution
            if (window.preloaderInitialized) {
              // Already initialized, skip
            } else {
              window.preloaderInitialized = true;
              
              // Wait for all scripts to load before initializing
              window.addEventListener('load', function() {
                const preloader = document.getElementById('preloder');
                if (preloader && !preloader.classList.contains('hidden')) {
                  preloader.classList.add('hidden');
                  setTimeout(() => {
                    preloader.style.display = 'none';
                  }, 300);
                }
                
                // Initialize plugins after everything is loaded
                setTimeout(function() {
                  if (typeof $ !== 'undefined') {
                    // Initialize slicknav if it exists
                    if (typeof $.fn.slicknav !== 'undefined') {
                      try {
                        $(".mobile-menu").slicknav({
                          prependTo: '#mobile-menu-wrap',
                          allowParentLinks: true
                        });
                      } catch (e) {
                        console.warn('Slicknav initialization failed:', e);
                      }
                    }
                    
                    // Initialize other plugins
                    if (typeof $.fn.niceSelect !== 'undefined') {
                      $('select').niceSelect();
                    }
                    
                    if (typeof $.fn.magnificPopup !== 'undefined') {
                      $('.image-popup').magnificPopup({
                        type: 'image',
                        closeOnContentClick: true,
                        closeBtnInside: false,
                        fixedContentPos: true,
                        mainClass: 'mfp-no-margins mfp-with-zoom',
                        gallery: {
                          enabled: true,
                          navigateByImgClick: true,
                          preload: [0, 1]
                        },
                        image: {
                          verticalFit: true
                        },
                        callbacks: {
                          elementParse: function(item) {
                            item.el.attr('title', item.el.attr('title'));
                          }
                        }
                      });
                    }
                  }
                }, 1000); // Wait 1 second for all scripts to load
              });
              
              // Fallback: hide preloader after 3 seconds if load event doesn't fire
              setTimeout(function() {
                const preloader = document.getElementById('preloder');
                if (preloader && preloader.style.display !== 'none' && !preloader.classList.contains('hidden')) {
                  preloader.classList.add('hidden');
                  setTimeout(() => {
                    preloader.style.display = 'none';
                  }, 300);
                }
              }, 3000);
              
              // Error handling for missing JS files
              window.addEventListener('error', function(e) {
                if (e.target.tagName === 'SCRIPT' && e.target.src.includes('/js/')) {
                  console.warn('Template JS file not found:', e.target.src);
                }
              });
            }
          `
        }} />
      </body>
    </html>
  );
}
