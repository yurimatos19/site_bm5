'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

function useInView(threshold = 0.1) {
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

// ─── Product catalogue ────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    id: 'sugar',
    label: 'Açúcar & Derivados',
    featured: 'ICUMSA 45',
    featuredSub: 'Açúcar Branco Refinado',
    spec: 'Granulado · Exportação Direta',
    accent: '#d4aa50',
    markets: ['Oriente Médio', 'África', 'Ásia'],
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.5"/>
        <circle cx="24" cy="24" r="9" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.7"/>
        <path d="M24 6V12M24 36V42M6 24H12M36 24H42" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeOpacity="0.6"/>
        <circle cx="24" cy="24" r="3" fill="currentColor" fillOpacity="0.5"/>
      </svg>
    ),
    items: [
      { name: 'IC 45', tags: ['Granulado'] },
      { name: 'IC 150', tags: ['Granulado'] },
      { name: 'VHP 600 / 1200', tags: ['Bruto'] },
      { name: 'Demerara', tags: ['Semi-refinado'] },
      { name: 'Pedra de Fel', tags: ['Bruto'] },
      { name: 'Uréia', tags: ['Granel'] },
    ],
    highlight: true,
  },
  {
    id: 'grains',
    label: 'Grãos & Cereais',
    featured: 'Soja GMO',
    featuredSub: 'Grão & Farelo Premium',
    spec: 'SIF · Halal · Kosher',
    accent: '#b8922e',
    markets: ['China', 'Europa', 'Ásia'],
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <ellipse cx="24" cy="24" rx="10" ry="16" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.5"/>
        <path d="M14 14C8 14 6 19 6 24C6 29 8 34 14 34" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeOpacity="0.6"/>
        <path d="M34 14C40 14 42 19 42 24C42 29 40 34 34 34" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeOpacity="0.6"/>
        <path d="M14 18H34M14 24H34M14 30H34" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeOpacity="0.5"/>
      </svg>
    ),
    items: [
      { name: 'Soja GMO e NGMO', tags: ['SIF', 'Halal'] },
      { name: 'Milho GMO e NGMO', tags: ['SIF', 'Halal'] },
      { name: 'Trigo GMO e NGMO', tags: ['SIF', 'Halal'] },
      { name: 'Arroz', tags: ['Exportação'] },
      { name: 'Feijão', tags: ['Exportação'] },
      { name: 'Grão de Bico', tags: ['Exportação'] },
    ],
    highlight: true,
  },
  {
    id: 'proteins',
    label: 'Proteínas & Carnes',
    featured: 'Frango SIF',
    featuredSub: 'Cortes Certificados Halal',
    spec: 'SIF · Halal · Kosher',
    accent: '#c49a3a',
    markets: ['Oriente Médio', 'Ásia', 'África'],
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M24 10C16 10 11 16 11 24C11 32 14 36 14 42H34C34 36 37 32 37 24C37 16 32 10 24 10Z" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.5"/>
        <circle cx="20" cy="18" r="3" fill="currentColor" fillOpacity="0.4"/>
        <path d="M28 10C31 6 38 4 38 4C38 4 36 9 33 11" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeOpacity="0.6"/>
      </svg>
    ),
    items: [
      { name: 'Frango com SIF', tags: ['Halal', 'Kosher'] },
      { name: 'Boi com SIF', tags: ['Halal', 'Kosher'] },
      { name: 'Carneiro com SIF', tags: ['Halal', 'Kosher'] },
      { name: 'Peixes Amazônicos', tags: ['SIF'] },
      { name: 'Porco com SIF', tags: ['Halal', 'Kosher'] },
    ],
    highlight: true,
  },
  {
    id: 'energy',
    label: 'Energia & Óleos',
    featured: 'Etanol',
    featuredSub: 'Anidro & Hidratado',
    spec: 'Combustível · Exportação',
    accent: '#b8922e',
    markets: ['Europa', 'América Central'],
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M24 6L30 18H42L33 25L36 38L24 31L12 38L15 25L6 18H18L24 6Z" stroke="currentColor" strokeWidth="1.25" fill="none" strokeOpacity="0.5"/>
        <circle cx="24" cy="24" r="4" fill="currentColor" fillOpacity="0.35"/>
      </svg>
    ),
    items: [
      { name: 'Etanol Anidro', tags: ['Exportação'] },
      { name: 'Etanol Hidratado', tags: ['Exportação'] },
      { name: 'Óleos Vegetais', tags: ['Exportação'] },
      { name: 'Farelo', tags: ['Granel'] },
      { name: 'Diesel S-10/S-500', tags: ['Exportação'] },
      { name: 'Gasolina', tags: ['Exportação'] },
    ],
    highlight: false,
  },
  {
    id: 'mining',
    label: 'Minerais & Metais',
    featured: 'Ouro',
    featuredSub: 'Mineração Documentada',
    spec: 'Documentado · Exportação',
    accent: '#a07a28',
    markets: ['Europa', 'Emirados', 'Ásia'],
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <polygon points="24,4 42,16 42,32 24,44 6,32 6,16" stroke="currentColor" strokeWidth="1.25" fill="none" strokeOpacity="0.5"/>
        <polygon points="24,12 36,20 36,28 24,36 12,28 12,20" stroke="currentColor" strokeWidth="0.75" fill="none" strokeOpacity="0.4"/>
        <circle cx="24" cy="24" r="4" fill="currentColor" fillOpacity="0.35"/>
      </svg>
    ),
    items: [
      { name: 'Ouro', tags: ['Documentado'] },
      { name: 'Minérios', tags: ['Exportação'] },
      { name: 'Terras Raras', tags: ['Exportação'] },
      { name: 'Pedras Preciosas', tags: ['Brasileiras'] },
    ],
    highlight: false,
  },
  {
    id: 'agri',
    label: 'Agro & Specialty',
    featured: 'Café',
    featuredSub: 'Verde & Torrado',
    spec: 'Certificado · Origem Brasil',
    accent: '#c49a3a',
    markets: ['Europa', 'EUA', 'Ásia'],
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M24 42C24 42 10 30 10 16C10 8.268 16.268 2 24 2C31.732 2 38 8.268 38 16C38 30 24 42 24 42Z" stroke="currentColor" strokeWidth="1.25" fill="none" strokeOpacity="0.5"/>
        <path d="M24 2C24 2 17 12 17 24M24 2C24 2 31 12 31 24" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeOpacity="0.5"/>
        <path d="M12 20H36" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeOpacity="0.4"/>
      </svg>
    ),
    items: [
      { name: 'Café Verde', tags: ['Exportação'] },
      { name: 'Café Torrado', tags: ['Exportação'] },
      { name: 'Frutas In Natura', tags: ['Exportação'] },
      { name: 'Frutas Processadas', tags: ['Exportação'] },
      { name: 'Cachaça Artesanal', tags: ['GI Certificada'] },
    ],
    highlight: false,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProductsSection() {
  const t = useTranslations('products');
  const locale = useLocale();
  const { ref, inView } = useInView();

  const featured = CATEGORIES.filter(c => c.highlight);
  const secondary = CATEGORIES.filter(c => !c.highlight);

  return (
    <section
      ref={ref}
      className="section"
      id="products"
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg, var(--navy) 0%, #0a0c11 100%)',
      }}
    >
      {/* top rule */}
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
          marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
          gap: '2rem',
        }} className="products-header">
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}>
            <span className="eyebrow" style={{ display: 'block', marginBottom: '1rem' }}>
              {t('tag')}
            </span>
            <span className="gold-rule" style={{ display: 'block', marginBottom: '1rem' }} />
            <h2 className="section-headline">{t('headline')}</h2>
          </div>
          <div style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.7s ease 0.2s' }}>
            <p style={{
              fontSize: '0.875rem',
              color: 'var(--ivory-dim)',
              maxWidth: '340px',
              lineHeight: 1.75,
              textAlign: 'right',
            }}>
              {t('sub')}
            </p>
          </div>
        </div>

        {/* ── Featured trio ── */}
        <div className="prod-featured-grid" style={{ marginBottom: '1.5px' }}>
          {featured.map((cat, ci) => (
            <div
              key={cat.id}
              className="prod-featured-card"
              style={{
                background: 'var(--navy)',
                position: 'relative',
                overflow: 'hidden',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.7s ease ${ci * 0.1}s, transform 0.7s ease ${ci * 0.1}s`,
              }}
            >
              {/* Accent top bar */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: `linear-gradient(90deg, ${cat.accent}, transparent)`,
              }} />

              {/* Ghost icon */}
              <div style={{
                position: 'absolute', bottom: '-8px', right: '-8px',
                color: cat.accent, opacity: 0.06, transform: 'scale(2.8)',
                pointerEvents: 'none',
              }}>
                {cat.icon}
              </div>

              {/* Ghost number */}
              <div style={{
                position: 'absolute', top: '1.25rem', right: '1.5rem',
                fontFamily: 'var(--font-display)', fontSize: '5rem',
                fontWeight: 700, color: 'rgba(201,168,76,0.035)', lineHeight: 1,
                userSelect: 'none',
              }}>
                {String(ci + 1).padStart(2, '0')}
              </div>

              <div style={{ padding: 'clamp(1.5rem, 3vw, 2.25rem)', position: 'relative' }}>
                {/* Category label + icon row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
                  <div style={{ color: cat.accent, width: '20px', height: '20px', flexShrink: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 48 48" fill="none" style={{ width: '100%', height: '100%' }}>
                      {cat.icon.props.children}
                    </svg>
                  </div>
                  <span style={{
                    fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.18em',
                    textTransform: 'uppercase', color: cat.accent, opacity: 0.85,
                  }}>
                    {cat.label}
                  </span>
                  <span style={{
                    marginLeft: 'auto',
                    fontSize: '0.5rem', fontWeight: 700, letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    background: `rgba(${cat.accent === '#d4aa50' ? '212,170,80' : cat.accent === '#b8922e' ? '184,146,46' : '196,154,58'},0.12)`,
                    color: cat.accent,
                    border: `1px solid ${cat.accent}33`,
                    padding: '0.2rem 0.6rem',
                    borderRadius: '2px',
                  }}>
                    Destaque
                  </span>
                </div>

                {/* Featured product — hero display */}
                <div style={{ marginBottom: '1.75rem', paddingBottom: '1.75rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                    fontWeight: 700,
                    color: 'var(--ivory)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                    marginBottom: '0.4rem',
                  }}>
                    {cat.featured}
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--ivory-dim)', marginBottom: '0.875rem' }}>
                    {cat.featuredSub}
                  </div>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    padding: '0.3rem 0.75rem',
                    fontSize: '0.6875rem',
                    color: 'rgba(200,192,168,0.55)',
                    letterSpacing: '0.06em',
                  }}>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: cat.accent, flexShrink: 0 }} />
                    {cat.spec}
                  </div>
                </div>

                {/* Market badges */}
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                  {cat.markets.map((m, mi) => (
                    <span key={mi} style={{
                      fontSize: '0.5625rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                      color: 'var(--ivory-dim)', border: '1px solid rgba(201,168,76,0.15)',
                      padding: '0.2rem 0.5rem', background: 'rgba(201,168,76,0.04)',
                    }}>
                      {m}
                    </span>
                  ))}
                </div>

                {/* Item list */}
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {cat.items.map((item, ii) => (
                    <li key={ii} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      gap: '0.5rem',
                      paddingBottom: '0.5rem',
                      borderBottom: ii < cat.items.length - 1 ? '1px solid rgba(201,168,76,0.06)' : 'none',
                    }}>
                      <span style={{
                        fontSize: '0.8125rem', color: 'var(--ivory-dim)',
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                      }}>
                        <span style={{
                          display: 'inline-block', width: '3px', height: '3px',
                          background: cat.accent, borderRadius: '50%', flexShrink: 0,
                        }} />
                        {item.name}
                      </span>
                      <div style={{ display: 'flex', gap: '3px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                        {item.tags.map((tag, ti) => (
                          <span key={ti} style={{
                            fontSize: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                            color: 'var(--gold-dim)', border: '1px solid rgba(201,168,76,0.18)',
                            padding: '0.1rem 0.35rem', whiteSpace: 'nowrap',
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* ── Secondary grid ── */}
        <div className="prod-secondary-grid" style={{ marginBottom: '1.5px' }}>
          {secondary.map((cat, ci) => (
            <div
              key={cat.id}
              className="prod-secondary-card"
              style={{
                background: 'var(--navy)',
                position: 'relative',
                overflow: 'hidden',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.7s ease ${(ci + featured.length) * 0.08}s, transform 0.7s ease ${(ci + featured.length) * 0.08}s`,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'var(--navy-mid)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'var(--navy)'; }}
            >
              {/* Accent top bar */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                background: `linear-gradient(90deg, ${cat.accent}55, transparent)`,
              }} />

              {/* Ghost icon watermark */}
              <div style={{
                position: 'absolute', bottom: '-4px', right: '-4px',
                color: cat.accent, opacity: 0.05, transform: 'scale(2.2)',
                pointerEvents: 'none',
              }}>
                {cat.icon}
              </div>

              <div style={{ padding: 'clamp(1.25rem, 2.5vw, 1.75rem)', position: 'relative' }}>
                {/* Header row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div style={{ color: cat.accent, flexShrink: 0, marginTop: '1px' }}>
                    <svg width="18" height="18" viewBox="0 0 48 48" fill="none" style={{ display: 'block' }}>
                      {cat.icon.props.children}
                    </svg>
                  </div>
                  <div>
                    <div style={{
                      fontSize: '0.9375rem', fontWeight: 600, color: 'var(--ivory)',
                      letterSpacing: '-0.01em', marginBottom: '0.2rem',
                    }}>
                      {cat.label}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.25rem', fontWeight: 700,
                      color: cat.accent, letterSpacing: '-0.02em', lineHeight: 1.1,
                    }}>
                      {cat.featured}
                    </div>
                    <div style={{ fontSize: '0.6875rem', color: 'rgba(200,192,168,0.45)', marginTop: '0.15rem' }}>
                      {cat.featuredSub}
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '1rem' }} />

                {/* Compact item list */}
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {cat.items.map((item, ii) => (
                    <li key={ii} style={{
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                      fontSize: '0.8125rem', color: 'var(--ivory-dim)',
                    }}>
                      <span style={{
                        display: 'inline-block', width: '3px', height: '3px',
                        background: cat.accent, borderRadius: '50%', flexShrink: 0,
                      }} />
                      {item.name}
                      <span style={{ marginLeft: 'auto', display: 'flex', gap: '3px' }}>
                        {item.tags.slice(0, 1).map((tag, ti) => (
                          <span key={ti} style={{
                            fontSize: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                            color: 'var(--gold-dim)', border: '1px solid rgba(201,168,76,0.15)',
                            padding: '0.1rem 0.3rem', whiteSpace: 'nowrap',
                          }}>
                            {tag}
                          </span>
                        ))}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* "Outros sob consulta" accent row */}
        <div style={{
          background: 'rgba(201,168,76,0.03)',
          border: '1px solid rgba(201,168,76,0.12)',
          borderTop: 'none',
          padding: '1.25rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          opacity: inView ? 1 : 0,
          transition: 'opacity 0.7s ease 0.55s',
          flexWrap: 'wrap',
        }}>
          <span style={{
            fontSize: '0.8125rem', letterSpacing: '0.12em',
            textTransform: 'uppercase', color: 'var(--gold)',
          }}>
            {t('others_available')}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--ivory-dim)' }}>
            {t('others_contact')}
          </span>
        </div>

        {/* CTA */}
        <div style={{
          marginTop: '3rem',
          textAlign: 'center',
          opacity: inView ? 1 : 0,
          transition: 'opacity 0.7s ease 0.6s',
        }}>
          <Link href={`/${locale}/contact`} className="btn-primary">
            {t('cta')}
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M1 5H13M9 1L13 5L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </Link>
        </div>
      </div>

      <style>{`
        .prod-featured-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5px;
          background: rgba(201,168,76,0.08);
        }
        .prod-featured-card {
          transition: background 0.25s ease;
        }
        .prod-featured-card:hover {
          background: var(--navy-mid) !important;
        }
        .prod-secondary-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5px;
          background: rgba(201,168,76,0.06);
        }
        @media (max-width: 1024px) {
          .prod-featured-grid { grid-template-columns: repeat(2, 1fr); }
          .prod-secondary-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .prod-featured-grid { grid-template-columns: 1fr; }
          .prod-secondary-grid { grid-template-columns: 1fr; }
          .products-header { grid-template-columns: 1fr !important; }
          .products-header > div:last-child p { text-align: left !important; }
        }
      `}</style>
    </section>
  );
}
