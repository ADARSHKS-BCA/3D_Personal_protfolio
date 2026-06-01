import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { education } from '../data/education';

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const nodesRef = useRef([]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const isMobile = window.innerWidth < 768;
    const reduce = isMobile ? 0.5 : 1;

    // Hide section initially
    gsap.set(sectionRef.current, { opacity: 0 });

    const ctx = gsap.context(() => {
      // Section reveal
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.set(sectionRef.current, { opacity: 1 });
        },
      });

      // Heading: fade up
      const heading = sectionRef.current.querySelector('h2');
      if (heading) {
        gsap.fromTo(
          heading,
          { opacity: 0, y: 40 * reduce },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // Timeline line: stroke draw effect via scaleY scrub
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              end: 'bottom 30%',
              scrub: 1,
            },
          }
        );
      }

      // Each timeline node
      nodesRef.current.forEach((node, i) => {
        if (!node) return;
        const isEven = i % 2 === 1;
        const card = node.querySelector('.timeline-card');
        const marker = node.querySelector('.timeline-marker');

        if (card) {
          const xDir = isEven ? -60 * reduce : 60 * reduce;
          gsap.set(card, { willChange: 'transform' });
          gsap.fromTo(
            card,
            { opacity: 0, x: xDir },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: node,
                start: 'top 85%',
                once: true,
              },
              onComplete: () => {
                gsap.set(card, { willChange: 'auto' });
              },
            }
          );
        }

        if (marker) {
          gsap.fromTo(
            marker,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.3,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: node,
                start: 'top 85%',
                once: true,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section id="education" className="section-container section-padding bg-gray-50 dark:bg-bg text-gray-900 dark:text-text" ref={sectionRef}>
      <h2
        className="gradient-text"
        style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 700,
          textAlign: 'center',
          marginBottom: '4rem',
        }}
      >
        Education
      </h2>

      <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
        {/* Vertical timeline line */}
        <div
          ref={lineRef}
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'linear-gradient(to bottom, var(--gold), var(--gold-light))',
            transformOrigin: 'top',
            transform: 'scaleY(0)',
            marginLeft: '-1px',
          }}
          className="timeline-line"
        />

        {/* Timeline nodes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {education.map((entry, i) => {
            const isEven = i % 2 === 1;
            return (
              <div
                key={entry.id || i}
                ref={(el) => (nodesRef.current[i] = el)}
                className="timeline-node"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: isEven ? 'flex-start' : 'flex-end',
                  position: 'relative',
                }}
              >
                {/* Marker circle */}
                <div
                  className="timeline-marker"
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '1.5rem',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    border: '2px solid var(--gold)',
                    background: 'var(--bg)',
                    transform: 'translateX(-50%)',
                    zIndex: 2,
                  }}
                />

                {/* Card */}
                <div
                  className="timeline-card glass-card"
                  style={{
                    width: 'calc(50% - 2.5rem)',
                    padding: '1.5rem',
                    borderRadius: '0.75rem',
                  }}
                >
                  <h3
                    style={{
                      fontWeight: 600,
                      fontSize: '1.125rem',
                      color: 'var(--text)',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {entry.school}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                    {entry.degree}
                  </p>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '0.2rem 0.75rem',
                      borderRadius: '9999px',
                      background: 'rgba(212, 175, 55, 0.15)',
                      color: 'var(--gold-light)',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      marginBottom: '0.5rem',
                    }}
                  >
                    {entry.year}
                  </span>
                  {entry.grade && (
                    <p
                      style={{
                        color: 'var(--text)',
                        fontSize: '0.9rem',
                        marginTop: '0.25rem',
                      }}
                    >
                      {entry.grade}
                    </p>
                  )}
                  {entry.description && (
                    <p
                      style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.875rem',
                        marginTop: '0.5rem',
                        lineHeight: 1.6,
                      }}
                    >
                      {entry.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile & responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .timeline-line {
            left: 1rem !important;
            margin-left: 0 !important;
            transform-origin: top !important;
          }
          .timeline-node {
            justify-content: flex-start !important;
            padding-left: 2.5rem;
          }
          .timeline-node .timeline-card {
            width: 100% !important;
          }
          .timeline-marker {
            left: 1rem !important;
            transform: translateX(-50%) !important;
          }
        }
      `}</style>
    </section>
  );
}
