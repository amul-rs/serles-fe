'use client'
import { useEffect, useState } from 'react';

export default function Preloader() {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Hide preloader after page load
    const hidePreloader = () => {
      setIsHidden(true);
      setTimeout(() => {
        const preloader = document.getElementById('preloder');
        if (preloader) {
          preloader.style.display = 'none';
        }
      }, 300);
    };

    // Hide preloader when page is loaded
    if (document.readyState === 'complete') {
      hidePreloader();
    } else {
      window.addEventListener('load', hidePreloader);
    }

    // Fallback: hide preloader after 3 seconds
    const fallbackTimer = setTimeout(hidePreloader, 3000);

    return () => {
      window.removeEventListener('load', hidePreloader);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div id="preloder" className={isHidden ? 'hidden' : ''}>
      <div className="loader"></div>
    </div>
  );
} 