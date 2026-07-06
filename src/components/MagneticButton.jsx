import { useRef, useCallback } from 'react';

const MagneticButton = ({
  children,
  as: Component = 'button',
  className = '',
  onClick,
  href,
  strength = 0.3,
  style = {},
  ...rest
}) => {
  const btnRef = useRef(null);

  const handleMouseMove = useCallback(
    (e) => {
      const btn = btnRef.current;
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      const radius = 80;

      if (distance < radius) {
        const translateX = deltaX * strength;
        const translateY = deltaY * strength;
        btn.style.transform = `translate(${translateX}px, ${translateY}px)`;
        btn.style.transition = 'transform 0.15s ease-out';
      }
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    const btn = btnRef.current;
    if (!btn) return;

    btn.style.transform = 'translate(0px, 0px)';
    btn.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
  }, []);

  const handleMouseEnter = useCallback(() => {
    const btn = btnRef.current;
    if (!btn) return;

    btn.style.transition = 'transform 0.15s ease-out';
  }, []);

  const componentProps = {
    ref: btnRef,
    className: `magnetic-btn ${className}`.trim(),
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onMouseEnter: handleMouseEnter,
    onClick,
    'data-cursor': 'pointer',
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      willChange: 'transform',
      ...style,
    },
    ...rest,
  };

  if (Component === 'a') {
    componentProps.href = href;
  }

  return <Component {...componentProps}>{children}</Component>;
};

export default MagneticButton;
