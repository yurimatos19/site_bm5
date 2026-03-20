'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const PILLAR_ICONS = [
  // KYC
  <svg key="kyc" width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect x="4" y="4" width="20" height="20" rx="1" stroke="currentColor" strokeWidth="1"/>
    <path d="M14 10C11.791 10 10 11.791 10 14C10 16.209 11.791 18 14 18C16.209 18 18 16.209 18 14C18 11.791 16.209 10 14 10Z" stroke="currentColor" strokeWidth="1"/>
    <path d="M8 22C8 19.791 10.686 18 14 18C17.314 18 20 19.791 20 22" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
  </svg>,
  // Docs
  <svg key="docs" width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M8 4H17L22 9V24H8V4Z" stroke="currentColor" strokeWidth="1"/>
    <path d="M17 4V9H22" stroke="currentColor" strokeWidth="1"/>
    <path d="M11 13H19M11 17H19M11 21H15" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
  </svg>,
  // Banking
  <svg key="bank" width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M4 10H24M4 10L14 4L24 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="6" y="10" width="3" height="12" stroke="currentColor" strokeWidth="1"/>
    <rect x="12.5" y="10" width="3" height="12" stroke="currentColor" strokeWidth="1"/>
    <rect x="19" y="10" width="3" height="12" stroke="currentColor" strokeWidth="1"/>
    <path d="M3 22H25" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
  </svg>,
  // Network
  <svg key="network" width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="3" stroke="currentColor" strokeWidth="1"/>
    <circle cx="5" cy="8" r="2" stroke="currentColor" strokeWidth="1"/>
    <circle cx="23" cy="8" r="2" stroke="currentColor" strokeWidth="1"/>
    <circle cx="5" cy="20" r="2" stroke="currentColor" strokeWidth="1"/>
    <circle cx="23" cy="20" r="2" stroke="currentColor" strokeWidth="1"/>
    <path d="M11 13L7 9M17 13L21 9M11 15L7 19M17 15L21 19" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
  </svg>,
];

export default function ComplianceSection() {
  const t = useTranslations('compliance');
  const { ref, inView } = useInView();

  const pillars = [
    { icon: PILLAR_ICONS[0], title: t('kyc_title'), desc: t('kyc_desc') },
    { icon: PILLAR_ICONS[1], title: t('docs_title'), desc: t('docs_desc') },
    { icon: PILLAR_ICONS[2], title: t('banking_title'), desc: t('banking_desc') },
    { icon: PILLAR_ICONS[3], title: t('network_title'), desc: t('network_desc') },
  ];

  const flowSteps = [
    t('flow1'), t('flow2'), t('flow3'), t('flow4'),
    t('flow5'), t('flow6'), t('flow7'),
  ];

  return (
    <section
      ref={ref}
      className="section"
      style={{ background: 'var(--navy)', position: 'relative', overflow: 'hidden' }}
    >
      {/* BG large text */}
      <div style={{
        position: 'absolute',
        top: '50%',
        right: '-3rem',
        transform: 'translateY(-50%) rotate(90deg)',
        fontFamily: 'var(--font-display)',
        fontSize: '14rem',
        fontWeight: 700,
        color: 'rgba(201,168,76,0.025)',
        lineHeight: 1,
        pointerEvents: 'none',
        userSelect: 'none',
        letterSpacing: '-0.05em',
        whiteSpace: 'nowrap',
      }}>
        COMPLIANCE
      </div>

      <div className="container">
        {/* Header */}
        <div style={{
          maxWidth: '640px',
          marginBottom: 'clamp(3rem, 6vw, 5rem)',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '1rem' }}>{t('tag')}</span>
          <span className="gold-rule" style={{ display: 'block', marginBottom: '1.25rem' }} />
          <h2 className="section-headline" style={{ marginBottom: '1.25rem' }}>{t('headline')}</h2>
          <p style={{ fontSize: '1rem', color: 'var(--ivory-dim)', lineHeight: 1.8 }}>{t('sub')}</p>
        </div>

        {/* Pillars grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1px',
          background: 'rgba(201,168,76,0.08)',
          marginBottom: '4rem',
        }}>
          {pillars.map((pillar, i) => (
            <div
              key={i}
              style={{
                background: 'var(--navy)',
                padding: '2rem',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.7s ease ${i * 0.1}s, transform 0.7s ease ${i * 0.1}s`,
              }}
            >
              <div style={{ color: 'var(--gold)', marginBottom: '1.25rem' }}>
                {pillar.icon}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 500,
                marginBottom: '0.75rem',
              }}>
                {pillar.title}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--ivory-dim)', lineHeight: 1.75 }}>
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Flow */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '240px 1fr',
          gap: '4rem',
          alignItems: 'flex-start',
          opacity: inView ? 1 : 0,
          transition: 'opacity 0.8s ease 0.4s',
        }}
        className="flow-grid"
        >
          <div>
            <p className="eyebrow" style={{ marginBottom: '1.25rem' }}>{t('flow_title')}</p>
            <div style={{
              width: '1px',
              height: '80px',
              background: 'linear-gradient(to bottom, var(--gold), transparent)',
            }} />
          </div>
          <div>
            {flowSteps.map((step, i) => (
              <div key={i} className="flow-step">
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.75rem',
                  color: 'var(--gold)',
                  letterSpacing: '0.1em',
                  flexShrink: 0,
                  minWidth: '2rem',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ fontSize: '0.9375rem', color: 'var(--ivory-dim)', lineHeight: 1.6 }}>
                  {step.replace(/^0\d\. /, '')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .flow-grid { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
        }
      `}</style>
    </section>
  );
}
