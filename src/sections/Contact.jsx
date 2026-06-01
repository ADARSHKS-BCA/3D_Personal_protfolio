import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';
import MagneticButton from '../components/MagneticButton';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { icon: '◈', label: 'GitHub', href: 'https://github.com/adarsh-ks' },
  { icon: '◆', label: 'LinkedIn', href: 'https://linkedin.com/in/adarsh-ks' },
  { icon: '✦', label: 'Twitter', href: 'https://twitter.com/adarsh_ks' },
  { icon: '✉', label: 'Email', href: 'mailto:adarsh.ks@bcah.christuniversity.in' },
];

export default function Contact() {
  const { isDark } = useTheme();
  const sectionRef = useRef(null);
  const formCardRef = useRef(null);
  const formRef = useRef(null);

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [shouldShake, setShouldShake] = useState(false);

  // GSAP scroll animations
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
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // Left column content elements
      const leftCol = sectionRef.current.querySelector('.contact-left');
      if (leftCol) {
        const leftElements = leftCol.querySelectorAll('h3, p, .available-badge, .social-card-item');
        if (leftElements.length) {
          gsap.fromTo(
            leftElements,
            { opacity: 0, y: 20 * reduce },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 85%',
                once: true,
              },
            }
          );
        }
      }

      // Form card
      if (formCardRef.current) {
        gsap.set(formCardRef.current, { willChange: 'transform' });
        gsap.fromTo(
          formCardRef.current,
          { opacity: 0, y: 60 * reduce, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: formCardRef.current,
              start: 'top 85%',
              once: true,
            },
            onComplete: () => {
              gsap.set(formCardRef.current, { willChange: 'auto' });
              
              // Fields stagger
              const fields = formCardRef.current.querySelectorAll('.form-field-group');
              if (fields.length) {
                gsap.fromTo(
                  fields,
                  { opacity: 0, x: -20 * reduce },
                  {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: 'power3.out',
                  }
                );
              }
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleInputChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setErrorState(false);

    if (!validateForm()) {
      setShouldShake(true);
      setTimeout(() => setShouldShake(false), 300);
      return;
    }

    setLoading(true);
    try {
      await emailjs.sendForm(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        formRef.current,
        'YOUR_PUBLIC_KEY'
      );
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } catch (err) {
      console.error('EmailJS Error:', err);
      setErrorState(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setSuccess(false);
    setErrorState(false);
  };

  const inputStyles = {
    width: '100%',
    padding: '14px 16px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(212,175,55,0.2)',
    borderRadius: '8px',
    color: isDark ? '#ffffff' : '#111827',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit',
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = '#ffdf7a';
    e.target.style.boxShadow = '0 0 0 3px rgba(212,175,55,0.15)';
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = 'rgba(212,175,55,0.2)';
    e.target.style.boxShadow = 'none';
  };

  return (
    <section
      id="contact"
      className="section-container section-padding bg-gray-50 dark:bg-bg text-gray-900 dark:text-text"
      ref={sectionRef}
      style={{ background: 'transparent' }}
    >
      <h2
        className="gradient-text sr-only"
        style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 700,
          textAlign: 'center',
          marginBottom: '0.75rem',
        }}
      >
        Get In Touch
      </h2>

      <div
        className="contact-layout"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          maxWidth: '1100px',
          margin: '0 auto',
          alignItems: 'center',
        }}
      >
        {/* Left column – Info */}
        <div className="contact-left" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Availability status */}
          <div className="available-badge" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#22c55e',
                display: 'inline-block',
                boxShadow: '0 0 8px #22c55e',
                animation: 'pulse-green 2s infinite',
              }}
            />
            <span style={{ color: isDark ? 'var(--text)' : '#111827', fontWeight: 600 }}>Available for work</span>
          </div>

          <h3
            className="gradient-text"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 800,
              lineHeight: 1.15,
            }}
          >
            Let's Build Something
          </h3>

          <p style={{ color: isDark ? 'var(--text-muted)' : '#4b5563', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Open to full-time roles, freelance projects, and interesting problems worth solving.
          </p>

          {/* Response time */}
          <p style={{ color: isDark ? 'var(--text-muted)' : '#6b7280', fontSize: '0.9rem', margin: 0 }}>
            Usually responds within 24 hours
          </p>

          {/* Social links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
            {socialLinks.map((link) => (
              <div key={link.label} className="social-card-item">
                <MagneticButton as="a" href={link.href} target="_blank" rel="noopener noreferrer" style={{ width: '100%' }}>
                  <div
                    className="glass-card"
                    style={{
                      padding: '1rem',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: '0.75rem',
                      borderRadius: '0.75rem',
                      cursor: 'pointer',
                      background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.85)',
                      boxShadow: isDark ? 'none' : '0 4px 12px rgba(212, 175, 55, 0.04)',
                    }}
                  >
                    <span style={{ fontSize: '1.25rem' }}>{link.icon}</span>
                    <span style={{ color: isDark ? 'var(--text)' : '#111827', fontWeight: 500 }}>{link.label}</span>
                  </div>
                </MagneticButton>
              </div>
            ))}
          </div>
        </div>

        {/* Right column – Form Card */}
        <div
          ref={formCardRef}
          className={`glass-card ${shouldShake ? 'shake-animation' : ''}`}
          style={{
            padding: '40px',
            borderRadius: '16px',
            background: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.85)',
            border: errorState 
              ? '1px solid #dc2626' 
              : (isDark ? '1px solid rgba(212, 175, 55, 0.2)' : '1px solid rgba(212, 175, 55, 0.3)'),
            boxShadow: isDark ? 'none' : '0 8px 32px rgba(212, 175, 55, 0.08)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            transition: 'border 0.3s ease, background 0.3s ease',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {success ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '20px 0',
              }}
            >
              {/* Animated checkmark */}
              <svg
                width="80"
                height="80"
                viewBox="0 0 52 52"
                style={{
                  borderRadius: '50%',
                  display: 'block',
                  margin: '0 auto 24px',
                  strokeWidth: 2,
                  boxShadow: 'inset 0px 0px 0px var(--gold)',
                }}
              >
                <circle cx="26" cy="26" r="25" fill="none" className="checkmark-circle" />
                <path d="M14.1 27.2l7.1 7.2 16.7-16.8" fill="none" className="checkmark-check" />
              </svg>

              <h4
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: 'var(--gold)',
                  marginBottom: '0.75rem',
                }}
              >
                Message sent!
              </h4>
              <p
                style={{
                  color: isDark ? 'var(--text-muted)' : '#4b5563',
                  fontSize: '1rem',
                  marginBottom: '2rem',
                }}
              >
                I'll get back to you within 24 hours.
              </p>

              <a
                href="#"
                onClick={handleReset}
                style={{
                  color: 'var(--gold-light)',
                  fontWeight: 600,
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                }}
                onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
              >
                Send another message
              </a>
            </div>
          ) : (
            <form ref={formRef} onSubmit={sendEmail} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {errorState && (
                <div
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(220, 38, 38, 0.1)',
                    border: '1px solid rgba(220, 38, 38, 0.2)',
                    color: '#dc2626',
                    fontSize: '0.85rem',
                    lineHeight: 1.5,
                  }}
                >
                  Something went wrong. Try emailing directly:{' '}
                  <a
                    href="mailto:adarsh.ks@bcah.christuniversity.in"
                    style={{ color: 'var(--gold-light)', fontWeight: 600, textDecoration: 'underline' }}
                  >
                    adarsh.ks@bcah.christuniversity.in
                  </a>
                </div>
              )}

              {/* Name */}
              <div className="form-field-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Your name"
                  style={inputStyles}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                {errors.name && (
                  <span style={{ color: '#dc2626', fontSize: '0.75rem', fontWeight: 500, paddingLeft: '4px' }}>
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="form-field-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your@email.com"
                  style={inputStyles}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                {errors.email && (
                  <span style={{ color: '#dc2626', fontSize: '0.75rem', fontWeight: 500, paddingLeft: '4px' }}>
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Subject */}
              <div className="form-field-group">
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  placeholder="What's this about?"
                  style={inputStyles}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              {/* Message */}
              <div className="form-field-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Tell me about your project..."
                  rows={5}
                  style={{ ...inputStyles, height: '140px', resize: 'none' }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                {errors.message && (
                  <span style={{ color: '#dc2626', fontSize: '0.75rem', fontWeight: 500, paddingLeft: '4px' }}>
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Submit button */}
              <div className="form-field-group" style={{ marginTop: '0.5rem' }}>
                <MagneticButton as="div" style={{ width: '100%' }}>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: '100%',
                      height: '52px',
                      background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontWeight: 600,
                      fontSize: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      border: 'none',
                      outline: 'none',
                      transition: 'all 0.2s ease',
                    }}
                    className="submit-btn"
                  >
                    {loading ? (
                      <div className="spinner" />
                    ) : (
                      'Send Message →'
                    )}
                  </button>
                </MagneticButton>
              </div>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @keyframes pulse-green {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.2); }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes form-shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }

        @keyframes checkmark-draw {
          to { stroke-dashoffset: 0; }
        }

        .spinner {
          width: 24px;
          height: 24px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .submit-btn:hover {
          opacity: 0.95;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(212, 175, 55, 0.25);
        }

        .submit-btn:active {
          transform: translateY(0);
        }

        .shake-animation {
          animation: form-shake 0.3s ease-in-out;
        }

        .checkmark-circle {
          stroke-dasharray: 166;
          stroke-dashoffset: 166;
          stroke-width: 2;
          stroke-miterlimit: 10;
          stroke: var(--gold);
          fill: none;
          animation: checkmark-draw 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }

        .checkmark-check {
          transform-origin: 50% 50%;
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          stroke: var(--gold);
          stroke-width: 3;
          fill: none;
          animation: checkmark-draw 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards;
        }

        @media (max-width: 768px) {
          .contact-layout {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
