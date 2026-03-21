'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

function useInView(threshold = 0.1) {
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

export default function LeadershipSection() {
  const t = useTranslations('leadership');
  const locale = useLocale();
  const { ref, inView } = useInView();

  const tags = [
    t('osvaldo_tag1'),
    t('osvaldo_tag2'),
    t('osvaldo_tag3'),
    t('osvaldo_tag4'),
  ];

  const honors = [
    { text: t('honor1'), year: '2018' },
    { text: t('honor2'), year: '2016' },
    { text: t('honor3'), year: '2014' },
    { text: t('honor4'), year: '2013' },
    { text: t('honor5'), year: '2012' },
    { text: t('honor6'), year: '2011' },
    { text: t('honor7'), year: '2010' },
  ];

  const highlights = [
    { value: '30+', label: t('highlight1_label') },
    { value: '1',   label: t('highlight2_label') },
    { value: '7+',  label: t('highlight3_label') },
  ];

  return (
    <section
      ref={ref}
      className="section"
      id="leadership"
      style={{
        background: 'var(--navy)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow top-right */}
      <div style={{
        position: 'absolute',
        top: '-15%',
        right: '-10%',
        width: '900px',
        height: '900px',
        background: 'radial-gradient(circle, rgba(196,150,58,0.07) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Ambient glow bottom-left */}
      <div style={{
        position: 'absolute',
        bottom: '-20%',
        left: '-10%',
        width: '700px',
        height: '700px',
        background: 'radial-gradient(circle, rgba(196,150,58,0.04) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Fine grid overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(201,168,76,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(201,168,76,0.025) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      <div className="container">

        {/* ─── Section Header ──────────────────────────────────────── */}
        <div style={{
          textAlign: 'center',
          marginBottom: 'clamp(4rem, 8vw, 7rem)',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '1.25rem' }}>
            {t('tag')}
          </span>
          <span className="gold-rule" style={{ margin: '0 auto 1.5rem', display: 'block' }} />
          <h2 className="section-headline">{t('headline')}</h2>
        </div>

        {/* ─── Hero Bio Layout ─────────────────────────────────────── */}
        <div
          className="leader-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '480px 1fr',
            gap: 'clamp(3rem, 6vw, 6rem)',
            alignItems: 'start',
          }}
        >

          {/* ── LEFT: Photo Column ────────────────────────────────── */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s',
            }}
          >
            {/* Photo frame */}
            <div style={{ position: 'relative' }}>
              {/* Gold corner decorations */}
              {['top-left', 'bottom-right'].map((pos) => (
                <div key={pos} style={{
                  position: 'absolute',
                  ...(pos === 'top-left' ? { top: '-12px', left: '-12px' } : { bottom: '-12px', right: '-12px' }),
                  width: '60px',
                  height: '60px',
                  ...(pos === 'top-left'
                    ? { borderTop: '2px solid var(--gold)', borderLeft: '2px solid var(--gold)' }
                    : { borderBottom: '2px solid var(--gold)', borderRight: '2px solid var(--gold)' }),
                  zIndex: 2,
                }} />
              ))}

              {/* Semi-transparent gold frame */}
              <div style={{
                position: 'absolute',
                inset: '0',
                border: '1px solid rgba(196,150,58,0.25)',
                zIndex: 2,
                pointerEvents: 'none',
              }} />

              {/* Gold gradient overlay at bottom */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '45%',
                background: 'linear-gradient(to top, rgba(5,7,13,0.85) 0%, transparent 100%)',
                zIndex: 3,
                pointerEvents: 'none',
              }} />

              {/* Photo */}
              <div style={{
                position: 'relative',
                aspectRatio: '3/4',
                overflow: 'hidden',
                background: 'var(--navy-mid)',
              }}>
                <Image
                  src="/osvaldo_ceo.png"
                  alt="Osvaldo Matos de Melo Júnior — CEO & Fundador da BM5"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                  priority
                />
              </div>

              {/* Name over photo bottom */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '2rem 2rem',
                zIndex: 4,
              }}>
                <span className="eyebrow" style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.9 }}>
                  {t('osvaldo_title')}
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.375rem, 2.5vw, 1.75rem)',
                  fontWeight: 500,
                  color: 'var(--ivory)',
                  lineHeight: 1.15,
                }}>
                  {t('osvaldo_name')}
                </h3>
              </div>
            </div>

            {/* Expertise tags below photo */}
            <div style={{
              marginTop: '1.75rem',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}>
              {tags.map((tag, i) => (
                <span key={i} style={{
                  fontSize: '0.625rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  border: '1px solid rgba(196,150,58,0.3)',
                  padding: '0.4rem 0.875rem',
                  background: 'rgba(196,150,58,0.05)',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Content Column ─────────────────────────────── */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateX(0)' : 'translateX(40px)',
            transition: 'opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s',
          }}>

            {/* Key metrics */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0',
              borderTop: '1px solid rgba(196,150,58,0.15)',
              borderBottom: '1px solid rgba(196,150,58,0.15)',
              marginBottom: '3rem',
            }}>
              {highlights.map((h, i) => (
                <div key={i} style={{
                  padding: '1.5rem 1.25rem',
                  borderRight: i < highlights.length - 1 ? '1px solid rgba(196,150,58,0.15)' : 'none',
                  textAlign: 'center',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                    fontWeight: 400,
                    color: 'var(--gold)',
                    lineHeight: 1,
                    marginBottom: '0.5rem',
                  }}>
                    {h.value}
                  </div>
                  <div style={{
                    fontSize: '0.625rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--ivory-dim)',
                    lineHeight: 1.4,
                  }}>
                    {h.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Bio */}
            <p style={{
              fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
              color: 'var(--ivory-mid)',
              lineHeight: 1.9,
              marginBottom: '2.5rem',
              borderLeft: '2px solid var(--gold)',
              paddingLeft: '1.75rem',
            }}>
              {t('osvaldo_bio')}
            </p>

            {/* Honors Section */}
            <div style={{ marginBottom: '3rem' }}>
              <p className="eyebrow" style={{ marginBottom: '1.5rem' }}>
                {t('honors_title')}
              </p>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0',
                border: '1px solid rgba(196,150,58,0.1)',
              }}>
                {honors.map((honor, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      gap: '1.5rem',
                      alignItems: 'center',
                      padding: '0.875rem 1.25rem',
                      borderBottom: i < honors.length - 1 ? '1px solid rgba(196,150,58,0.08)' : 'none',
                      transition: 'background 0.2s ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(196,150,58,0.04)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <span style={{
                      color: 'var(--gold)',
                      fontSize: '0.4rem',
                      flexShrink: 0,
                    }}>◆</span>
                    <span style={{
                      fontSize: '0.8125rem',
                      color: 'var(--ivory-mid)',
                      lineHeight: 1.5,
                      flex: 1,
                    }}>
                      {honor.text}
                    </span>
                    <span style={{
                      fontSize: '0.625rem',
                      letterSpacing: '0.1em',
                      color: 'rgba(196,150,58,0.4)',
                      flexShrink: 0,
                      fontFamily: 'var(--font-display)',
                    }}>
                      {honor.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Link href={`/${locale}/contact`} className="btn-primary" style={{ width: 'fit-content' }}>
              {t('cta')}
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M1 5H13M9 1L13 5L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </Link>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 1024px) {
          .leader-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
