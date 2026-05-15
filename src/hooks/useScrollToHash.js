import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls smoothly to the element matching the URL hash on page load
 * or when the hash changes. Uses a small delay to ensure the DOM is
 * painted (especially after route transitions with lazy-loaded content).
 */
const useScrollToHash = () => {
  const { hash, pathname, key } = useLocation();
  const prevKey = useRef(key);

  useEffect(() => {
    // Always run on key change (covers same-path re-navigations)
    if (!hash) {
      // No hash — scroll to top on route change
      if (prevKey.current !== key) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      prevKey.current = key;
      return;
    }

    prevKey.current = key;
    const id = hash.replace('#', '');

    // Retry a few times in case the target section hasn't rendered yet
    let attempts = 0;
    const maxAttempts = 15;
    const interval = setInterval(() => {
      const el = document.getElementById(id);
      if (el) {
        clearInterval(interval);
        // Use a slight timeout so the browser finishes layout
        setTimeout(() => {
          const headerOffset = 112; // account for fixed header
          const elementPosition = el.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementPosition - headerOffset,
            behavior: 'smooth',
          });
        }, 100);
      }
      attempts++;
      if (attempts >= maxAttempts) clearInterval(interval);
    }, 150);

    return () => clearInterval(interval);
  }, [hash, pathname, key]);
};

export default useScrollToHash;
