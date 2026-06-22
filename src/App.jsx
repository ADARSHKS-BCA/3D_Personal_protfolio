// src/App.jsx
import React, { useState, useEffect, lazy, Suspense, useRef } from 'react';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import Hero from './sections/Hero';
import About from './sections/About';
import Contact from './sections/Contact';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
  const mainRef = useRef(null);
  
  // Initialize Lenis smooth scroll and sync with ScrollTrigger
  useSmoothScroll();

  // Reset scroll to top on mount/refresh and prevent scroll restoration
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    }
  }, []);

  // Guarantee page starts at top when loader completes
  useEffect(() => {
    if (isLoaded) {
      window.scrollTo(0, 0);
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      }
    }
  }, [isLoaded]);

  // Master Cinematic Scroll Timeline
  useEffect(() => {
    if (!isLoaded) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // ── 1. Loading Complete → Hero Entrance ──
      const entranceTl = gsap.timeline({
        defaults: { ease: 'power4.out', duration: 1.5 }
      });

      // Initial state of section contents (blurry and offset)
      gsap.set('.section-content-inner', { opacity: 0, filter: 'blur(12px)' });
      gsap.set('#hero-wrapper .section-content-inner', { opacity: 1, filter: 'blur(0px)' });

      // Stagger fade-in navigation header
      entranceTl.fromTo('header', 
        { opacity: 0, y: -20 }, 
        { opacity: 1, y: 0, duration: 1.2 }, 
        0.2
      );

      // Zoom out background slightly
      entranceTl.fromTo('#hero-wrapper',
        { scale: 1.04 },
        { scale: 1, duration: 2.2 },
        0
      );

      // Line-by-line reveal of Hero title
      entranceTl.fromTo('#hero .hero-title', 
        { opacity: 0, y: 50, rotate: 1 }, 
        { opacity: 1, y: 0, rotate: 0, stagger: 0.15, duration: 1.6 }, 
        0.4
      );

      // Watermark AK reveal
      entranceTl.fromTo('#hero .hero-watermark', 
        { opacity: 0, scale: 0.97 }, 
        { opacity: 1, scale: 1, duration: 2 }, 
        0.5
      );

      // Eyebrow and Role text fade-in
      entranceTl.fromTo('#hero .hero-eyebrow, #hero .hero-role, #hero .hero-divider', 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, stagger: 0.1, duration: 1.2 }, 
        1.0
      );

      // ── 2. Hero Pinning (120vh) ──
      ScrollTrigger.create({
        trigger: '#hero-wrapper',
        start: 'top top',
        end: '+=120%',
        pin: true,
        pinSpacing: true,
        scrub: true,
        animation: gsap.timeline()
          .to('#hero .hero-watermark', { opacity: 0, scale: 0.95, ease: 'none' }, 0)
          .to('#hero-wrapper .section-content-inner', { filter: 'blur(12px)', opacity: 0, scale: 0.98, y: -60, ease: 'none' }, 0.2)
      });

      // ── 3. Section Handoff: Hero → About ──
      const heroToAbout = gsap.timeline({
        scrollTrigger: {
          trigger: '#about-wrapper',
          start: 'top 85%',
          end: 'top 35%',
          scrub: 1,
        }
      });
      heroToAbout.fromTo('#about-wrapper .section-content-inner', {
        opacity: 0,
        scale: 0.97,
        y: 80,
        filter: 'blur(8px)',
      }, {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: 'blur(0px)',
        ease: 'power4.out',
      }, 0);

      // About elements internal stagger reveal (No horizontal offsets)
      const aboutReveal = gsap.timeline({
        scrollTrigger: {
          trigger: '#about-wrapper',
          start: 'top 65%',
          toggleActions: 'play none none none',
        }
      });
      aboutReveal.fromTo('#about-wrapper .about__left',
        { opacity: 0, y: 50, scale: 0.97, filter: 'blur(8px)' },
        { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power4.out' },
        0
      );
      aboutReveal.fromTo('#about-wrapper .about__heading',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power4.out' },
        0.15
      );
      aboutReveal.fromTo('#about-wrapper .about__bio-paragraph',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 1.0, ease: 'power4.out' },
        0.25
      );
      aboutReveal.fromTo('#about-wrapper .about__cta',
        { opacity: 0, y: 25, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: 'power4.out' },
        0.45
      );

      // ── 4. Section Handoff: About → Skills ──
      const aboutToSkills = gsap.timeline({
        scrollTrigger: {
          trigger: '#skills-wrapper',
          start: 'top 85%',
          end: 'top 35%',
          scrub: 1,
        }
      });
      aboutToSkills.to('#about-wrapper .section-content-inner', {
        opacity: 0,
        scale: 0.97,
        y: -80,
        filter: 'blur(8px)',
      }, 0);
      aboutToSkills.to('#about-wrapper .about__tilt-card', {
        scale: 0.97,
      }, 0);
      aboutToSkills.fromTo('#skills-wrapper .section-content-inner', {
        opacity: 0,
        scale: 0.97,
        y: 80,
        filter: 'blur(8px)',
      }, {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: 'blur(0px)',
        ease: 'power4.out',
      }, 0);

      // ── 5. Skills Pinning (100vh) ──
      const skillsPin = gsap.timeline({
        scrollTrigger: {
          trigger: '#skills-wrapper',
          start: 'top top',
          end: '+=100%',
          pin: true,
          pinSpacing: true,
          scrub: true,
        }
      });
      // Stagger emerge skill cards inside the pin
      skillsPin.fromTo('#skills-wrapper .skill-card-wrapper', 
        { opacity: 0, y: 70, scale: 0.95, rotate: 2 },
        { opacity: 1, y: 0, scale: 1, rotate: 0, stagger: 0.08, duration: 1.2 }
      );

      // ── 6. Section Handoff: Skills → Projects ──
      const skillsToProjects = gsap.timeline({
        scrollTrigger: {
          trigger: '#projects-wrapper',
          start: 'top 85%',
          end: 'top 35%',
          scrub: 1,
        }
      });
      skillsToProjects.to('#skills-wrapper .section-content-inner', {
        opacity: 0,
        scale: 0.97,
        y: -80,
        filter: 'blur(8px)',
      }, 0);
      // Skills compress and scale down gently
      skillsToProjects.to('#skills-wrapper .skill-card-wrapper', {
        scale: 0.97,
        y: -15,
        stagger: 0.02,
      }, 0);
      skillsToProjects.fromTo('#projects-wrapper .section-content-inner', {
        opacity: 0,
        scale: 0.97,
        y: 80,
        filter: 'blur(8px)',
      }, {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: 'blur(0px)',
        ease: 'power4.out',
      }, 0);

      // ── 7. Projects Section Internal Reveal (NO PINNING) ──
      // Reveal Projects section header
      gsap.fromTo('#projects-wrapper h2, #projects-wrapper p.text-text-muted',
        { opacity: 0, y: 40, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          stagger: 0.1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '#projects-wrapper',
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        }
      );

      // Target each individual project section card to reveal as user scrolls (No horizontal offsets)
      const projectSections = gsap.utils.toArray('#projects-wrapper .project-section');
      projectSections.forEach((section) => {
        const inner = section.querySelector('.project-inner-wrapper');
        if (inner) {
          gsap.fromTo(inner,
            { opacity: 0, y: 80, scale: 0.97, filter: 'blur(8px)' },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: 'blur(0px)',
              ease: 'power4.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                end: 'top 40%',
                scrub: 1,
              }
            }
          );
        }
      });

      // ── 8. Section Handoff: Projects → Education ──
      const projectsToEducation = gsap.timeline({
        scrollTrigger: {
          trigger: '#education-wrapper',
          start: 'top 85%',
          end: 'top 35%',
          scrub: 1,
        }
      });
      // Gently fade and scale out the last project block on scroll
      projectsToEducation.to('#projects-wrapper .section-content-inner', {
        opacity: 0,
        scale: 0.97,
        y: -80,
        filter: 'blur(8px)',
      }, 0);
      projectsToEducation.to('.project-showcase-card', {
        y: (i) => -30 - i * 15,
        scale: 0.97,
        boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
        stagger: 0.04,
      }, 0);
      projectsToEducation.fromTo('#education-wrapper .section-content-inner', {
        opacity: 0,
        scale: 0.97,
        y: 80,
        filter: 'blur(8px)',
      }, {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: 'blur(0px)',
        ease: 'power4.out',
      }, 0);

      // ── 9. Education Pinning & Internal Sequential Animations (90vh) ──
      const eduPin = gsap.timeline({
        scrollTrigger: {
          trigger: '#education-wrapper',
          start: 'top top',
          end: '+=90%',
          pin: true,
          pinSpacing: true,
          scrub: true,
        }
      });
      // Draw timeline line vertically
      eduPin.fromTo('.edu-timeline-line', { scaleY: 0 }, { scaleY: 1, ease: 'none', duration: 1.5 }, 0);
      
      // Target all nodes in precise chronological (top-to-bottom) order (No horizontal offsets)
      const eduNodes = gsap.utils.toArray('.edu-timeline-node');
      eduNodes.forEach((node, i) => {
        const card = node.querySelector('.edu-timeline-card');
        if (!card) return;
        
        // Draw marker
        eduPin.fromTo(node.querySelector('.edu-timeline-marker'),
          { scale: 0 },
          { scale: 1, ease: 'back.out(1.7)', duration: 0.4 },
          i * 0.2
        );

        // Slide in connector
        eduPin.fromTo(node.querySelector('.edu-timeline-connector'),
          { opacity: 0 },
          { opacity: 1, duration: 0.2 },
          i * 0.2 + 0.1
        );

        // Slide in card chronologically vertically (No horizontal slide-in)
        eduPin.fromTo(card,
          { opacity: 0, y: 50, scale: 0.97, filter: 'blur(8px)' },
          { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power4.out' },
          i * 0.2 + 0.12
        );
      });

      // ── 10. Section Handoff: Education → Certifications ──
      const eduToCerts = gsap.timeline({
        scrollTrigger: {
          trigger: '#certifications-wrapper',
          start: 'top 85%',
          end: 'top 35%',
          scrub: 1,
        }
      });
      eduToCerts.to('#education-wrapper .section-content-inner', {
        opacity: 0,
        scale: 0.97,
        y: -80,
        filter: 'blur(8px)',
      }, 0);
      eduToCerts.fromTo('#certifications-wrapper .section-content-inner', {
        opacity: 0,
        scale: 0.97,
        y: 80,
        filter: 'blur(8px)',
      }, {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: 'blur(0px)',
        ease: 'power4.out',
      }, 0);

      // Stagger emerge cert cards (No horizontal offsets)
      gsap.fromTo('#certifications-wrapper .cert-card',
        { opacity: 0, scale: 0.97, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.1,
          ease: 'power4.out',
          duration: 1.2,
          scrollTrigger: {
            trigger: '#certifications-wrapper',
            start: 'top 70%',
            toggleActions: 'play none none none',
          }
        }
      );

      // ── 11. Section Handoff: Certifications → Contact ──
      const certsToContact = gsap.timeline({
        scrollTrigger: {
          trigger: '#contact-wrapper',
          start: 'top 85%',
          end: 'top 35%',
          scrub: 1,
        }
      });
      certsToContact.to('#certifications-wrapper .section-content-inner', {
        opacity: 0,
        scale: 0.97,
        y: -80,
        filter: 'blur(8px)',
      }, 0);
      certsToContact.fromTo('#contact-wrapper .section-content-inner', {
        opacity: 0,
        scale: 0.97,
        y: 80,
        filter: 'blur(8px)',
      }, {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: 'blur(0px)',
        ease: 'power4.out',
      }, 0);

      // ── 12. Contact Form & Fields Stagger Reveal (No horizontal offsets)
      const contactReveal = gsap.timeline({
        scrollTrigger: {
          trigger: '#contact-wrapper',
          start: 'top 60%',
          toggleActions: 'play none none none',
        }
      });
      contactReveal.fromTo('#contact-wrapper h2, #contact-wrapper .available-badge, #contact-wrapper .contact-heading, #contact-wrapper .contact-subtext',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.08, ease: 'power4.out', duration: 1.2 }
      );
      contactReveal.fromTo('#contact-wrapper .social-card-item',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.08, ease: 'power4.out', duration: 1.0 },
        0.3
      );
      contactReveal.fromTo('#contact-wrapper .form-card',
        { opacity: 0, y: 40, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, ease: 'power4.out', duration: 1.4 },
        0.2
      );
      contactReveal.fromTo('#contact-wrapper .form-field-group',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, stagger: 0.1, ease: 'power4.out', duration: 1.0 },
        0.5
      );

      // ── 13. Navbar Section Tracking via ScrollTrigger ──
      const sectionsTrack = ['about', 'skills', 'projects', 'contact'];
      sectionsTrack.forEach((id) => {
        ScrollTrigger.create({
          trigger: `#${id}-wrapper`,
          start: 'top 40%',
          end: 'bottom 40%',
          onToggle: (self) => {
            if (self.isActive) {
              const event = new CustomEvent('sectionActive', { detail: id });
              window.dispatchEvent(event);
            }
          }
        });
      });

      // Special tracker for Hero at top
      ScrollTrigger.create({
        trigger: '#hero-wrapper',
        start: 'top top',
        end: 'bottom 40%',
        onToggle: (self) => {
          if (self.isActive) {
            const event = new CustomEvent('sectionActive', { detail: '' });
            window.dispatchEvent(event);
          }
        }
      });

      // ── 14. Final Scroll Ending ──
      gsap.fromTo('.site-footer',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: '.site-footer',
            start: 'top 95%',
            toggleActions: 'play none none none',
          }
        }
      );

    }, mainRef);

    // Delay refresh to ensure ScrollTrigger measures correct coordinates after scrollbar/layout settles
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      ctx.revert();
      clearTimeout(refreshTimeout);
    };
  }, [isLoaded]);

  return (
    <>
      {!isLoaded && <Loader onComplete={() => setIsLoaded(true)} />}

      {isLoaded && <div className="film-grain-overlay" />}

      <div
        ref={mainRef}
        style={{
          width: '100%',
          minHeight: '100vh',
          position: 'relative',
          background: 'var(--bg)',
          pointerEvents: isLoaded ? 'auto' : 'none',
        }}
      >
        <CustomCursor />

        <Navbar isEmbedded={false} />
        
        <main className="relative z-10">
          {/* Hero */}
          <div className="section-wrapper" id="hero-wrapper">
            <div className="section-content-inner">
              <Hero scale={1.0} />
            </div>
          </div>

          {/* About */}
          <div className="section-wrapper" id="about-wrapper">
            <div className="section-content-inner">
              <About />
            </div>
          </div>

          {/* Skills */}
          <div className="section-wrapper" id="skills-wrapper">
            <div className="section-content-inner">
              <Suspense fallback={<SectionFallback />}><Skills /></Suspense>
            </div>
          </div>
          
          {/* Projects */}
          <div className="section-wrapper" id="projects-wrapper">
            <div className="section-content-inner">
              <Suspense fallback={<SectionFallback />}><Projects /></Suspense>
            </div>
          </div>

          {/* Education */}
          <div className="section-wrapper" id="education-wrapper">
            <div className="section-content-inner">
              <Suspense fallback={<SectionFallback />}><Education /></Suspense>
            </div>
          </div>

          {/* Certifications */}
          <div className="section-wrapper" id="certifications-wrapper">
            <div className="section-content-inner">
              <Suspense fallback={<SectionFallback />}><Certs /></Suspense>
            </div>
          </div>

          {/* Contact */}
          <div className="section-wrapper" id="contact-wrapper">
            <div className="section-content-inner">
              <Contact />
            </div>
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
        html, body {
          margin: 0;
          padding: 0;
          width: 100% !important;
          max-width: 100% !important;
          overflow-x: hidden !important;
          position: relative;
        }

        .section-wrapper {
          overflow-x: hidden !important;
        }

        /* ── Scroll Snapping removed in favor of Lenis + ScrollTrigger ── */
        @media (min-width: 1024px) {
          html {
            scroll-behavior: auto !important;
          }
        }

        /* Initial states of section content to avoid FOUC before GSAP loads */
        @media (prefers-reduced-motion: no-preference) {
          .section-content-inner {
            opacity: 0;
            filter: blur(12px);
          }
          #hero-wrapper .section-content-inner {
            opacity: 1;
            filter: blur(0px);
          }
          header {
            opacity: 0;
            transform: translateY(-20px);
          }
          #hero .hero-title {
            opacity: 0;
            transform: translateY(50px) rotate(1deg);
          }
          #hero .hero-watermark {
            opacity: 0;
            transform: scale(0.97);
          }
          #hero .hero-eyebrow,
          #hero .hero-role,
          #hero .hero-divider {
            opacity: 0;
            transform: translateY(20px);
          }
          .project-inner-wrapper {
            opacity: 0;
            filter: blur(12px);
          }
          .cert-card {
            opacity: 0;
          }
          #projects-wrapper h2, #projects-wrapper p.text-text-muted {
            opacity: 0;
            filter: blur(8px);
          }
        }
      `}</style>
    </>
  );
}
