import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { name: 'ABOUT', href: '#about' },
  { name: 'SKILLS', href: '#skills' },
  { name: 'PROJECTS', href: '#projects' },
  { name: 'CONTACT', href: '#contact' },
];

const Navbar = ({ isEmbedded = false, scale = 1.0 }) => {
  const { isDark } = useTheme();
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [visible, setVisible] = useState(true);
  const linksRef = useRef({});

  // Listen to optimized ScrollTrigger active section events
  useEffect(() => {
    const handleSectionActive = (e) => {
      setActiveSection(e.detail);
    };
    window.addEventListener('sectionActive', handleSectionActive);
    return () => window.removeEventListener('sectionActive', handleSectionActive);
  }, []);

  // Update underline indicator position/size on active link change
  useEffect(() => {
    const activeEl = linksRef.current[activeSection];
    if (activeEl) {
      setUnderlineStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
        opacity: 1,
      });
    } else {
      setUnderlineStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [activeSection]);

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

  const handleNavClick = useCallback(
    (e, href) => {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const wrapperId = `${targetId}-wrapper`;
      const el = document.getElementById(wrapperId) || document.getElementById(targetId);
      if (el) {
        if (isEmbedded) {
          const scrollContainer = document.getElementById('monitor-scroll-container');
          if (scrollContainer) {
            scrollContainer.scrollTo({
              top: (el.offsetTop - 70) * scale,
              behavior: 'smooth'
            });
          }
        } else {
          if (window.lenis) {
            window.lenis.scrollTo(el, {
              duration: 1.2,
              easing: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2 // cubic ease in out
            });
          } else {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
      setIsMobileMenuOpen(false);
    },
    [isEmbedded, scale]
  );

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1000,
          background: 'transparent',
          boxShadow: 'none',
          borderBottom: 'none',
          padding: '32px 8vw', // Increased header vertical padding
          display: visible ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "var(--font-body)",
          transition: 'all 0.3s ease',
        }}
      >

        {/* Desktop Links - Centered, 16px, 0.18em letter-spacing, uppercase, color #9a8f7e */}
        <div className="nav-desktop-container" style={{ gap: '36px', display: 'flex', alignItems: 'center', position: 'relative' }}>
          {navLinks.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.name}
                ref={(el) => (linksRef.current[sectionId] = el)}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                data-cursor="pointer"
                style={{
                  fontSize: '16px',
                  fontWeight: isActive ? 700 : 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  color: isActive ? '#e8622a' : '#9a8f7e', // Highlight with divider accent color (#e8622a)
                  textDecoration: 'none',
                  position: 'relative',
                  padding: '6px 0',
                  transition: 'color 0.3s ease',
                }}
                className="nav-link-item"
              >
                {link.name}
              </a>
            );
          })}

          {/* Sliding underline indicator */}
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              left: `${underlineStyle.left}px`,
              width: `${underlineStyle.width}px`,
              height: '2px',
              backgroundColor: '#e8622a',
              opacity: underlineStyle.opacity,
              transition: 'left 0.35s cubic-bezier(0.25, 1, 0.5, 1), width 0.35s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.35s ease',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Mobile Toggle Menu */}
        <button
          className="nav-mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#1a1612', // Matches header text/logo
            fontSize: '22px',
            cursor: 'pointer',
            padding: '4px',
            zIndex: 1001,
          }}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: 0,
            zIndex: 999,
            background: 'rgba(245, 240, 232, 0.98)', // Matching light cream bg with glass overlay
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '40px 8vw',
            gap: '32px',
            animation: 'drawerReveal 0.3s ease-out both',
          }}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  color: isActive ? '#e8622a' : '#1a1612',
                  textDecoration: 'none',
                  borderBottom: isActive ? '2px solid #e8622a' : '1px solid rgba(0,0,0,0.05)',
                  paddingBottom: '12px',
                }}
              >
                {link.name}
              </a>
            );
          })}
        </div>
      )}

      <style>{`
        .nav-link-item:hover {
          color: #e8622a !important;
        }
        @keyframes drawerReveal {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .nav-desktop-container {
          display: flex;
        }
        .nav-mobile-toggle {
          display: none;
          align-items: center;
          justifyContent: center;
        }

        @media (max-width: 767px) {
          .nav-desktop-container {
            display: none !important;
          }
          .nav-mobile-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
