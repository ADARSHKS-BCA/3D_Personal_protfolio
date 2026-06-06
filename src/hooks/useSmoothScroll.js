// src/hooks/useSmoothScroll.js
import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ limitCallbacks: true });
ScrollTrigger.config({ ignoreMobileResize: true });

export function useSmoothScroll() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1.2,
      normalizeWheel: true,
      infinite: false,
    });

    lenisRef.current = lenis;
    window.lenis = lenis; // Expose globally for smooth scrolling from other components

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Sync GSAP ticker with Lenis
    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Mobile fix
    if (window.innerWidth < 768) {
      lenis.destroy();
      ScrollTrigger.normalizeScroll(true);
    }

    // Refresh ScrollTrigger after Lenis initializes
    ScrollTrigger.refresh();

    // Delayed refresh to catch lazy-loaded content
    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 1000);

    // Load listener for refresh and resize
    const handleLoad = () => {
      ScrollTrigger.refresh();
      lenis.resize();
    };
    window.addEventListener('load', handleLoad);

    return () => {
      clearTimeout(refreshTimer);
      window.removeEventListener('load', handleLoad);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      window.lenis = null; // Clean up global reference
    };
  }, []);

  return lenisRef;
}

