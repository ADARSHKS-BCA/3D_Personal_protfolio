import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import MagneticButton from '../components/MagneticButton';
import { useTheme } from '../context/ThemeContext';

const socialLinks = [
  { icon: '◈', label: 'GitHub', href: 'https://github.com/adarsh-ks' },
  { icon: '◆', label: 'LinkedIn', href: 'https://linkedin.com/in/adarsh-ks' },
  { icon: '✦', label: 'Twitter', href: 'https://twitter.com/adarsh_ks' },
  { icon: '✉', label: 'Email', href: 'mailto:adarsh.ks@bcah.christuniversity.in' },
];

export default function Contact() {
  const { isDark } = useTheme();
  const formCardRef = useRef(null);
  const formRef = useRef(null);

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [shouldShake, setShouldShake] = useState(false);

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

  const handleFocus = (e) => {
    e.target.style.borderColor = 'var(--gold-light)';
    e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.25)';
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = 'rgba(99, 102, 241, 0.2)';
    e.target.style.boxShadow = 'none';
  };

  return (
    <section
      id="contact"
      className="contact-section section-padding"
      data-animate
    >
      <div className="section-divider"></div>
      <h2 className="sr-only" data-animate>Get In Touch</h2>

      <div className="contact-layout">
        {/* Left column – Info */}
        <div className="contact-left" data-animate>
          {/* Availability status */}
          <div className="available-badge">
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

          <h3 className="contact-heading section-title">
            Contact Me
          </h3>

          <p className="contact-subtext section-subtitle">
            Open to full-time roles, freelance projects, and interesting problems worth solving.
          </p>

          {/* Social links */}
          <div className="social-links-container">
            {socialLinks.map((link) => (
              <div key={link.label} className="social-card-item" data-animate>
                <MagneticButton as="a" href={link.href} target="_blank" rel="noopener noreferrer" style={{ width: '100%' }}>
                  <div
                    className="glass-card glass-card-hover"
                    style={{
                      padding: '1rem',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: '0.75rem',
                      borderRadius: '0.75rem',
                      cursor: 'pointer',
                      background: 'rgba(17, 24, 39, 0.65)',
                      border: '1px solid rgba(99, 102, 241, 0.15)',
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
        <div className="contact-right" data-animate>
          <div
            ref={formCardRef}
            className={`glass-card form-card ${shouldShake ? 'shake-animation' : ''}`}
            style={{
              background: 'rgba(17, 24, 39, 0.75)',
              border: errorState 
                ? '1px solid #dc2626' 
                : '1px solid rgba(99, 102, 241, 0.2)',
              boxShadow: '0 8px 32px 0 rgba(99, 102, 241, 0.05)',
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
              <form ref={formRef} onSubmit={sendEmail} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
                <div className="form-field-group" data-animate>
                  <label className="form-field-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Your name"
                    className="contact-input"
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
                <div className="form-field-group" data-animate>
                  <label className="form-field-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your@email.com"
                    className="contact-input"
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
                <div className="form-field-group" data-animate>
                  <label className="form-field-label">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    placeholder="What's this about?"
                    className="contact-input"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>

                {/* Message */}
                <div className="form-field-group" data-animate>
                  <label className="form-field-label">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Tell me about your project..."
                    className="contact-textarea"
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
                <div className="form-field-group submit-btn-wrapper" data-animate>
                  <MagneticButton as="div" style={{ width: '100%' }}>
                    <button
                      type="submit"
                      disabled={loading}
                      className="contact-submit-btn submit-btn"
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
      </div>

      <style>{`
        .contact-section {
          padding: 120px 0;
          max-width: 1200px;
          margin: 0 auto;
          padding-left: 24px;
          padding-right: 24px;
          background: transparent;
        }

        .contact-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: flex-start;
        }

        .contact-left {
          text-align: left;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .contact-heading {
          font-size: 48px !important;
          font-weight: 700 !important;
          line-height: 1.1 !important;
          margin-top: 32px !important;
          margin-bottom: 20px !important;
        }

        .contact-subtext {
          font-size: 16px !important;
          color: var(--text-muted) !important;
          line-height: 1.7 !important;
          max-width: 380px !important;
          margin-bottom: 0 !important;
        }

        .available-badge {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .social-links-container {
          margin-top: 40px !important;
          display: flex;
          flex-direction: column;
          gap: 16px !important;
          width: 100%;
        }

        .contact-right {
          width: 100%;
        }

        .form-card {
          padding: 40px !important;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 20px !important;
        }

        .form-field-group {
          display: flex;
          flex-direction: column;
          gap: 6px !important;
        }

        .form-field-label {
          font-size: 13px !important;
          color: var(--text-muted) !important;
          margin-bottom: 6px !important;
          letter-spacing: 0.05em !important;
          text-transform: uppercase !important;
          font-weight: 600;
          text-align: left;
          display: block;
        }

        .contact-input {
          height: 52px !important;
          width: 100%;
          padding: 14px 16px;
          background: var(--surface);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 8px;
          color: var(--text);
          font-size: 14px;
          outline: none;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .contact-textarea {
          height: 140px !important;
          width: 100%;
          padding: 14px 16px;
          background: var(--surface);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 8px;
          color: var(--text);
          font-size: 14px;
          outline: none;
          transition: all 0.2s ease;
          font-family: inherit;
          resize: none;
        }

        .submit-btn-wrapper {
          margin-top: 8px !important;
        }

        .contact-submit-btn {
          height: 56px !important;
          width: 100%;
          background: linear-gradient(135deg, var(--gold), var(--gold-light));
          border-radius: 8px;
          color: #ffffff;
          font-weight: 600;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: none;
          outline: none;
          transition: all 0.2s ease;
        }

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
          box-shadow: 0 6px 20px rgba(99, 102, 241, 0.3);
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

        /* Tablet layout (768px — 1024px) */
        @media (min-width: 768px) and (max-width: 1024px) {
          .contact-layout {
            grid-template-columns: 1fr !important;
            max-width: 600px !important;
            margin: 0 auto !important;
          }
          .contact-left {
            align-items: center !important;
            text-align: center !important;
          }
          .contact-subtext {
            max-width: 100% !important;
          }
          .social-links-container {
            align-items: center !important;
          }
          .social-card-item {
            width: 100% !important;
            max-width: 400px;
          }
        }

        /* Mobile layout (below 768px) */
        @media (max-width: 767px) {
          .contact-section {
            padding: 60px 0 !important;
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
          .contact-layout {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .contact-left {
            align-items: center !important;
            text-align: center !important;
          }
          .contact-heading {
            font-size: 32px !important;
          }
          .contact-subtext {
            max-width: 100% !important;
          }
          .form-card {
            padding: 24px !important;
          }
          .social-links-container {
            align-items: center !important;
          }
          .social-card-item {
            width: 100% !important;
            max-width: 400px;
          }
        }
      `}</style>
    </section>
  );
}
