// src/sections/Skills.jsx
import React, { useRef, useEffect, useState } from 'react';
import { barSkills } from '../data/skills';

// Books on the shelf details with updated colors, heights (~60px to 84px), and widths (45px to 55px)
const shelfBooks = [
  {
    name: 'Git',
    height: '76px',
    width: '48px',
    color: '#dc2626', // Red
    description: 'A distributed version control system designed to handle everything from small to very large projects with speed and efficiency. It is the industry standard for tracking code changes, branch management, and collaborative software development.'
  },
  {
    name: 'Docker',
    height: '82px',
    width: '52px',
    color: '#2563eb', // Blue
    description: 'A platform designed to help developers build, share, and run applications inside lightweight containers. By containerizing software, it ensures consistency across different development, testing, and production environments.'
  },
  {
    name: 'MongoDB',
    height: '78px',
    width: '46px',
    color: '#f97316', // Orange
    description: 'A source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas for high scalability and flexible data structures.'
  },
  {
    name: 'REST APIs',
    height: '80px',
    width: '48px',
    color: '#8b5cf6', // Purple
    description: 'Representational State Transfer application programming interfaces that enable communication between different systems over HTTP. They rely on standard HTTP methods like GET, POST, PUT, and DELETE to manage resource states efficiently.'
  },
  {
    name: 'Node.js',
    height: '84px',
    width: '50px',
    color: '#0d9488', // Teal
    description: 'A cross-platform, open-source JavaScript runtime environment that executes JavaScript code outside a web browser. It uses an asynchronous event-driven model to build highly scalable and performant network applications.'
  },
  {
    name: 'Django',
    height: '79px',
    width: '47px',
    color: '#ff4500', // Orange-red
    description: 'A high-level Python web framework that encourages rapid development and clean, pragmatic design. Built by experienced developers, it takes care of much of the hassle of web development, so you can focus on writing your app.'
  },
  {
    name: 'PostgreSQL',
    height: '81px',
    width: '51px',
    color: '#1e3a8a', // Dark Blue
    description: 'A powerful, open-source object-relational database system with over 30 years of active development. It has earned a strong reputation for reliability, feature robustness, and performance in handling complex data workloads.'
  }
];

export default function Skills() {
  const sectionRef = useRef(null);
  const [isDoorsOpen, setIsDoorsOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isAnimated, setIsAnimated] = useState(false);

  // Trigger skill bar animation when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAnimated(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 overflow-hidden flex flex-col items-center justify-center text-white"
      style={{
        background: 'radial-gradient(circle at 50% 50%, #03050b 0%, #000000 100%)',
        borderTop: '1px solid rgba(212, 175, 55, 0.08)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.08)'
      }}
    >
      <div className="section-divider"></div>

      {/* Gold Subtitle and White Heading */}
      <div className="section-container relative z-10 w-full mb-16 text-center">
        <h2 
          className="tracking-widest uppercase text-xs md:text-sm font-bold mb-2"
          style={{ color: 'var(--gold)' }}
        >
          ABILITIES &amp; EXPERTISE
        </h2>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mt-1 text-white">
          Skills &amp; Expertise
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto mt-6 rounded-full" />
      </div>

      {/* Content Layout Grid */}
      <div className="section-container relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Interactive Bookshelf with Sliding Doors */}
        <div className="lg:col-span-5 w-full flex flex-col items-center justify-center order-2 lg:order-1">
          <div className="relative w-full max-w-[420px] h-[390px] md:h-[440px] rounded-lg overflow-hidden shadow-2xl border border-stone-900/90 bg-[#150d09]">
            
            {/* Shelf rows container */}
            <div className="absolute inset-0 flex flex-col justify-between p-3 pb-4 z-10">
              
              {/* Row 1 (Git, Docker, MongoDB - Spaced Naturally, Rest Empty) */}
              <div className="h-[30%] flex items-end justify-start gap-4 px-6 pb-3 relative bg-[#130b07]">
                <div className="flex items-end gap-2.5 z-20">
                  {shelfBooks.slice(0, 3).map((book) => (
                    <div
                      key={book.name}
                      onClick={() => isDoorsOpen && setSelectedBook(book)}
                      className={`book-spine cursor-pointer transition-all duration-300 relative rounded-t-[3px] flex items-center justify-center ${
                        isDoorsOpen ? 'hover-lift hover:brightness-110 active:scale-95' : 'pointer-events-none'
                      }`}
                      style={{
                        height: book.height,
                        width: book.width,
                        background: book.color,
                        borderLeft: '2.5px solid rgba(255, 255, 255, 0.18)',
                        borderRight: '2.5px solid rgba(0, 0, 0, 0.35)',
                        boxShadow: '2px 0 6px rgba(0, 0, 0, 0.65)'
                      }}
                    >
                      <span className="book-title-text select-none text-[10px] md:text-[11px] font-bold text-white tracking-widest uppercase">
                        {book.name}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Wooden ledge / plank */}
                <div className="absolute bottom-0 inset-x-0 h-3 bg-gradient-to-b from-[#3a251d] to-[#1e130f] border-t border-[#4f3328] shadow-[0_2px_4px_rgba(0,0,0,0.8)] z-10" />
              </div>

              {/* Row 2 (REST APIs, Node.js - Left Aligned, Rest Empty) */}
              <div className="h-[30%] flex items-end justify-start gap-4 px-6 pb-3 relative bg-[#130b07]">
                <div className="flex items-end gap-2.5 z-20">
                  {shelfBooks.slice(3, 5).map((book) => (
                    <div
                      key={book.name}
                      onClick={() => isDoorsOpen && setSelectedBook(book)}
                      className={`book-spine cursor-pointer transition-all duration-300 relative rounded-t-[3px] flex items-center justify-center ${
                        isDoorsOpen ? 'hover-lift hover:brightness-110 active:scale-95' : 'pointer-events-none'
                      }`}
                      style={{
                        height: book.height,
                        width: book.width,
                        background: book.color,
                        borderLeft: '2.5px solid rgba(255, 255, 255, 0.18)',
                        borderRight: '2.5px solid rgba(0, 0, 0, 0.35)',
                        boxShadow: '2px 0 6px rgba(0, 0, 0, 0.65)'
                      }}
                    >
                      <span className="book-title-text select-none text-[10px] md:text-[11px] font-bold text-white tracking-widest uppercase">
                        {book.name}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Wooden ledge / plank */}
                <div className="absolute bottom-0 inset-x-0 h-3 bg-gradient-to-b from-[#3a251d] to-[#1e130f] border-t border-[#4f3328] shadow-[0_2px_4px_rgba(0,0,0,0.8)] z-10" />
              </div>

              {/* Row 3 (Django, PostgreSQL - Left Aligned, Rest Empty) */}
              <div className="h-[30%] flex items-end justify-start gap-4 px-6 pb-3 relative bg-[#130b07]">
                <div className="flex items-end gap-2.5 z-20">
                  {shelfBooks.slice(5, 7).map((book) => (
                    <div
                      key={book.name}
                      onClick={() => isDoorsOpen && setSelectedBook(book)}
                      className={`book-spine cursor-pointer transition-all duration-300 relative rounded-t-[3px] flex items-center justify-center ${
                        isDoorsOpen ? 'hover-lift hover:brightness-110 active:scale-95' : 'pointer-events-none'
                      }`}
                      style={{
                        height: book.height,
                        width: book.width,
                        background: book.color,
                        borderLeft: '2.5px solid rgba(255, 255, 255, 0.18)',
                        borderRight: '2.5px solid rgba(0, 0, 0, 0.35)',
                        boxShadow: '2px 0 6px rgba(0, 0, 0, 0.65)'
                      }}
                    >
                      <span className="book-title-text select-none text-[10px] md:text-[11px] font-bold text-white tracking-widest uppercase">
                        {book.name}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Wooden ledge / plank */}
                <div className="absolute bottom-0 inset-x-0 h-3 bg-gradient-to-b from-[#3a251d] to-[#1e130f] border-t border-[#4f3328] shadow-[0_2px_4px_rgba(0,0,0,0.8)] z-10" />
              </div>
            </div>

            {/* Sliding Cabinet Door (Single panel, z-30 to fully obscure books) */}
            <div 
              onClick={() => !isDoorsOpen && setIsDoorsOpen(true)}
              className={`absolute inset-0 z-30 cursor-pointer transition-transform duration-[900ms] ease-in-out shadow-[5px_0_15px_rgba(0,0,0,0.6)] ${
                isDoorsOpen ? 'pointer-events-none' : ''
              }`}
              style={{
                transform: isDoorsOpen ? 'translateX(-100%)' : 'translateX(0)',
                background: 'linear-gradient(135deg, #241712 0%, #3a251d 30%, #241712 70%, #170e0a 100%)',
                boxShadow: 'inset 0 0 25px rgba(0, 0, 0, 0.95)'
              }}
            >
              {/* Metallic Knob on the right side */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-yellow-300 via-amber-500 to-amber-700 border border-amber-800 shadow-md flex-shrink-0 z-40" />

              {/* "Click to Open" Floating Label */}
              {!isDoorsOpen && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 click-open-label px-4 py-2 bg-black/90 border border-[#d4af37]/45 text-[#d4af37] font-semibold text-xs rounded-md uppercase tracking-widest pointer-events-none select-none">
                  Click to Open
                </div>
              )}
            </div>
          </div>

          {/* Close Shelf Button */}
          {isDoorsOpen && (
            <button
              onClick={() => setIsDoorsOpen(false)}
              className="mt-5 px-5 py-1.5 bg-stone-900 border border-[#d4af37]/35 text-[#d4af37] text-xs font-semibold rounded hover:bg-stone-850 hover:border-[#d4af37] active:scale-95 transition-all duration-200 uppercase tracking-widest z-20"
            >
              Close Cabinet
            </button>
          )}
        </div>

        {/* Right Column: Skill Progress Bars */}
        <div className="lg:col-span-7 w-full order-1 lg:order-2 flex flex-col gap-6 px-2">
          {barSkills.map((skill, index) => {
            return (
              <div
                key={skill.name}
                className="group relative flex items-center gap-4 transition-all duration-300"
                style={{ contentVisibility: 'auto' }}
              >
                {/* Fixed-width Skill Name & Icon */}
                <span className="w-28 md:w-32 flex-shrink-0 flex items-center gap-2.5 text-sm md:text-base font-semibold tracking-wide text-gray-300 group-hover:text-white transition-colors duration-200 text-left select-none">
                  <span className="text-base md:text-lg">{skill.icon}</span>
                  <span>{skill.name}</span>
                </span>

                {/* Progress Bar Track */}
                <div className="relative flex-grow h-2.5 bg-[#1a2035] rounded-full overflow-hidden border border-white/5 shadow-inner">
                  {/* Glowing Fill Bar */}
                  <div
                    className="h-full rounded-full transition-all duration-[1200ms] ease-out"
                    style={{
                      width: isAnimated ? `${skill.proficiency}%` : '0%',
                      background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`,
                      boxShadow: `0 0 6px ${skill.color}33`,
                      transitionDelay: `${index * 0.05}s`
                    }}
                  />
                </div>

                {/* Percentage Display */}
                <span
                  className="w-12 flex-shrink-0 text-right text-xs md:text-sm font-bold font-mono transition-all duration-300 text-gray-400 group-hover:text-white"
                >
                  {skill.proficiency}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Book details modal popup */}
      {selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm transition-opacity duration-300">
          <div 
            className="relative w-full max-w-[450px] bg-stone-900 border border-[#d4af37]/30 rounded-xl p-6 md:p-8 shadow-2xl animate-modal-in"
            style={{
              background: 'linear-gradient(135deg, #1b1612 0%, #0d0a08 100%)'
            }}
          >
            {/* Top gold accent line */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
            
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-4 flex items-center gap-3">
              <span className="inline-block w-3 h-7 rounded-sm" style={{ background: selectedBook.color }} />
              {selectedBook.name}
            </h3>
            
            <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-6 font-medium">
              {selectedBook.description}
            </p>
            
            <div className="flex justify-end">
              <button
                onClick={() => setSelectedBook(null)}
                className="px-6 py-2 bg-stone-950 border border-[#d4af37]/40 text-[#d4af37] text-xs font-semibold rounded hover:bg-stone-900 hover:border-[#d4af37] transition-colors duration-200 uppercase tracking-widest"
              >
                Close Description
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Component Specific CSS Styles */}
      <style>{`
        /* Vertical writing-mode for book spines */
        .book-spine {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .book-title-text {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          text-align: center;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: #ffffff;
          user-select: none;
          white-space: nowrap;
        }
        /* Hover lift effect for books - only enabled when doors are open */
        .hover-lift:hover {
          transform: translateY(-12px) rotate(-1.5deg);
          box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.85);
        }
        /* Click to open text pulse animation */
        .click-open-label {
          animation: click-open-pulse 2.2s ease-in-out infinite;
        }
        @keyframes click-open-pulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            box-shadow: 0 0 10px rgba(212, 175, 55, 0.4), inset 0 0 5px rgba(212, 175, 55, 0.2);
            border-color: rgba(212, 175, 55, 0.4);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.06);
            box-shadow: 0 0 25px rgba(212, 175, 55, 0.75), inset 0 0 10px rgba(212, 175, 55, 0.4);
            border-color: rgba(212, 175, 55, 0.85);
            color: #ffdf7a;
          }
        }
        /* Modal entrance animation */
        .animate-modal-in {
          animation: modal-zoom-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes modal-zoom-in {
          from {
            opacity: 0;
            transform: scale(0.92);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
}
