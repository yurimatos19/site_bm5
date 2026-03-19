'use client';

import { useState } from 'react';

const WA_NUMBER = '5581991032272';
const WA_HREF = `https://wa.me/${WA_NUMBER}`;

export default function WhatsAppFAB() {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <a
        href={WA_HREF}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco pelo WhatsApp"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 9000,
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          textDecoration: 'none',
          filter: hovered
            ? 'drop-shadow(0 8px 24px rgba(37,211,102,0.45))'
            : 'drop-shadow(0 4px 12px rgba(37,211,102,0.25))',
          transition: 'filter 0.3s ease, transform 0.3s ease',
          transform: hovered ? 'translateY(-4px) scale(1.04)' : 'translateY(0) scale(1)',
        }}
      >
        {/* Tooltip label */}
        <span style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateX(0)' : 'translateX(8px)',
          transition: 'opacity 0.25s ease, transform 0.25s ease',
          background: 'rgba(5,7,13,0.92)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(37,211,102,0.2)',
          color: '#F2EDE3',
          fontSize: '0.6875rem',
          fontFamily: 'var(--font-body)',
          fontWeight: 500,
          letterSpacing: '0.08em',
          padding: '0.5rem 0.875rem',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          lineHeight: 1,
        }}>
          +55 (81) 99103‑2272
        </span>

        {/* Green circle button */}
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          position: 'relative',
        }}>
          {/* Pulse ring */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '2px solid rgba(37,211,102,0.45)',
            animation: 'waPulse 2.4s ease-out infinite',
          }} />
          {/* WhatsApp SVG icon */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14 2C7.373 2 2 7.373 2 14c0 2.163.585 4.19 1.604 5.934L2 26l6.234-1.585A11.944 11.944 0 0014 26c6.627 0 12-5.373 12-12S20.627 2 14 2z"
              fill="white"
              fillOpacity="0.95"
            />
            <path
              d="M19.5 17.1c-.3-.15-1.77-.874-2.044-.974-.274-.1-.473-.15-.672.15-.2.298-.772.973-.946 1.172-.174.2-.348.224-.647.075-.3-.15-1.266-.467-2.41-1.486-.891-.794-1.493-1.775-1.667-2.073-.174-.3-.018-.461.13-.61.134-.132.3-.348.448-.522.15-.175.2-.3.3-.498.1-.2.05-.374-.025-.523-.075-.15-.672-1.62-.92-2.22-.243-.583-.49-.503-.672-.513-.174-.009-.373-.011-.572-.011-.2 0-.523.075-.797.374-.274.3-1.046 1.023-1.046 2.493s1.071 2.893 1.22 3.093c.15.2 2.108 3.217 5.109 4.513.714.308 1.271.492 1.706.63.717.228 1.37.195 1.886.118.575-.086 1.77-.724 2.02-1.422.25-.7.25-1.3.174-1.423-.075-.124-.273-.2-.572-.348z"
              fill="#128C7E"
            />
          </svg>
        </div>
      </a>

      <style>{`
        @keyframes waPulse {
          0%   { transform: scale(1);   opacity: 0.7; }
          70%  { transform: scale(1.5); opacity: 0; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @media (max-width: 480px) {
          /* On very small screens, push up slightly above system chrome */
          .wa-fab { bottom: 1.25rem !important; right: 1.25rem !important; }
        }
      `}</style>
    </>
  );
}
