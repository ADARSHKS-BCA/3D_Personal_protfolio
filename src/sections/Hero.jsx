// src/sections/Hero.jsx
import React from 'react';

export default function Hero({ scale = 1.0 }) {
  const headingText = "I AM ADARSH";
  const letters = headingText.split("");

  return (
    <section 
      className="relative w-full flex flex-col items-center justify-center text-center px-4 overflow-hidden"
      id="hero"
      style={{
        background: 'var(--bg)',
        height: '90vh', // Mobile default
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] md:w-[450px] h-[280px] md:h-[450px] bg-gradient-to-tr from-[#6366f1]/10 to-[#818cf8]/10 rounded-full blur-3xl opacity-75 pointer-events-none" />

      <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col items-center justify-center gap-10 h-full py-16 md:py-24">
        {/* Text Group */}
        <div className="flex flex-col items-center justify-center">
          {/* "I AM ADARSH." Title with letter animations */}
          <h1 
            className="font-black tracking-wider text-slate-100 uppercase select-none leading-none mb-6 text-center"
            style={{ 
              fontSize: 'clamp(2.2rem, 8.5vw, 7.2rem)', 
              whiteSpace: 'nowrap' 
            }}
          >
            {letters.map((char, index) => (
              <span
                key={index}
                className="hero-letter"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
            <span className="hero-period">.</span>
          </h1>
        </div>

        {/* Custom Mouse Scroll Icon */}
        <div className="flex flex-col items-center gap-3">
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
        </div>
      </div>

      {/* Styled Override for embedded monitor view and animation keyframes */}
      <style>{`
        /* Staggered letter entrance animations */
        .hero-letter {
          display: inline-block;
          opacity: 0;
          transform: translateY(30px);
          animation: letterEntrance 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        .hero-period {
          display: inline-block;
          color: #d4af37;
          opacity: 0;
          transform: translateY(30px) scale(0);
          animation: periodEntrance 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          animation-delay: 0.65s; /* Animates after the letters (11 chars * 0.05s = 0.55s) */
        }

        @keyframes letterEntrance {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes periodEntrance {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0);
          }
          70% {
            opacity: 1;
            transform: translateY(0) scale(1.4);
          }
          85% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Mouse scroll icon styles */
        .scroll-mouse {
          width: 24px;
          height: 40px;
          border: 2px solid rgba(99, 102, 241, 0.4);
          border-radius: 12px;
          display: flex;
          justify-content: center;
          padding-top: 6px;
          position: relative;
          transition: border-color 0.3s ease;
        }
        
        .scroll-mouse:hover {
          border-color: rgba(99, 102, 241, 0.8);
        }
        
        .scroll-wheel {
          width: 4px;
          height: 8px;
          background-color: var(--gold, #6366f1);
          border-radius: 2px;
          animation: mouse-scroll 1.6s infinite ease-in-out;
        }

        @keyframes mouse-scroll {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            transform: translateY(14px);
            opacity: 0;
          }
          100% {
            transform: translateY(14px);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
