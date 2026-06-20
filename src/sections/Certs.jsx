import { certs } from '../data/certs';

export default function Certs() {
  return (
    <section
      id="certifications"
      className="section-container section-padding bg-transparent text-text certifications-section"
    >
      <div className="section-divider"></div>
      <h2
        className="section-title"
        style={{
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
            className="glass-card shine-effect cert-card"
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
