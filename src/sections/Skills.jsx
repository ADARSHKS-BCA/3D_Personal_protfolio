// src/sections/Skills.jsx
import React, { useRef, useEffect, useState, useMemo, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills as dataSkills } from '../data/skills';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const globeSkills = [
  { name: 'Django', color: '#06b6d4' },
  { name: 'FastAPI', color: '#8b5cf6' },
  { name: 'PostgreSQL', color: '#06b6d4' },
  { name: 'Python', color: '#8b5cf6' },
  { name: 'React', color: '#06b6d4' },
  { name: 'Node.js', color: '#8b5cf6' },
  { name: 'Docker', color: '#06b6d4' },
  { name: 'REST APIs', color: '#8b5cf6' },
  { name: 'MongoDB', color: '#06b6d4' },
  { name: 'Git', color: '#8b5cf6' },
  { name: 'Linux', color: '#06b6d4' },
  { name: 'TypeScript', color: '#8b5cf6' },
  { name: 'C++', color: '#06b6d4' },
  { name: 'Flutter', color: '#8b5cf6' },
];

function SkillNode({ skill, index, total, nodeGroupRef }) {
  const [hovered, setHovered] = useState(false);
  const radius = 2;

  // Calculate Fibonacci sphere position
  const { position, labelPosition } = useMemo(() => {
    const phi = Math.acos(1 - 2 * (index + 0.5) / total);
    const theta = Math.PI * (1 + Math.sqrt(5)) * index;
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    
    // Offset label 0.25 units outward from center
    const labelX = x * 1.125;
    const labelY = y * 1.125;
    const labelZ = z * 1.125;
    
    return {
      position: [x, y, z],
      labelPosition: [labelX, labelY, labelZ]
    };
  }, [index, total]);

  // Connection line geometry
  const lineGeometry = useMemo(() => {
    const points = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(...position)
    ];
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [position]);

  useEffect(() => {
    return () => {
      lineGeometry.dispose();
    };
  }, [lineGeometry]);

  return (
    <group ref={nodeGroupRef} scale={[0, 0, 0]}>
      {/* Node Sphere */}
      <mesh
        position={position}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={(e) => {
          setHovered(false);
        }}
      >
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={hovered ? 1.0 : 0.5}
        />
      </mesh>

      {/* Connection Line */}
      <line geometry={lineGeometry}>
        <lineBasicMaterial color={skill.color} opacity={0.3} transparent />
      </line>

      {/* Billboard label */}
      <Billboard position={labelPosition}>
        <Text
          fontSize={0.18}
          color="white"
          anchorX="center"
          anchorY="middle"
          scale={hovered ? 1.3 : 1.0}
        >
          {skill.name}
        </Text>
      </Billboard>
    </group>
  );
}

function GlobeScene() {
  const interactionGroupRef = useRef(null);
  const spinningGroupRef = useRef(null);
  const globeMeshRef = useRef(null);
  const globeMaterialRef = useRef(null);
  const nodeGroupsRef = useRef([]);

  // Constant rotation
  useFrame((state) => {
    if (spinningGroupRef.current) {
      spinningGroupRef.current.rotation.y += 0.002;
      spinningGroupRef.current.rotation.x += 0.0005;
    }

    if (interactionGroupRef.current) {
      const targetX = state.mouse.x * 0.15;
      const targetY = -state.mouse.y * 0.15;
      interactionGroupRef.current.rotation.y += (targetX - interactionGroupRef.current.rotation.y) * 0.03;
      interactionGroupRef.current.rotation.x += (targetY - interactionGroupRef.current.rotation.x) * 0.03;
    }
  });

  // Scroll Trigger animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#skills',
          start: 'top 70%',
          once: true,
          invalidateOnRefresh: true,
        }
      });

      // Globe mesh scale
      tl.fromTo(globeMeshRef.current.scale,
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 1, z: 1, duration: 1.2, ease: 'back.out(1.4)' }
      );

      // Globe material opacity
      tl.fromTo(globeMaterialRef.current,
        { opacity: 0 },
        { opacity: 0.15, duration: 1.2, ease: 'power2.out' },
        '<'
      );

      // Nodes stagger scale-in
      const validNodes = nodeGroupsRef.current.filter(Boolean);
      const nodeScales = validNodes.map(g => g.scale);
      
      tl.fromTo(nodeScales,
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 1, z: 1, duration: 0.6, stagger: 0.06, ease: 'back.out(1.2)' },
        '-=0.6'
      );
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <group ref={interactionGroupRef}>
      <group ref={spinningGroupRef}>
        {/* Globe */}
        <mesh ref={globeMeshRef}>
          <sphereGeometry args={[2, 32, 32]} />
          <meshStandardMaterial
            ref={globeMaterialRef}
            wireframe
            color="#8b5cf6"
            opacity={0.15}
            transparent
          />
        </mesh>

        {/* Skill Nodes */}
        {globeSkills.map((skill, i) => (
          <SkillNode
            key={skill.name}
            skill={skill}
            index={i}
            total={globeSkills.length}
            nodeGroupRef={(el) => (nodeGroupsRef.current[i] = el)}
          />
        ))}
      </group>
    </group>
  );
}

function SkillsCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 50 }}
      style={{ height: '500px', width: '100%' }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[3, 3, 3]} color="#8b5cf6" intensity={1.0} />
      <pointLight position={[-3, -3, -3]} color="#06b6d4" intensity={1.0} />
      <GlobeScene />
    </Canvas>
  );
}

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
          start: 'top 90%',
          once: true,
          invalidateOnRefresh: true,
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
            start: 'top 90%',
            once: true,
            invalidateOnRefresh: true,
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
      data-animate
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    const ctx = gsap.context(() => {

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
              start: 'top 90%',
              once: true,
              invalidateOnRefresh: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-container section-padding bg-gray-50 dark:bg-bg text-gray-900 dark:text-text skills-section reveal-section"
      data-animate
    >
      <div className="section-divider"></div>
      <h2
        ref={headingRef}
        className="gradient-text"
        data-animate
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
          <SkillsCanvas />
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
          {dataSkills.map((skill, i) => (
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
