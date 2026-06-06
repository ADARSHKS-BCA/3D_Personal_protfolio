import { useState, useEffect, useCallback, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const { isDark, setIsDark } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleBtnRef = useRef(null);
  const navRef = useRef(null);
  
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.3)
    }
    window.addEventListener('scroll', handleScroll, 
      { passive: true })
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll)
  }, []);

  // Scroll detection for shrink effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detect active section
      const sections = navLinks.map((link) => link.href.replace('#', ''));
      let current = '';

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom > 120) {
            current = sectionId;
            break;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = useCallback(
    (e, href) => {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        if (window.lenis) {
          window.lenis.scrollTo(el);
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
      setIsMobileMenuOpen(false);
    },
    []
  );

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 40,
          backgroundColor: isDark ? 'rgba(3, 3, 1, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: isDark ? '1px solid rgba(212, 175, 55, 0.1)' : '1px solid rgba(212, 175, 55, 0.18)',
          padding: isScrolled ? '12px 0' : '20px 0',
          transform: visible ? 'translateY(0)' : 'translateY(-100%)',
          opacity: visible ? 1 : 0,
          transition: 'transform 0.4s ease, opacity 0.4s ease, padding 300ms ease, background-color 0.3s ease, border-color 0.3s ease',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <a
            href="#"
            data-cursor="pointer"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{
              fontSize: '28px',
              fontWeight: 800,
              background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textDecoration: 'none',
              letterSpacing: '2px',
              fontFamily: "'Outfit', 'Inter', 'Segoe UI', sans-serif",
              userSelect: 'none',
            }}
          >
            Adarsh
          </a>

          {/* Desktop Nav Links */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
            }}
            className="navbar-desktop-links"
          >
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              const linkColor = isActive ? 'var(--gold)' : (isDark ? '#94a3b8' : '#475569');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  data-cursor="pointer"
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    position: 'relative',
                    color: linkColor,
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: 500,
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    transition: 'color 0.3s ease',
                    paddingBottom: '4px',
                    fontFamily: "'Inter', 'Segoe UI', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--gold)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = isDark ? '#94a3b8' : '#475569';
                    }
                  }}
                >
                  {link.name}
                  {/* Active underline indicator */}
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '2px',
                      backgroundColor: 'var(--gold)',
                      transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                      transformOrigin: 'center',
                      transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      borderRadius: '1px',
                    }}
                  />
                </a>
              );
            })}
          </div>

          {/* Right side: hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>

            {/* Hamburger Button (mobile only) */}
            <button
              data-cursor="pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              className="navbar-hamburger"
              style={{
                display: 'none',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '40px',
                height: '40px',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                padding: '8px',
                gap: '5px',
                position: 'relative',
              }}
            >
              <span
                style={{
                  display: 'block',
                  width: '24px',
                  height: '2px',
                  backgroundColor: isDark ? '#f8fafc' : '#0f172a',
                  transition: 'transform 0.3s ease, opacity 0.3s ease',
                  transform: isMobileMenuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
                }}
              />
              <span
                style={{
                  display: 'block',
                  width: '24px',
                  height: '2px',
                  backgroundColor: isDark ? '#f8fafc' : '#0f172a',
                  transition: 'opacity 0.3s ease',
                  opacity: isMobileMenuOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: 'block',
                  width: '24px',
                  height: '2px',
                  backgroundColor: isDark ? '#f8fafc' : '#0f172a',
                  transition: 'transform 0.3s ease, opacity 0.3s ease',
                  transform: isMobileMenuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay Menu */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: isDark ? '#030301' : '#f8fafc',
          zIndex: 39,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '32px',
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease',
        }}
      >
        {navLinks.map((link, index) => {
          const sectionId = link.href.replace('#', '');
          const isActive = activeSection === sectionId;
          return (
            <a
              key={link.name}
              href={link.href}
              data-cursor="pointer"
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                color: isActive ? 'var(--gold)' : (isDark ? '#f8fafc' : '#0f172a'),
                textDecoration: 'none',
                fontSize: '32px',
                fontWeight: 600,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                fontFamily: "'Inter', 'Segoe UI', sans-serif",
                transition: 'color 0.3s ease, transform 0.3s ease, opacity 0.3s ease',
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isMobileMenuOpen ? 1 : 0,
                transitionDelay: isMobileMenuOpen ? `${index * 0.1}s` : '0s',
              }}
            >
              {link.name}
            </a>
          );
        })}
      </div>

      {/* Responsive styles injected via <style> tag */}
      <style>{`
        @media (max-width: 767px) {
          .navbar-desktop-links {
            display: none !important;
          }
          .navbar-hamburger {
            display: flex !important;
          }
        }
        @media (min-width: 768px) {
          .navbar-desktop-links {
            display: flex !important;
          }
          .navbar-hamburger {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
