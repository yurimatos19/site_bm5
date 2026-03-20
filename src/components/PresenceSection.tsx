'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

/* ─── Animated counter ───────────────────────────────────────────────────── */
function Counter({ target, duration = 2200 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref   = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const start = Date.now();
          const tick = () => {
            const elapsed  = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased    = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count.toLocaleString('pt-BR')}</span>;
}

/* ─── PresenceSection ────────────────────────────────────────────────────── */
export default function PresenceSection() {
  const t = useTranslations('presence');
  const pillarsRef = useRef<HTMLDivElement>(null);
  const [pillarsVisible, setPillarsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setPillarsVisible(true); },
      { threshold: 0.15 }
    );
    if (pillarsRef.current) observer.observe(pillarsRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: 5,  suffix: '',    label: t('stat_ports_label'),    note: t('stat_ports_note')    },
    { value: 40, suffix: '+',   label: t('stat_countries_label'), note: t('stat_countries_note') },
    { value: 50, suffix: 'k+',  label: t('stat_volume_label'),   note: t('stat_volume_note')   },
    { value: 30, suffix: '+',   label: t('stat_years_label'),    note: t('stat_years_note')    },
  ];

  const pillars = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M14 3L25 8V14C25 19.5 19.8 24.4 14 26C8.2 24.4 3 19.5 3 14V8L14 3Z"
            stroke="currentColor" strokeWidth="1.2" fill="none"/>
          <path d="M10 14L13 17L18 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      tag:   t('mission_tag'),
      title: t('mission_title'),
      text:  t('mission_text'),
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="5" stroke="currentColor" strokeWidth="1.2"/>
          <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 2"/>
          <path d="M14 4V7M14 21V24M4 14H7M21 14H24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      ),
      tag:   t('vision_tag'),
      title: t('vision_title'),
      text:  t('vision_text'),
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect x="8" y="14" width="3.5" height="9" rx="0.5" stroke="currentColor" strokeWidth="1.2"/>
          <rect x="12.5" y="10" width="3.5" height="13" rx="0.5" stroke="currentColor" strokeWidth="1.2"/>
          <rect x="17" y="6" width="3.5" height="17" rx="0.5" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M6 23H22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      ),
      tag:   t('values_tag'),
      title: t('values_title'),
      text:  t('values_text'),
    },
  ];

  return (
    <section style={{
      background: 'var(--navy-mid)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* ── Decorative top border ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(196,150,58,0.35) 30%, rgba(196,150,58,0.35) 70%, transparent)',
      }} />

      {/* ── Stats Band ── */}
      <div style={{
        borderBottom: '1px solid rgba(196,150,58,0.1)',
        padding: 'clamp(2.5rem, 5vw, 4rem) 0',
      }}>
        <div className="container">
          <div className="presence-stats-grid">
            {stats.map((s, i) => (
              <div key={i} className="presence-stat-item">
                {/* Vertical separator */}
                {i > 0 && (
                  <div style={{
                    position: 'absolute', left: 0, top: '10%', bottom: '10%',
                    width: '1px',
                    background: 'linear-gradient(to bottom, transparent, rgba(196,150,58,0.25) 30%, rgba(196,150,58,0.25) 70%, transparent)',
                  }} />
                )}

                {/* Value */}
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3rem, 5.5vw, 5rem)',
                  fontWeight: 300,
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  color: 'var(--ivory)',
                }}>
                  <Counter target={s.value} /><span style={{ color: 'var(--gold)' }}>{s.suffix}</span>
                </div>

                {/* Label */}
                <div style={{
                  marginTop: '0.625rem',
                  fontSize: '0.625rem',
                  fontWeight: 600,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--ivory-dim)',
                }}>
                  {s.label}
                </div>

                {/* Note */}
                <div style={{
                  marginTop: '0.375rem',
                  fontSize: '0.6875rem',
                  color: 'rgba(196,150,58,0.55)',
                  letterSpacing: '0.04em',
                }}>
                  {s.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Pillars: Missão / Visão / Valores ── */}
      <div
        ref={pillarsRef}
        style={{ padding: 'clamp(3rem, 6vw, 5rem) 0' }}
      >
        <div className="container">
          {/* Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: 'clamp(2rem, 4vw, 3.5rem)',
            opacity: pillarsVisible ? 1 : 0,
            transform: pillarsVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}>
            <span className="eyebrow" style={{ justifyContent: 'center' }}>
              {t('pillars_tag')}
            </span>
            <h2 className="section-headline" style={{ marginTop: '1rem' }}>
              {t('pillars_headline')}
            </h2>
          </div>

          {/* Cards */}
          <div className="presence-pillars-grid">
            {pillars.map((p, i) => (
              <div
                key={i}
                className="card bracket"
                style={{
                  padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                  opacity: pillarsVisible ? 1 : 0,
                  transform: pillarsVisible ? 'translateY(0)' : 'translateY(32px)',
                  transition: `opacity 0.7s ease ${0.1 + i * 0.15}s, transform 0.7s ease ${0.1 + i * 0.15}s`,
                }}
              >
                {/* Icon */}
                <div style={{
                  color: 'var(--gold)',
                  marginBottom: '1.25rem',
                  opacity: 0.85,
                }}>
                  {p.icon}
                </div>

                {/* Tag */}
                <div style={{
                  fontSize: '0.5625rem',
                  fontWeight: 700,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  marginBottom: '0.625rem',
                  opacity: 0.75,
                }}>
                  {p.tag}
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.375rem, 2.5vw, 1.75rem)',
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                  marginBottom: '1rem',
                  lineHeight: 1.15,
                }}>
                  {p.title}
                </h3>

                {/* Text */}
                <p style={{
                  fontSize: '0.9375rem',
                  color: 'var(--ivory-dim)',
                  lineHeight: 1.8,
                }}>
                  {p.text}
                </p>

                {/* Bottom accent line */}
                <div style={{
                  marginTop: '1.75rem',
                  height: '1px',
                  background: 'linear-gradient(90deg, var(--gold-dim), transparent)',
                  opacity: 0.5,
                }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom border ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(196,150,58,0.2) 50%, transparent)',
      }} />

      <style>{`
        .presence-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
        }
        .presence-stat-item {
          position: relative;
          padding: 1.5rem 2rem;
          text-align: center;
          transition: background 0.3s ease;
        }
        .presence-stat-item:hover {
          background: rgba(196,150,58,0.03);
        }
        .presence-pillars-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1rem, 2vw, 1.75rem);
        }
        @media (max-width: 900px) {
          .presence-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .presence-pillars-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .presence-stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </section>
  );
}
