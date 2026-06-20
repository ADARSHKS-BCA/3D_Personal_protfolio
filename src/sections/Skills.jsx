// src/sections/Skills.jsx
import React from 'react';

const SKILLS_DATA = [
  {
    name: 'React',
    label: 'Dynamic UI & Component Architecture',
    color: '#61dafb',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.5">
        <ellipse cx="12" cy="12" rx="10" ry="4.5" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'JavaScript',
    label: 'ES6+ Logic & Web Orchestration',
    color: '#f7df1e',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <path d="M12 15h2a1.5 1.5 0 0 0 0-3h-1.5a1.5 1.5 0 0 1 0-3H14.5" strokeLinecap="round" />
        <path d="M9 9v4.5a1.5 1.5 0 0 1-3 0" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Python',
    label: 'Automation, Scripting & Data Pipelines',
    color: '#3776ab',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2c-3 0-4 1.5-4 3.5v1.5h4v1H6c-2 0-4 1.5-4 4.5s1.5 4.5 4.5 4.5H8v-1.5c0-2.5 1.5-4 4-4h4v-1h-4c-2.5 0-3.5-1-3.5-3.5V5c0-1.5 1-3 3.5-3.05Z" fill="currentColor" />
        <path d="M12 22c3 0 4-1.5 4-3.5v-1.5h-4v-1h6c2 0 4-1.5 4-4.5s-1.5-4.5-4.5-4.5H16v1.5c0 2.5-1.5 4-4 4H8v1h4c2.5 0 3.5 1 3.5 3.5V19c0 1.5-1 3-3.5 3.05Z" fill="currentColor" opacity="0.85" />
        <circle cx="9.5" cy="5.5" r="0.75" fill="#f5f0e8" />
        <circle cx="14.5" cy="18.5" r="0.75" fill="#f5f0e8" />
      </svg>
    ),
  },
  {
    name: 'Flutter',
    label: 'Cross-Platform Mobile Interfaces',
    color: '#02569b',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.5">
        <path d="M12.5 2L3 11.5l3.5 3.5L19.5 2ZM19.5 11.5L12.5 18.5l7 7h-6.5l-3.5-3.5-3.5 3.5H3.5l7-7Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'SQL',
    label: 'Relational Queries & Schema Design',
    color: '#0064a5',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.5">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        <path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6" />
      </svg>
    ),
  },
  {
    name: 'C++',
    label: 'Systems Programming & Performance',
    color: '#00599c',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.5">
        <path d="M14 8a5 5 0 1 0 0 8" strokeLinecap="round" />
        <path d="M17 12h4M19 10v4M22 12h-2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Docker',
    label: 'Containerized Deployment Systems',
    color: '#2496ed',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.5">
        <path d="M2 14c2.5.5 5 1.5 8 1 2-.5 4.5-2.5 5-4 .5-1.5 2-2.5 3.5-2 1.5.5 2 1.5 2 2.5 0 2-2 4.5-5 5.5s-6 1.5-9.5.5c-1-.3-2.5-1-4-3.5Z" strokeLinecap="round" />
        <rect x="5" y="8" width="3" height="2" rx="0.5" />
        <rect x="9" y="8" width="3" height="2" rx="0.5" />
        <rect x="7" y="5" width="3" height="2" rx="0.5" />
      </svg>
    ),
  },
  {
    name: 'Automation',
    label: 'Workflow Optimization & Cron Scripting',
    color: '#e8622a',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
      </svg>
    ),
  },
  {
    name: 'Postgres SQL',
    label: 'Enterprise Data Stores & Scaling',
    color: '#4169e1',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.5">
        <path d="M19.5 7.5c-1.38 0-2.5 1.12-2.5 2.5 0 2.22-3.18 4.5-5 4.5H9v-1.5c0-1.93-1.57-3.5-3.5-3.5S2 11.07 2 13v3c0 2.76 2.24 5 5 5h3c3.87 0 7-3.13 7-7 0-.55.45-1 1-1h1.5c1.38 0 2.5-1.12 2.5-2.5s-1.12-2.5-2.5-2.5ZM12 9.5c0-1.38-1.12-2.5-2.5-2.5S7 8.12 7 9.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Git/GitHub',
    label: 'Version Control & Collaborative CI/CD',
    color: '#f05032',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.5">
        <circle cx="18" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M6 9v6" />
        <path d="M9 6h3a3 3 0 0 1 3 3v6" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="skills-section section-padding relative w-full overflow-hidden flex flex-col items-center bg-[#f5f0e8] select-none"
      style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="section-divider" style={{ marginBottom: '60px' }} />

      {/* Header Container */}
      <div className="section-container w-full mb-20 text-center skills-heading-container">
        <h2
          className="tracking-widest uppercase font-bold mb-3"
          style={{ color: '#9a8f7e', fontSize: '10px', letterSpacing: '0.2em' }}
        >
          SKILLS &amp; EXPERTISE
        </h2>
        <h1
          className="section-title"
        >
          Skills &amp; Expertise
        </h1>
      </div>

      {/* Grid Container: Clean columns with precise gap spacing */}
      <div className="section-container w-full">
        <div className="flex flex-wrap justify-center gap-x-[36px] lg:gap-x-[40px] gap-y-[48px] lg:gap-y-[56px] skills-grid-container">
          {SKILLS_DATA.map((skill) => (
            <div
              key={skill.name}
              className="skill-card-wrapper w-full sm:w-[calc((100%-40px)/2)] lg:w-[calc((100%-80px)/3)] max-w-[340px] h-[175px] relative group"
              style={{
                '--parallax-y': '0px',
              }}
            >
              {/* Layer 3 - Back card */}
              <div className="layer-3 absolute inset-0 bg-[#F8F6F1] border border-black/[0.08] rounded-[24px] pointer-events-none opacity-[0.18] z-1 shadow-[0_2px_8px_rgba(0,0,0,0.01)]" />

              {/* Layer 2 - Middle card */}
              <div className="layer-2 absolute inset-0 bg-[#F8F6F1] border border-black/[0.08] rounded-[24px] pointer-events-none opacity-[0.35] z-2 shadow-[0_4px_12px_rgba(0,0,0,0.02)]" />

              {/* Layer 1 - Front card */}
              <div className="layer-1 relative h-full w-full bg-[#F8F6F1] border border-black/[0.08] rounded-[24px] p-[28px] lg:p-[30px] z-3 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between overflow-hidden">
                
                {/* Burnt Orange Accent Line (Left edge on hover) */}
                <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#e8622a] rounded-l-[24px] transform scale-y-0 origin-center group-hover:scale-y-100 transition-transform duration-[450ms] cubic-bezier(0.22, 1, 0.36, 1)" />

                {/* Monochrome-to-Color Icon Container */}
                <div
                  className="icon-container flex items-center justify-center w-12 h-12 rounded-xl bg-black/[0.03] transition-all duration-[450ms] cubic-bezier(0.22, 1, 0.36, 1) origin-center self-start"
                  style={{
                    color: '#9a8f7e', // Default warm gray
                  }}
                >
                  {skill.icon}
                </div>

                {/* Typography */}
                <div className="flex flex-col gap-1.5">
                  <h3
                    className="font-semibold text-[#1a1612]"
                    style={{ fontSize: '18px', letterSpacing: '-0.3px', lineHeight: 1.2 }}
                  >
                    {skill.name}
                  </h3>
                  <p
                    className="text-[#7a6e60] leading-normal"
                    style={{ fontSize: '14px', lineHeight: 1.3 }}
                  >
                    {skill.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Styled custom animations, hover classes, and dynamic variables */}
      <style>{`
        /* Idle subtle offsets for stacked effect */
        .layer-1 {
          transform: translateY(calc(var(--parallax-y) * 0.3)) rotate(0deg);
        }
        .layer-2 {
          transform: translateY(calc(4px + var(--parallax-y) * 0.1)) rotate(0deg);
        }
        .layer-3 {
          transform: translateY(calc(8px + var(--parallax-y) * 0.05)) rotate(0deg);
        }

        /* Set base transition properties matching Apple spec */
        .layer-1, .layer-2, .layer-3 {
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
                      opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1),
                      border-color 0.45s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.45s cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* Hover alignments, translations and scale spreads */
        .group:hover .layer-1 {
          transform: translateY(-8px) rotate(0deg) !important;
          border-color: rgba(232, 98, 42, 0.4) !important;
          box-shadow: 0 16px 36px rgba(232, 98, 42, 0.06), 0 8px 20px rgba(0, 0, 0, 0.03) !important;
        }
        .group:hover .layer-2 {
          transform: translateY(-2px) rotate(0deg) !important; /* -8px + 6px offset */
          opacity: 0.55 !important;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.03) !important;
        }
        .group:hover .layer-3 {
          transform: translateY(4px) rotate(0deg) !important;  /* -8px + 12px offset */
          opacity: 0.30 !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02) !important;
        }

        /* Color reveal and icon container scale on hover */
        .group:hover .icon-container {
          transform: scale(1.05);
          background-color: rgba(232, 98, 42, 0.06);
        }
        
        /* Map custom hover branding colors dynamically */
        .group:hover:nth-child(1) .icon-container { color: #61dafb !important; }
        .group:hover:nth-child(2) .icon-container { color: #d6be1a !important; }
        .group:hover:nth-child(3) .icon-container { color: #3776ab !important; }
        .group:hover:nth-child(4) .icon-container { color: #02569b !important; }
        .group:hover:nth-child(5) .icon-container { color: #0064a5 !important; }
        .group:hover:nth-child(6) .icon-container { color: #00599c !important; }
        .group:hover:nth-child(7) .icon-container { color: #2496ed !important; }
        .group:hover:nth-child(8) .icon-container { color: #e8622a !important; }
        .group:hover:nth-child(9) .icon-container { color: #4169e1 !important; }
        .group:hover:nth-child(10) .icon-container { color: #f05032 !important; }
      `}</style>
    </section>
  );
}
