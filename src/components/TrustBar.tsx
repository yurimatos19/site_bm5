import React from 'react';

const BADGES = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        {/* Globe / ICC */}
        <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1" />
        <ellipse cx="16" cy="16" rx="5.5" ry="11" stroke="currentColor" strokeWidth="1" />
        <path d="M5 16H27M7 10H25M7 22H25" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
    label: 'ICC',
    sub: 'Câmara de Comércio Internacional',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        {/* Interlocked rings / OMC */}
        <circle cx="12" cy="16" r="7" stroke="currentColor" strokeWidth="1" />
        <circle cx="20" cy="16" r="7" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
    label: 'OMC',
    sub: 'Organização Mundial do Comércio',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        {/* Wheat / MAPA */}
        <path d="M16 28V12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <path d="M16 22C16 22 12 20 10 16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <path d="M16 18C16 18 12 16 11 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <path d="M16 22C16 22 20 20 22 16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <path d="M16 18C16 18 20 16 21 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <circle cx="16" cy="10" r="2" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
    label: 'MAPA',
    sub: 'Ministério da Agricultura',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        {/* Bank columns / Top-50 Banks */}
        <path d="M4 12H28M4 12L16 5L28 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="7" y="12" width="3" height="12" stroke="currentColor" strokeWidth="1" />
        <rect x="14.5" y="12" width="3" height="12" stroke="currentColor" strokeWidth="1" />
        <rect x="22" y="12" width="3" height="12" stroke="currentColor" strokeWidth="1" />
        <path d="M3 24H29" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
    label: 'Top-50 Banks',
    sub: 'Instrumentos Bancários Verificados',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        {/* Shield / KYC-AML */}
        <path d="M16 4L27 8V17C27 22.523 22.074 26.875 16 28C9.926 26.875 5 22.523 5 17V8L16 4Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
        <path d="M11 16L14.5 19.5L21 13" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: 'KYC / AML',
    sub: 'Compliance Anti-Lavagem',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        {/* Network nodes / SWIFT */}
        <circle cx="16" cy="16" r="3" stroke="currentColor" strokeWidth="1" />
        <circle cx="6" cy="10" r="2.5" stroke="currentColor" strokeWidth="1" />
        <circle cx="26" cy="10" r="2.5" stroke="currentColor" strokeWidth="1" />
        <circle cx="6" cy="22" r="2.5" stroke="currentColor" strokeWidth="1" />
        <circle cx="26" cy="22" r="2.5" stroke="currentColor" strokeWidth="1" />
        <path d="M13 14.5L8.2 11.5M19 14.5L23.8 11.5M13 17.5L8.2 20.5M19 17.5L23.8 20.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
    label: 'SWIFT',
    sub: 'Rede Bancária Internacional',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        {/* Document / SPA-FCO */}
        <path d="M9 4H20L24 8V28H9V4Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
        <path d="M20 4V8H24" stroke="currentColor" strokeWidth="1" />
        <path d="M12 14H21M12 18H21M12 22H17" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
    label: 'SPA / FCO',
    sub: 'Contratos ICC-Padrão',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        {/* Magnifier / SGS-Bureau Veritas */}
        <circle cx="14" cy="14" r="8" stroke="currentColor" strokeWidth="1" />
        <path d="M20 20L27 27" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 14C10 11.791 11.791 10 14 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
    label: 'SGS / Bureau Veritas',
    sub: 'Inspeção Internacional',
  },
];

const goldRule: React.CSSProperties = {
  display: 'block',
  width: '100%',
  height: '1px',
  background: 'linear-gradient(to right, transparent, var(--gold-dim) 20%, var(--gold-dim) 80%, transparent)',
  flexShrink: 0,
};

export default function TrustBar() {
  return (
    <section
      style={{
        background: 'var(--navy)',
        padding: 'clamp(2rem, 4vw, 3rem) 0',
        position: 'relative',
      }}
    >
      {/* Top gold rule */}
      <span style={goldRule} />

      {/* Eyebrow */}
      <div
        style={{
          textAlign: 'center',
          padding: 'clamp(1.5rem, 3vw, 2rem) 1.5rem clamp(1.25rem, 2.5vw, 1.75rem)',
        }}
      >
        <span
          style={{
            fontSize: '0.6875rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase' as const,
            color: 'var(--gold)',
            fontWeight: 500,
          }}
        >
          Conformidade &amp; Certificações
        </span>
      </div>

      {/* Badges row */}
      <div
        className="trust-bar-inner"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap' as const,
          gap: '0',
          padding: '0 clamp(1rem, 4vw, 3rem)',
        }}
      >
        {BADGES.map((badge, i) => (
          <React.Fragment key={badge.label}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column' as const,
                alignItems: 'center',
                gap: '0.625rem',
                padding: 'clamp(0.75rem, 2vw, 1.25rem) clamp(1rem, 2.5vw, 1.75rem)',
                textAlign: 'center' as const,
                minWidth: '100px',
              }}
            >
              {/* Icon */}
              <div
                style={{
                  color: 'var(--gold)',
                  opacity: 0.9,
                  lineHeight: 0,
                }}
              >
                {badge.icon}
              </div>

              {/* Label */}
              <span
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase' as const,
                  color: 'var(--ivory)',
                  whiteSpace: 'nowrap' as const,
                }}
              >
                {badge.label}
              </span>

              {/* Sublabel */}
              <span
                style={{
                  fontSize: '0.625rem',
                  letterSpacing: '0.05em',
                  color: 'var(--ivory-dim)',
                  lineHeight: 1.4,
                  maxWidth: '110px',
                }}
              >
                {badge.sub}
              </span>
            </div>

            {/* Vertical divider between badges */}
            {i < BADGES.length - 1 && (
              <span
                aria-hidden="true"
                style={{
                  display: 'block',
                  width: '1px',
                  height: '52px',
                  background: 'linear-gradient(to bottom, transparent, var(--gold-dim) 30%, var(--gold-dim) 70%, transparent)',
                  flexShrink: 0,
                  alignSelf: 'center',
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Bottom gold rule */}
      <span style={goldRule} />

      <style>{`
        @media (max-width: 900px) {
          .trust-bar-inner {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0 !important;
            justify-items: center;
          }
          /* Hide vertical dividers on mobile */
          .trust-bar-inner > span[aria-hidden] {
            display: none !important;
          }
          /* Add bottom border to each badge cell except last row */
          .trust-bar-inner > div {
            border-bottom: 1px solid rgba(201,168,76,0.1);
            width: 100%;
          }
        }
        @media (max-width: 520px) {
          .trust-bar-inner {
            grid-template-columns: repeat(2, 1fr) !important;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }
        }
      `}</style>
    </section>
  );
}
