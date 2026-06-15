import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { certs } from '../data/certs';

gsap.registerPlugin(ScrollTrigger);

export default function Certs() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

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
      // Heading: fade up
      const heading = sectionRef.current.querySelector('h2');
      if (heading) {
        gsap.fromTo(
          heading,
          { opacity: 0, y: 40 * reduce },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
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

      // Each badge card
      const validCards = cardsRef.current.filter(Boolean);
      if (validCards.length > 0) {
        gsap.fromTo(
          validCards,
          { opacity: 0, scale: 0.8, y: 30 * reduce },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: validCards[0],
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
      id="certifications"
      className="section-container section-padding bg-transparent text-text certifications-section reveal-section"
      ref={sectionRef}
      data-animate
    >
      <div className="section-divider"></div>
      <h2
        className="gradient-text"
        data-animate
        style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 700,
          textAlign: 'center',
          marginBottom: '4rem',
        }}
      >
        Certifications
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
        className="certs-grid"
      >
        {certs.map((cert, i) => (
          <div
            key={cert.id || i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="glass-card shine-effect cert-card"
            data-animate
            style={{
              padding: '1.5rem',
              borderRadius: '0.75rem',
              transition: 'box-shadow 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            {/* Logo / Emoji */}
            <div
              style={{
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(99, 102, 241, 0.08)',
                border: '1px solid rgba(99, 102, 241, 0.15)',
                borderRadius: '0.75rem',
                marginBottom: '1rem',
                fontSize: '1.75rem',
              }}
            >
              {cert.logo || '🏅'}
            </div>

            {/* Cert name */}
            <h3
              style={{
                fontWeight: 600,
                fontSize: '1rem',
                color: 'var(--text)',
                marginBottom: '0.25rem',
              }}
            >
              {cert.name}
            </h3>

            {/* Issuer */}
            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.875rem',
              }}
            >
              {cert.issuer}
            </p>

            {/* Date */}
            {cert.date && (
              <p
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.75rem',
                  marginTop: '0.25rem',
                }}
              >
                {cert.date}
              </p>
            )}

            {/* Verify link */}
            {cert.credentialUrl && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginTop: '1rem',
                  color: 'var(--gold-light)',
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  transition: 'text-decoration 0.2s',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
              >
                Verify <span style={{ fontSize: '0.75rem' }}>→</span>
              </a>
            )}
          </div>
        ))}
      </div>

      <style>{`
        .cert-card:hover {
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.2);
        }

        @media (max-width: 1024px) {
          .certs-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 640px) {
          .certs-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
