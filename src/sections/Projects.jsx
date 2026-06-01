import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

/* ── Single flip card ── */
function ProjectCard({ project }) {
  return (
    <div className="flip-card" style={{ height: '420px' }}>
      <div className="flip-card-inner">
        {/* ── Front Face ── */}
        <div
          className="flip-card-front"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Image area */}
          <div
            style={{
              height: '200px',
              background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(circle at 30% 40%, rgba(255,255,255,0.12) 0%, transparent 60%)',
              }}
            />
            <h3
              style={{
                color: '#fff',
                fontSize: '1.25rem',
                fontWeight: 700,
                textAlign: 'center',
                padding: '0 20px',
                position: 'relative',
                zIndex: 1,
                textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                margin: 0,
              }}
            >
              {project.title}
            </h3>
          </div>

          {/* Info area */}
          <div
            style={{
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'space-between',
            }}
          >
            <div>
              <h3
                style={{
                  color: 'var(--text)',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  margin: '0 0 8px 0',
                }}
              >
                {project.title}
              </h3>
              <span
                style={{
                  display: 'inline-block',
                  padding: '3px 10px',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--gold)',
                  background: 'rgba(212, 175, 55, 0.12)',
                  borderRadius: '6px',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                }}
              >
                {project.category}
              </span>
            </div>

            {/* Tech pills */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
                marginTop: '12px',
              }}
            >
              {(project.tech || []).slice(0, 3).map((t) => (
                <span key={t} className="tech-chip">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Back Face ── */}
        <div
          className="flip-card-back"
          style={{
            background:
              'linear-gradient(160deg, var(--surface) 0%, rgba(212, 175, 55, 0.08) 100%)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '28px 24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h3
              style={{
                color: 'var(--text)',
                fontSize: '1.15rem',
                fontWeight: 700,
                margin: '0 0 16px 0',
              }}
            >
              {project.title}
            </h3>
            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.88rem',
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {project.desc}
            </p>
          </div>

          {/* Action buttons */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              marginTop: '24px',
            }}
          >
            <a
              href={project.githubUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '10px 0',
                background: 'rgba(20, 19, 13, 0.7)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                borderRadius: '10px',
                color: 'var(--text)',
                fontSize: '0.85rem',
                fontWeight: 600,
                textDecoration: 'none',
                cursor: 'pointer',
                transition:
                  'border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 223, 122, 0.6)';
                e.currentTarget.style.background = 'rgba(212, 175, 55, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.2)';
                e.currentTarget.style.background = 'rgba(20, 19, 13, 0.7)';
              }}
            >
              <span style={{ fontSize: '1rem' }}>⟨/⟩</span>
              Code
            </a>

            <a
              href={project.liveUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '10px 0',
                background: 'rgba(20, 19, 13, 0.7)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                borderRadius: '10px',
                color: 'var(--text)',
                fontSize: '0.85rem',
                fontWeight: 600,
                textDecoration: 'none',
                cursor: 'pointer',
                transition:
                  'border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 223, 122, 0.6)';
                e.currentTarget.style.background = 'rgba(212, 175, 55, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.2)';
                e.currentTarget.style.background = 'rgba(20, 19, 13, 0.7)';
              }}
            >
              <span style={{ fontSize: '1rem' }}>↗</span>
              Live Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Projects Section ── */
export default function Projects() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const cardsRef = useRef([]);

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

      // Heading
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
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

      // Subheading
      if (subheadingRef.current) {
        gsap.fromTo(
          subheadingRef.current,
          { opacity: 0, y: 30 * reduce },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // Each card
      const validCards = cardsRef.current.filter(Boolean);
      if (validCards.length > 0) {
        validCards.forEach(card => gsap.set(card, { willChange: 'transform' }));
        gsap.fromTo(
          validCards,
          { opacity: 0, y: 80 * reduce, rotateX: 15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out',
            transformOrigin: 'top center',
            scrollTrigger: {
              trigger: validCards[0],
              start: 'top 85%',
              once: true,
            },
            onComplete: () => {
              validCards.forEach(card => gsap.set(card, { willChange: 'auto' }));
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-container section-padding bg-white dark:bg-bg text-gray-900 dark:text-text"
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <h2
          ref={headingRef}
          className="gradient-text"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            margin: '0 0 12px 0',
          }}
        >
          Featured Projects
        </h2>
        <p
          ref={subheadingRef}
          style={{
            color: 'var(--text-muted)',
            fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
            margin: 0,
            maxWidth: '480px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          A selection of projects that showcase my skills
        </p>
      </div>

      {/* Card grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
        className="projects-grid"
      >
        {projects.map((project, i) => (
          <div
            key={project.id || project.title}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {/* Responsive grid styles */}
      <style>{`
        .projects-grid {
          grid-template-columns: repeat(3, 1fr) !important;
        }

        @media (max-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 640px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }

        .flip-card {
          perspective: 1200px;
          width: 100%;
          cursor: pointer;
        }

        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1);
          transform-style: preserve-3d;
        }

        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }

        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
}
