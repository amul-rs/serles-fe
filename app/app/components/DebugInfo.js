'use client';

import { useEffect, useState } from 'react';

export default function DebugInfo() {
  const [debugInfo, setDebugInfo] = useState({
    userAgent: '',
    networkType: '',
    connectionSpeed: '',
    imageLoadTime: 0,
    errors: []
  });

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const info = {
      userAgent: navigator.userAgent,
      networkType: navigator.connection?.effectiveType || 'unknown',
      connectionSpeed: navigator.connection?.downlink || 'unknown',
      imageLoadTime: 0,
      errors: []
    };

    // Test image loading performance
    const testImage = new Image();
    const startTime = performance.now();
    
    testImage.onload = () => {
      const loadTime = performance.now() - startTime;
      info.imageLoadTime = Math.round(loadTime);
      setDebugInfo(info);
    };

    testImage.onerror = () => {
      info.errors.push('Test image failed to load');
      setDebugInfo(info);
    };

    // Test with a small image
    testImage.src = '/img/placeholder.jpg';

    // Log any console errors
    const originalError = console.error;
    console.error = (...args) => {
      info.errors.push(args.join(' '));
      originalError.apply(console, args);
    };

    setDebugInfo(info);

    // Cleanup
    return () => {
      console.error = originalError;
    };
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 9999,
      maxWidth: '300px'
    }}>
      <h4>Debug Info</h4>
      <div>Network: {debugInfo.networkType}</div>
      <div>Speed: {debugInfo.connectionSpeed} Mbps</div>
      <div>Image Load: {debugInfo.imageLoadTime}ms</div>
      {debugInfo.errors.length > 0 && (
        <div>
          <strong>Errors:</strong>
          <ul>
            {debugInfo.errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 