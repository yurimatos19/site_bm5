'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

function useInView(threshold = 0.2) {
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

export default function AboutSection() {
  const t = useTranslations('about');
  const locale = useLocale();
  const { ref, inView } = useInView();

  const features = [
    { icon: '◈', title: t('feature1_title'), desc: t('feature1_desc') },
    { icon: '◫', title: t('feature2_title'), desc: t('feature2_desc') },
    { icon: '◎', title: t('feature3_title'), desc: t('feature3_desc') },
  ];

  return (
    <section
      ref={ref}
      className="section"
      style={{
        background: 'var(--navy-mid)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative bg text */}
      <div style={{
        position: 'absolute',
        bottom: '-2rem',
        left: '-1rem',
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(6rem, 15vw, 16rem)',
        fontWeight: 700,
        color: 'rgba(201,168,76,0.03)',
        lineHeight: 1,
        pointerEvents: 'none',
        userSelect: 'none',
        letterSpacing: '-0.05em',
      }}>
        BM5
      </div>

      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(3rem, 6vw, 7rem)',
          alignItems: 'center',
        }}
        className="about-grid"
        >
          {/* Left */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateX(0)' : 'translateX(-30px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}>
            <span className="eyebrow" style={{ marginBottom: '1.5rem', display: 'block' }}>
              {t('tag')}
            </span>
            <span className="gold-rule" style={{ display: 'block', marginBottom: '1.5rem' }} />
            <h2 className="section-headline" style={{ marginBottom: '1.75rem' }}>
              {t('headline')}
            </h2>
            <p style={{ color: 'var(--ivory-dim)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
              {t('body1')}
            </p>
            <p style={{ color: 'var(--ivory-dim)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
              {t('body2')}
            </p>
            <Link href={`/${locale}/about`} className="btn-ghost">
              {t('cta')}
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M1 5H13M9 1L13 5L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </Link>
          </div>

          {/* Right: Feature cards */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}>
            {features.map((f, i) => (
              <div
                key={i}
                className="card bracket"
                style={{
                  padding: '1.75rem',
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateX(0)' : 'translateX(30px)',
                  transition: `opacity 0.7s ease ${0.1 + i * 0.12}s, transform 0.7s ease ${0.1 + i * 0.12}s`,
                }}
              >
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <span style={{
                    color: 'var(--gold)',
                    fontSize: '1.25rem',
                    lineHeight: 1,
                    flexShrink: 0,
                    marginTop: '2px',
                  }}>
                    {f.icon}
                  </span>
                  <div>
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.125rem',
                      fontWeight: 500,
                      marginBottom: '0.5rem',
                    }}>
                      {f.title}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--ivory-dim)', lineHeight: 1.7 }}>
                      {f.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
