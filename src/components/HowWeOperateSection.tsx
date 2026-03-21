'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

const STEP_NUMBERS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];

export default function HowWeOperateSection() {
  const t = useTranslations('howWeOperate');

  const STEPS = STEP_NUMBERS.map((n) => ({
    n,
    title: t(`step${n}_title`),
    body: t(`step${n}_body`),
    tag: t(`step${n}_tag`),
  }));

  const GUARANTEES = [
    t('guarantee1'),
    t('guarantee2'),
    t('guarantee3'),
    t('guarantee4'),
    t('guarantee5'),
  ];
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="como-operamos"
      style={{
        background: 'var(--navy)',
        position: 'relative',
        padding: 'clamp(4rem, 8vw, 7rem) 0',
      }}
    >
      {/* Top rule */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--gold-dim) 40%, transparent)',
      }} />

      <div className="container">
        {/* Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          alignItems: 'flex-end',
          gap: '2rem',
          marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }} className="how-header">
          <div>
            <span className="eyebrow" style={{ display: 'block', marginBottom: '1rem' }}>
              {t('eyebrow')}
            </span>
            <span className="gold-rule" style={{ display: 'block', marginBottom: '1rem' }} />
            <h2 className="section-headline">{t('headline')}</h2>
          </div>
          <div>
            <p style={{
              fontSize: '0.875rem',
              color: 'var(--ivory-dim)',
              maxWidth: '340px',
              lineHeight: 1.75,
              textAlign: 'right',
            }}>
              {t('subtitle')}
            </p>
          </div>
        </div>

        {/* Steps grid */}
        <div className="how-steps-grid" style={{ marginBottom: '3rem' }}>
          {STEPS.map((step, i) => (
            <div
              key={step.n}
              className="how-step-card"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.6s ease ${i * 0.05}s, transform 0.6s ease ${i * 0.05}s`,
              }}
            >
              {/* Step number */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.875rem',
              }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'rgba(212,165,60,0.15)',
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                }}>
                  {step.n}
                </span>
                <span style={{
                  fontSize: '0.5rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  background: 'rgba(212,165,60,0.08)',
                  border: '1px solid rgba(212,165,60,0.2)',
                  padding: '0.15rem 0.5rem',
                }}>
                  {step.tag}
                </span>
              </div>

              <div style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--ivory)',
                marginBottom: '0.5rem',
                letterSpacing: '-0.01em',
                lineHeight: 1.3,
              }}>
                {step.title}
              </div>

              <div style={{
                fontSize: '0.75rem',
                color: 'var(--ivory-dim)',
                lineHeight: 1.65,
              }}>
                {step.body}
              </div>
            </div>
          ))}
        </div>

        {/* Guarantees strip */}
        <div style={{
          background: 'rgba(212,165,60,0.04)',
          border: '1px solid rgba(212,165,60,0.15)',
          padding: 'clamp(1.5rem, 3vw, 2rem) clamp(1.5rem, 4vw, 2.5rem)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.7s ease 0.55s',
        }}>
          <div style={{
            fontSize: '0.5rem',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            opacity: 0.7,
            marginBottom: '1rem',
          }}>
            {t('guarantees_title')}
          </div>
          <div className="how-guarantees">
            {GUARANTEES.map((g, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem' }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0, marginTop: '2px' }}>
                  <path d="M2 6L5 9L10 3" stroke="rgba(212,165,60,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ fontSize: '0.8125rem', color: 'var(--ivory-dim)', lineHeight: 1.5 }}>{g}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance clause note */}
        <div style={{
          marginTop: '1.5rem',
          padding: 'clamp(1.25rem, 2.5vw, 1.75rem) clamp(1.5rem, 4vw, 2.5rem)',
          borderLeft: '3px solid var(--gold)',
          background: 'rgba(212,165,60,0.03)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.7s ease 0.65s',
        }}>
          <div style={{
            fontSize: '0.5rem',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            opacity: 0.7,
            marginBottom: '0.625rem',
          }}>
            {t('compliance_title')}
          </div>
          <p style={{ fontSize: '0.8125rem', color: 'var(--ivory-dim)', lineHeight: 1.75, margin: 0 }}>
            {t('compliance_body')}
          </p>
        </div>
      </div>

      <style>{`
        .how-steps-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1.5px;
          background: rgba(212,165,60,0.08);
        }
        .how-step-card {
          background: var(--navy);
          padding: clamp(1.25rem, 2.5vw, 1.75rem);
          border-top: 2px solid transparent;
          transition: border-top-color 0.25s ease, background 0.25s ease;
          position: relative;
        }
        .how-step-card:hover {
          background: var(--navy-mid);
          border-top-color: var(--gold);
        }
        .how-guarantees {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
        }
        .how-header {
          grid-template-columns: 1fr auto;
        }
        @media (max-width: 1100px) {
          .how-steps-grid { grid-template-columns: repeat(4, 1fr); }
        }
        @media (max-width: 860px) {
          .how-steps-grid { grid-template-columns: repeat(2, 1fr); }
          .how-guarantees { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .how-steps-grid { grid-template-columns: 1fr 1fr; }
          .how-guarantees { grid-template-columns: 1fr; }
          .how-header { grid-template-columns: 1fr !important; }
          .how-header > div:last-child p { text-align: left !important; }
        }
        @media (max-width: 400px) {
          .how-steps-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
