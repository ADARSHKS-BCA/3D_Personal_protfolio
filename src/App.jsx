// src/App.jsx
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import Hero from './sections/Hero';
import About from './sections/About';
import Contact from './sections/Contact';

// Lazy load heavier sections
const Skills = lazy(() => import('./sections/Skills'));
const Projects = lazy(() => import('./sections/Projects'));
const Education = lazy(() => import('./sections/Education'));
const Certs = lazy(() => import('./sections/Certs'));

function SectionFallback() {
  return (
    <div className="flex items-center justify-center py-32">
      <div 
        className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" 
        style={{ borderColor: 'var(--gold)', borderTopColor: 'transparent' }}
      />
    </div>
  );
}

export default function App() {
  const { isDark, setIsDark } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  // Initialize smooth scroll
  useSmoothScroll();

  // After loader completes, reveal site content with a short delay
  useEffect(() => {
    if (!isLoaded) return;

    const timer = setTimeout(() => {
      setIsIntroComplete(true);
    }, 400);

    return () => clearTimeout(timer);
  }, [isLoaded]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <>
      {/* Loading screen */}
      {!isLoaded && <Loader onComplete={() => setIsLoaded(true)} />}

      {/* Site content — hidden until loader finishes */}
      <div
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          visibility: isLoaded ? 'visible' : 'hidden',
        }}
      >
        {/* Custom cursor - desktop only */}
        <CustomCursor />

        {/* Navbar - hidden on home page, fades in after scroll zoom is complete */}
        <div 
          className="navbar-wrapper"
          style={{ 
            opacity: 0, 
            pointerEvents: 'none',
            transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            zIndex: 100
          }}
        >
          <Navbar isDark={isDark} toggleTheme={toggleTheme} />
        </div>

        <main>
          <Hero />
          <About />

          <Suspense fallback={<SectionFallback />}>
            <Skills />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <Projects />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <Education />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <Certs />
          </Suspense>

          <Contact />
        </main>

        <footer className="border-t border-white/5 py-8">
          <div className="section-container text-center">
            <p className="text-text-muted text-sm">
              © {new Date().getFullYear()} ADARSH K.S. Built with React, Three.js & passion.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
