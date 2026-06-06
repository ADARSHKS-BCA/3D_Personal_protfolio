import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

/* ── Magnetic hover wrapper ── */
function MagneticWrapper({ children }) {
  const wrapperRef = useRef(null);
  const isTouchDevice = useRef(false);

  useEffect(() => {
    isTouchDevice.current = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice.current || !wrapperRef.current) return;

    const el = wrapperRef.current;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const offsetX = ((e.clientX - centerX) / rect.width) * 10;
      const offsetY = ((e.clientY - centerY) / rect.height) * 10;

      el.style.transition = 'transform 0.15s linear, box-shadow 0.15s linear';
      el.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(1.02)`;
      el.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.2), 0 0 40px rgba(212, 175, 55, 0.08)';
    };

    const handleMouseLeave = () => {
      el.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
      el.style.transform = 'translate(0, 0) scale(1)';
      el.style.boxShadow = 'none';
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={wrapperRef} style={{ borderRadius: '16px', willChange: 'transform' }}>
      {children}
    </div>
  );
}
/* ── Single flip card ── */
function ProjectCard({ project }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flip-card" style={{ height: '350px' }}>
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
          {project.images && project.images.length > 0 ? (
            <div
              style={{
                height: '230px',
                position: 'relative',
                flexShrink: 0,
                overflow: 'hidden',
                background: 'var(--surface)',
              }}
            >
              <div
                className="proj-carousel-track"
                style={{
                  display: 'flex',
                  width: `${project.images.length * 200}%`,
                  height: '100%',
                  animation: `proj-slide-${project.images.length} ${project.images.length * 3.8}s linear infinite`,
                }}
              >
                {/* Double the images for seamless loop */}
                {[...project.images, ...project.images].map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`${project.title} screenshot ${(idx % project.images.length) + 1}`}
                    style={{
                      width: `${100 / (project.images.length * 2)}%`,
                      height: '100%',
                      objectFit: 'cover',
                      flexShrink: 0,
                    }}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div
              style={{
                height: '230px',
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
          )}

          {/* Info area */}
          <div
            style={{
              padding: '12px 16px',
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
                  fontSize: '1rem',
                  fontWeight: 600,
                  margin: '0 0 4px 0',
                }}
              >
                {project.title}
              </h3>
              <span
                style={{
                  display: 'inline-block',
                  padding: '2px 8px',
                  fontSize: '0.64rem',
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
                gap: '4px',
                marginTop: '8px',
              }}
            >
              {(project.tech || []).slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="tech-chip"
                  style={{
                    fontSize: '0.72rem',
                    padding: '3px 10px',
                  }}
                >
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
            padding: '16px 16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              overflowY: 'auto',
              marginBottom: '8px',
              paddingRight: '4px',
            }}
          >
            <h3
              style={{
                color: 'var(--text)',
                fontSize: '1rem',
                fontWeight: 700,
                margin: '0 0 6px 0',
              }}
            >
              {project.title}
            </h3>
            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.8rem',
                lineHeight: 1.5,
                margin: 0,
                display: '-webkit-box',
                WebkitLineClamp: isExpanded ? 'unset' : 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {project.desc}
            </p>
            {project.desc.length > 100 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--gold)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: '4px 0 0 0',
                  textDecoration: 'underline',
                  alignSelf: 'flex-start',
                }}
              >
                {isExpanded ? 'Read Less' : 'Read More'}
              </button>
            )}
          </div>

          {/* Action buttons */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              marginTop: '8px',
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
                padding: '8px 0',
                background: 'rgba(20, 19, 13, 0.7)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                borderRadius: '10px',
                color: 'var(--text)',
                fontSize: '0.82rem',
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
              <span style={{ fontSize: '0.9rem' }}>⟨/⟩</span>
              Code
            </a>

            <a
              href={project.liveUrl || '#'}
              target={project.liveUrl ? "_blank" : undefined}
              rel={project.liveUrl ? "noopener noreferrer" : undefined}
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
                color: project.liveUrl ? 'var(--text)' : 'var(--text-muted)',
                opacity: project.liveUrl ? 1 : 0.5,
                pointerEvents: project.liveUrl ? 'auto' : 'none',
                fontSize: '0.85rem',
                fontWeight: 600,
                textDecoration: 'none',
                cursor: project.liveUrl ? 'pointer' : 'default',
                transition:
                  'border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onMouseEnter={(e) => {
                if (!project.liveUrl) return;
                e.currentTarget.style.borderColor = 'rgba(255, 223, 122, 0.6)';
                e.currentTarget.style.background = 'rgba(212, 175, 55, 0.1)';
              }}
              onMouseLeave={(e) => {
                if (!project.liveUrl) return;
                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.2)';
                e.currentTarget.style.background = 'rgba(20, 19, 13, 0.7)';
              }}
            >
              <span style={{ fontSize: '1rem' }}>↗</span>
              Live
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Projects Section (Timeline Layout) ── */
export default function Projects() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
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
            entry.target.classList.add('proj-node-visible');
            nodeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    nodesRef.current.forEach((node) => {
      if (node) nodeObserver.observe(node);
    });

    /* ── GSAP: heading, subheading, timeline line ── */
    const ctx = gsap.context(() => {
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
              start: 'top 90%',
              once: true,
              invalidateOnRefresh: true,
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
              start: 'top 90%',
              once: true,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // Timeline line draw via scrub
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
      id="projects"
      ref={sectionRef}
      className="section-container section-padding bg-white dark:bg-bg text-gray-900 dark:text-text projects-section reveal-section"
      data-animate
      style={{ overflow: 'hidden' }}
    >
      <div className="section-divider"></div>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <h2
          ref={headingRef}
          className="gradient-text"
          data-animate
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
          data-animate
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

      {/* Timeline container */}
      <div className="proj-timeline" style={{ position: 'relative', maxWidth: '1100px', margin: '0 auto' }}>
        {/* Vertical timeline line */}
        <div
          ref={lineRef}
          className="proj-timeline-line"
          data-animate
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '6px',
            transformOrigin: 'top',
            transform: 'scaleY(0)',
            marginLeft: '-3px',
            borderRadius: '4px',
          }}
        />

        {/* Timeline nodes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          {projects.map((project, i) => {
            const isOdd = i % 2 === 0; // 0-indexed: 1st,3rd,5th → right side
            return (
              <div
                key={project.id || project.title}
                ref={(el) => (nodesRef.current[i] = el)}
                className="proj-timeline-node"
                data-animate
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: isOdd ? 'flex-end' : 'flex-start',
                  position: 'relative',
                }}
              >
                {/* Marker dot */}
                <div
                  className="proj-timeline-marker"
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '2rem',
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
                  className="proj-timeline-connector"
                  style={{
                    position: 'absolute',
                    top: 'calc(2rem + 7px)',
                    height: '2px',
                    opacity: 0,
                    transition: 'opacity 0.4s ease 0.2s',
                    ...(isOdd
                      ? { left: 'calc(50% + 8px)', width: 'calc(2.5rem - 8px)' }
                      : { right: 'calc(50% + 8px)', width: 'calc(2.5rem - 8px)' }
                    ),
                  }}
                />

                {/* Card */}
                <div
                  className={`proj-timeline-card ${isOdd ? 'proj-card-right' : 'proj-card-left'}`}
                  style={{
                    width: 'calc(50% - 2.5rem)',
                  }}
                >
                  <MagneticWrapper>
                    <ProjectCard project={project} />
                  </MagneticWrapper>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Timeline styles */}
      <style>{`
        /* ── Rotating twisted cable timeline line ── */
        .proj-timeline-line {
          background: repeating-linear-gradient(
            45deg,
            #8a6f27 0px,
            #8a6f27 6px,
            var(--gold) 6px,
            var(--gold) 12px,
            var(--gold-light) 12px,
            var(--gold-light) 18px,
            var(--gold) 18px,
            var(--gold) 24px
          );
          background-size: 34px 34px;
          animation: twist-scroll 1.2s linear infinite;
          box-shadow: 0 0 12px rgba(212, 175, 55, 0.45), 0 0 20px rgba(212, 175, 55, 0.2);
        }

        @keyframes twist-scroll {
          from {
            background-position-y: 0px;
          }
          to {
            background-position-y: 34px;
          }
        }

        /* ── Glowing Flowing Horizontal Connector ── */
        .proj-timeline-connector {
          background: linear-gradient(90deg, var(--gold) 0%, var(--gold-light) 50%, var(--gold) 100%);
          background-size: 200% 100%;
          animation: connector-flow 1.5s linear infinite;
          box-shadow: 0 0 8px rgba(212, 175, 55, 0.4);
        }

        @keyframes connector-flow {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: 0 0;
          }
        }

        /* ── Card slide-in transitions ── */
        .proj-timeline-card {
          opacity: 0;
          transition: opacity 0.6s cubic-bezier(0.25, 0.1, 0.25, 1),
                      transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1);
          will-change: opacity, transform;
        }

        .proj-card-right {
          transform: translateX(80px);
        }

        .proj-card-left {
          transform: translateX(-80px);
        }

        /* ── Visible state triggered per-node ── */
        .proj-node-visible .proj-timeline-card {
          opacity: 1;
          transform: translateX(0);
        }

        .proj-node-visible .proj-timeline-marker {
          transform: translateX(-50%) scale(1) !important;
          background: var(--gold) !important;
          box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.25), 0 0 16px rgba(212, 175, 55, 0.3);
          animation: proj-dot-pulse 2s ease-in-out infinite;
        }

        .proj-node-visible .proj-timeline-connector {
          opacity: 1 !important;
        }

        @keyframes proj-dot-pulse {
          0%, 100% {
            box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.25), 0 0 16px rgba(212, 175, 55, 0.3);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(212, 175, 55, 0), 0 0 20px rgba(212, 175, 55, 0.1);
          }
        }

        /* ── Flip card styles ── */
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

        /* ── Responsive: mobile < 768px ── */
        @media (max-width: 768px) {
          .proj-timeline-line {
            left: 1rem !important;
            margin-left: 0 !important;
          }

          .proj-timeline-node {
            justify-content: flex-start !important;
            padding-left: 3rem;
          }

          .proj-timeline-node .proj-timeline-card {
            width: 100% !important;
          }

          .proj-card-right,
          .proj-card-left {
            transform: translateX(80px);
          }

          .proj-node-visible .proj-card-right,
          .proj-node-visible .proj-card-left {
            transform: translateX(0);
          }

          .proj-timeline-marker {
            left: 1rem !important;
          }

          .proj-timeline-connector {
            left: calc(1rem + 8px) !important;
            right: auto !important;
            width: calc(2rem - 8px) !important;
          }
        }

        /* ── Continuous sliding carousel with 3s delay & 0.8s smooth transition ── */
        .proj-carousel-track:hover {
          animation-play-state: paused !important;
        }

        @keyframes proj-slide-5 {
          0% {
            transform: translateX(0);
            animation-timing-function: ease-in-out;
          }
          15.79% {
            transform: translateX(0);
            animation-timing-function: ease-in-out;
          }
          20% {
            transform: translateX(-10%);
            animation-timing-function: ease-in-out;
          }
          35.79% {
            transform: translateX(-10%);
            animation-timing-function: ease-in-out;
          }
          40% {
            transform: translateX(-20%);
            animation-timing-function: ease-in-out;
          }
          55.79% {
            transform: translateX(-20%);
            animation-timing-function: ease-in-out;
          }
          60% {
            transform: translateX(-30%);
            animation-timing-function: ease-in-out;
          }
          75.79% {
            transform: translateX(-30%);
            animation-timing-function: ease-in-out;
          }
          80% {
            transform: translateX(-40%);
            animation-timing-function: ease-in-out;
          }
          95.79% {
            transform: translateX(-40%);
            animation-timing-function: ease-in-out;
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes proj-slide-4 {
          0% {
            transform: translateX(0);
            animation-timing-function: ease-in-out;
          }
          19.74% {
            transform: translateX(0);
            animation-timing-function: ease-in-out;
          }
          25% {
            transform: translateX(-12.5%);
            animation-timing-function: ease-in-out;
          }
          44.74% {
            transform: translateX(-12.5%);
            animation-timing-function: ease-in-out;
          }
          50% {
            transform: translateX(-25%);
            animation-timing-function: ease-in-out;
          }
          69.74% {
            transform: translateX(-25%);
            animation-timing-function: ease-in-out;
          }
          75% {
            transform: translateX(-37.5%);
            animation-timing-function: ease-in-out;
          }
          94.74% {
            transform: translateX(-37.5%);
            animation-timing-function: ease-in-out;
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes proj-slide-3 {
          0% {
            transform: translateX(0);
            animation-timing-function: ease-in-out;
          }
          26.31% {
            transform: translateX(0);
            animation-timing-function: ease-in-out;
          }
          33.33% {
            transform: translateX(-16.67%);
            animation-timing-function: ease-in-out;
          }
          59.64% {
            transform: translateX(-16.67%);
            animation-timing-function: ease-in-out;
          }
          66.67% {
            transform: translateX(-33.33%);
            animation-timing-function: ease-in-out;
          }
          92.98% {
            transform: translateX(-33.33%);
            animation-timing-function: ease-in-out;
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes proj-slide-2 {
          0% {
            transform: translateX(0);
            animation-timing-function: ease-in-out;
          }
          39.47% {
            transform: translateX(0);
            animation-timing-function: ease-in-out;
          }
          50% {
            transform: translateX(-25%);
            animation-timing-function: ease-in-out;
          }
          89.47% {
            transform: translateX(-25%);
            animation-timing-function: ease-in-out;
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes proj-slide-1 {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
