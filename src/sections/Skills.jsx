// src/sections/Skills.jsx
import React, { useRef, useEffect, useState, Suspense, lazy } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '../data/skills';

gsap.registerPlugin(ScrollTrigger);

/* ── Ring configuration ── */
const RINGS = [
  { radius: 2, speed: 0.003, count: 4 },
  { radius: 3.5, speed: -0.002, count: 4 },
  { radius: 5, speed: 0.001, count: 4 },
];

/* ── Lazy-loaded 3D canvas (only imported on desktop) ── */
const SkillsCanvas = lazy(() =>
  Promise.all([
    import('@react-three/fiber'),
    import('@react-three/drei'),
  ]).then(([fiber, drei]) => {
    const { Canvas, useFrame: useFrameHook } = fiber;
    const { Html } = drei;

    /* ── Single orbiting skill node ── */
    function SkillNode({
      skill,
      ringIndex,
      skillIndex,
      ring,
      anglesRef,
      hoveredSkill,
      setHoveredSkill,
    }) {
      const meshRef = useRef(null);
      const isHovered = hoveredSkill === `${ringIndex}-${skillIndex}`;

      useFrameHook(() => {
        if (!meshRef.current) return;
        const angle = anglesRef.current[ringIndex][skillIndex];
        meshRef.current.position.x = Math.cos(angle) * ring.radius;
        meshRef.current.position.z = Math.sin(angle) * ring.radius;
        meshRef.current.position.y = Math.sin(angle * 2) * 0.5;
      });

      return (
        <mesh ref={meshRef}>
          <sphereGeometry args={[0.01, 4, 4]} />
          <meshBasicMaterial transparent opacity={0} />
          <Html center distanceFactor={10}>
            <div
              onMouseEnter={() => setHoveredSkill(`${ringIndex}-${skillIndex}`)}
              onMouseLeave={() => setHoveredSkill(null)}
              style={{
                width: '50px',
                height: '50px',
                background: 'rgba(20, 19, 13, 0.85)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(212, 175, 55, 0.25)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                cursor: 'pointer',
                position: 'relative',
                transition:
                  'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.3s',
                transform: isHovered ? 'scale(1.25)' : 'scale(1)',
                borderColor: isHovered
                  ? 'rgba(255, 223, 122, 0.6)'
                  : 'rgba(212, 175, 55, 0.25)',
                boxShadow: isHovered
                  ? '0 0 20px rgba(212, 175, 55, 0.3)'
                  : 'none',
              }}
            >
              <span>{skill.icon}</span>

              {isHovered && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '60px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(11, 10, 6, 0.95)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    borderRadius: '10px',
                    padding: '8px 14px',
                    whiteSpace: 'nowrap',
                    color: '#f8fafc',
                    fontSize: '12px',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    textAlign: 'center',
                    pointerEvents: 'none',
                    zIndex: 100,
                  }}
                >
                  <div style={{ fontWeight: 600, marginBottom: '4px' }}>
                    {skill.name}
                  </div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                    Proficiency: {skill.proficiency}%
                  </div>
                  <div
                    style={{
                      marginTop: '4px',
                      height: '3px',
                      width: '80px',
                      background: 'rgba(212, 175, 55, 0.15)',
                      borderRadius: '2px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${skill.proficiency}%`,
                        background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
                        borderRadius: '2px',
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </Html>
        </mesh>
      );
    }

    /* ── SkillsOrbit (Three.js scene content) ── */
    function SkillsOrbit() {
      const groupRef = useRef(null);
      const icoRef = useRef(null);
      const scaleRef = useRef(0);
      const anglesRef = useRef(
        RINGS.map((ring) =>
          Array.from(
            { length: ring.count },
            (_, i) => (i / ring.count) * Math.PI * 2
          )
        )
      );
      const [hoveredSkill, setHoveredSkill] = useState(null);

      useEffect(() => {
        const ctx = gsap.context(() => {
          gsap.to(scaleRef, {
            current: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '#skills',
              start: 'top 75%',
              once: true,
            },
          });
        });
        return () => ctx.revert();
      }, []);

      useFrameHook(() => {
        if (icoRef.current) {
          icoRef.current.rotation.y += 0.003;
          icoRef.current.rotation.x += 0.001;
        }
        if (groupRef.current) {
          const s = scaleRef.current;
          groupRef.current.scale.set(s, s, s);
        }
        anglesRef.current = anglesRef.current.map((ringAngles, ri) =>
          ringAngles.map((angle) => angle + RINGS[ri].speed)
        );
      });

      let skillIndex = 0;
      const ringSkills = RINGS.map((ring) => {
        const items = skills.slice(skillIndex, skillIndex + ring.count);
        skillIndex += ring.count;
        return items;
      });

      return (
        <group ref={groupRef}>
          <mesh ref={icoRef}>
            <icosahedronGeometry args={[1.5, 1]} />
            <meshBasicMaterial
              color="#d4af37"
              wireframe
              transparent
              opacity={0.3}
            />
          </mesh>

          {RINGS.map((ring, ri) =>
            ringSkills[ri].map((skill, si) => (
              <SkillNode
                key={`${ri}-${si}`}
                skill={skill}
                ringIndex={ri}
                skillIndex={si}
                ring={ring}
                anglesRef={anglesRef}
                hoveredSkill={hoveredSkill}
                setHoveredSkill={setHoveredSkill}
              />
            ))
          )}
        </group>
      );
    }

    return {
      default: function SkillsCanvasInner() {
        return (
          <Canvas
            camera={{ position: [0, 0, 10], fov: 50 }}
            style={{ height: '500px', width: '100%' }}
            dpr={[1, 2]}
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            <SkillsOrbit />
          </Canvas>
        );
      },
    };
  })
);

/* ── Mobile skill card ── */
function MobileSkillCard({ skill, index }) {
  const cardRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current || !barRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          once: true,
        },
        delay: index * 0.1,
      });

      gsap.fromTo(
        barRef.current,
        { width: '0%' },
        {
          width: `${skill.proficiency}%`,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            once: true,
          },
          delay: index * 0.1 + 0.3,
        }
      );
    });

    return () => ctx.revert();
  }, [skill.proficiency, index]);

  return (
    <div
      ref={cardRef}
      className="glass-card"
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontSize: '32px',
          width: '56px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(212, 175, 55, 0.1)',
          borderRadius: '14px',
          marginBottom: '4px',
        }}
      >
        {skill.icon}
      </div>

      <h4
        style={{
          color: 'var(--text)',
          fontSize: '0.95rem',
          fontWeight: 600,
          margin: 0,
        }}
      >
        {skill.name}
      </h4>

      <span
        style={{
          color: 'var(--text-muted)',
          fontSize: '0.8rem',
        }}
      >
        {skill.proficiency}%
      </span>

      <div
        style={{
          width: '100%',
          height: '4px',
          background: 'var(--surface)',
          borderRadius: '2px',
          overflow: 'hidden',
          marginTop: '4px',
        }}
      >
        <div
          ref={barRef}
          style={{
            height: '100%',
            width: '0%',
            background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
            borderRadius: '2px',
            transition: 'none',
          }}
        />
      </div>
    </div>
  );
}

/* ── Main Skills Section ── */
export default function Skills() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 769px)');
    setIsDesktop(mq.matches);

    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const isMobile = window.innerWidth < 768;
    const reduce = isMobile ? 0.5 : 1;

    // Hide section initially
    gsap.set(sectionRef.current, { opacity: 0 });

    const ctx = gsap.context(() => {
      // Section reveal
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.set(sectionRef.current, { opacity: 1 });
        },
      });

      // Heading
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: -30 * reduce },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-container section-padding bg-gray-50 dark:bg-bg text-gray-900 dark:text-text"
    >
      <h2
        ref={headingRef}
        className="gradient-text"
        style={{
          textAlign: 'center',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 700,
          marginBottom: '3rem',
        }}
      >
        Skills &amp; Expertise
      </h2>

      {isDesktop ? (
        <div
          style={{
            width: '100%',
            maxWidth: '800px',
            margin: '0 auto',
            position: 'relative',
          }}
        >
          <Suspense
            fallback={
              <div
                style={{
                  height: '500px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-muted)',
                  fontSize: '0.9rem',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    border: '2px solid var(--gold)',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                  }}
                />
              </div>
            }
          >
            <SkillsCanvas />
          </Suspense>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
            maxWidth: '500px',
            margin: '0 auto',
          }}
        >
          {skills.map((skill, i) => (
            <MobileSkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
