import React, { useEffect, useRef, useCallback, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '../components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────
   Constants
   ────────────────────────────────────────────── */
const SKILLS = [
  'React',
  'Next.js',
  'Node.js',
  'Three.js',
  'Python',
  'MongoDB',
  'Figma',
  'Docker',
  'C++',
  'Flutter',
];

const BIO_PARAGRAPHS = [
  "I'm a Software Developer who believes great software is a complete thought — not a half-finished idea handed off to someone else.",
  "What drives me isn't just shipping code. It's the moment a system you architected handles real load, a real user, a real problem — and holds. That's the feeling I chase on every project.",
  "I'm continuously pushing my engineering standards toward production-level quality, because good enough was never the goal.",
];

const HEADING_TEXT = 'About Me';

const TILT_MAX = 15; // degrees

/* ──────────────────────────────────────────────
   3D Tilt Card (Photo placeholder)
   ────────────────────────────────────────────── */
function TiltCard() {
  const cardRef = useRef(null);
  const rafRef = useRef(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Normalize to -1 .. 1
    const normalizedX = mouseX / (rect.width / 2);
    const normalizedY = mouseY / (rect.height / 2);

    // Clamp
    const clampedX = Math.max(-1, Math.min(1, normalizedX));
    const clampedY = Math.max(-1, Math.min(1, normalizedY));

    targetRotation.current = {
      x: -clampedY * TILT_MAX,
      y: clampedX * TILT_MAX,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    targetRotation.current = { x: 0, y: 0 };
  }, []);

  useEffect(() => {
    let currentRotation = { x: 0, y: 0 };

    function animate() {
      currentRotation.x += (targetRotation.current.x - currentRotation.x) * 0.08;
      currentRotation.y += (targetRotation.current.y - currentRotation.y) * 0.08;

      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(800px) rotateX(${currentRotation.x}deg) rotateY(${currentRotation.y}deg)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="about__card-perspective">
      <div
        ref={cardRef}
        className="about__tilt-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Profile image */}
        <img
          src="/profile.jpg"
          alt="Adarsh"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        />

        {/* Open to work badge */}
        <div className="about__badge">
          <span className="about__badge-dot" />
          <span className="about__badge-text">Open to work</span>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Animated Heading
   ────────────────────────────────────────────── */
function AnimatedHeading({ text, className }) {
  const words = text.split(' ');

  return (
    <h2 className={className}>
      {words.map((word, i) => (
        <span key={i} className="about__heading-word" style={{ transitionDelay: `${i * 0.1}s` }}>
          {word}
          {i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </h2>
  );
}

/* ──────────────────────────────────────────────
   About Section (main export)
   ────────────────────────────────────────────── */
export default function About() {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const isMobile = window.innerWidth < 768;
    const reduce = isMobile ? 0.5 : 1;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    const ctx = gsap.context(() => {

      // Left side (photo): slide from left
      if (leftColRef.current) {
        gsap.set(leftColRef.current, { willChange: 'transform' });
        gsap.fromTo(
          leftColRef.current,
          { opacity: 0, x: -80 * reduce },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              once: true,
              invalidateOnRefresh: true,
            },
            onComplete: () => {
              gsap.set(leftColRef.current, { willChange: 'auto' });
            },
          }
        );
      }

      // Right side (text): slide from right
      if (rightColRef.current) {
        gsap.set(rightColRef.current, { willChange: 'transform' });
        gsap.fromTo(
          rightColRef.current,
          { opacity: 0, x: 80 * reduce },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              once: true,
              invalidateOnRefresh: true,
            },
            onComplete: () => {
              gsap.set(rightColRef.current, { willChange: 'auto' });
            },
          }
        );

        // Each text line inside right
        const textElements = rightColRef.current.querySelectorAll('.about__heading-word, .about__bio-paragraph, .about__cta');
        if (textElements.length) {
          gsap.fromTo(
            textElements,
            { opacity: 0, y: 20 * reduce },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              delay: 0.3,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 85%',
                once: true,
                invalidateOnRefresh: true,
              },
            }
          );
        }
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      observer.disconnect();
    };
  }, []);

  return (
    <section className="about section-padding bg-white dark:bg-bg text-gray-900 dark:text-text about-section reveal-section" id="about" ref={sectionRef}>
      <div className="section-divider"></div>
      <div className="section-container">
        <div className="about__grid">
          {/* Left column – Photo card */}
          <div className="about__left" ref={leftColRef}>
            <TiltCard />
          </div>

          {/* Right column – Content */}
          <div className="about__right" ref={rightColRef}>
            <AnimatedHeading text={HEADING_TEXT} className="about__heading gradient-text" />

            <div className="about__bio">
              {BIO_PARAGRAPHS.map((paragraph, i) => (
                <p key={i} className="about__bio-paragraph">
                  {paragraph}
                </p>
              ))}
            </div>



            {/* Download CV button */}
            <div className="about__cta">
              <MagneticButton>
                <a href="#" className="about__cv-button">
                  Download CV
                </a>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      {/* Inline styles */}
      <style>{`
        .about {
          position: relative;
          background: transparent;
        }

        .about__grid {
          display: flex;
          flex-direction: row;
          gap: 64px;
          align-items: center;
        }

        .about__left {
          flex: 0 0 auto;
        }

        .about__right {
          flex: 1 1 0%;
          min-width: 0;
        }

        /* ── Tilt Card ── */
        .about__card-perspective {
          perspective: 800px;
        }

        .about__tilt-card {
          position: relative;
          width: 300px;
          height: 400px;
          border-radius: 16px;
          overflow: hidden;
          transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
          cursor: pointer;
          border: 1px solid var(--border, rgba(212, 175, 55, 0.2));
        }

        .about__tilt-card:hover {
          box-shadow: 0 0 30px rgba(212, 175, 55, 0.25);
        }

        .about__photo-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, var(--gold), var(--gold-light));
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .about__initials {
          font-size: 44px;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: 0.05em;
          user-select: none;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
        }

        /* ── Open to work badge ── */
        .about__badge {
          position: absolute;
          top: 16px;
          right: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 9999px;
          z-index: 2;
        }

        .about__badge-dot {
          width: 8px;
          height: 8px;
          background: #22c55e;
          border-radius: 50%;
          animation: about-pulse-dot 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          flex-shrink: 0;
        }

        .about__badge-text {
          font-size: 0.75rem;
          font-weight: 600;
          color: #ffffff;
          white-space: nowrap;
        }

        @keyframes about-pulse-dot {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.5);
          }
          50% {
            box-shadow: 0 0 0 6px rgba(34, 197, 94, 0);
          }
        }

        /* ── Heading ── */
        .about__heading {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 800;
          margin: 0 0 24px 0;
          line-height: 1.2;
        }

        .about__heading-word {
          display: inline-block;
        }

        .gradient-text {
          background: linear-gradient(135deg, var(--gold, #d4af37), var(--gold-light, #ffdf7a));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── Bio ── */
        .about__bio {
          margin-bottom: 32px;
        }

        .about__bio-paragraph {
          font-size: 1rem;
          line-height: 1.75;
          color: var(--text-muted, #94a3b8);
          margin: 0 0 16px 0;
        }

        .about__bio-paragraph:last-child {
          margin-bottom: 0;
        }

        /* ── Skills ── */
        .about__skills {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 32px;
        }

        .tech-chip {
          display: inline-flex;
          align-items: center;
          padding: 6px 16px;
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--gold, #d4af37);
          background: var(--surface, #14130d);
          border: 1px solid var(--border, rgba(212, 175, 55, 0.2));
          border-radius: 9999px;
          white-space: nowrap;
          transition: border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                      background 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                      box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          user-select: none;
        }

        .tech-chip:hover {
          border-color: var(--gold-light, #ffdf7a);
          background: rgba(212, 175, 55, 0.15);
          box-shadow: 0 0 12px rgba(212, 175, 55, 0.15);
        }

        /* ── CTA button ── */
        .about__cta {
          display: inline-block;
        }

        .about__cv-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 36px;
          font-size: 1rem;
          font-weight: 600;
          color: #ffffff;
          background: linear-gradient(135deg, var(--gold, #d4af37), var(--gold-light, #ffdf7a));
          border: none;
          border-radius: 9999px;
          text-decoration: none;
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
                      box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
        }

        .about__cv-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(212, 175, 55, 0.3);
        }

        .about__cv-button:active {
          transform: translateY(0);
        }

        /* ── Section utilities (if not globally defined) ── */
        .section-padding {
          padding: 180px 0;
        }

        .section-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ── Responsive ── */
        @media (max-width: 1023px) {
          .about__grid {
            flex-direction: column;
            gap: 48px;
            align-items: center;
          }

          .about__right {
            text-align: center;
          }

          .about__skills {
            justify-content: center;
          }

          .about__cta {
            display: flex;
            justify-content: center;
          }
        }

        @media (max-width: 767px) {
          .about__grid {
            gap: 32px;
          }

          .about__tilt-card {
            width: 240px;
            height: 320px;
          }

          .about__initials {
            font-size: 32px;
          }

          .section-padding {
            padding: 120px 0;
          }
        }
      `}</style>
    </section>
  );
}
