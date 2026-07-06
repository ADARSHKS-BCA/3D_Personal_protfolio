// src/sections/Skills.jsx
import React from 'react';

const SKILLS_DATA = [
  {
    name: 'C',
    color: '#A8B9CC',
    desc: 'Used for low-level systems programming and foundational data structure modeling during coursework.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.5">
        <path d="M16 8a5 5 0 1 0 0 8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'C++',
    color: '#00599C',
    desc: 'Utilized for performance-critical algorithms and competitive programming problem-solving.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.5">
        <path d="M14 8a5 5 0 1 0 0 8" strokeLinecap="round" />
        <path d="M17 12h4M19 10v4M22 12h-2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Dart',
    color: '#0175C2',
    desc: 'Used to build cross-platform mobile apps like Find Your Venue.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.5">
        <path d="M12 2L4 10l8 8 8-8-8-8Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 22V10" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'HTML5',
    color: '#E34F26',
    desc: 'Implemented semantic markup across React and Next.js frontends like MediConnect and HabitFlow.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.5">
        <path d="M4 3h16l-2 14-6 4-6-4L4 3Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 8H8.5v3H14v3l-2 1-2-1v-1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Java',
    color: '#007396',
    desc: 'Utilized for core object-oriented programming concepts and backend system architectures.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.5">
        <path d="M6 16c0 2 3 3 6 3s6-1 6-3M10 8c-1-2 2-3 2-5M14 9c-1-2 2-3 2-5M5 12h14" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'JavaScript',
    color: '#F7DF1E',
    desc: 'Built interactive client-side logic and backend APIs for Hockey Hub.',
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
    color: '#3776AB',
    desc: 'Developed secure backend portals (SecureBank) and high-performance machine learning APIs (Semantic Search API).',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.5">
        <path d="M12 2v8M12 14v8M8 12h8M12 6c-3 0-5 2-5 5s2 5 5 5 5-2 5-5-2-5-5-5Z" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    color: '#3178C6',
    desc: 'Enforced compile-time safety across large-scale full stack platforms (MediConnect, HabitFlow).',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <path d="M9 7h6M12 7v10" strokeLinecap="round" />
        <path d="M17 11.5a1.5 1.5 0 0 1-3 0v-2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'AWS',
    color: '#FF9900',
    desc: 'Configured cloud infrastructure services, S3 bucket storage, and server environments for application hosting.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.5">
        <path d="M12 5c-4 0-7 2-7 4.5S9 14 12 14s7-2 7-4.5S16 5 12 5Z" strokeLinecap="round" />
        <path d="M5 11c0 2 3.5 4 7 4s7-2 7-4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Vercel',
    color: '#000000',
    desc: 'Deployed React and Next.js frontend architectures (MediConnect, HabitFlow, Hockey Hub) for seamless CI/CD.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.5">
        <path d="M12 3l9 16H3L12 3Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Firebase',
    color: '#FFCA28',
    desc: 'Configured real-time database syncing, auth, and notifications for Find Your Venue mobile app.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.5">
        <path d="M12 2L4 16.5l8 5.5 8-5.5L12 2Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 14.5l5-8.5 5 8.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Render',
    color: '#46E3B7',
    desc: 'Deployed database instances, Python backends, and live API endpoints.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.5">
        <rect x="4" y="4" width="16" height="16" rx="4" />
        <path d="M9 16V8l6 8V8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: '.NET',
    color: '#512BD4',
    desc: 'Built enterprise database integrations and robust API architectures.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.5">
        <circle cx="12" cy="12" r="8" />
        <path d="M8 12h8M12 8v8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Bootstrap',
    color: '#7952B3',
    desc: 'Styled responsive, mobile-first dashboards and grid layouts.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.5">
        <rect x="4" y="4" width="16" height="16" rx="4" />
        <path d="M9 7h3a2 2 0 0 1 0 4H9v4h3.5a2 2 0 0 1 0 4H9" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Next.js',
    color: '#000000',
    desc: 'Leveraged server-side rendering (SSR) and server components to build HabitFlow.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M9 15V9l6 6V9" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Node.js',
    color: '#339933',
    desc: 'Architected fast, scalable asynchronous servers and RESTful APIs for MediConnect and Hockey Hub.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.5">
        <path d="M12 2L4 7v10l8 5 8-5V7l-8-5Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 7l6 3.5v7L12 21" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'OpenCV',
    color: '#5C3EE8',
    desc: 'Processed real-time computer vision datasets, image filtering, and frame adjustments.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.5">
        <circle cx="12" cy="7" r="4" />
        <circle cx="7" cy="16" r="4" />
        <circle cx="17" cy="16" r="4" />
      </svg>
    ),
  },
  {
    name: 'React',
    color: '#61DAFB',
    desc: 'Crafted dynamic, component-driven client interfaces like MediConnect.',
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
    name: 'SQLite',
    color: '#003B57',
    desc: 'Engineered lightweight database solutions for mobile applications and quick prototype stores.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.5">
        <ellipse cx="12" cy="6" rx="9" ry="3" />
        <path d="M3 6v5c0 1.66 4 3 9 3s9-1.34 9-3V6" />
        <path d="M3 11v5c0 1.66 4 3 9 3s9-1.34 9-3v-5" />
      </svg>
    ),
  },
  {
    name: 'Supabase',
    color: '#3ECF8E',
    desc: 'Implemented postgres database hosting, secure user authentications, and instant edge-triggers.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.5">
        <path d="M13 2L3 13h9l-1 9 10-11h-9l1-9Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'MySQL',
    color: '#4479A1',
    desc: 'Designed relational databases with optimal schemas and transaction logs.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.5">
        <path d="M4 6c0 1.66 4 3 9 3s9-1.34 9-3-4-3-9-3-9 1.34-9 3Z" />
        <path d="M4 6v6c0 1.66 4 3 9 3s9-1.34 9-3V6" />
        <path d="M4 12v6c0 1.66 4 3 9 3s9-1.34 9-3v-6" />
      </svg>
    ),
  },
  {
    name: 'MongoDB',
    color: '#47A248',
    desc: 'Managed flexible NoSQL database schemas for MediConnect and Hockey Hub.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.5">
        <path d="M12 2C9 7 7 12 7 15c0 2.76 2.24 5 5 5s5-2.24 5-5c0-3-2-8-5-13Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Flutter',
    color: '#02569b',
    desc: 'Built fluid, cross-platform Android/iOS layouts for Find Your Venue.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current" fill="none" strokeWidth="1.5">
        <path d="M12.5 2L3 11.5l3.5 3.5L19.5 2ZM19.5 11.5L12.5 18.5l7 7h-6.5l-3.5-3.5-3.5 3.5H3.5l7-7Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Docker',
    color: '#2496ed',
    desc: 'Containerized full-stack deployment services to ensure consistent container environments.',
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
    name: 'Git/GitHub',
    color: '#f05032',
    desc: 'Managed version control pipelines and repository syncs across all development projects.',
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
              className="skill-card-wrapper w-full sm:w-[calc((100%-40px)/2)] lg:w-[calc((100%-80px)/3)] max-w-[340px] h-[190px] relative group"
              style={{
                '--parallax-y': '0px',
                '--hover-color': skill.color,
              }}
            >
              {/* Layer 3 - Back card */}
              <div className="layer-3 absolute inset-0 bg-[#F8F6F1] border border-black/[0.08] rounded-[24px] pointer-events-none opacity-[0.18] z-1 shadow-[0_2px_8px_rgba(0,0,0,0.01)]" />

              {/* Layer 2 - Middle card */}
              <div className="layer-2 absolute inset-0 bg-[#F8F6F1] border border-black/[0.08] rounded-[24px] pointer-events-none opacity-[0.35] z-2 shadow-[0_4px_12px_rgba(0,0,0,0.02)]" />

              {/* Layer 1 - Front card */}
              <div className="layer-1 relative h-full w-full bg-[#F8F6F1] border border-black/[0.08] rounded-[24px] p-[24px] z-3 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between overflow-hidden">
                
                {/* Burnt Orange Accent Line (Left edge on hover) */}
                <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[var(--hover-color)] rounded-l-[24px] transform scale-y-0 origin-center group-hover:scale-y-100 transition-transform duration-[450ms] cubic-bezier(0.22, 1, 0.36, 1)" />

                {/* Monochrome-to-Color Icon Container */}
                <div
                  className="icon-container flex items-center justify-center w-10 h-10 rounded-lg bg-black/[0.03] transition-all duration-[450ms] cubic-bezier(0.22, 1, 0.36, 1) origin-center self-start"
                  style={{
                    color: '#9a8f7e', // Default warm gray
                  }}
                >
                  {skill.icon}
                </div>

                {/* Typography */}
                <div className="flex flex-col gap-1">
                  <h3
                    className="font-semibold text-[#1a1612]"
                    style={{ fontSize: '16px', letterSpacing: '-0.3px', lineHeight: 1.2, fontFamily: 'var(--font-display)' }}
                  >
                    {skill.name}
                  </h3>
                  <p 
                    className="text-slate-500 dark:text-slate-400 leading-snug line-clamp-3"
                    style={{ fontSize: '11px', fontFamily: 'var(--font-body)', marginTop: '2px' }}
                  >
                    {skill.desc}
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
          border-color: var(--hover-color) !important;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.04), 0 8px 20px rgba(0, 0, 0, 0.03) !important;
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
          background-color: rgba(232, 98, 42, 0.04);
          color: var(--hover-color) !important;
        }
      `}</style>
    </section>
  );
}
