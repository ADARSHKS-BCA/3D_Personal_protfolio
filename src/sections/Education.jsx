import React from 'react';
import { education } from '../data/education';

export default function Education() {
  return (
    <section
      id="education"
      className="section-container section-padding bg-transparent text-text education-section"
      data-animate
      style={{ overflow: 'hidden' }}
    >
      <div className="section-divider"></div>
      <h2
        className="section-title"
        style={{
          textAlign: 'center',
          marginBottom: '4rem',
        }}
      >
        Education
      </h2>

      <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
        {/* Vertical timeline line */}
        <div
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
                      fontFamily: 'var(--font-body)',
                      fontWeight: 600,
                      fontSize: '1.15rem',
                      color: 'var(--text)',
                      marginBottom: '0.25rem',
                      letterSpacing: '-0.01em',
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
                      background: 'rgba(99, 102, 241, 0.1)',
                      border: '1px solid rgba(99, 102, 241, 0.2)',
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
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.25), 0 0 16px rgba(99, 102, 241, 0.3);
          animation: edu-dot-pulse 2s ease-in-out infinite;
        }

        .edu-node-visible .edu-timeline-connector {
          opacity: 1 !important;
        }

        @keyframes edu-dot-pulse {
          0%, 100% {
            box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.25), 0 0 16px rgba(99, 102, 241, 0.3);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(99, 102, 241, 0), 0 0 20px rgba(99, 102, 241, 0.1);
          }
        }

        /* ── Responsive: mobile < 768px ── */
        @media (max-width: 768px) {
          .edu-timeline-line {
            left: 1.5rem !important;
            margin-left: 0 !important;
          }

          .edu-timeline-node {
            justify-content: flex-start !important;
            padding-left: 3.5rem !important;
            padding-right: 1.5rem !important;
            box-sizing: border-box !important;
            width: 100% !important;
          }

          .edu-timeline-node .edu-timeline-card {
            width: 100% !important;
            box-sizing: border-box !important;
            padding: 1rem !important;
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
            left: 1.5rem !important;
          }

          .edu-timeline-connector {
            left: calc(1.5rem + 8px) !important;
            right: auto !important;
            width: calc(2rem - 8px) !important;
          }
        }
      `}</style>
    </section>
  );
}
