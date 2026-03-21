'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

/* ─── Animated counter ───────────────────────────────────────────────────── */
function Counter({ target, duration = 2200 }: { target: number; duration?: number }) {
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
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count.toLocaleString('pt-BR')}</span>;
}

/* ─── Icons ──────────────────────────────────────────────────────────────── */
const IconPort = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M16 4V12M16 12C16 12 8 14 6 20H26C24 14 16 12 16 12Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 24H28M8 24V28M24 24V28" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    <circle cx="16" cy="7" r="2" stroke="currentColor" strokeWidth="1.3"/>
  </svg>
);

const IconGlobe = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M16 5C16 5 12 10 12 16C12 22 16 27 16 27" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M16 5C16 5 20 10 20 16C20 22 16 27 16 27" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M5 16H27M6 11H26M6 21H26" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
  </svg>
);

const IconContainer = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="4" y="10" width="24" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M12 10V24M20 10V24M4 17H28" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
    <path d="M8 6H24L28 10H4L8 6Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
  </svg>
);

const IconYears = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M16 9V16L21 19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="16" cy="16" r="1.5" fill="currentColor"/>
  </svg>
);

/* ─── PresenceSection ────────────────────────────────────────────────────── */
export default function PresenceSection() {
  const t = useTranslations('presence');

  const portsRef = useRef<HTMLDivElement>(null);
  const [portsVisible, setPortsVisible] = useState(true);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setPortsVisible(true); }, { threshold: 0.1 });
    if (portsRef.current) obs.observe(portsRef.current);
    return () => obs.disconnect();
  }, []);

  const statsGlobal = [
    { icon: <IconGlobe />,     value: 40,  suffix: '+',  label: 'Países Atendidos',     note: 'Presença global ativa'        },
    { icon: <IconPort />,      value: 5,   suffix: '',   label: 'Portos Operados',      note: 'Do Nordeste ao Sul do Brasil' },
    { icon: <IconYears />,     value: 38,  suffix: '+',  label: 'Anos de Experiência',  note: 'No mercado desde 1988'        },
    { icon: <IconContainer />, value: 7,   suffix: '',   label: 'Mercados Globais',     note: 'Regiões atendidas'            },
  ];

  const statsBrasil = [
    { value: 'Recife',  suffix: '', label: 'Sede Operacional',   note: 'Pernambuco · Nordeste'          },
    { value: 'Santos',  suffix: '', label: 'Porto Principal',    note: 'Maior porto da América Latina'   },
    { value: '100%',    suffix: '', label: 'Compliance KYC/CIS', note: 'Due diligence em cada operação'  },
    { value: 'MAPA',    suffix: '', label: 'Origem Certificada', note: 'Documentação rastreável'         },
  ];

  const ports = [
    { name: 'Porto de Santos',     location: 'Santos, SP',     badge: 'Porto Principal', home: true  },
    { name: 'Porto de Suape',      location: 'Ipojuca, PE',    badge: 'Sede — Recife',   home: true  },
    { name: 'Porto de Paranaguá',  location: 'Paranaguá, PR',  badge: null,              home: false },
    { name: 'Porto de Rio Grande', location: 'Rio Grande, RS', badge: null,              home: false },
    { name: 'Porto de Salvador',   location: 'Salvador, BA',   badge: null,              home: false },
  ];

  const regions = [
    { flag: '🌍', name: 'Oriente Médio',  countries: ['Arábia Saudita', 'EAU', 'Egito', 'Irã', 'Turquia']         },
    { flag: '🌏', name: 'Ásia-Pacífico',  countries: ['China', 'Japão', 'Coreia do Sul', 'Vietnam', 'Indonésia']   },
    { flag: '🌍', name: 'África',         countries: ['Nigéria', 'Moçambique', 'Angola', 'Quênia', 'Tanzânia']     },
    { flag: '🌎', name: 'Américas',       countries: ['México', 'Colômbia', 'Peru', 'Chile', 'Argentina']          },
    { flag: '🌍', name: 'Europa',         countries: ['Holanda', 'Alemanha', 'Espanha', 'Portugal', 'Itália']      },
  ];

  return (
    <section style={{ background: 'var(--navy)', position: 'relative', overflow: 'hidden' }}>

      {/* Top border */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(196,150,58,0.4) 30%, rgba(196,150,58,0.4) 70%, transparent)',
      }} />

      {/* ══ BLOCK 1 — Stats Global vs Brasil ══ */}
      <div style={{ borderBottom: '1px solid rgba(196,150,58,0.1)', padding: 'clamp(2.5rem, 5vw, 4rem) 0' }}>
        <div className="container">

          {/* ── Global ── */}
          <div style={{ marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem',
            }}>
              <div style={{
                fontSize: '0.5rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase',
                color: 'var(--gold)', background: 'rgba(196,150,58,0.1)',
                border: '1px solid rgba(196,150,58,0.25)', padding: '0.3rem 0.75rem', borderRadius: '2px',
              }}>
                🌍 Alcance Global
              </div>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, rgba(196,150,58,0.2), transparent)' }} />
            </div>
            <div className="ps-stats-grid">
              {statsGlobal.map((s, i) => (
                <div key={i} className="ps-stat-card">
                  {i > 0 && (
                    <div style={{
                      position: 'absolute', left: 0, top: '15%', bottom: '15%', width: '1px',
                      background: 'linear-gradient(to bottom, transparent, rgba(196,150,58,0.18) 40%, rgba(196,150,58,0.18) 60%, transparent)',
                    }} />
                  )}
                  <div style={{ color: 'var(--gold)', opacity: 0.8, marginBottom: '0.875rem' }}>{s.icon}</div>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2.5rem, 4.5vw, 4rem)',
                    fontWeight: 300, lineHeight: 1, letterSpacing: '-0.04em', color: 'var(--ivory)',
                  }}>
                    <Counter target={s.value} />
                    <span style={{ color: 'var(--gold)' }}>{s.suffix}</span>
                  </div>
                  <div style={{ marginTop: '0.625rem', fontSize: '0.5625rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ivory-dim)' }}>
                    {s.label}
                  </div>
                  <div style={{ marginTop: '0.3rem', fontSize: '0.6875rem', color: 'rgba(196,150,58,0.5)' }}>
                    {s.note}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Brasil ── */}
          <div style={{
            borderTop: '1px solid rgba(196,150,58,0.08)',
            paddingTop: 'clamp(1.5rem, 3vw, 2.5rem)',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem',
            }}>
              <div style={{
                fontSize: '0.5rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase',
                color: 'rgba(200,192,168,0.6)', background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)', padding: '0.3rem 0.75rem', borderRadius: '2px',
              }}>
                🇧🇷 Presença Nacional
              </div>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, rgba(255,255,255,0.08), transparent)' }} />
            </div>
            <div className="ps-stats-grid">
              {statsBrasil.map((s, i) => (
                <div key={i} className="ps-stat-card ps-stat-brasil">
                  {i > 0 && (
                    <div style={{
                      position: 'absolute', left: 0, top: '15%', bottom: '15%', width: '1px',
                      background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.07) 50%, transparent)',
                    }} />
                  )}
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                    fontWeight: 400, lineHeight: 1, letterSpacing: '-0.02em',
                    color: 'var(--ivory)', marginBottom: '0.625rem',
                  }}>
                    {s.value}<span style={{ color: 'var(--gold)' }}>{s.suffix}</span>
                  </div>
                  <div style={{ fontSize: '0.5625rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ivory-dim)' }}>
                    {s.label}
                  </div>
                  <div style={{ marginTop: '0.3rem', fontSize: '0.6875rem', color: 'rgba(196,150,58,0.45)' }}>
                    {s.note}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ══ BLOCK 2 — Ports & Global Markets ══ */}
      <div ref={portsRef} style={{ padding: 'clamp(3rem, 6vw, 5rem) 0', borderBottom: '1px solid rgba(196,150,58,0.08)' }}>
        <div className="container">
          {/* Section header */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '1rem',
            marginBottom: 'clamp(2rem, 4vw, 3rem)',
            opacity: portsVisible ? 1 : 0,
            transform: portsVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}>
            <span className="eyebrow">Presença Operacional</span>
            <span style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, rgba(196,150,58,0.3), transparent)' }} />
          </div>

          <div className="ps-presence-grid">
            {/* LEFT: Ports */}
            <div style={{
              opacity: portsVisible ? 1 : 0,
              transform: portsVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
            }}>
              <div style={{
                fontSize: '0.5625rem', fontWeight: 700, letterSpacing: '0.22em',
                textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.25rem', opacity: 0.75,
              }}>
                Portos Brasileiros
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {ports.map((port, i) => (
                  <div
                    key={i}
                    className={`ps-port-item${i === 0 ? ' ps-port-hero' : ''}`}
                    style={{
                      opacity: portsVisible ? 1 : 0,
                      transform: portsVisible ? 'translateX(0)' : 'translateX(-16px)',
                      transition: `opacity 0.6s ease ${0.15 + i * 0.08}s, transform 0.6s ease ${0.15 + i * 0.08}s`,
                    }}
                  >
                    {/* Port number */}
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: i === 0 ? '1.5rem' : '0.875rem',
                      fontWeight: 300,
                      color: i === 0 ? 'var(--gold)' : 'rgba(196,150,58,0.3)',
                      letterSpacing: '-0.02em',
                      lineHeight: 1,
                      minWidth: '2rem',
                      flexShrink: 0,
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    {/* Divider */}
                    <div style={{
                      width: '1px', alignSelf: 'stretch',
                      background: i === 0 ? 'rgba(196,150,58,0.4)' : 'rgba(196,150,58,0.12)',
                      flexShrink: 0,
                    }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span style={{
                          fontSize: i === 0 ? '1.0625rem' : '0.9375rem',
                          fontWeight: i === 0 ? 600 : 500,
                          color: i === 0 ? 'var(--ivory)' : 'var(--ivory-dim)',
                          letterSpacing: i === 0 ? '-0.01em' : 'normal',
                        }}>
                          {port.name}
                        </span>
                        {port.badge && (
                          <span style={{
                            fontSize: '0.5rem', fontWeight: 700, letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            color: i === 0 ? '#05070D' : 'var(--gold)',
                            background: i === 0 ? 'var(--gold)' : 'rgba(196,150,58,0.1)',
                            border: i === 0 ? 'none' : '1px solid rgba(196,150,58,0.3)',
                            padding: '0.2rem 0.5rem', borderRadius: '2px',
                          }}>
                            {port.badge}
                          </span>
                        )}
                      </div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: i === 0 ? 'rgba(196,150,58,0.65)' : 'rgba(196,150,58,0.4)',
                        marginTop: '0.2rem',
                      }}>
                        {port.location}
                      </div>
                    </div>
                    {/* Volume bar */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.2rem', flexShrink: 0 }}>
                      <div style={{
                        height: '3px', borderRadius: '2px',
                        width: `${[48, 32, 22, 16, 12][i]}px`,
                        background: i === 0
                          ? 'linear-gradient(to right, var(--gold), var(--gold-dim))'
                          : 'rgba(196,150,58,0.2)',
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Global Markets */}
            <div style={{
              opacity: portsVisible ? 1 : 0,
              transform: portsVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
            }}>
              <div style={{
                fontSize: '0.5625rem', fontWeight: 700, letterSpacing: '0.22em',
                textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.25rem', opacity: 0.75,
              }}>
                Mercados Globais
              </div>
              <div className="ps-regions-grid">
                {regions.map((region, i) => (
                  <div key={i} className="ps-region-card" style={{
                    opacity: portsVisible ? 1 : 0,
                    transform: portsVisible ? 'translateY(0)' : 'translateY(16px)',
                    transition: `opacity 0.6s ease ${0.2 + i * 0.08}s, transform 0.6s ease ${0.2 + i * 0.08}s`,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ fontSize: '1rem' }}>{region.flag}</span>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ivory)', letterSpacing: '0.02em' }}>
                          {region.name}
                        </span>
                      </div>
                      <span style={{
                        fontSize: '0.5rem', fontWeight: 700, letterSpacing: '0.1em',
                        color: 'var(--gold)', background: 'rgba(196,150,58,0.1)',
                        border: '1px solid rgba(196,150,58,0.2)', padding: '0.1rem 0.35rem', borderRadius: '2px',
                      }}>
                        {region.countries.length} países
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                      {region.countries.map((c, j) => (
                        <span key={j} style={{
                          fontSize: '0.625rem', color: 'rgba(200,192,168,0.55)',
                          background: 'rgba(255,255,255,0.03)', padding: '0.15rem 0.45rem',
                          borderRadius: '2px', border: '1px solid rgba(255,255,255,0.06)',
                        }}>
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
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
        .ps-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        .ps-stat-card {
          position: relative;
          padding: clamp(1.25rem, 3vw, 2rem) clamp(1rem, 2.5vw, 2rem);
          text-align: center;
          transition: background 0.3s ease;
        }
        .ps-stat-card:hover { background: rgba(196,150,58,0.04); }
        .ps-stat-brasil { background: rgba(255,255,255,0.015) !important; }
        .ps-stat-brasil:hover { background: rgba(255,255,255,0.03) !important; }

        .ps-presence-grid {
          display: grid;
          grid-template-columns: 1fr 1.45fr;
          gap: clamp(2rem, 5vw, 5rem);
          align-items: start;
        }
        .ps-port-item {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          padding: 0.75rem 1rem;
          border: 1px solid rgba(196,150,58,0.08);
          border-radius: 4px;
          background: rgba(255,255,255,0.015);
          transition: border-color 0.25s ease, background 0.25s ease;
        }
        .ps-port-item:hover {
          border-color: rgba(196,150,58,0.25);
          background: rgba(196,150,58,0.04);
        }
        .ps-port-hero {
          border-color: rgba(196,150,58,0.28) !important;
          background: rgba(196,150,58,0.06) !important;
          padding: 1.1rem 1.25rem !important;
          border-left: 3px solid var(--gold) !important;
        }
        .ps-port-hero:hover {
          background: rgba(196,150,58,0.09) !important;
        }
        .ps-regions-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.625rem;
        }
        .ps-region-card {
          padding: 0.875rem 1rem;
          border: 1px solid rgba(196,150,58,0.1);
          border-radius: 4px;
          background: rgba(255,255,255,0.02);
          transition: border-color 0.25s ease, background 0.25s ease;
        }
        .ps-region-card:hover {
          border-color: rgba(196,150,58,0.28);
          background: rgba(196,150,58,0.04);
        }
        @media (max-width: 1024px) {
          .ps-presence-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .ps-regions-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 900px) {
          .ps-stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .ps-regions-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 420px) {
          .ps-regions-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
