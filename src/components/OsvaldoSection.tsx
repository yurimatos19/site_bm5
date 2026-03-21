'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

export default function OsvaldoSection() {
  const t = useTranslations('osvaldo');

  const CREDENTIALS = [
    { label: t('cred0_label'), note: t('cred0_note') },
    { label: t('cred1_label'), note: t('cred1_note') },
    { label: t('cred2_label'), note: t('cred2_note') },
    { label: t('cred3_label'), note: t('cred3_note') },
    { label: t('cred4_label'), note: t('cred4_note') },
    { label: t('cred5_label'), note: t('cred5_note') },
  ];

  const HONORS = [
    t('honor0'),
    t('honor1'),
    t('honor2'),
    t('honor3'),
    t('honor4'),
    t('honor5'),
  ];
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        background: 'var(--navy-mid)',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(4rem, 8vw, 7rem) 0',
      }}
    >
      {/* Background texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(196,150,58,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(196,150,58,0.025) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
      }} />

      {/* Gold radial glow top-right */}
      <div style={{
        position: 'absolute', top: 0, right: 0, width: '50%', height: '70%', pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 80% 20%, rgba(196,150,58,0.06) 0%, transparent 65%)',
      }} />

      {/* Top border */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(196,150,58,0.4) 30%, rgba(196,150,58,0.4) 70%, transparent)',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Eyebrow ── */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '1rem',
          marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>
          <span className="eyebrow">{t('eyebrow')}</span>
          <span style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, rgba(196,150,58,0.3), transparent)' }} />
        </div>

        {/* ── Main layout ── */}
        <div className="osvaldo-grid">

          {/* LEFT — Photo + medals */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(-24px)',
            transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
          }}>
            {/* Photo */}
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '340px',
              margin: '0 auto',
            }}>
              {/* Gold frame accent */}
              <div style={{
                position: 'absolute', inset: 0,
                border: '1px solid rgba(196,150,58,0.25)',
                borderRadius: '4px',
                transform: 'translate(8px, 8px)',
              }} />
              <div style={{
                position: 'relative',
                borderRadius: '4px',
                overflow: 'hidden',
                border: '1px solid rgba(196,150,58,0.15)',
              }}>
                <Image
                  src="/osvaldo_ceo.png"
                  alt="Osvaldo Matos de Melo Júnior — CEO BM5"
                  width={340}
                  height={420}
                  style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                />
                {/* Overlay gradient */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
                  background: 'linear-gradient(to top, rgba(5,7,13,0.85), transparent)',
                }} />
                {/* Name over photo */}
                <div style={{
                  position: 'absolute', bottom: '1.25rem', left: '1.25rem', right: '1.25rem',
                }}>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--ivory)', letterSpacing: '-0.01em' }}>
                    Osvaldo Matos de Melo Júnior
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--gold)', marginTop: '0.2rem', letterSpacing: '0.08em' }}>
                    CEO & Fundador · BM5 Comex
                  </div>
                </div>
              </div>
            </div>

            {/* Activity photos */}
            <div style={{ marginTop: '1rem', maxWidth: '340px', margin: '1rem auto 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              <div style={{ borderRadius: '3px', overflow: 'hidden', border: '1px solid rgba(196,150,58,0.15)', aspectRatio: '4/3' }}>
                <img src="/osvaldo-palestra.jpg" alt="Osvaldo palestrando" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ borderRadius: '3px', overflow: 'hidden', border: '1px solid rgba(196,150,58,0.15)', aspectRatio: '4/3' }}>
                <img src="/osvaldo-entrevista.jpg" alt="Osvaldo em entrevista" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            </div>

            {/* Honors strip */}
            <div style={{ marginTop: '2rem', maxWidth: '340px', margin: '1.5rem auto 0' }}>
              <div style={{
                fontSize: '0.5rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase',
                color: 'var(--gold)', opacity: 0.7, marginBottom: '0.875rem',
              }}>
                {t('honors_title')}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {HONORS.map((h, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: '0.5rem',
                    opacity: visible ? 1 : 0,
                    transition: `opacity 0.5s ease ${0.4 + i * 0.07}s`,
                  }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" style={{ flexShrink: 0, marginTop: '3px' }}>
                      <rect x="5" y="0.5" width="6.5" height="6.5" rx="0.5" transform="rotate(45 5 0.5)" fill="rgba(196,150,58,0.5)"/>
                    </svg>
                    <span style={{ fontSize: '0.6875rem', color: 'rgba(200,192,168,0.6)', lineHeight: 1.5 }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Quote + credentials */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(24px)',
            transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
          }}>
            {/* Quote mark */}
            <div style={{
              fontFamily: 'Georgia, serif',
              fontSize: '8rem',
              lineHeight: 0.7,
              color: 'var(--gold)',
              opacity: 0.18,
              marginBottom: '1.5rem',
              userSelect: 'none',
            }}>
              "
            </div>

            {/* Quote text */}
            <blockquote style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
              fontWeight: 400,
              lineHeight: 1.5,
              color: 'var(--ivory)',
              letterSpacing: '-0.01em',
              borderLeft: '2px solid var(--gold)',
              paddingLeft: '1.5rem',
              marginBottom: '1rem',
            }}>
              {t('quote_text')}
            </blockquote>

            <p style={{
              paddingLeft: '1.5rem',
              fontSize: '0.875rem',
              color: 'var(--ivory-dim)',
              lineHeight: 1.7,
              marginBottom: '2.5rem',
            }}>
              {t('quote_body')}
            </p>

            {/* Presidential badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
              background: 'rgba(196,150,58,0.07)',
              border: '1px solid rgba(196,150,58,0.25)',
              borderRadius: '4px',
              padding: '0.75rem 1.25rem',
              marginBottom: '2.5rem',
            }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 2L11 6.5L16 7.3L12.5 10.7L13.4 16L9 13.5L4.6 16L5.5 10.7L2 7.3L7 6.5L9 2Z" stroke="rgba(196,150,58,0.9)" strokeWidth="1.1" fill="rgba(196,150,58,0.15)"/>
              </svg>
              <div>
                <div style={{ fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', opacity: 0.8 }}>
                  {t('presidential_label')}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--ivory-dim)', marginTop: '0.15rem' }}>
                  {t('presidential_note')}
                </div>
              </div>
            </div>

            {/* Credentials grid */}
            <div style={{
              fontSize: '0.5rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--gold)', opacity: 0.7, marginBottom: '1rem',
            }}>
              {t('credentials_title')}
            </div>
            <div className="osvaldo-creds-grid">
              {CREDENTIALS.map((c, i) => (
                <div key={i} className="osvaldo-cred-item" style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(12px)',
                  transition: `opacity 0.5s ease ${0.35 + i * 0.08}s, transform 0.5s ease ${0.35 + i * 0.08}s`,
                }}>
                  <div style={{
                    fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ivory)', marginBottom: '0.2rem',
                    letterSpacing: '-0.01em',
                  }}>
                    {c.label}
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: 'rgba(196,150,58,0.55)', lineHeight: 1.4 }}>
                    {c.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(196,150,58,0.2) 50%, transparent)',
      }} />

      <style>{`
        .osvaldo-grid {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: clamp(2.5rem, 5vw, 5rem);
          align-items: start;
        }
        .osvaldo-creds-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }
        .osvaldo-cred-item {
          padding: 0.875rem 1rem;
          border: 1px solid rgba(196,150,58,0.1);
          border-radius: 4px;
          background: rgba(255,255,255,0.02);
          border-left: 2px solid rgba(196,150,58,0.2);
          transition: border-left-color 0.25s ease, background 0.25s ease;
        }
        .osvaldo-cred-item:hover {
          border-left-color: var(--gold);
          background: rgba(196,150,58,0.04);
        }
        @media (max-width: 900px) {
          .osvaldo-grid { grid-template-columns: 1fr; }
          .osvaldo-creds-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .osvaldo-creds-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
