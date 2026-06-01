// src/hooks/useScrollAnimation.js
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation(options = {}) {
  const ref = useRef(null);

  const {
    animation = 'fadeUp',
    duration = 0.6,
    delay = 0,
    stagger = 0.1,
    start = 'top 80%',
    end = 'bottom 20%',
    scrub = false,
    markers = false,
    once = true,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const animations = {
      fadeUp: {
        from: { opacity: 0, y: 60 },
        to: { opacity: 1, y: 0 },
      },
      fadeIn: {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
      slideLeft: {
        from: { opacity: 0, x: -40 },
        to: { opacity: 1, x: 0 },
      },
      slideRight: {
        from: { opacity: 0, x: 40 },
        to: { opacity: 1, x: 0 },
      },
      scaleUp: {
        from: { opacity: 0, scale: 0.8 },
        to: { opacity: 1, scale: 1 },
      },
      slideUp80: {
        from: { opacity: 0, y: 80 },
        to: { opacity: 1, y: 0 },
      },
    };

    const anim = animations[animation] || animations.fadeUp;
    const children = el.children.length > 1 ? el.children : el;

    gsap.fromTo(children, anim.from, {
      ...anim.to,
      duration,
      delay,
      stagger: el.children.length > 1 ? stagger : 0,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start,
        end,
        scrub,
        markers,
        toggleActions: once ? 'play none none none' : 'play reverse play reverse',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === el) trigger.kill();
      });
    };
  }, [animation, duration, delay, stagger, start, end, scrub, markers, once]);

  return ref;
}

export function useStaggerAnimation(options = {}) {
  const ref = useRef(null);

  const {
    y = 80,
    stagger = 0.15,
    duration = 0.6,
    start = 'top 80%',
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el.children,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === el) trigger.kill();
      });
    };
  }, [y, stagger, duration, start]);

  return ref;
}
