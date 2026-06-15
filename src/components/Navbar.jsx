// src/components/Navbar.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { name: 'About Us', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Project', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = ({ isEmbedded = false, scale = 1.0 }) => {
  const { isDark } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  // Scroll detection for active section and background blending
  useEffect(() => {
    const scrollContainer = isEmbedded 
      ? document.getElementById('monitor-scroll-container') 
      : window;
      
    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrollTop = isEmbedded 
        ? scrollContainer.scrollTop 
        : window.scrollY;

      setIsScrolled(scrollTop > 20);

      // Detect active section
      const sections = navLinks.map((link) => link.href.replace('#', ''));
      let current = '';

      // If at the very top, set active to empty (Hero active)
      if (scrollTop < 100) {
        setActiveSection('');
        return;
      }

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          if (isEmbedded) {
            const scaledOffsetTop = el.offsetTop * scale;
            const scaledHeight = el.offsetHeight * scale;
            const offsetFromViewportTop = scaledOffsetTop - scrollContainer.scrollTop;
            if (offsetFromViewportTop <= 120 && offsetFromViewportTop + scaledHeight > 120) {
              current = sectionId;
              break;
            }
          } else {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom > 150) {
              current = sectionId;
              break;
            }
          }
        }
      }

      setActiveSection(current);
    };

    const targetListener = isEmbedded ? scrollContainer : window;
    targetListener.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => targetListener.removeEventListener('scroll', handleScroll);
  }, [isEmbedded, scale]);

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
      const el = document.getElementById(targetId);
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
          // Temporarily disable scroll snapping to allow smooth scroll
          const html = document.documentElement;
          html.style.scrollSnapType = 'none';

          el.scrollIntoView({ behavior: 'smooth', block: 'start' });

          // Re-enable scroll snapping after the scroll finishes
          setTimeout(() => {
            html.style.scrollSnapType = 'y mandatory';
          }, 1000);
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
          background: isScrolled
            ? (isDark ? 'rgba(10, 15, 30, 0.75)' : 'rgba(248, 250, 252, 0.75)')
            : 'transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
          borderBottom: isScrolled
            ? (isDark ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.05)')
            : '1px solid transparent',
          transition: 'all 0.3s ease',
          padding: isScrolled ? '12px 24px' : '20px 24px',
          display: visible ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* Desktop Links */}
        <div className="nav-desktop-container" style={{ gap: '32px' }}>
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                data-cursor="pointer"
                style={{
                  fontSize: '12px',
                  fontWeight: isActive ? 700 : 500,
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  color: isActive ? 'var(--gold)' : 'var(--text-muted)',
                  textDecoration: 'none',
                  position: 'relative',
                  padding: '6px 0',
                  transition: 'color 0.3s ease',
                }}
                className="nav-link-item"
              >
                {link.name}
                <span 
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '2px',
                    backgroundColor: 'var(--gold)',
                    transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.3s ease',
                  }}
                />
              </a>
            );
          })}
        </div>

        {/* Mobile Toggle Menu */}
        <button
          className="nav-mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text)',
            fontSize: '20px',
            cursor: 'pointer',
            padding: '4px',
            position: 'absolute',
            right: '24px',
            top: '50%',
            transform: 'translateY(-50%)',
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
            top: '56px',
            zIndex: 999,
            background: isDark ? 'rgba(10, 15, 30, 0.95)' : 'rgba(248, 250, 252, 0.95)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            display: 'flex',
            flexDirection: 'column',
            padding: '40px 24px',
            gap: '24px',
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
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  color: isActive ? 'var(--gold)' : 'var(--text)',
                  textDecoration: 'none',
                  borderBottom: isActive ? '2px solid var(--gold)' : '1px solid rgba(0,0,0,0.05)',
                  paddingBottom: '8px',
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
          color: var(--gold) !important;
        }
        .nav-link-item:hover span {
          transform: scaleX(1) !important;
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
          justify-content: center;
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
