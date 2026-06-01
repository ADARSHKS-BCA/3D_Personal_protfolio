// src/hooks/useMousePosition.js
import { useState, useEffect, useRef, useCallback } from 'react';

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const frameRef = useRef(null);
  const lastUpdateRef = useRef(0);

  const handleMouseMove = useCallback((e) => {
    const now = Date.now();
    if (now - lastUpdateRef.current < 16) return; // 16ms debounce (~60fps)
    lastUpdateRef.current = now;

    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      setPosition({ x: e.clientX, y: e.clientY });
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [handleMouseMove]);

  return position;
}
