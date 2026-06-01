import { useEffect, useRef, useCallback } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);
  const isHovering = useRef(false);
  const isVisible = useRef(false);
  const debounceTimer = useRef(null);

  const lerp = (start, end, factor) => start + (end - start) * factor;

  const handleMouseMove = useCallback((e) => {
    if (debounceTimer.current) return;
    debounceTimer.current = setTimeout(() => {
      debounceTimer.current = null;
    }, 16);

    mousePos.current = { x: e.clientX, y: e.clientY };

    if (!isVisible.current) {
      isVisible.current = true;
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (ringRef.current) ringRef.current.style.opacity = '1';
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    isVisible.current = false;
    if (dotRef.current) dotRef.current.style.opacity = '0';
    if (ringRef.current) ringRef.current.style.opacity = '0';
  }, []);

  const handleMouseEnter = useCallback(() => {
    isVisible.current = true;
    if (dotRef.current) dotRef.current.style.opacity = '1';
    if (ringRef.current) ringRef.current.style.opacity = '1';
  }, []);

  const checkHoverTargets = useCallback(() => {
    const { x, y } = mousePos.current;
    const el = document.elementFromPoint(x, y);
    if (!el) {
      isHovering.current = false;
      return;
    }

    const isPointer =
      el.closest('[data-cursor="pointer"]') ||
      el.tagName === 'A' ||
      el.tagName === 'BUTTON' ||
      el.closest('a') ||
      el.closest('button');

    isHovering.current = !!isPointer;
  }, []);

  const animate = useCallback(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;

    if (!dot || !ring) {
      rafId.current = requestAnimationFrame(animate);
      return;
    }

    // Dot follows cursor exactly
    dot.style.transform = `translate(${mousePos.current.x - 6}px, ${mousePos.current.y - 6}px)`;

    // Ring lags behind by lerping (factor 0.15 = ~6 frame lag)
    ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, 0.15);
    ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, 0.15);

    checkHoverTargets();

    if (isHovering.current) {
      ring.style.width = '60px';
      ring.style.height = '60px';
      ring.style.backgroundColor = 'rgba(255, 223, 122, 0.3)';
      ring.style.borderColor = '#ffdf7a';
      ring.style.transform = `translate(${ringPos.current.x - 30}px, ${ringPos.current.y - 30}px)`;
      dot.style.transform = `translate(${mousePos.current.x - 6}px, ${mousePos.current.y - 6}px) scale(0.5)`;
    } else {
      ring.style.width = '40px';
      ring.style.height = '40px';
      ring.style.backgroundColor = 'transparent';
      ring.style.borderColor = '#d4af37';
      ring.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`;
    }

    rafId.current = requestAnimationFrame(animate);
  }, [checkHoverTargets]);

  useEffect(() => {
    // Hide on mobile
    if (window.innerWidth < 768) return;

    // Hide default cursor
    document.body.style.cursor = 'none';

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [handleMouseMove, handleMouseLeave, handleMouseEnter, animate]);

  // Don't render on mobile
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null;
  }

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: '#d4af37',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          willChange: 'transform',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '2px solid #d4af37',
          backgroundColor: 'transparent',
          pointerEvents: 'none',
          zIndex: 9998,
          mixBlendMode: 'difference',
          opacity: 0,
          transition: 'width 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), height 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.3s ease, opacity 0.3s ease',
          willChange: 'transform',
        }}
      />
    </>
  );
};

export default CustomCursor;
