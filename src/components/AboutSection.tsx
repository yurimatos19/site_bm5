'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

function useInView2(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
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
  const tp = useTranslations('presence');
  const locale = useLocale();
  const { ref, inView } = useInView();
  const { ref: pillarsRef, inView: pillarsInView } = useInView2();

  const pillars = [
    {
      icon: (
        <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
          <path d="M14 3L25 8V14C25 19.5 19.8 24.4 14 26C8.2 24.4 3 19.5 3 14V8L14 3Z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
          <path d="M10 14L13 17L18 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      tag: tp('mission_tag'), title: tp('mission_title'), text: tp('mission_text'),
    },
    {
      icon: (
        <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="5" stroke="currentColor" strokeWidth="1.2"/>
          <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 2"/>
          <path d="M14 4V7M14 21V24M4 14H7M21 14H24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      ),
      tag: tp('vision_tag'), title: tp('vision_title'), text: tp('vision_text'),
    },
    {
      icon: (
        <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
          <rect x="8" y="14" width="3.5" height="9" rx="0.5" stroke="currentColor" strokeWidth="1.2"/>
          <rect x="12.5" y="10" width="3.5" height="13" rx="0.5" stroke="currentColor" strokeWidth="1.2"/>
          <rect x="17" y="6" width="3.5" height="17" rx="0.5" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M6 23H22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      ),
      tag: tp('values_tag'), title: tp('values_title'), text: tp('values_text'),
    },
  ];

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
            {/* Photo strip */}
            <div style={{ height: '200px', overflow: 'hidden', position: 'relative', marginBottom: '1.5rem', borderRadius: '2px' }}>
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: "url('/grain-field.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to bottom, rgba(6,13,26,0.1) 0%, rgba(6,13,26,0.6) 100%)',
              }} />
              <div style={{
                position: 'absolute', bottom: '1rem', left: '1.25rem',
                fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.2em',
                textTransform: 'uppercase', color: 'rgba(196,150,58,0.8)',
              }}>
                Agronegócio Brasileiro · Origem Certificada
              </div>
            </div>
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

      {/* ── Missão / Visão / Valores ── */}
      <div
        ref={pillarsRef}
        style={{
          borderTop: '1px solid rgba(196,150,58,0.1)',
          marginTop: 'clamp(3rem, 6vw, 5rem)',
          paddingTop: 'clamp(3rem, 5vw, 4.5rem)',
        }}
      >
        <div className="container">
          <div style={{
            textAlign: 'center',
            marginBottom: 'clamp(2rem, 4vw, 3rem)',
            opacity: pillarsInView ? 1 : 0,
            transform: pillarsInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}>
            <span className="eyebrow" style={{ justifyContent: 'center' }}>{tp('pillars_tag')}</span>
            <h2 className="section-headline" style={{ marginTop: '0.75rem' }}>{tp('pillars_headline')}</h2>
          </div>
          <div className="ab-pillars-grid">
            {pillars.map((p, i) => (
              <div key={i} className="ab-pillar-card" style={{
                opacity: pillarsInView ? 1 : 0,
                transform: pillarsInView ? 'translateY(0)' : 'translateY(28px)',
                transition: `opacity 0.65s ease ${0.1 + i * 0.13}s, transform 0.65s ease ${0.1 + i * 0.13}s`,
              }}>
                <div style={{ color: 'var(--gold)', marginBottom: '1.1rem', opacity: 0.85 }}>{p.icon}</div>
                <div style={{
                  fontSize: '0.5rem', fontWeight: 700, letterSpacing: '0.25em',
                  textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.5rem', opacity: 0.7,
                }}>
                  {p.tag}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.25rem, 2.2vw, 1.625rem)',
                  fontWeight: 500, letterSpacing: '-0.01em',
                  marginBottom: '0.875rem', lineHeight: 1.15,
                }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--ivory-dim)', lineHeight: 1.8 }}>{p.text}</p>
                <div style={{
                  marginTop: '1.5rem', height: '1px',
                  background: 'linear-gradient(90deg, var(--gold-dim), transparent)', opacity: 0.45,
                }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
        .ab-pillars-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1rem, 2vw, 1.75rem);
        }
        .ab-pillar-card {
          padding: clamp(1.5rem, 2.5vw, 2.25rem);
          border: 1px solid rgba(196,150,58,0.1);
          border-left: 2px solid rgba(196,150,58,0.2);
          border-radius: 4px;
          background: rgba(255,255,255,0.018);
          transition: border-left-color 0.25s ease, background 0.25s ease;
        }
        .ab-pillar-card:hover {
          border-left-color: var(--gold);
          background: rgba(196,150,58,0.04);
        }
        @media (max-width: 900px) {
          .ab-pillars-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
