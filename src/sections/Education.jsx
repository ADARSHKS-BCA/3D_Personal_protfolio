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

    /* ── Section reveal ── */
    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          sectionObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    sectionObserver.observe(sectionRef.current);

    /* ── Per-node card reveal via IntersectionObserver ── */
    const nodeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('edu-node-visible');
            nodeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    nodesRef.current.forEach((node) => {
      if (node) nodeObserver.observe(node);
    });

    /* ── GSAP: heading + timeline line draw ── */
    const ctx = gsap.context(() => {
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
              start: 'top 90%',
              once: true,
              invalidateOnRefresh: true,
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
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      sectionObserver.disconnect();
      nodeObserver.disconnect();
    };
  }, []);

  return (
    <section
      id="education"
      className="section-container section-padding bg-gray-50 dark:bg-bg text-gray-900 dark:text-text education-section reveal-section"
      ref={sectionRef}
      data-animate
      style={{ overflow: 'hidden' }}
    >
      <div className="section-divider"></div>
      <h2
        className="gradient-text"
        data-animate
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
          data-animate
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
          className="edu-timeline-line"
        />

        {/* Timeline nodes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {education.map((entry, i) => {
            const isEven = i % 2 === 1;
            return (
              <div
                key={entry.id || i}
                ref={(el) => (nodesRef.current[i] = el)}
                className="edu-timeline-node"
                data-animate
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: isEven ? 'flex-start' : 'flex-end',
                  position: 'relative',
                }}
              >
                {/* Marker circle */}
                <div
                  className="edu-timeline-marker"
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '1.5rem',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    border: '2px solid var(--gold)',
                    background: 'var(--bg)',
                    transform: 'translateX(-50%) scale(0)',
                    zIndex: 2,
                    transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.4s ease, box-shadow 0.4s ease',
                  }}
                />

                {/* Horizontal connector line */}
                <div
                  className="edu-timeline-connector"
                  style={{
                    position: 'absolute',
                    top: 'calc(1.5rem + 7px)',
                    height: '2px',
                    background: 'var(--gold)',
                    opacity: 0,
                    transition: 'opacity 0.4s ease 0.2s',
                    ...(!isEven
                      ? { left: 'calc(50% + 8px)', width: 'calc(2.5rem - 8px)' }
                      : { right: 'calc(50% + 8px)', width: 'calc(2.5rem - 8px)' }
                    ),
                  }}
                />

                {/* Card */}
                <div
                  className={`edu-timeline-card glass-card ${!isEven ? 'edu-card-right' : 'edu-card-left'}`}
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

      {/* Timeline styles */}
      <style>{`
        /* ── Card slide-in transitions ── */
        .edu-timeline-card {
          opacity: 0;
          transition: opacity 0.6s cubic-bezier(0.25, 0.1, 0.25, 1),
                      transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1);
          will-change: opacity, transform;
        }

        .edu-card-right {
          transform: translateX(80px);
        }

        .edu-card-left {
          transform: translateX(-80px);
        }

        /* ── Visible state triggered per-node ── */
        .edu-node-visible .edu-timeline-card {
          opacity: 1;
          transform: translateX(0);
        }

        .edu-node-visible .edu-timeline-marker {
          transform: translateX(-50%) scale(1) !important;
          background: var(--gold) !important;
          box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.25), 0 0 16px rgba(212, 175, 55, 0.3);
          animation: edu-dot-pulse 2s ease-in-out infinite;
        }

        .edu-node-visible .edu-timeline-connector {
          opacity: 1 !important;
        }

        @keyframes edu-dot-pulse {
          0%, 100% {
            box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.25), 0 0 16px rgba(212, 175, 55, 0.3);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(212, 175, 55, 0), 0 0 20px rgba(212, 175, 55, 0.1);
          }
        }

        /* ── Responsive: mobile < 768px ── */
        @media (max-width: 768px) {
          .edu-timeline-line {
            left: 1rem !important;
            margin-left: 0 !important;
          }

          .edu-timeline-node {
            justify-content: flex-start !important;
            padding-left: 3rem;
          }

          .edu-timeline-node .edu-timeline-card {
            width: 100% !important;
          }

          .edu-card-right,
          .edu-card-left {
            transform: translateX(80px);
          }

          .edu-node-visible .edu-card-right,
          .edu-node-visible .edu-card-left {
            transform: translateX(0);
          }

          .edu-timeline-marker {
            left: 1rem !important;
          }

          .edu-timeline-connector {
            left: calc(1rem + 8px) !important;
            right: auto !important;
            width: calc(2rem - 8px) !important;
          }
        }
      `}</style>
    </section>
  );
}
