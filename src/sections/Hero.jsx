// src/sections/Hero.jsx
import React, { Suspense, useEffect, useState, lazy } from 'react';

/* ── Lazy load LaptopModel to avoid blocking initial render ── */
const LaptopModel = lazy(() => import('../components/LaptopModel'));

/* ──────────────────────────────────────────────
   Scroll Indicator
   ────────────────────────────────────────────── */
function ScrollIndicator() {
  const handleClick = () => {
    const el = document.getElementById('about');
    if (el) {
      if (window.lenis) {
        window.lenis.scrollTo(el);
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div 
      className="hero__scroll-indicator"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <span className="hero__scroll-text">SCROLL TO EXPLORE</span>
      <div className="hero__chevron-container">
        <svg
          className="hero__chevron"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Mobile CSS Fallback (Clean & Minimal)
   ────────────────────────────────────────────── */
function MobileFallback() {
  return (
    <div className="hero__mobile-fallback">
      <h1 className="hero__mobile-name">
        <span className="gradient-text">Adarsh</span>
      </h1>
      <p className="hero__mobile-role">SOFTWARE DEVELOPER</p>
      <p className="hero__mobile-tagline">Building systems that hold under real load.</p>
      <ScrollIndicator />
    </div>
  );
}

/* ──────────────────────────────────────────────
   3D Laptop Model Wrapper
   ────────────────────────────────────────────── */
function LaptopWrapper() {
  return (
    <div className="hero__laptop">
      <Suspense fallback={null}>
        <LaptopModel />
      </Suspense>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Hero Section (Main Export)
   ────────────────────────────────────────────── */
export default function Hero() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : true
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="hero" id="hero">
      {/* Pitch-Black Background */}
      <div className="hero__background" />

      {/* SEO Heading (Invisible to user) */}
      {!isMobile && (
        <h1 className="hero__seo-heading sr-only">Adarsh — Software Developer Portfolio</h1>
      )}

      {/* Content Rendering */}
      {isMobile ? (
        <MobileFallback />
      ) : (
        <>
          {/* Laptop is perfectly centered */}
          <LaptopWrapper />

          {/* Simple scroll indicator below */}
          <div className="hero__overlay">
            <ScrollIndicator />
          </div>
        </>
      )}

      {/* Cinematic shutter flash overlay */}
      {!isMobile && (
        <div 
          className="hero__shutter-flash"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#000000',
            zIndex: 9999,
            pointerEvents: 'none',
            opacity: 0,
          }}
        />
      )}

      {/* Premium CSS Styles */}
      <style>{`
        .hero {
          position: relative;
          width: 100%;
          height: 100vh;
          height: 100dvh;
          overflow: hidden;
          background: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero__background {
          position: absolute;
          inset: 0;
          background: #000000;
          z-index: 0;
          pointer-events: none;
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        /* ── 3D Laptop Wrapper (Centered) ── */
        .hero__laptop {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ── Overlay for Scroll Indicator ── */
        .hero__overlay {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          pointer-events: auto;
          transition: opacity 0.5s ease-out;
        }

        /* ── Scroll Indicator Styles ── */
        .hero__scroll-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          color: rgba(255, 255, 255, 0.3);
          transition: color 0.3s ease;
          user-select: none;
        }

        .hero__scroll-indicator:hover {
          color: rgba(255, 255, 255, 0.6);
        }

        .hero__scroll-text {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
        }

        .hero__chevron-container {
          animation: hero-bounce 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .hero__chevron {
          stroke: currentColor;
        }

        @keyframes hero-bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(6px);
          }
        }

        /* ── Mobile Fallback (Centered minimal) ── */
        .hero__mobile-fallback {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px;
          text-align: center;
          background: #000000;
        }

        .hero__mobile-name {
          font-size: clamp(3.0rem, 15vw, 5.0rem);
          font-weight: 900;
          letter-spacing: 0.08em;
          line-height: 1.1;
          margin: 0;
        }

        .hero__mobile-role {
          font-size: 1.0rem;
          color: var(--gold);
          margin-top: 16px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 600;
        }

        .hero__mobile-tagline {
          font-size: 0.95rem;
          color: #94a3b8;
          max-width: 320px;
          line-height: 1.6;
          margin: 16px 0 48px 0;
          font-style: italic;
        }

        .hero__mobile-fallback .hero__scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
        }

        .gradient-text {
          background: linear-gradient(135deg, #ffffff, var(--gold-light), var(--gold));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </section>
  );
}
