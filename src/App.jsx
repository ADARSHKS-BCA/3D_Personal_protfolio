// src/App.jsx
import React, { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import Hero from './sections/Hero';
import About from './sections/About';
import Contact from './sections/Contact';

const Skills    = lazy(() => import('./sections/Skills'));
const Projects  = lazy(() => import('./sections/Projects'));
const Education = lazy(() => import('./sections/Education'));
const Certs     = lazy(() => import('./sections/Certs'));

function SectionFallback() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '32px 0' }}>
      <div style={{
        width: 24, height: 24,
        border: '2px solid var(--gold)',
        borderTopColor: 'transparent',
        borderRadius: '50%',
        animation: 'spin 0.7s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Intersection Observer for Cinematic Snapping Transitions
  useEffect(() => {
    if (!isLoaded) return;

    const observerOptions = {
      root: null, // viewport
      rootMargin: '-5% 0px -5% 0px', // slightly offset trigger zones
      threshold: 0.1, // trigger when at least 10% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active-section');
        } else {
          entry.target.classList.remove('active-section');
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('.snap-section, .project-section');
    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, [isLoaded]);

  return (
    <>
      {!isLoaded && <Loader onComplete={() => setIsLoaded(true)} />}

      <div style={{
        width: '100%',
        minHeight: '100vh',
        position: 'relative',
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.6s ease',
        visibility: isLoaded ? 'visible' : 'hidden',
        background: 'var(--bg)',
      }}>
        <CustomCursor />

        <Navbar isEmbedded={false} />
        
        <main>
          <div className="snap-section" id="hero">
            <Hero scale={1.0} />
          </div>
          <div className="snap-section" id="about">
            <About />
          </div>
          <div className="snap-section" id="skills">
            <Suspense fallback={<SectionFallback />}><Skills /></Suspense>
          </div>
          
          {/* Projects handles its own internal project card snapping */}
          <Suspense fallback={<SectionFallback />}><Projects /></Suspense>

          <div className="snap-section" id="education">
            <Suspense fallback={<SectionFallback />}><Education /></Suspense>
          </div>
          <div className="snap-section" id="certifications">
            <Suspense fallback={<SectionFallback />}><Certs /></Suspense>
          </div>
          <div className="snap-section" id="contact">
            <Contact />
          </div>
        </main>

        <footer className="site-footer" style={{ borderTop: '1px solid var(--border)', padding: '24px 0', background: 'var(--bg)' }}>
          <div className="section-container" style={{ textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '11px' }}>
              © {new Date().getFullYear()} ADARSH K.S. Built with React &amp; passion.
            </p>
          </div>
        </footer>
      </div>

      {/* ── Global styles ── */}
      <style>{`
        html, body { margin: 0; padding: 0; }

        /* ── Scroll Snapping & Slide Transitions for Desktop ── */
        @media (min-width: 1024px) {
          html {
            scroll-snap-type: y mandatory;
            scroll-behavior: smooth;
            zoom: 1.30; /* Zoom in the entire page on desktop */
          }
          
          /* Cinematic transitions for inactive slides */
          .snap-section,
          .project-section {
            opacity: 0.35;
            filter: blur(6px);
            transform: scale(0.95) translateY(25px);
            transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1),
                        filter 1.2s cubic-bezier(0.16, 1, 0.3, 1),
                        transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
            will-change: opacity, filter, transform;
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
          }

          /* Active slide state */
          .snap-section.active-section,
          .project-section.active-section {
            opacity: 1;
            filter: blur(0px);
            transform: scale(1) translateY(0);
          }

          /* Enforce full viewport snapping and centring */
          .snap-section {
            scroll-snap-align: start;
            scroll-snap-stop: always;
            height: 100vh !important;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            box-sizing: border-box;
            position: relative;
            background: var(--bg);
          }

          /* Snap target on the parent projects container (shows the header) */
          #projects {
            scroll-snap-align: start;
            scroll-snap-stop: always;
            box-sizing: border-box;
            background: var(--bg);
          }

          /* Snap target on individual project cards */
          .project-section {
            scroll-snap-align: start;
            scroll-snap-stop: always;
            height: 100vh !important;
            min-height: 100vh !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
            padding: 0 !important;
          }

          .site-footer {
            scroll-snap-align: end;
          }
        }
      `}</style>
    </>
  );
}
