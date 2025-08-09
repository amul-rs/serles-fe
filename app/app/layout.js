import Header from './components/Header';
import Footer from './components/Footer';
import './globals.scss';

export const metadata = {
  title: 'Cake Shop - Delicious Treats',
  description: 'Discover our amazing collection of cakes, brownies, and sweet treats',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Font */}
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        
        {/* Font Awesome */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
        
        {/* Bootstrap CSS */}
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" />
        
        {/* Template CSS Files - Optional */}
        <link rel="stylesheet" href="/css/style.css" type="text/css" />
        <link rel="stylesheet" href="/css/flaticon.css" type="text/css" />
        <link rel="stylesheet" href="/css/barfiller.css" type="text/css" />
        <link rel="stylesheet" href="/css/magnific-popup.css" type="text/css" />
        <link rel="stylesheet" href="/css/elegant-icons.css" type="text/css" />
        <link rel="stylesheet" href="/css/nice-select.css" type="text/css" />
        <link rel="stylesheet" href="/css/owl.carousel.min.css" type="text/css" />
        <link rel="stylesheet" href="/css/slicknav.min.css" type="text/css" />
      </head>
      <body>
        {/* Page Preloder */}
        <div id="preloder">
          <div className="loader"></div>
        </div>

        <Header />
        
        <main>
        {children}
        </main>
        
        <Footer />

        {/* jQuery */}
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        
        {/* Bootstrap JS */}
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
        
        {/* Template JS Files - Load asynchronously */}
        <script src="/js/jquery.slicknav.js" defer></script>
        <script src="/js/jquery.nice-select.min.js" defer></script>
        <script src="/js/jquery.barfiller.js" defer></script>
        <script src="/js/jquery.magnific-popup.min.js" defer></script>
        <script src="/js/owl.carousel.min.js" defer></script>
        <script src="/js/jquery.nicescroll.min.js" defer></script>
        <script src="/js/main.js" defer></script>
        
        {/* Preloader Script */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Wait for all scripts to load before initializing
            window.addEventListener('load', function() {
              const preloader = document.getElementById('preloder');
              if (preloader) {
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
              if (preloader && preloader.style.display !== 'none') {
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
          `
        }} />
      </body>
    </html>
  );
}
