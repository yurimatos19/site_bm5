'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

/* ─── Animated counter ───────────────────────────────────────────────────── */
function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}</span>;
}

/* ─── Ticker ─────────────────────────────────────────────────────────────── */
const TICKER_ITEMS = [
  'Sugar ICUMSA 45',
  'VHP 600/1200',
  'Soybeans GMO & NGMO',
  'Yellow Corn',
  'Chicken Paws',
  'BCL · SBLC · DLC',
  'MT760 · MT700',
  'KYC / CIS Compliance',
  'Brazilian Origin',
  'Comércio Exterior',
  'Inteligência Competitiva',
  'Ouro · Terras Raras',
];

/* ─── Abstract globe canvas ──────────────────────────────────────────────── */
function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let W = 0, H = 0;

    const GOLD = 'rgba(201,168,76,';
    const NODE_COUNT = 52;

    type Node = { x: number; y: number; vx: number; vy: number; r: number; pulse: number; phase: number };
    let nodes: Node[] = [];

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * devicePixelRatio;
      canvas.height = H * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
      // Scatter nodes across right 60% of canvas
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: W * 0.35 + Math.random() * W * 0.65,
        y: H * 0.05 + Math.random() * H * 0.9,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: 1.2 + Math.random() * 2,
        pulse: 0,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, W, H);

      // Subtle radial glow — top-right
      const grad = ctx.createRadialGradient(W * 0.75, H * 0.3, 0, W * 0.75, H * 0.3, W * 0.55);
      grad.addColorStop(0, 'rgba(201,168,76,0.055)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 160;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.18;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `${GOLD}${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((n, i) => {
        const glow = 0.35 + 0.28 * Math.sin(t / 1800 + n.phase);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `${GOLD}${glow})`;
        ctx.fill();

        // Pulse ring on a few nodes
        if (i % 9 === 0) {
          const ring = ((t / 40 + i * 30) % 80);
          const ringAlpha = (1 - ring / 80) * 0.18;
          ctx.beginPath();
          ctx.arc(n.x, n.y, ring * 0.35, 0, Math.PI * 2);
          ctx.strokeStyle = `${GOLD}${ringAlpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }

        // Drift
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < W * 0.3 || n.x > W * 1.02) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      });

      // Horizontal data lines (top-right quadrant)
      const lineY = [H * 0.22, H * 0.45, H * 0.68];
      lineY.forEach(ly => {
        const offset = ((t / 14) % W);
        ctx.beginPath();
        ctx.moveTo(W * 0.38, ly);
        ctx.lineTo(W, ly);
        ctx.strokeStyle = `${GOLD}0.04)`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Moving highlight
        ctx.beginPath();
        ctx.moveTo(W * 0.38 + offset * 0.3, ly);
        ctx.lineTo(W * 0.38 + offset * 0.3 + 90, ly);
        ctx.strokeStyle = `${GOLD}0.22)`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      });

      animId = requestAnimationFrame(t => draw(t));
    };

    resize();
    window.addEventListener('resize', resize);
    animId = requestAnimationFrame(t => draw(t));
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: 0.7,
        zIndex: 2,
      }}
    />
  );
}

/* ─── Hero ───────────────────────────────────────────────────────────────── */
export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Ticker */}
      <div className="ticker-wrap" style={{ marginTop: '5rem' }}>
        <div className="ticker-inner animate-ticker">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="ticker-item">
              {item}
              <span style={{ marginLeft: '4rem', color: 'var(--gold-dim)' }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        paddingTop: '4rem',
        paddingBottom: '6rem',
        overflow: 'hidden',
      }}>
        {/* Port photo background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('/hero-port.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 60%',
          zIndex: 0,
        }} />
        {/* Dark overlay over photo */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(6,13,26,0.92) 0%, rgba(6,13,26,0.78) 50%, rgba(6,13,26,0.65) 100%)',
          zIndex: 0,
        }} />
        {/* Grid background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          pointerEvents: 'none',
          zIndex: 1,
        }} />

        {/* Animated globe / network canvas */}
        <GlobeCanvas />

        {/* Left edge fade — keeps text legible */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: '50%',
          background: 'linear-gradient(to right, rgba(6,13,26,0.6) 55%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 3,
        }} />

        {/* Vertical gold accent line */}
        <div style={{
          position: 'absolute',
          left: 'calc((100% - min(1360px, 100% - 4rem)) / 2)',
          top: '10%',
          bottom: '10%',
          width: '1px',
          background: 'linear-gradient(to bottom, transparent, var(--gold-dim) 20%, var(--gold-dim) 80%, transparent)',
          opacity: 0.4,
          pointerEvents: 'none',
          zIndex: 3,
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 4 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '4rem',
            alignItems: 'center',
          }}>
            {/* Left: Text */}
            <div>
              {/* Eyebrow */}
              <div style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '2rem',
              }}>
                <span className="eyebrow">{t('tag')}</span>
                <span style={{ display: 'inline-block', width: '40px', height: '1px', background: 'var(--gold)' }} />
              </div>

              {/* Headline */}
              <h1
                className="display"
                style={{
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? 'translateY(0)' : 'translateY(24px)',
                  transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
                }}
              >
                <span style={{ display: 'block', color: 'var(--ivory)' }}>{t('headline1')}</span>
                <span style={{ display: 'block', color: 'var(--ivory-dim)', fontWeight: 300 }}>{t('headline2')}</span>
                <span style={{
                  display: 'block',
                  color: 'transparent',
                  WebkitTextStroke: '1px var(--gold)',
                  fontStyle: 'italic',
                }}>
                  {t('headline3')}
                </span>
              </h1>

              {/* Sub */}
              <p style={{
                marginTop: '2rem',
                fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
                color: 'var(--ivory-dim)',
                maxWidth: '560px',
                lineHeight: 1.8,
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
              }}>
                {t('sub')}
              </p>

              {/* Trust line — text only, no photo */}
              <div style={{
                marginTop: '1.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                opacity: loaded ? 1 : 0,
                transition: 'opacity 0.7s ease 0.25s',
              }}>
                {/* Gold diamond icon instead of photo */}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                  <rect x="8" y="1" width="9" height="9" rx="0.5" transform="rotate(45 8 1)" stroke="rgba(196,150,58,0.7)" strokeWidth="1" fill="none"/>
                  <rect x="8" y="4" width="4" height="4" rx="0.5" transform="rotate(45 8 4)" fill="rgba(196,150,58,0.3)"/>
                </svg>
                <p style={{ fontSize: '0.75rem', color: 'rgba(196,150,58,0.7)', letterSpacing: '0.05em' }}>
                  {t('ceo_trust')}
                </p>
              </div>

              {/* CTAs */}
              <div style={{
                marginTop: '2.5rem',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s',
              }}>
                <Link href={`/${locale}/about`} className="btn-primary">
                  {t('cta_primary')}
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                    <path d="M1 5H13M9 1L13 5L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </Link>
                <Link href={`/${locale}/contact`} className="btn-ghost">
                  {t('cta_secondary')}
                </Link>
              </div>

              {/* Mobile stats row */}
              <div className="mobile-hero-stats" style={{
                marginTop: '2.5rem',
                display: 'none',
                gridTemplateColumns: 'repeat(3, 1fr)',
                borderTop: '1px solid rgba(196,150,58,0.15)',
                borderBottom: '1px solid rgba(196,150,58,0.15)',
                opacity: loaded ? 1 : 0,
                transition: 'opacity 0.8s ease 0.5s',
              }}>
                {[
                  { value: t('stat1_value'), label: t('stat1_label') },
                  { value: t('stat2_value'), label: t('stat2_label') },
                  { value: t('stat3_value'), label: t('stat3_label') },
                ].map((stat, i) => (
                  <div key={i} style={{
                    padding: '1.25rem 0.5rem',
                    textAlign: 'center',
                    borderRight: i < 2 ? '1px solid rgba(196,150,58,0.15)' : 'none',
                  }}>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.75rem, 6vw, 2.5rem)',
                      fontWeight: 300,
                      color: 'var(--ivory)',
                      lineHeight: 1,
                      letterSpacing: '-0.03em',
                    }}>
                      {stat.value}
                    </div>
                    <div style={{
                      fontSize: '0.5625rem',
                      fontWeight: 500,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--ivory-dim)',
                      marginTop: '0.4rem',
                      lineHeight: 1.3,
                    }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Stats */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2.5rem',
                opacity: loaded ? 1 : 0,
                transition: 'opacity 0.8s ease 0.4s',
              }}
              className="hero-stats"
            >
              {[
                { value: t('stat1_value'), label: t('stat1_label'), numeric: 30 },
                { value: t('stat2_value'), label: t('stat2_label'), numeric: 7 },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: 'right', position: 'relative' }}>
                  <div style={{
                    position: 'absolute', right: '-1.5rem', top: 0, bottom: 0,
                    width: '1px',
                    background: 'linear-gradient(to bottom, var(--gold-dim), transparent)',
                  }} />
                  <div className="stat-value">
                    <AnimatedCounter target={stat.numeric} />
                    {stat.value.includes('+') ? '+' : ''}
                  </div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
              <div style={{ textAlign: 'right', position: 'relative' }}>
                <div style={{
                  position: 'absolute', right: '-1.5rem', top: 0, bottom: 0,
                  width: '1px',
                  background: 'linear-gradient(to bottom, var(--gold-dim), transparent)',
                }} />
                <div className="stat-value">100%</div>
                <div className="stat-label">{t('stat3_label')}</div>
              </div>
            </div>
          </div>

          {/* Bottom divider */}
          <div style={{
            marginTop: '5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.8s ease 0.5s',
          }}>
            <span className="gold-rule-full" />
            <span style={{
              fontSize: '0.6875rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--gold-dim)',
              whiteSpace: 'nowrap',
            }}>
              Recife · Pernambuco · Brasil
            </span>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .hero-stats { display: none !important; }
          .mobile-hero-stats { display: grid !important; }
        }
      `}</style>
    </>
  );
}
