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
    id: 'grains',
    label: 'Grãos & Cereais',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <ellipse cx="14" cy="14" rx="6" ry="9" stroke="currentColor" strokeWidth="1.25"/>
        <path d="M8 8C5 8 4 11 4 14C4 17 5 20 8 20" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
        <path d="M20 8C23 8 24 11 24 14C24 17 23 20 20 20" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
        <path d="M8 11H20M8 14H20M8 17H20" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round"/>
      </svg>
    ),
    color: '#b8922e',
    items: [
      { name: 'Soja GMO e NGMO', tags: ['SIF', 'Halal', 'Kosher'] },
      { name: 'Milho GMO e NGMO', tags: ['SIF', 'Halal', 'Kosher'] },
      { name: 'Trigo GMO e NGMO', tags: ['SIF', 'Halal', 'Kosher'] },
      { name: 'Arroz', tags: ['Exportação'] },
      { name: 'Feijão', tags: ['Exportação'] },
      { name: 'Grão de Bico', tags: ['Exportação'] },
    ],
  },
  {
    id: 'proteins',
    label: 'Proteínas & Carnes',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 6C10 6 7 9 7 13C7 17 9 19 9 22H19C19 19 21 17 21 13C21 9 18 6 14 6Z" stroke="currentColor" strokeWidth="1.25"/>
        <circle cx="12" cy="10" r="1.5" fill="currentColor"/>
        <path d="M17 6C18.5 4 22 3 22 3C22 3 21 6 19 7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
        <path d="M10 22H18M11 24V26M14 24V26M17 24V26" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
      </svg>
    ),
    color: '#c49a3a',
    items: [
      { name: 'Frango com SIF', tags: ['Halal', 'Kosher'] },
      { name: 'Boi com SIF', tags: ['Halal', 'Kosher'] },
      { name: 'Carneiro com SIF', tags: ['Halal', 'Kosher'] },
      { name: 'Peixes Amazônicos', tags: ['SIF'] },
      { name: 'Porco com SIF', tags: ['Halal', 'Kosher'] },
    ],
  },
  {
    id: 'mining',
    label: 'Minerais & Metais',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <polygon points="14,4 24,10 24,18 14,24 4,18 4,10" stroke="currentColor" strokeWidth="1.25" fill="none"/>
        <polygon points="14,8 20,12 20,16 14,20 8,16 8,12" stroke="currentColor" strokeWidth="0.75" fill="none"/>
        <circle cx="14" cy="14" r="2" fill="currentColor" fillOpacity="0.4"/>
      </svg>
    ),
    color: '#a07a28',
    items: [
      { name: 'Minérios', tags: ['Exportação'] },
      { name: 'Ouro', tags: ['Exportação', 'Documentado'] },
      { name: 'Terras Raras', tags: ['Exportação'] },
      { name: 'Pedras Preciosas Brasileiras', tags: ['Exportação'] },
    ],
  },
  {
    id: 'sugar',
    label: 'Açúcar & Derivados',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.25"/>
        <circle cx="14" cy="14" r="5" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2"/>
        <path d="M14 4V8M14 20V24M4 14H8M20 14H24" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
    color: '#d4aa50',
    items: [
      { name: 'Uréia', tags: ['Granel', 'Exportação'] },
      { name: 'IC 45', tags: ['Granulado'] },
      { name: 'IC 150', tags: ['Granulado'] },
      { name: 'VHP 600 / 1200', tags: ['Bruto'] },
      { name: 'Pedra de Fel', tags: ['Bruto'] },
      { name: 'Demerara', tags: ['Semi-refinado'] },
    ],
  },
  {
    id: 'energy',
    label: 'Energia & Óleos',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4L17 10H23L18 14L20 20L14 16L8 20L10 14L5 10H11L14 4Z" stroke="currentColor" strokeWidth="1.25" fill="none"/>
        <circle cx="14" cy="14" r="2" fill="currentColor" fillOpacity="0.5"/>
      </svg>
    ),
    color: '#b8922e',
    items: [
      { name: 'Óleos Vegetais', tags: ['Exportação'] },
      { name: 'Farelo', tags: ['Granel'] },
      { name: 'Madeira', tags: ['Documentada'] },
      { name: 'Etanol', tags: ['Anidro', 'Hidratado'] },
      { name: 'Diesel', tags: ['S-10', 'S-500'] },
      { name: 'Gasolina', tags: ['Exportação'] },
    ],
  },
  {
    id: 'agri',
    label: 'Agro & Outros',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 24C14 24 6 18 6 10C6 6.686 9.134 4 14 4C18.866 4 22 6.686 22 10C22 18 14 24 14 24Z" stroke="currentColor" strokeWidth="1.25" fill="none"/>
        <path d="M14 4C14 4 10 8 10 14M14 4C14 4 18 8 18 14" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round"/>
        <path d="M8 12H20" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round"/>
      </svg>
    ),
    color: '#c49a3a',
    items: [
      { name: 'Café', tags: ['Verde', 'Torrado'] },
      { name: 'Frutas', tags: ['In natura', 'Processada'] },
      { name: 'Cachaça', tags: ['Artesanal', 'Industrial'] },
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProductsSection() {
  const t = useTranslations('products');
  const locale = useLocale();
  const { ref, inView } = useInView();

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

        {/* Category grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5px',
          background: 'rgba(201,168,76,0.08)',
          marginBottom: '1.5px',
        }}>
          {CATEGORIES.map((cat, ci) => (
            <div
              key={cat.id}
              className="product-card"
              style={{
                background: 'var(--navy)',
                padding: 'clamp(1.5rem, 3vw, 2rem)',
                position: 'relative',
                overflow: 'hidden',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.7s ease ${ci * 0.08}s, transform 0.7s ease ${ci * 0.08}s`,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.background = 'var(--navy-mid)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.background = 'var(--navy)';
              }}
            >
              {/* Ghost number */}
              <div style={{
                position: 'absolute', top: '1rem', right: '1.25rem',
                fontFamily: 'var(--font-display)', fontSize: '3.5rem',
                fontWeight: 700, color: 'rgba(201,168,76,0.04)', lineHeight: 1, userSelect: 'none',
              }}>
                {String(ci + 1).padStart(2, '0')}
              </div>

              {/* Icon + label */}
              <div style={{ color: cat.color, marginBottom: '1rem' }}>
                {cat.icon}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.125rem',
                fontWeight: 600,
                color: 'var(--ivory)',
                marginBottom: '1.25rem',
                letterSpacing: '0.01em',
              }}>
                {cat.label}
              </h3>

              {/* Item list */}
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {cat.items.map((item, ii) => (
                  <li key={ii} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.5rem',
                    paddingBottom: '0.65rem',
                    borderBottom: ii < cat.items.length - 1 ? '1px solid rgba(201,168,76,0.07)' : 'none',
                  }}>
                    <span style={{
                      fontSize: '0.875rem',
                      color: 'var(--ivory-dim)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}>
                      <span style={{
                        display: 'inline-block',
                        width: '4px',
                        height: '4px',
                        background: cat.color,
                        borderRadius: '50%',
                        flexShrink: 0,
                      }} />
                      {item.name}
                    </span>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                      {item.tags.map((tag, ti) => (
                        <span key={ti} style={{
                          fontSize: '0.55rem',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: 'var(--gold-dim)',
                          border: '1px solid rgba(201,168,76,0.2)',
                          padding: '0.125rem 0.4rem',
                          whiteSpace: 'nowrap',
                        }}>
                          {ti > 0 && ' '}{tag}
                        </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* "Outros sob consulta" accent row */}
        <div style={{
          background: 'rgba(201,168,76,0.04)',
          border: '1px solid rgba(201,168,76,0.15)',
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
            fontSize: '0.8125rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
          }}>
            {t('others_available')}
          </span>
          <span style={{
            fontSize: '0.75rem',
            color: 'var(--ivory-dim)',
          }}>
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
        @media (max-width: 768px) {
          .products-header { grid-template-columns: 1fr !important; }
          .products-header > div:last-child p { text-align: left !important; }
        }
      `}</style>
    </section>
  );
}
