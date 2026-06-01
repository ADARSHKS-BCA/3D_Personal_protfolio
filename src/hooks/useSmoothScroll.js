// src/hooks/useSmoothScroll.js
import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useSmoothScroll() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      autoResize: true,
    });

    lenisRef.current = lenis;
    window.lenis = lenis; // Expose globally for smooth scrolling from other components

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Named raf callback so we can properly remove it
    function tickerCallback(time) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after Lenis initializes
    ScrollTrigger.refresh();

    // Delayed refresh to catch lazy-loaded content
    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 1000);

    // Also refresh on window load
    const handleLoad = () => ScrollTrigger.refresh();
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

