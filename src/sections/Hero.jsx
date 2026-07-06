// src/sections/Hero.jsx
import React, { useState, useEffect } from 'react';

export default function Hero({ scale = 1.0 }) {
  return (
    <section 
      className="relative w-full h-[100vh] flex flex-col justify-center px-4 overflow-hidden select-none"
      id="hero"
      style={{
        background: '#f5f0e8', // Light cream background
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {/* ── Watermark text "AK" ── */}
      <div
        className="hero-watermark"
        style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          right: '-10px',
          fontSize: '160px',
          fontWeight: 900,
          color: '#e8e3d8',
          opacity: 1,
          zIndex: 0,
          pointerEvents: 'none',
          lineHeight: 1,
          fontFamily: "var(--font-display)",
        }}
      >
        AK
      </div>

      {/* ── Hero content (left aligned, padding-left: 8vw, z-index: 1) ── */}
      <div 
        style={{
          position: 'relative',
          zIndex: 1,
          paddingLeft: '8vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          textAlign: 'left',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Name Title */}
        <h1 
          className="hero-title"
          style={{
            fontSize: 'clamp(60px, 10vw, 110px)',
            fontWeight: 900,
            letterSpacing: '-3px',
            color: '#1a1612',
            lineHeight: 0.95,
            margin: 0,
            fontFamily: "var(--font-display)",
            textTransform: 'uppercase',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ overflow: 'hidden' }}>
            <span>ADARSH</span>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <span>K.S</span>
          </div>
        </h1>
      </div>
    </section>
  );
}
