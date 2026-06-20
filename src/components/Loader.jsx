import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Loader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const pathRef = useRef(null);
  const hudRef = useRef(null);
  const contentRef = useRef(null);
  const telemetryRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [wiresConnected, setWiresConnected] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [timeStr, setTimeStr] = useState('00:00:00');

  const progressRef = useRef(0);
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  const greetings = [
    "Hello",       // English
    "Namaste",     // Hindi
    "Bonjour",     // French
    "こんにちは",    // Japanese
    "Ciao",        // Italian
    "Olá",         // Portuguese
    "Guten Tag",   // German
    "Welcome"      // Welcome Reveal
  ];

  // Dynamic greeting based on current loading progress
  const currentGreeting = wiresConnected 
    ? "Welcome" 
    : greetings[Math.min(Math.floor((progress / 100) * greetings.length), greetings.length - 1)];

  // Update clock in telemetry
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      setTimeStr(`${hrs}:${mins}:${secs}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Main loader logic: Progress counter + Curtain Reveal
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const ctx = { val: 0 };
    const progressTween = gsap.to(ctx, {
      val: 100,
      duration: 5.2,
      ease: "power1.inOut",
      onUpdate: () => {
        const val = Math.floor(ctx.val);
        setProgress(val);
        if (val >= 60) {
          setWiresConnected(true);
        }
      },
      onComplete: () => {
        // Trigger curtain reveal animations after a tiny pause at 100%
        setTimeout(() => {
          const tl = gsap.timeline({
            onComplete: () => {
              document.body.style.overflow = '';
              setIsVisible(false);
              if (onComplete) onComplete();
            }
          });

          // Portal-like zoom transition of HUD
          tl.to(hudRef.current, {
            scale: 8,
            opacity: 0,
            filter: 'blur(15px)',
            duration: 0.8,
            ease: 'power3.in',
          }, 0);

          // Fade out canvas and telemetry
          tl.to([canvasRef.current, telemetryRef.current], {
            opacity: 0,
            duration: 0.5,
            ease: 'power3.inOut'
          }, 0);

          // Phase 2: Morph SVG liquid curtain upwards
          tl.to(pathRef.current, {
            attr: { d: "M0 0 L100 0 L100 100 Q50 0 0 100 Z" },
            duration: 0.7,
            ease: "power2.in"
          }, 0.1);

          tl.to(pathRef.current, {
            attr: { d: "M0 0 L100 0 L100 0 Q50 0 0 0 Z" },
            duration: 0.4,
            ease: "power2.out"
          });
        }, 300);
      }
    });

    return () => {
      progressTween.kill();
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  // Interactive Particle Canvas Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.offsetHeight || window.innerHeight);

    const particles = [];
    const particleCount = 65;

    // Handle mouse tracking
    const mouse = { x: null, y: null, radius: 150 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.offsetHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseX: Math.random() * width,
        baseY: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        color: i % 2 === 0 ? 'rgba(154, 143, 126, 0.35)' : 'rgba(122, 110, 96, 0.3)', // Warm dust colors
        density: Math.random() * 20 + 5,
      });
    }

    // Helper for cubic Bezier coordinate interpolation
    const getBezierPoint = (p0, p1, p2, p3, t) => {
      const cx = 3 * (p1.x - p0.x);
      const bx = 3 * (p2.x - p1.x) - cx;
      const ax = p3.x - p0.x - cx - bx;

      const cy = 3 * (p1.y - p0.y);
      const by = 3 * (p2.y - p1.y) - cy;
      const ay = p3.y - p0.y - cy - by;

      const x = ax * Math.pow(t, 3) + bx * Math.pow(t, 2) + cx * t + p0.x;
      const y = ay * Math.pow(t, 3) + by * Math.pow(t, 2) + cy * t + p0.y;
      return { x, y };
    };

    let particleOffset = 0;
    let pulseRadius = 0;

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw star background particles (warm dust motes)
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > width) p.speedX *= -1;
        if (p.y < 0 || p.y > height) p.speedY *= -1;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distance = Math.hypot(dx, dy);

          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const directionX = (dx / distance) * force * p.density * 0.12;
            const directionY = (dy / distance) * force * p.density * 0.12;
            p.x += directionX;
            p.y += directionY;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 4;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 2. Draw glowing energy wires from left/right edges to center (burnt orange)
      const currentProgress = progressRef.current;
      const wireProgress = Math.min(currentProgress / 60, 1);
      
      const centerX = width / 2;
      const centerY = height / 2;

      // Define bezier paths (Left/Right)
      const P0_L = { x: 0, y: centerY };
      const P1_L = { x: width * 0.18, y: centerY - 120 };
      const P2_L = { x: width * 0.32, y: centerY + 120 };
      const P3_L = { x: centerX, y: centerY };

      const P0_R = { x: width, y: centerY };
      const P1_R = { x: width * 0.82, y: centerY + 120 };
      const P2_R = { x: width * 0.68, y: centerY - 120 };
      const P3_R = { x: centerX, y: centerY };

      if (wireProgress > 0) {
        ctx.lineWidth = 1.8;
        ctx.shadowBlur = 10;
        ctx.strokeStyle = 'rgba(232, 98, 42, 0.45)'; // Burnt Orange wire
        ctx.shadowColor = 'rgba(232, 98, 42, 0.75)';

        // Draw left wire
        ctx.beginPath();
        const steps = Math.ceil(wireProgress * 80);
        const startL = getBezierPoint(P0_L, P1_L, P2_L, P3_L, 0);
        ctx.moveTo(startL.x, startL.y);
        for (let i = 1; i <= steps; i++) {
          const t = (i / steps) * wireProgress;
          const pt = getBezierPoint(P0_L, P1_L, P2_L, P3_L, t);
          ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();

        // Draw right wire
        ctx.beginPath();
        const startR = getBezierPoint(P0_R, P1_R, P2_R, P3_R, 0);
        ctx.moveTo(startR.x, startR.y);
        for (let i = 1; i <= steps; i++) {
          const t = (i / steps) * wireProgress;
          const pt = getBezierPoint(P0_R, P1_R, P2_R, P3_R, t);
          ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();

        ctx.shadowBlur = 0;
      }

      // 3. Flowing particles along the energy wires (burnt orange)
      particleOffset += 0.005;
      if (particleOffset > 1) particleOffset = 0;

      if (wireProgress > 0.05) {
        ctx.shadowBlur = 14;
        ctx.fillStyle = '#e8622a'; // Burnt Orange
        ctx.shadowColor = '#e8622a';

        // Draw 3 particles traversing the lines
        for (let j = 0; j < 3; j++) {
          const pT = (particleOffset + j * 0.33) % wireProgress;

          const ptL = getBezierPoint(P0_L, P1_L, P2_L, P3_L, pT);
          ctx.beginPath();
          ctx.arc(ptL.x, ptL.y, 3, 0, Math.PI * 2);
          ctx.fill();

          const ptR = getBezierPoint(P0_R, P1_R, P2_R, P3_R, pT);
          ctx.beginPath();
          ctx.arc(ptR.x, ptR.y, 3, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.shadowBlur = 0;
      }

      // 4. Draw connection pulse/ripple (burnt orange)
      if (currentProgress >= 60) {
        if (pulseRadius === 0) {
          pulseRadius = 1;
        }
      }

      if (pulseRadius > 0) {
        pulseRadius += 5; // Expand pulse
        const maxRadius = 250;
        if (pulseRadius < maxRadius) {
          const opacity = 1 - (pulseRadius / maxRadius);
          ctx.beginPath();
          ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(232, 98, 42, ${opacity})`;
          ctx.lineWidth = 2.5;
          ctx.shadowColor = '#e8622a';
          ctx.shadowBlur = 15;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent', // Transparent, revealing main site once SVG curtain morphs
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      {/* ── SVG Liquid Curtain Morph (Cream Overlay) ── */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 2, // Placed behind the content
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          fill="#f5f0e8" // Cream theme background
          d="M0 0 L100 0 L100 100 Q50 100 0 100 Z"
        />
      </svg>

      {/* ── Interactive Content Wrapper (Fades out when complete) ── */}
      <div
        ref={contentRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 5, // Above the curtain
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'JetBrains Mono', 'Inter', monospace",
          color: '#1a1612', // Near black
          pointerEvents: 'none',
        }}
      >
        {/* Canvas stars backdrop */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* Telemetry and HUD wrapper */}
        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'auto' }}>
          
          {/* Corner Telemetry Readouts (Theme Muted Brown / Burnt Orange status) */}
          <div ref={telemetryRef} style={{ pointerEvents: 'none', color: '#7a6e60' }}>
            <div style={{ position: 'absolute', top: '3%', left: '4%', zIndex: 5, fontSize: '10px', letterSpacing: '2px', opacity: 0.65, lineHeight: 1.6 }}>
              <div>SYS_STATUS: <span style={{ color: '#e8622a', fontWeight: 'bold' }}>BOOT_ACTIVE</span></div>
            </div>

            <div style={{ position: 'absolute', top: '3%', right: '4%', zIndex: 5, fontSize: '10px', letterSpacing: '2px', opacity: 0.65, textAlign: 'right' }}>
              <div>TIME: {timeStr}</div>
            </div>

            <div style={{ position: 'absolute', bottom: '4%', right: '4%', zIndex: 5, fontSize: '14px', fontWeight: '500', letterSpacing: '1px', opacity: 0.85 }}>
              [ {String(progress).padStart(3, '0')}% ]
            </div>
          </div>

          <div
            ref={hudRef}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* HUD Ring Container */}
            <div style={{ position: 'relative', width: '280px', height: '280px', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
              
              {/* Concentric SVG Rings */}
              <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} viewBox="0 0 200 200">
                {/* Outer Slow Dotted Ring (Light Warm Gray) */}
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="rgba(154, 143, 126, 0.25)"
                  strokeWidth="1"
                  strokeDasharray="3, 10"
                  style={{
                    transformOrigin: 'center',
                    animation: 'spinCW 24s linear infinite',
                    filter: wiresConnected ? 'drop-shadow(0 0 10px rgba(154, 143, 126, 0.7))' : 'none',
                    transition: 'filter 0.3s ease',
                  }}
                />

                {/* Middle Dashed Ring (Warm Brown) */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="rgba(122, 110, 96, 0.25)"
                  strokeWidth="1"
                  strokeDasharray="12, 8"
                  style={{
                    transformOrigin: 'center',
                    animation: 'spinCCW 12s linear infinite',
                    filter: wiresConnected ? 'drop-shadow(0 0 10px rgba(122, 110, 96, 0.6))' : 'none',
                    transition: 'filter 0.3s ease',
                  }}
                />

                {/* Inner Fast Ring (Burnt Orange) */}
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke="rgba(232, 98, 42, 0.35)"
                  strokeWidth="1.5"
                  strokeDasharray="40, 180"
                  style={{
                    transformOrigin: 'center',
                    animation: 'spinCW 4s linear infinite',
                    filter: wiresConnected ? 'drop-shadow(0 0 12px rgba(232, 98, 42, 0.8))' : 'none',
                    transition: 'filter 0.3s ease',
                  }}
                />

                {/* Dynamic Progress Indicator Ring (Burnt Orange) */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="url(#loaderGrad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 80}`}
                  strokeDashoffset={`${2 * Math.PI * 80 * (1 - progress / 100)}`}
                  style={{
                    transformOrigin: 'center',
                    transform: 'rotate(-90deg)',
                    transition: 'stroke-dashoffset 0.1s ease, filter 0.3s ease',
                    filter: wiresConnected
                      ? 'drop-shadow(0 0 20px rgba(232, 98, 42, 0.95)) drop-shadow(0 0 8px rgba(232, 98, 42, 0.8))'
                      : 'drop-shadow(0 0 8px rgba(232, 98, 42, 0.75))',
                  }}
                />

                {/* Color Gradient Definition (Burnt Orange flat) */}
                <defs>
                  <linearGradient id="loaderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e8622a" />
                    <stop offset="100%" stopColor="#e8622a" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Central Greetings / Name Display */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 6,
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '180px',
                  height: '180px',
                }}
              >
                {/* Multilingual Text (Black text, Burnt Orange glow overlay) */}
                <div
                  key={currentGreeting}
                  style={{
                    fontSize: currentGreeting.toUpperCase() === 'WELCOME' ? '30px' : '22px',
                    fontWeight: currentGreeting.toUpperCase() === 'WELCOME' ? '900' : '400',
                    textTransform: 'uppercase',
                    letterSpacing: currentGreeting.toUpperCase() === 'WELCOME' ? '6px' : '2px',
                    fontFamily: currentGreeting.toUpperCase() === 'WELCOME' ? "'Outfit', 'Inter', sans-serif" : "'JetBrains Mono', monospace",
                    background: currentGreeting.toUpperCase() === 'WELCOME'
                      ? 'linear-gradient(135deg, #1a1612 0%, #7a6e60 100%)'
                      : 'linear-gradient(135deg, #7a6e60 0%, #9a8f7e 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'slideUpFade 0.25s cubic-bezier(0.25, 1, 0.5, 1) forwards',
                    filter: currentGreeting.toUpperCase() === 'WELCOME'
                      ? 'drop-shadow(0 0 24px rgba(232, 98, 42, 0.55)) drop-shadow(0 0 8px rgba(232, 98, 42, 0.35))'
                      : 'none',
                    transition: 'filter 0.3s ease',
                  }}
                >
                  {currentGreeting}
                </div>

                {/* Subtle decorative dot grid under greetings */}
                <div
                  style={{
                    marginTop: '10px',
                    width: '12px',
                    height: '2px',
                    background: 'rgba(232, 98, 42, 0.6)',
                    borderRadius: '1px',
                    boxShadow: '0 0 8px rgba(232, 98, 42, 0.8)',
                  }}
                />
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ── Global Keyframes & Animations ── */}
      <style>{`
        @keyframes spinCW {
          to { transform: rotate(360deg); }
        }
        @keyframes spinCCW {
          to { transform: rotate(-360deg); }
        }
        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(16px);
            filter: blur(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
