// src/components/LaptopModel.jsx
import React, { useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────
   VS Code / Python Code Tokens Definition
   ────────────────────────────────────────────── */
const codeLines = [
  { text: "from fastapi import FastAPI, Depends", tokens: [
    { text: "from ", color: "#ffdf7a" },
    { text: "fastapi ", color: "#c5c2b9" },
    { text: "import ", color: "#ffdf7a" },
    { text: "FastAPI", color: "#fffaf0" },
    { text: ", ", color: "#c5c2b9" },
    { text: "Depends", color: "#fffaf0" }
  ]},
  { text: "from sqlalchemy.orm import Session", tokens: [
    { text: "from ", color: "#ffdf7a" },
    { text: "sqlalchemy.orm ", color: "#c5c2b9" },
    { text: "import ", color: "#ffdf7a" },
    { text: "Session", color: "#fffaf0" }
  ]},
  { text: "", tokens: [] },
  { text: "app = FastAPI()", tokens: [
    { text: "app = ", color: "#c5c2b9" },
    { text: "FastAPI", color: "#fffaf0" },
    { text: "()", color: "#c5c2b9" }
  ]},
  { text: "", tokens: [] },
  { text: "@app.get('/api/users')", tokens: [
    { text: "@app.", color: "#ffdf7a" },
    { text: "get", color: "#fffaf0" },
    { text: "('", color: "#c5c2b9" },
    { text: "/api/users", color: "#d4af37" },
    { text: "')", color: "#c5c2b9" }
  ]},
  { text: "async def get_users(", tokens: [
    { text: "async ", color: "#ffdf7a" },
    { text: "def ", color: "#ffdf7a" },
    { text: "get_users", color: "#fffaf0" },
    { text: "(", color: "#c5c2b9" }
  ]},
  { text: "    db: Session = Depends(get_db)", tokens: [
    { text: "    db: ", color: "#c5c2b9" },
    { text: "Session", color: "#fffaf0" },
    { text: " = ", color: "#c5c2b9" },
    { text: "Depends", color: "#fffaf0" },
    { text: "(", color: "#c5c2b9" },
    { text: "get_db", color: "#fffaf0" },
    { text: ")", color: "#c5c2b9" }
  ]},
  { text: "):", tokens: [
    { text: "):", color: "#c5c2b9" }
  ]},
  { text: "    users = db.query(User).all()", tokens: [
    { text: "    users = db.", color: "#c5c2b9" },
    { text: "query", color: "#fffaf0" },
    { text: "(", color: "#c5c2b9" },
    { text: "User", color: "#fffaf0" },
    { text: ").", color: "#c5c2b9" },
    { text: "all", color: "#fffaf0" },
    { text: "()", color: "#c5c2b9" }
  ]},
  { text: "    return {'data': users,", tokens: [
    { text: "    return", color: "#ffdf7a" },
    { text: " {", color: "#c5c2b9" },
    { text: "'data'", color: "#d4af37" },
    { text: ": users,", color: "#c5c2b9" }
  ]},
  { text: "            'count': len(users)}", tokens: [
    { text: "            ", color: "#c5c2b9" },
    { text: "'count'", color: "#d4af37" },
    { text: ": ", color: "#c5c2b9" },
    { text: "len", color: "#fffaf0" },
    { text: "(users)}", color: "#c5c2b9" }
  ]},
  { text: "", tokens: [] },
  { text: "@app.post('/api/auth/login')", tokens: [
    { text: "@app.", color: "#ffdf7a" },
    { text: "post", color: "#fffaf0" },
    { text: "('", color: "#c5c2b9" },
    { text: "/api/auth/login", color: "#d4af37" },
    { text: "')", color: "#c5c2b9" }
  ]},
  { text: "async def login(form: LoginForm):", tokens: [
    { text: "async ", color: "#ffdf7a" },
    { text: "def ", color: "#ffdf7a" },
    { text: "login", color: "#fffaf0" },
    { text: "(form: ", color: "#c5c2b9" },
    { text: "LoginForm", color: "#fffaf0" },
    { text: "):", color: "#c5c2b9" }
  ]}
];

const totalChars = codeLines.reduce((acc, l) => acc + l.text.length, 0);

/* ──────────────────────────────────────────────
   Canvas Texture Drawer
   ────────────────────────────────────────────── */
function useCodeTexture(targetScreenOpacity, targetScreenBlur, targetInnerScreenOverlayOpacity) {
  const textureRef = useRef(null);
  const stateRef = useRef({
    charCount: 0,
    cursorVisible: true,
    lastDrawProgress: -1,
    lastCursorState: false,
    lastBlurState: -1,
    lastOverlayState: -1,
  });

  const canvasEl = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 1024;
    c.height = 640;
    return c;
  }, []);

  useEffect(() => {
    const tex = new THREE.CanvasTexture(canvasEl);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    textureRef.current = tex;

    return () => {
      tex.dispose();
    };
  }, [canvasEl]);

  const draw = (t) => {
    const ctx = canvasEl.getContext('2d');
    const s = stateRef.current;

    // Timing calculation: 40ms per char (0.04s)
    const charCountLimit = totalChars;
    const charDuration = 0.04;
    const pauseDuration = 3;
    const cycleDuration = charCountLimit * charDuration + pauseDuration;

    const cycleTime = t % cycleDuration;
    let currentProgress = 0;

    if (cycleTime < charCountLimit * charDuration) {
      currentProgress = Math.floor(cycleTime / charDuration);
    } else {
      currentProgress = charCountLimit;
    }

    const cursorBlink = Math.floor(t / 0.5) % 2 === 0;
    const currentBlur = targetScreenBlur.current;
    const currentOverlay = targetInnerScreenOverlayOpacity.current;

    // Optimize: only redraw if characters typed, cursor blinked, blur changed, or overlay opacity changed
    if (
      currentProgress === s.lastDrawProgress &&
      cursorBlink === s.lastCursorState &&
      currentBlur === s.lastBlurState &&
      currentOverlay === s.lastOverlayState
    ) {
      return;
    }

    s.lastDrawProgress = currentProgress;
    s.lastCursorState = cursorBlink;
    s.lastBlurState = currentBlur;
    s.lastOverlayState = currentOverlay;
    s.lastBlurState = currentBlur;

    // Reset Canvas
    ctx.clearRect(0, 0, 1024, 640);
    ctx.fillStyle = '#050510';
    ctx.fillRect(0, 0, 1024, 640);

    // Apply blur if scrolling into screen
    if (currentBlur > 0) {
      ctx.filter = `blur(${currentBlur}px)`;
    } else {
      ctx.filter = 'none';
    }

    // ── 1. Draw Title Bar ──
    ctx.fillStyle = '#0d0d1a';
    ctx.fillRect(0, 0, 1024, 28);

    // Three OS buttons
    ctx.fillStyle = '#ff5f56'; // Red
    ctx.beginPath(); ctx.arc(20, 14, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ffbd2e'; // Yellow
    ctx.beginPath(); ctx.arc(36, 14, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#27c93f'; // Green
    ctx.beginPath(); ctx.arc(52, 14, 5, 0, Math.PI * 2); ctx.fill();

    // Title Text
    ctx.fillStyle = '#666666';
    ctx.font = '11px sans-serif';
    ctx.fillText("portfolio.py — VS Code", 75, 18);

    // ── 2. Line Numbers Background ──
    ctx.fillStyle = '#080812';
    ctx.fillRect(0, 28, 35, 612);
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(34, 28, 1, 612);

    // ── 3. Draw Code Text with Tokens ──
    let drawn = 0;
    const lineHeight = 22;
    const startY = 55;
    const startX = 51;
    let cursorX = startX;
    let cursorY = startY;

    for (let l = 0; l < codeLines.length; l++) {
      const line = codeLines[l];
      const y = startY + l * lineHeight;

      // Draw line numbers
      ctx.fillStyle = '#3a3a5c';
      ctx.font = '11px monospace';
      ctx.fillText(String(l + 1), 12, y);

      const lineCharLimit = currentProgress - drawn;
      if (lineCharLimit <= 0) continue; // Not reached yet

      let lineDrawn = 0;
      let x = startX;

      for (let tk = 0; tk < line.tokens.length; tk++) {
        const token = line.tokens[tk];
        const rem = lineCharLimit - lineDrawn;
        if (rem <= 0) break;

        const textToDraw = token.text.substring(0, rem);
        ctx.fillStyle = token.color;
        ctx.font = '12px monospace';
        ctx.fillText(textToDraw, x, y);

        // Advance X position
        x += ctx.measureText(textToDraw).width;
        lineDrawn += textToDraw.length;
      }

      drawn += line.text.length;

      // Set cursor position at the end of the currently typing line
      if (currentProgress > drawn - line.text.length && currentProgress <= drawn) {
        cursorX = x;
        cursorY = y;
      } else if (currentProgress === charCountLimit && l === codeLines.length - 1) {
        // Paused state at the very end
        cursorX = x;
        cursorY = y;
      }
    }

    // ── 4. Draw Cursor ──
    if (cursorBlink) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(cursorX + 2, cursorY - 10, 7, 14);
    }

    // ── 5. Inner Screen Overlay (glowing INITIALIZING... / SCROLL TO CONTINUE) ──
    if (currentOverlay > 0) {
      // Semi-transparent black background covering the canvas display
      ctx.fillStyle = `rgba(5, 5, 16, ${currentOverlay})`;
      ctx.fillRect(0, 0, 1024, 640);

      // Radial neon backlight glow behind the text inside canvas
      const glowGrad = ctx.createRadialGradient(512, 320, 10, 512, 320, 300);
      glowGrad.addColorStop(0, `rgba(212, 175, 55, ${currentOverlay * 0.2})`);
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, 1024, 640);

      // "INITIALIZING ......."
      ctx.shadowBlur = 20;
      ctx.shadowColor = `rgba(212, 175, 55, ${currentOverlay})`;
      ctx.fillStyle = `rgba(255, 250, 240, ${currentOverlay})`;
      ctx.font = "bold 38px 'Outfit', 'Inter', sans-serif";
      ctx.textAlign = 'center';
      ctx.fillText('INITIALIZING .......', 512, 280);

      // "SCROLL TO CONTINUE"
      ctx.shadowBlur = 10;
      ctx.shadowColor = `rgba(212, 175, 55, ${currentOverlay * 0.5})`;
      ctx.fillStyle = `rgba(212, 175, 55, ${currentOverlay})`;
      ctx.font = "600 24px 'Outfit', 'Inter', sans-serif";
      ctx.fillText('SCROLL TO CONTINUE', 512, 360);
      
      // Reset shadow blur
      ctx.shadowBlur = 0;
    }

    if (textureRef.current) {
      textureRef.current.needsUpdate = true;
    }
  };

  return { textureRef, draw };
}

/* ──────────────────────────────────────────────
   Ambient Drifting Particles (Fireflies)
   ────────────────────────────────────────────── */
function AmbientParticles() {
  const pointsRef = useRef();
  const count = 200;

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Position around the laptop [X: -4..4, Y: -2..4, Z: -3..3]
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.2) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;

      // Drifting speed
      spd[i * 3] = (Math.random() - 0.5) * 0.05;
      spd[i * 3 + 1] = (Math.random() + 0.1) * 0.08; // Drift upwards slowly
      spd[i * 3 + 2] = (Math.random() - 0.5) * 0.05;
    }
    return [pos, spd];
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const posArr = geo.attributes.position.array;
    const dt = Math.min(delta, 0.1);

    for (let i = 0; i < count; i++) {
      posArr[i * 3] += speeds[i * 3] * dt;
      posArr[i * 3 + 1] += speeds[i * 3 + 1] * dt;
      posArr[i * 3 + 2] += speeds[i * 3 + 2] * dt;

      // Wrap around if particles go out of bounds
      if (posArr[i * 3 + 1] > 4) {
        posArr[i * 3 + 1] = -2;
        posArr[i * 3] = (Math.random() - 0.5) * 8;
        posArr[i * 3 + 2] = (Math.random() - 0.5) * 6;
      }
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ffdf7a"
        transparent
        opacity={0.35}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ──────────────────────────────────────────────
   Instanced-Style Key and Trackpad Components
   ────────────────────────────────────────────── */
function KeyboardGrid({ baseOpacity }) {
  const keyWidth = 0.22;
  const keyHeight = 0.06;
  const keyDepth = 0.18;
  const gap = 0.04;
  const rows = 5;
  const cols = 12;

  // Pre-generate static positions
  const keys = useMemo(() => {
    const list = [];
    const totalWidth = cols * keyWidth + (cols - 1) * gap;
    const startX = -totalWidth / 2 + keyWidth / 2;

    for (let r = 0; r < rows; r++) {
      // Position Z: spacing rows nicely from back Z to front Z on base
      const z = -0.55 + r * (keyDepth + gap);
      for (let c = 0; c < cols; c++) {
        const x = startX + c * (keyWidth + gap);
        list.push({ x, z, key: `${r}-${c}` });
      }
    }
    return list;
  }, []);

  const keyGeo = useMemo(() => new THREE.BoxGeometry(keyWidth, keyHeight, keyDepth), []);
  const edgeGeo = useMemo(() => new THREE.EdgesGeometry(keyGeo), [keyGeo]);

  return (
    <group position={[0, 0.06, 0]}>
      {keys.map((k) => (
        <group key={k.key} position={[k.x, 0.03, k.z]}>
          <mesh frustumCulled={false}>
            <primitive object={keyGeo} attach="geometry" />
            <meshStandardMaterial color="#1a1a2e" transparent opacity={baseOpacity.current} />
          </mesh>
          <lineSegments frustumCulled={false}>
            <primitive object={edgeGeo} attach="geometry" />
            <lineBasicMaterial color="#d4af37" transparent opacity={0.5 * baseOpacity.current} />
          </lineSegments>
        </group>
      ))}
    </group>
  );
}

/* ──────────────────────────────────────────────
   Laptop 3D Model Inner Scene
   ────────────────────────────────────────────── */
function LaptopScene() {
  const groupRef = useRef();
  const screenRef = useRef();
  const screenMeshRef = useRef();
  const bezelMeshRef = useRef();
  const lightRef = useRef();

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const typingTimeRef = useRef(0);

  // Targets (synced with ScrollTrigger timeline)
  const targetCameraPos = useRef(new THREE.Vector3(0, 1.5, 6));
  const targetLaptopRotX = useRef(-0.1);
  const targetLaptopRotY = useRef(0.1);
  const targetBaseOpacity = useRef(1.0);
  const targetEdgeOpacity = useRef(0.8);
  const targetScreenGlow = useRef(0.6);
  const targetBezelScale = useRef(1.0);
  const targetScreenScale = useRef(1.0);
  const targetScreenBlur = useRef(0);
  const targetScreenOpacity = useRef(1.0);
  const targetInnerScreenOverlayOpacity = useRef(1.0);

  const { textureRef, draw } = useCodeTexture(
    targetScreenOpacity,
    targetScreenBlur,
    targetInnerScreenOverlayOpacity
  );

  // Glowing monogram 'A' logo on outer shell/lid of the laptop
  const logoTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Clear transparent
    ctx.clearRect(0, 0, 256, 256);

    // Glowing circle border (shifted slightly up)
    ctx.strokeStyle = '#d4af37'; // Metallic Gold
    ctx.lineWidth = 5;
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#d4af37';
    ctx.beginPath();
    ctx.arc(128, 100, 65, 0, Math.PI * 2);
    ctx.stroke();

    // Stylized glowing A letter
    ctx.strokeStyle = '#ffdf7a'; // Warm glowing Gold
    ctx.lineWidth = 8;
    ctx.shadowColor = '#ffdf7a';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(128, 50);
    ctx.lineTo(92, 145);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(128, 50);
    ctx.lineTo(164, 145);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(106, 110);
    ctx.lineTo(150, 110);
    ctx.stroke();

    // ── Boot up text lines ──
    ctx.shadowBlur = 8;
    ctx.shadowColor = '#d4af37';
    ctx.fillStyle = '#fffaf0'; // Soft warm white
    ctx.font = "bold 11px 'Outfit', 'Inter', sans-serif";
    ctx.textAlign = 'center';

    // "INITIALIZING ......."
    ctx.fillText('INITIALIZING .......', 128, 202);

    // "SCROLL TO CONTINUE" (glowing gold)
    ctx.shadowColor = 'rgba(212,175,55,0.4)';
    ctx.fillStyle = '#ffdf7a';
    ctx.font = "600 10px 'Outfit', 'Inter', sans-serif";
    ctx.fillText('SCROLL TO CONTINUE', 128, 224);

    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, []);

  // Initial Screen Flicker once at 1.5s after load
  useEffect(() => {
    const flickerTimer = setTimeout(() => {
      gsap.timeline()
        .to(targetScreenOpacity, {
          current: 0.7,
          duration: 0.05,
          yoyo: true,
          repeat: 1,
          ease: 'power1.inOut'
        });
    }, 1500);

    return () => clearTimeout(flickerTimer);
  }, []);

  // GSAP ScrollTrigger Sequence Setup
  useEffect(() => {
    const heroEl = document.getElementById('hero');
    if (!heroEl) return;

    // Proxy object for GSAP to animate
    const proxy = {
      cameraX: 0,
      cameraY: 1.5,
      cameraZ: 6,
      laptopRotX: -0.1,
      laptopRotY: 0.1,
      baseOpacity: 1.0,
      edgeOpacity: 0.8,
      screenGlow: 0.6,
      bezelScale: 1.0,
      screenScale: 1.0,
      screenBlur: 0,
      screenOpacity: 1.0,
      scrollIndicatorOpacity: 1.0,
      shutterOpacity: 0.0,
      navbarOpacity: 0.0,
      innerScreenOverlayOpacity: 1.0
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: '+=200%',
        scrub: 0.5,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });

    // Update targets on GSAP update callback
    tl.eventCallback('onUpdate', () => {
      targetCameraPos.current.set(proxy.cameraX, proxy.cameraY, proxy.cameraZ);
      targetLaptopRotX.current = proxy.laptopRotX;
      targetLaptopRotY.current = proxy.laptopRotY;
      targetBaseOpacity.current = proxy.baseOpacity;
      targetEdgeOpacity.current = proxy.edgeOpacity;
      targetScreenGlow.current = proxy.screenGlow;
      targetBezelScale.current = proxy.bezelScale;
      targetScreenScale.current = proxy.screenScale;
      targetScreenBlur.current = proxy.screenBlur;
      targetScreenOpacity.current = proxy.screenOpacity;

      // Sync CSS scroll indicator opacity
      const indicator = document.querySelector('.hero__scroll-indicator');
      if (indicator) {
        indicator.style.opacity = proxy.scrollIndicatorOpacity;
        indicator.style.visibility = proxy.scrollIndicatorOpacity > 0 ? 'visible' : 'hidden';
      }

      // Sync cinematic shutter flash overlay DOM opacity
      const shutter = document.querySelector('.hero__shutter-flash');
      if (shutter) {
        shutter.style.opacity = proxy.shutterOpacity;
        shutter.style.visibility = proxy.shutterOpacity > 0 ? 'visible' : 'hidden';
      }

      // Sync Navbar wrapper opacity and pointer-events
      const navbar = document.querySelector('.navbar-wrapper');
      if (navbar) {
        navbar.style.opacity = proxy.navbarOpacity;
        navbar.style.pointerEvents = proxy.navbarOpacity > 0.5 ? 'auto' : 'none';
      }

      // Sync inner screen startup message opacity
      targetInnerScreenOverlayOpacity.current = proxy.innerScreenOverlayOpacity;
    });

    // Timeline steps:
    // 1. Progress 0.0 -> 0.3: laptop straightens, scroll indicator fades out, and inner screen overlay fades out
    tl.to(proxy, {
      laptopRotX: 0,
      laptopRotY: 0,
      scrollIndicatorOpacity: 0,
      innerScreenOverlayOpacity: 0.0,
      duration: 0.3,
      ease: 'power1.inOut'
    }, 0.0);

    // 2. Progress 0.3 -> 0.7: Camera flies to screen, base fades out, glows intensify
    tl.to(proxy, {
      cameraZ: 0.5,
      cameraY: 0.8,
      baseOpacity: 0,
      edgeOpacity: 1.5,
      screenGlow: 2.0,
      duration: 0.4,
      ease: 'power2.inOut'
    }, 0.3);

    // 3. Progress 0.7 -> 0.85: Entering screen (camera Z 0.5 -> -1.0, bezel & screen scale up past viewport, blurs & dissolves)
    tl.to(proxy, {
      cameraZ: -1.0,
      bezelScale: 4.0,
      screenScale: 5.0,
      screenBlur: 20,
      screenOpacity: 0,
      duration: 0.15,
      ease: 'power2.in'
    }, 0.7);

    // 4. Progress 0.80 -> 0.96: Cinematic camera shutter flash (0 -> 1 -> 0) and instant About reveal behind it
    tl.to(proxy, {
      shutterOpacity: 1.0,
      duration: 0.08, // 0.80 -> 0.88
      ease: 'power1.in'
    }, 0.80);

    const aboutEl = document.querySelector('#about');
    if (aboutEl) {
      tl.to(aboutEl, {
        opacity: 1,
        duration: 0.01, // Instant flip behind the full black shutter
        ease: 'none'
      }, 0.88);
    }

    tl.to(proxy, {
      shutterOpacity: 0.0,
      navbarOpacity: 1.0, // Reveal the Navbar beautifully as shutter opens!
      duration: 0.08, // 0.88 -> 0.96
      ease: 'power1.out'
    }, 0.88);

    return () => {
      tl.kill();
      if (ScrollTrigger.getById('#hero')) {
        ScrollTrigger.getById('#hero').kill();
      }
    };
  }, []);

  // Pre-generate laptop geometries
  const baseGeo = useMemo(() => new THREE.BoxGeometry(4, 0.12, 2.8), []);
  const baseEdges = useMemo(() => new THREE.EdgesGeometry(baseGeo), [baseGeo]);

  const lidGeo = useMemo(() => new THREE.BoxGeometry(4, 2.6, 0.08), []);
  const lidEdges = useMemo(() => new THREE.EdgesGeometry(lidGeo), [lidGeo]);

  const trackpadGeo = useMemo(() => new THREE.BoxGeometry(1.0, 0.02, 0.65), []);
  const trackpadEdges = useMemo(() => new THREE.EdgesGeometry(trackpadGeo), [trackpadGeo]);

  // Dispose geometries, materials, and textures on unmount
  useEffect(() => {
    return () => {
      if (logoTexture) logoTexture.dispose();
      baseGeo.dispose();
      baseEdges.dispose();
      lidGeo.dispose();
      lidEdges.dispose();
      trackpadGeo.dispose();
      trackpadEdges.dispose();
    };
  }, [logoTexture, baseGeo, baseEdges, lidGeo, lidEdges, trackpadGeo, trackpadEdges]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.1);
    typingTimeRef.current += dt;

    // Draw canvas text code editor
    draw(typingTimeRef.current);

    // 1. Lerp Camera Position smoothly
    state.camera.position.lerp(targetCameraPos.current, 0.05);
    state.camera.lookAt(0, 0.8, 0);

    // 2. Base Idle animation (only when scroll is near start)
    const isAtStart = targetCameraPos.current.z > 5.5;
    const idleFloat = isAtStart ? Math.sin(state.clock.getElapsedTime() * 1.5) * 0.15 : 0;
    const idleSway = isAtStart ? Math.sin(state.clock.getElapsedTime() * 0.5) * 0.08 : 0;

    if (groupRef.current) {
      // Lerp base rotations toward ScrollTrigger targets + idle sways
      const targetX = targetLaptopRotX.current;
      const targetY = targetLaptopRotY.current + idleSway;

      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05;
      groupRef.current.position.y += (idleFloat - groupRef.current.position.y) * 0.05;
    }

    // 3. Screen Bezel & Mesh scale transitions
    if (bezelMeshRef.current) {
      bezelMeshRef.current.scale.set(targetBezelScale.current, targetBezelScale.current, 1);
    }
    if (screenMeshRef.current) {
      screenMeshRef.current.scale.set(targetScreenScale.current, targetScreenScale.current, 1);
      if (screenMeshRef.current.material) {
        screenMeshRef.current.material.opacity = targetScreenOpacity.current;
      }
    }

    // 4. Update point light intensity dynamically
    if (lightRef.current) {
      lightRef.current.intensity = targetScreenGlow.current;
    }
  });

  return (
    <>
      <AmbientParticles />

      {/* Screen PointLight Glow */}
      <pointLight
        ref={lightRef}
        position={[0, 0.8, 0.5]}
        color="#fffaf0"
        intensity={0.6}
        distance={8}
      />

      {/* Main Laptop Group */}
      <group ref={groupRef}>
        {/* ── Base ── */}
        <mesh frustumCulled={false}>
          <primitive object={baseGeo} attach="geometry" />
          <meshStandardMaterial color="#0d0d1a" transparent opacity={targetBaseOpacity.current} />
        </mesh>
        <lineSegments frustumCulled={false}>
          <primitive object={baseEdges} attach="geometry" />
          <lineBasicMaterial color="#d4af37" transparent opacity={0.8 * targetEdgeOpacity.current} linewidth={1.5} />
        </lineSegments>

        {/* ── Keyboard ── */}
        <KeyboardGrid baseOpacity={targetBaseOpacity} />

        {/* ── Trackpad ── */}
        <group position={[0, 0.06, 0.9]}>
          <mesh frustumCulled={false}>
            <primitive object={trackpadGeo} attach="geometry" />
            <meshStandardMaterial color="#1a1a2e" transparent opacity={targetBaseOpacity.current} />
          </mesh>
          <lineSegments frustumCulled={false}>
            <primitive object={trackpadEdges} attach="geometry" />
            <lineBasicMaterial color="#d4af37" transparent opacity={0.4 * targetBaseOpacity.current} />
          </lineSegments>
        </group>

        {/* ── Hinge / Screen Lid Group ── */}
        {/* Back edge of base: z = -1.4, surface: y = 0.06. Opened at 105deg -> tilt -15deg (-0.2618 rad) */}
        <group position={[0, 0.06, -1.4]}>
          <group ref={screenRef} rotation={[-0.2618, 0, 0]}>
            {/* Screen Lid Mesh */}
            <mesh position={[0, 1.3, 0]} frustumCulled={false}>
              <primitive object={lidGeo} attach="geometry" />
              <meshStandardMaterial color="#0d0d1a" transparent opacity={targetBaseOpacity.current} />
            </mesh>
            <lineSegments position={[0, 1.3, 0]} frustumCulled={false}>
              <primitive object={lidEdges} attach="geometry" />
              <lineBasicMaterial color="#d4af37" transparent opacity={0.8 * targetEdgeOpacity.current} linewidth={1.5} />
            </lineSegments>

            {/* Outer Lid Logo (facing -Z, visible when laptop Y-rot is 180 degrees) */}
            <mesh position={[0, 1.3, -0.041]} rotation={[0, Math.PI, 0]} frustumCulled={false}>
              <planeGeometry args={[1.2, 1.2]} />
              <meshBasicMaterial 
                map={logoTexture} 
                transparent 
                opacity={targetBaseOpacity.current} 
                blending={THREE.AdditiveBlending} 
                depthWrite={false}
              />
            </mesh>

            {/* Screen Bezel (Plane slightly in front of lid) */}
            <mesh ref={bezelMeshRef} position={[0, 1.3, 0.041]} frustumCulled={false}>
              <planeGeometry args={[3.6, 2.3]} />
              <meshBasicMaterial color="#050508" transparent opacity={targetBaseOpacity.current} />
            </mesh>

            {/* Screen Canvas Display Texture (slightly in front of bezel) */}
            <mesh ref={screenMeshRef} position={[0, 1.3, 0.042]} frustumCulled={false}>
              <planeGeometry args={[3.6, 2.3]} />
              {textureRef.current ? (
                <meshBasicMaterial map={textureRef.current} transparent opacity={targetScreenOpacity.current} />
              ) : (
                <meshBasicMaterial color="#050510" transparent opacity={targetBaseOpacity.current} />
              )}
            </mesh>
          </group>
        </group>
      </group>
    </>
  );
}

/* ──────────────────────────────────────────────
   LaptopModel — Main Exported React Component
   ────────────────────────────────────────────── */
export default function LaptopModel() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : true
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) return null;

  return (
    <Canvas
      camera={{ position: [0, 1.5, 6], fov: 45 }}
      dpr={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)}
      frameloop="always"
      style={{
        width: '100%',
        height: '100%',
        background: 'transparent',
      }}
      gl={{ alpha: true, antialias: true }}
    >
      <LaptopScene />
    </Canvas>
  );
}
