// src/sections/Skills.jsx
import React, { useRef, useEffect, useState } from 'react';
import { barSkills } from '../data/skills';

const shelfBooks = [
  {
    name: 'Git',
    width: '46px',
    color: '#dc2626',
    description: 'A distributed version control system designed to handle everything from small to very large projects with speed and efficiency. It is the industry standard for tracking code changes, branch management, and collaborative software development.'
  },
  {
    name: 'Docker',
    width: '50px',
    color: '#2563eb',
    description: 'A platform designed to help developers build, share, and run applications inside lightweight containers. By containerizing software, it ensures consistency across different development, testing, and production environments.'
  },
  {
    name: 'MongoDB',
    width: '44px',
    color: '#f97316',
    description: 'A source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas for high scalability and flexible data structures.'
  },
  {
    name: 'REST APIs',
    width: '46px',
    color: '#8b5cf6',
    description: 'Representational State Transfer application programming interfaces that enable communication between different systems over HTTP. They rely on standard HTTP methods like GET, POST, PUT, and DELETE to manage resource states efficiently.'
  },
  {
    name: 'Node.js',
    width: '48px',
    color: '#0d9488',
    description: 'A cross-platform, open-source JavaScript runtime environment that executes JavaScript code outside a web browser. It uses an asynchronous event-driven model to build highly scalable and performant network applications.'
  },
  {
    name: 'Django',
    width: '46px',
    color: '#16a34a',
    description: 'A high-level Python web framework that encourages rapid development and clean, pragmatic design. Built by experienced developers, it takes care of much of the hassle of web development, so you can focus on writing your app.'
  },
  {
    name: 'PostgreSQL',
    width: '50px',
    color: '#1d4ed8',
    description: 'A powerful, open-source object-relational database system with over 30 years of active development. It has earned a strong reputation for reliability, feature robustness, and performance in handling complex data workloads.'
  }
];

// Row assignments for the 3-row shelf
const shelfRows = [
  shelfBooks.slice(0, 3),  // Row 1: Git, Docker, MongoDB
  shelfBooks.slice(3, 5),  // Row 2: REST APIs, Node.js
  shelfBooks.slice(5, 7),  // Row 3: Django, PostgreSQL
];

export default function Skills() {
  const sectionRef = useRef(null);
  const [isDoorsOpen, setIsDoorsOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAnimated(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="skills-section relative w-full overflow-hidden flex flex-col items-center text-slate-100"
      style={{
        background: 'var(--bg)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        paddingTop: '60px',
        paddingBottom: '60px',
        zIndex: selectedBook ? 60 : 10,
      }}
    >
      <div className="section-divider" />

      {/* Heading */}
      <div className="section-container relative z-10 w-full mb-8 text-center">
        <h2
          className="tracking-widest uppercase font-bold mb-1"
          style={{ color: 'var(--gold)', fontSize: 'clamp(9px, 1vw, 13px)' }}
        >
          ABILITIES &amp; EXPERTISE
        </h2>
        <h1
          className="font-extrabold tracking-tight text-slate-100"
          style={{ fontSize: 'clamp(20px, 3.5vw, 52px)', lineHeight: 1.15 }}
        >
          Skills &amp; Expertise
        </h1>
        <div className="w-20 h-[3px] bg-gradient-to-r from-[#6366f1] to-[#818cf8] mx-auto mt-4 rounded-full" />
      </div>

      {/* Two-column layout */}
      <div className="section-container relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

        {/* LEFT — Bookshelf */}
        <div className="lg:col-span-5 w-full flex flex-col items-center order-2 lg:order-1">
          {/* Shelf Container */}
          <div
            className="shelf-container relative w-full rounded-lg overflow-hidden shadow-2xl border border-slate-700"
            style={{
              maxWidth: '380px',
              background: '#111827',
            }}
          >
            {/* 3 shelf rows */}
            <div className="flex flex-col" style={{ padding: '10px 10px 6px' }}>
              {shelfRows.map((rowBooks, rowIdx) => (
                <div key={rowIdx} className="shelf-row relative flex items-end gap-1.5 px-4 pt-1" style={{ height: '90px' }}>
                  {/* Books */}
                  <div className="flex items-end gap-1.5 z-20 relative">
                    {rowBooks.map((book) => (
                      <div
                        key={book.name}
                        onClick={() => isDoorsOpen && setSelectedBook(book)}
                        className={`book-spine relative rounded-t-sm flex items-center justify-center transition-all duration-300 ${
                          isDoorsOpen ? 'cursor-pointer hover-lift' : 'pointer-events-none'
                        }`}
                        style={{
                          height: '72px',
                          width: book.width,
                          background: `linear-gradient(175deg, ${book.color}cc 0%, ${book.color} 40%, ${book.color}dd 100%)`,
                          borderLeft: '2px solid rgba(255,255,255,0.2)',
                          borderRight: '2px solid rgba(0,0,0,0.4)',
                          boxShadow: `2px 0 8px rgba(0,0,0,0.4), inset 1px 0 0 rgba(255,255,255,0.08)`,
                          flexShrink: 0,
                        }}
                      >
                        <span className="book-title-text">{book.name}</span>
                      </div>
                    ))}
                  </div>
                  {/* Wooden shelf plank */}
                  <div
                    className="absolute bottom-0 inset-x-0 z-10"
                    style={{
                      height: '10px',
                      background: 'linear-gradient(180deg, #334155 0%, #1e293b 100%)',
                      borderTop: '1px solid #475569',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                    }}
                  />
                </div>
              ))}

              {/* Bottom base plank */}
              <div
                style={{
                  height: '14px',
                  background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
                  borderTop: '2px solid #334155',
                  borderRadius: '0 0 6px 6px',
                  boxShadow: '0 3px 8px rgba(0,0,0,0.15)',
                  marginTop: '2px',
                }}
              />
            </div>

            {/* Sliding Door Overlay */}
            <div
              onClick={() => !isDoorsOpen && setIsDoorsOpen(true)}
              className="absolute inset-0 z-30 transition-transform duration-[900ms] ease-in-out"
              style={{
                transform: isDoorsOpen ? 'translateX(-100%)' : 'translateX(0%)',
                background: 'linear-gradient(160deg, #1e293b 0%, #111827 100%)',
                borderRight: '1px solid rgba(99, 102, 241, 0.2)',
                boxShadow: 'inset 0 0 15px rgba(0,0,0,0.05)',
                cursor: isDoorsOpen ? 'default' : 'pointer',
                pointerEvents: isDoorsOpen ? 'none' : 'auto',
              }}
            >
              {/* Wood grain texture lines */}
              {[15, 30, 48, 63, 78].map((pct) => (
                <div
                  key={pct}
                  className="absolute inset-y-0 pointer-events-none opacity-20"
                  style={{
                    left: `${pct}%`,
                    width: '1px',
                    background: 'linear-gradient(180deg, transparent, rgba(99, 102, 241, 0.1) 30%, rgba(99, 102, 241, 0.05) 70%, transparent)',
                  }}
                />
              ))}

              {/* Door knob */}
              <div
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: '14px',
                  height: '14px',
                  background: 'radial-gradient(circle at 35% 35%, #818cf8, #6366f1 60%, #4f46e5)',
                  border: '1px solid #4f46e5',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.4)',
                }}
              />

              {/* Click to Open label */}
              {!isDoorsOpen && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 click-open-label px-3 py-1.5 bg-[#6366f1] border border-indigo-400 text-white font-semibold rounded-md uppercase tracking-widest pointer-events-none select-none"
                  style={{ fontSize: 'clamp(8px, 0.8vw, 11px)', whiteSpace: 'nowrap' }}
                >
                  Click to Open
                </div>
              )}
            </div>
          </div>

          {/* Close button */}
          {isDoorsOpen && (
            <button
              onClick={() => { setIsDoorsOpen(false); setSelectedBook(null); }}
              className="mt-4 px-4 py-1.5 bg-[#6366f1] hover:bg-[#4f46e5] text-white font-semibold rounded active:scale-95 transition-all duration-200 uppercase tracking-widest"
              style={{ fontSize: 'clamp(8px, 0.75vw, 11px)' }}
            >
              Close Cabinet
            </button>
          )}
        </div>

        {/* RIGHT — Skill bars */}
        <div className="lg:col-span-7 w-full order-1 lg:order-2 flex flex-col" style={{ gap: 'clamp(10px, 1.2vh, 22px)' }}>
          {barSkills.map((skill, index) => (
            <div
              key={skill.name}
              className="group relative flex items-center"
              style={{ gap: 'clamp(8px, 1vw, 16px)' }}
            >
              {/* Skill label */}
              <span
                className="flex-shrink-0 flex items-center gap-2 font-semibold tracking-wide text-slate-300 group-hover:text-white transition-colors duration-200 select-none"
                style={{ width: 'clamp(80px, 8vw, 130px)', fontSize: 'clamp(10px, 1vw, 14px)' }}
              >
                <span style={{ fontSize: 'clamp(12px, 1.2vw, 18px)' }}>{skill.icon}</span>
                <span>{skill.name}</span>
              </span>

              {/* Progress track */}
              <div
                className="relative flex-grow rounded-full overflow-hidden border border-white/5"
                style={{ height: 'clamp(6px, 0.7vh, 10px)', background: '#121825', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.8)' }}
              >
                <div
                  className="h-full rounded-full transition-all duration-[1100ms] ease-out"
                  style={{
                    width: isAnimated ? `${skill.proficiency}%` : '0%',
                    background: `linear-gradient(90deg, ${skill.color}70, ${skill.color})`,
                    boxShadow: `0 0 8px ${skill.color}33`,
                    transitionDelay: `${index * 60}ms`,
                  }}
                />
              </div>
            </div>
          ))}

          {/* Caption */}
          <p className="mt-2 text-slate-400 select-none" style={{ fontSize: 'clamp(8px, 0.7vw, 11px)' }}>
            Proficiency levels based on hands-on project experience.
          </p>
        </div>
      </div>

      {/* Book Details Modal */}
      {selectedBook && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.78)', backdropFilter: 'blur(6px)' }}
          onClick={() => setSelectedBook(null)}
        >
          <div
            className="relative w-full animate-modal-in"
            style={{
              maxWidth: '420px',
              background: 'linear-gradient(140deg, var(--surface) 0%, var(--bg) 100%)',
              border: '1px solid rgba(99,102,241,0.3)',
              borderRadius: '14px',
              padding: 'clamp(18px, 3vw, 36px)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.8)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 inset-x-0 h-[2px] rounded-t-[14px]" style={{ background: `linear-gradient(90deg, transparent, ${selectedBook.color}, transparent)` }} />
            <h3 className="text-xl font-extrabold text-white mb-3 flex items-center gap-3">
              <span className="inline-block w-2.5 h-6 rounded-sm" style={{ background: selectedBook.color }} />
              {selectedBook.name}
            </h3>
            <p className="text-slate-300 leading-relaxed mb-5 text-sm">{selectedBook.description}</p>
            <div className="flex justify-end">
              <button
                onClick={() => setSelectedBook(null)}
                className="px-5 py-1.5 text-[#f1f5f9] border border-[#6366f1]/40 rounded hover:border-[#6366f1] bg-[#111827]/80 transition-colors duration-200 uppercase tracking-widest font-semibold text-[10px]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Styles */}
      <style>{`
        .book-title-text {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          font-size: clamp(7px, 0.65vw, 10px);
          font-weight: 700;
          letter-spacing: 0.06em;
          color: rgba(255,255,255,0.92);
          user-select: none;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          max-height: 68px;
          text-shadow: 0 1px 3px rgba(0,0,0,0.6);
        }
        .hover-lift:hover {
          transform: translateY(-10px) rotate(-1.5deg);
          box-shadow: 6px 8px 16px rgba(0,0,0,0.7) !important;
          brightness: 1.1;
          z-index: 5;
        }
        .click-open-label {
          animation: click-open-pulse 2.2s ease-in-out infinite;
        }
        @keyframes click-open-pulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            box-shadow: 0 0 8px rgba(99,102,241,0.35), inset 0 0 4px rgba(255,255,255,0.15);
            border-color: rgba(99,102,241,0.4);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.07);
            box-shadow: 0 0 22px rgba(99,102,241,0.75), inset 0 0 9px rgba(255,255,255,0.35);
            border-color: rgba(99,102,241,0.85);
            color: #ffffff;
          }
        }
        .animate-modal-in {
          animation: modal-zoom-in 0.28s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes modal-zoom-in {
          from { opacity: 0; transform: scale(0.9); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
}
