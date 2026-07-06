import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { projects } from '../data/projects';

// ── Magnetic Button Component ──
function MagneticButton({ children, href, target, rel, className, style, onMouseEnter, onMouseLeave }) {
  const btnRef = useRef(null);

  const handleMouseMove = (e) => {
    const btn = btnRef.current;
    if (!btn || window.innerWidth < 1024) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.35,
      y: y * 0.35,
      scale: 1.05,
      duration: 0.3,
      ease: 'power3.out',
    });
  };

  const handleMouseLeave = (e) => {
    const btn = btnRef.current;
    if (!btn) return;

    gsap.to(btn, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
    if (onMouseLeave) onMouseLeave(e);
  };

  return (
    <a
      ref={btnRef}
      href={href}
      target={target}
      rel={rel}
      className={className}
      style={{ ...style, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.3s ease, background 0.3s ease' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={onMouseEnter}
    >
      {children}
    </a>
  );
}

// ── Screenshot Carousel Component ──
function ImageCarousel({ images, title }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#F8F6F1]">
      {images.map((src, idx) => (
        <div
          key={idx}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: idx === currentIndex ? 1 : 0, zIndex: idx === currentIndex ? 2 : 1 }}
        >
          <img
            src={src}
            alt={`${title} screenshot ${idx + 1}`}
            className="w-full h-full object-cover project-card-img transition-transform duration-500 ease-out"
            style={{ transformOrigin: 'center' }}
          />
        </div>
      ))}
      
      {/* Indicator Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-10 bg-slate-900/50 backdrop-blur-sm py-1 px-2.5 rounded-full border border-white/5">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'bg-indigo-400 w-3' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Custom Graphic Composition for Projects without Screenshots ──
function ProjectGraphic({ projectId, title, tech }) {
  if (projectId === 'securebank') {
    return (
      <div className="w-full h-full bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 flex flex-col items-center justify-center p-8 relative overflow-hidden">
        {/* Abstract grids */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute w-[200px] h-[200px] rounded-full bg-blue-500/10 dark:bg-emerald-500/10 blur-[80px] -top-10 -right-10 pointer-events-none" />
        <div className="absolute w-[250px] h-[250px] rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 blur-[100px] -bottom-10 -left-10 pointer-events-none" />

        {/* Floating Credit Card Mockup */}
        <div className="w-[320px] h-[190px] rounded-2xl bg-gradient-to-br from-white to-slate-100 dark:from-indigo-950/80 dark:to-slate-950/80 border border-slate-200 dark:border-indigo-500/30 backdrop-blur-lg p-6 shadow-xl dark:shadow-2xl flex flex-col justify-between relative transform -rotate-6 hover:rotate-0 transition-transform duration-500 z-10 group">
          <div className="flex justify-between items-start">
            <div className="w-12 h-9 rounded bg-gradient-to-br from-amber-400 to-yellow-500 relative overflow-hidden flex items-center justify-center border border-yellow-300/20">
              {/* Chip lines */}
              <div className="absolute inset-1 border border-black/10 rounded" />
            </div>
            <div className="text-right">
              <span className="text-slate-400 dark:text-white/40 text-[9px] uppercase tracking-widest font-mono">SecureBank</span>
              <div className="text-blue-600 dark:text-emerald-400 text-xs font-semibold">SSL ACTIVE</div>
            </div>
          </div>
          
          <div>
            <div className="text-slate-800 dark:text-white/80 font-mono tracking-widest text-sm mb-1.5">**** **** **** 8820</div>
            <div className="flex justify-between items-center text-[10px] text-slate-400 dark:text-white/40 font-mono">
              <div>
                <div>CARDHOLDER</div>
                <div className="text-slate-700 dark:text-white/70 font-semibold tracking-wide">ADARSH K. S.</div>
              </div>
              <div className="text-right">
                <div>EXPIRES</div>
                <div className="text-slate-700 dark:text-white/70 font-semibold">12/29</div>
              </div>
            </div>
          </div>
        </div>

        {/* Key indicator tags */}
        <div className="absolute bottom-8 right-8 bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-emerald-500/30 text-blue-600 dark:text-emerald-400 text-[10px] px-3 py-1.5 rounded-full font-mono flex items-center gap-1.5 shadow-md">
          <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-emerald-400 animate-pulse" />
          LEDGER AUDIT COMPLETED
        </div>
      </div>
    );
  }

  if (projectId === 'find-your-venue') {
    return (
      <div className="w-full h-full bg-gradient-to-br from-slate-50 via-slate-100 to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950 flex flex-col items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
        <div className="absolute w-[300px] h-[300px] rounded-full bg-emerald-500/10 blur-[90px] top-10 left-10 pointer-events-none" />

        {/* Floating Map Composition */}
        <div className="w-[280px] h-[280px] relative z-10 flex items-center justify-center">
          {/* Circular map frame */}
          <div className="absolute inset-0 rounded-full border border-slate-200 dark:border-emerald-500/20 bg-white/80 dark:bg-slate-950/60 backdrop-blur-md flex items-center justify-center overflow-hidden">
            {/* Grid gridlines to simulate floor map */}
            <div className="w-[140%] h-[140%] rotate-12 opacity-35 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.1)_0%,transparent_70%)] flex flex-wrap gap-4 p-4">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="w-16 h-16 border border-emerald-500/15 dark:border-emerald-500/25 rounded-lg flex items-center justify-center text-[10px] text-emerald-600/30 dark:text-emerald-500/30">
                  Block {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
          </div>

          {/* Glowing central location pin */}
          <div className="w-12 h-12 rounded-full bg-emerald-500/15 dark:bg-emerald-500/20 border border-emerald-400 flex items-center justify-center relative z-20 shadow-[0_0_25px_rgba(16,185,129,0.3)] dark:shadow-[0_0_25px_rgba(16,185,129,0.5)] animate-bounce">
            <span className="text-xl">📍</span>
            <span className="absolute -inset-2 rounded-full border border-emerald-400/40 animate-ping" />
          </div>

          {/* Floating Venue Tags */}
          <div className="absolute top-4 right-0 bg-white/95 dark:bg-slate-900/80 border border-slate-200 dark:border-emerald-500/30 text-slate-800 dark:text-white/90 text-[10px] py-1.5 px-3 rounded-lg shadow-lg rotate-12 flex flex-col gap-0.5">
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">Auditorium Main</span>
            <span className="text-slate-500 dark:text-white/50 text-[8px]">Capacity: 500 Seats</span>
          </div>
          
          <div className="absolute bottom-6 left-0 bg-white/95 dark:bg-slate-900/80 border border-slate-200 dark:border-emerald-500/30 text-slate-800 dark:text-white/90 text-[10px] py-1.5 px-3 rounded-lg shadow-lg -rotate-6 flex flex-col gap-0.5">
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">Conference Room C</span>
            <span className="text-slate-500 dark:text-white/50 text-[8px]">Status: Reserved 2PM</span>
          </div>
        </div>
      </div>
    );
  }

  if (projectId === 'semantic-search') {
    return (
      <div className="w-full h-full bg-gradient-to-br from-slate-50 via-slate-100 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-purple-950 flex flex-col items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
        <div className="absolute w-[250px] h-[250px] rounded-full bg-purple-500/10 blur-[80px] -bottom-10 -right-10 pointer-events-none" />

        {/* Neural Vector Search Composition */}
        <div className="relative w-full max-w-[340px] z-10 flex flex-col gap-3">
          {/* Query Bar Mock */}
          <div className="w-full bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-purple-500/30 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <span className="text-purple-500 dark:text-purple-400">🔍</span>
              <span className="text-slate-700 dark:text-white/70 italic">"healthcare appointment booking"</span>
            </div>
            <span className="text-[10px] text-purple-600 dark:text-purple-400 font-mono px-2 py-0.5 bg-purple-500/10 rounded-md border border-purple-500/20">COSINE</span>
          </div>

          {/* Results Stack */}
          <div className="flex flex-col gap-2 relative pl-4 border-l border-slate-200 dark:border-purple-500/30">
            <div className="w-full bg-white/70 dark:bg-slate-900/40 border border-slate-200 dark:border-purple-500/20 rounded-xl p-3 flex justify-between items-center transform translate-x-2 shadow-sm">
              <div className="flex flex-col gap-1 max-w-[70%]">
                <span className="text-slate-800 dark:text-white/90 text-xs font-semibold">MediConnect Platform</span>
                <span className="text-slate-500 dark:text-white/40 text-[10px] line-clamp-1">telemedicine slot scheduling for clinics...</span>
              </div>
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 dark:border-emerald-500/25 px-2 py-0.5 rounded">Score: 0.982</span>
            </div>
            
            <div className="w-full bg-white/70 dark:bg-slate-900/40 border border-slate-200 dark:border-purple-500/15 rounded-xl p-3 flex justify-between items-center opacity-70 transform translate-x-1 shadow-sm">
              <div className="flex flex-col gap-1 max-w-[70%]">
                <span className="text-slate-800 dark:text-white/90 text-xs font-semibold">Hospital Directory API</span>
                <span className="text-slate-500 dark:text-white/40 text-[10px] line-clamp-1">list of healthcare systems and contact data...</span>
              </div>
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/15 dark:border-emerald-500/25 px-2 py-0.5 rounded">Score: 0.814</span>
            </div>

            <div className="w-full bg-white/70 dark:bg-slate-900/40 border border-slate-200 dark:border-purple-500/10 rounded-xl p-3 flex justify-between items-center opacity-40 shadow-sm">
              <div className="flex flex-col gap-1 max-w-[70%]">
                <span className="text-slate-800 dark:text-white/90 text-xs font-semibold">Fitness Tracking Service</span>
                <span className="text-slate-500 dark:text-white/40 text-[10px] line-clamp-1">log workouts, run streaks, calorie deficits...</span>
              </div>
              <span className="text-xs font-mono text-purple-600 dark:text-purple-400 bg-purple-500/10 border border-purple-500/10 px-2 py-0.5 rounded">Score: 0.450</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback default
  return (
    <div className="w-full h-full bg-gradient-to-br from-indigo-950/20 to-slate-900 flex items-center justify-center p-8">
      <h3 className="text-white text-lg font-bold">{title}</h3>
    </div>
  );
}

// ── Main Projects Section Component ──
export default function Projects() {
  // ── Cursor following border glow ──
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  // ── 3D Card Tilt ──
  const handleCardMouseMove = (e) => {
    if (window.innerWidth < 1024) return; // Disable on tablet/mobile
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Relative coordinates (-0.5 to 0.5)
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    // Calculate rotation angles (max 6 degrees for subtlety)
    const rotateX = -mouseY * 8;
    const rotateY = mouseX * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    card.style.boxShadow = `${-rotateY * 3}px ${rotateX * 3}px 40px rgba(99, 102, 241, 0.2), 0 15px 30px rgba(0, 0, 0, 0.4)`;

    const img = card.querySelector('.project-card-img');
    if (img) {
      img.style.transform = 'scale(1.03)';
    }
  };

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    card.style.boxShadow = 'none';

    const img = card.querySelector('.project-card-img');
    if (img) {
      img.style.transform = 'scale(1)';
    }
  };

  return (
    <section
      id="projects"
      className="bg-transparent text-text relative w-full overflow-hidden section-padding"
    >
      <div className="section-divider"></div>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }} className="px-6">
        <h2
          className="section-title"
        >
          Projects
        </h2>
      </div>

      {/* Projects Stack */}
      <div className="w-full flex flex-col gap-32 lg:gap-0 max-w-7xl mx-auto px-6 lg:px-8">
        {projects.map((project, idx) => {
          const hasImages = project.images && project.images.length > 0;
          return (
            <div
              key={project.id}
              id={`project-item-${project.id}`}
              className="project-section w-full min-h-[85vh] lg:min-h-screen flex items-center relative py-12 lg:py-20 border-b border-indigo-950/10 last:border-0"
              style={{ contentVisibility: 'auto' }}
            >
              {/* Inner Wrapper for active/inactive scroll transitions */}
              <div className="project-inner-wrapper w-full flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-20 transition-all duration-300 will-change-transform">
                
                {/* ── Left Column: Large Product Card (65%) ── */}
                <div className="w-full lg:w-[65%] flex-shrink-0 z-10">
                  <div
                    className="project-showcase-card aspect-[2/1] w-full rounded-[24px] overflow-hidden bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-blue-500/20 dark:border-indigo-500/20 shadow-2xl relative transition-all duration-300 ease-out cursor-none project-card-glow"
                    onMouseMove={(e) => {
                      handleMouseMove(e);
                      handleCardMouseMove(e);
                    }}
                    onMouseLeave={handleCardMouseLeave}
                    style={{
                      willChange: 'transform, box-shadow',
                    }}
                  >
                    {/* Content Area */}
                    <div className="w-full h-full relative overflow-hidden">
                      {hasImages ? (
                        <ImageCarousel images={project.images} title={project.title} />
                      ) : (
                        <ProjectGraphic projectId={project.id} title={project.title} tech={project.tech} />
                      )}
                    </div>
                  </div>
                </div>

                {/* ── Right Column: Product Explanation Panel (35%) ── */}
                <div className="project-showcase-info w-full lg:w-[35%] flex flex-col justify-center">
                  {/* Category Pill */}
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-indigo-400 mb-2">
                    {project.category}
                  </span>
{/* Title & Tagline */}
                  <h3 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
                    {project.title}
                  </h3>
                  <p className="text-base font-medium text-blue-600/90 dark:text-indigo-200/90 leading-snug mb-5 border-l-2 border-blue-500/40 dark:border-indigo-500/40 pl-4 py-0.5">
                    {project.tagline}
                  </p>

                  {/* Feature Bullets */}
                  <div className="mb-8" style={{ fontFamily: 'var(--font-body)' }}>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-white/50 mb-4" style={{ fontFamily: 'var(--font-body)', letterSpacing: '0.08em' }}>Core Features</h4>
                    <ul className="flex flex-col gap-3.5">
                      {project.features.map((feature, fIdx) => (
                        <li
                          key={fIdx}
                          className="project-showcase-bullet flex items-start gap-3 text-sm text-text-muted leading-snug"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-indigo-500 mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.8)] dark:shadow-[0_0_8px_rgba(99,102,241,1)]" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack chips */}
                  <div className="mb-10" style={{ fontFamily: 'var(--font-body)' }}>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-white/50 mb-4" style={{ fontFamily: 'var(--font-body)', letterSpacing: '0.08em' }}>Tech Stack</h4>
                    <div className="flex flex-wrap gap-2.5">
                      {project.tech.map((t) => (
                        <span key={t} className="project-showcase-chip tech-chip py-1.5 px-3.5 text-xs rounded-lg" style={{ fontWeight: 500 }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="project-showcase-btn flex flex-wrap gap-3.5 items-center">
                    {project.liveUrl && (
                      <MagneticButton
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-500 dark:from-indigo-600 dark:to-indigo-500 text-white rounded-xl font-semibold text-sm shadow-md shadow-blue-500/10 dark:shadow-indigo-500/10 border border-blue-400/20 dark:border-indigo-400/20"
                      >
                        Live Demo <span className="ml-1.5 text-xs">↗</span>
                      </MagneticButton>
                    )}
                    <MagneticButton
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-6 bg-slate-100 hover:bg-slate-200 dark:bg-slate-950/60 dark:hover:bg-slate-900 border border-slate-200 dark:border-indigo-500/20 dark:hover:border-indigo-500/40 text-slate-800 dark:text-white rounded-xl font-semibold text-sm"
                    >
                      GitHub Repository <span className="ml-1.5 text-xs">⟨/⟩</span>
                    </MagneticButton>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Styled Scoped CSS for Showcase Page */}
      <style>{`
        /* Custom mouse-following glow styling */
        .project-card-glow::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 24px;
          padding: 1px;
          background: radial-gradient(
            350px circle at var(--mouse-x, 0) var(--mouse-y, 0),
            rgba(59, 130, 246, 0.4),
            rgba(96, 165, 250, 0.1) 40%,
            transparent 60%
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 20;
        }

        html.dark .project-card-glow::before {
          background: radial-gradient(
            350px circle at var(--mouse-x, 0) var(--mouse-y, 0),
            rgba(99, 102, 241, 0.45),
            rgba(129, 140, 248, 0.1) 40%,
            transparent 60%
          );
        }

        .project-card-glow:hover::before {
          opacity: 1;
        }

        /* Glassmorphic border glow fallback default */
        .project-showcase-card {
          box-shadow: 0 10px 40px -15px rgba(0, 0, 0, 0.15), 0 0 50px 0 rgba(59, 130, 246, 0.02);
        }

        html.dark .project-showcase-card {
          box-shadow: 0 10px 40px -15px rgba(0, 0, 0, 0.5), 0 0 50px 0 rgba(99, 102, 241, 0.02);
        }

        /* Tech chip colors adapt */
        .tech-chip {
          color: var(--gold);
          background: rgba(59, 130, 246, 0.08) !important;
          border: 1px solid rgba(59, 130, 246, 0.18) !important;
        }

        html.dark .tech-chip {
          background: rgba(99, 102, 241, 0.08) !important;
          border: 1px solid rgba(99, 102, 241, 0.18) !important;
        }

        /* 3D tilt smooth return transition */
        .project-showcase-card {
          transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }

        /* Smooth hardware-accelerated transitions */
        .project-inner-wrapper {
          will-change: transform, opacity, filter;
          transform: translate3d(0, 0, 0);
        }

        /* Responsive styling tweak: stack grid items on mobile nicely */
        @media (max-width: 1023px) {
          .project-section {
            border-bottom: 1px solid rgba(99, 102, 241, 0.1);
          }
          .project-section:last-child {
            border-bottom: none;
          }
        }
      `}</style>
    </section>
  );
}
