import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Loader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const particlesRef = useRef([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const container = containerRef.current;
    if (!container) return;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Generate target positions around the initials "Adarsh"
    const generateTargetPositions = (count) => {
      const positions = [];
      const spread = 160;
      const verticalSpread = 80;

      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const radiusX = spread + Math.sin(angle * 3) * 40;
        const radiusY = verticalSpread + Math.cos(angle * 2) * 30;

        positions.push({
          x: centerX + Math.cos(angle) * radiusX,
          y: centerY + Math.sin(angle) * radiusY,
        });
      }
      return positions;
    };

    const targetPositions = generateTargetPositions(40);

    // Create particle elements
    const particles = [];
    for (let i = 0; i < 40; i++) {
      const particle = document.createElement('div');
      const isPurple = i % 2 === 0;
      const size = 4;

      // Random starting position
      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * window.innerHeight;

      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background-color: ${isPurple ? '#d4af37' : '#ffdf7a'};
        left: ${startX}px;
        top: ${startY}px;
        opacity: 0;
        pointer-events: none;
        will-change: transform, opacity;
        box-shadow: 0 0 ${isPurple ? '8px #d4af37' : '8px #ffdf7a'};
      `;

      container.appendChild(particle);
      particles.push({ el: particle, startX, startY, target: targetPositions[i] });
    }

    particlesRef.current = particles;

    // GSAP timeline
    const tl = gsap.timeline();

    // Animate particles from random positions to target positions
    particles.forEach((p, index) => {
      tl.to(
        p.el,
        {
          left: p.target.x,
          top: p.target.y,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
        },
        index * 0.03
      );
    });

    // Add a subtle pulse to assembled particles
    tl.to(
      particles.map((p) => p.el),
      {
        scale: 1.5,
        opacity: 0.8,
        duration: 0.3,
        ease: 'power2.inOut',
        stagger: 0.02,
        yoyo: true,
        repeat: 1,
      },
      '-=0.3'
    );

    // Fade out the entire loader after 2000ms total
    const fadeTimeout = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.style.transition = 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        containerRef.current.style.opacity = '0';
        containerRef.current.style.transform = 'scale(1.05)';

        setTimeout(() => {
          document.body.style.overflow = '';
          setIsVisible(false);
          if (onComplete) onComplete();
        }, 500);
      }
    }, 2000);

    return () => {
      clearTimeout(fadeTimeout);
      tl.kill();
      document.body.style.overflow = '';
      particles.forEach((p) => {
        if (p.el && p.el.parentNode) {
          p.el.parentNode.removeChild(p.el);
        }
      });
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#030301',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Initials */}
      <div
        style={{
          fontSize: '80px',
          fontWeight: 800,
          fontFamily: "'Outfit', 'Inter', 'Segoe UI', sans-serif",
          background: 'linear-gradient(135deg, #d4af37, #ffdf7a)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          userSelect: 'none',
          position: 'relative',
          zIndex: 2,
          letterSpacing: '8px',
          textShadow: 'none',
          filter: 'drop-shadow(0 0 40px rgba(212, 175, 55, 0.35))',
        }}
      >
        Adarsh
      </div>

      {/* Subtle radial glow behind initials */}
      <div
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
    </div>
  );
};

export default Loader;
