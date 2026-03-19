'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

const NAV_ITEMS = [
  { key: 'about', href: '/about' },
  { key: 'products', href: '/products' },
  { key: 'leadership', href: '/leadership' },
  { key: 'compliance', href: '/compliance' },
  { key: 'contact', href: '/contact' },
] as const;

export default function Footer() {
  const t = useTranslations('footer');
  const tn = useTranslations('nav');
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: 'var(--navy-mid)',
      borderTop: '1px solid rgba(201,168,76,0.12)',
      paddingTop: '4rem',
      paddingBottom: '2rem',
    }}>
      <div className="container">
        {/* Top row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3rem',
          paddingBottom: '3rem',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          {/* Brand */}
          <div>
            <Link href={`/${locale}`} style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '1rem' }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                fontWeight: 600,
                color: 'var(--ivory)',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}>
                BM<span style={{ color: 'var(--gold)' }}>5</span>
              </div>
              <div style={{
                fontSize: '0.5625rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--ivory-dim)',
              }}>
                Comex
              </div>
            </Link>
            <p style={{
              fontSize: '0.8125rem',
              color: 'var(--ivory-dim)',
              lineHeight: 1.6,
              maxWidth: '220px',
              marginTop: '0.75rem',
            }}>
              {t('tagline')}
            </p>
            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <a
                href="mailto:Osvaldo@bm5comex.com"
                style={{ fontSize: '0.75rem', color: 'var(--ivory-dim)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--ivory-dim)')}
              >
                Osvaldo@bm5comex.com
              </a>
              <a
                href="tel:+558132650131"
                style={{ fontSize: '0.75rem', color: 'var(--ivory-dim)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--ivory-dim)')}
              >
                +55 (81) 3265-0131
              </a>
              <a
                href="https://wa.me/5581991032272"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.75rem', color: 'var(--ivory-dim)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--ivory-dim)')}
              >
                +55 (81) 99103-2272
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="eyebrow" style={{ marginBottom: '1.25rem' }}>{t('nav_title')}</p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {NAV_ITEMS.map(item => (
                <Link
                  key={item.key}
                  href={`/${locale}${item.href}`}
                  style={{
                    fontSize: '0.8125rem',
                    color: 'var(--ivory-dim)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--ivory-dim)')}
                >
                  {tn(item.key)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Address */}
          <div>
            <p className="eyebrow" style={{ marginBottom: '1.25rem' }}>{t('legal_title')}</p>
            <address style={{
              fontStyle: 'normal',
              fontSize: '0.8125rem',
              color: 'var(--ivory-dim)',
              lineHeight: 1.8,
            }}>
              Rua Cap. José da Luz, 107<br />
              Sala 203 — Ilha do Leite<br />
              Recife, PE · Brasil<br />
              CEP 50070-540
            </address>
          </div>

          {/* Gold accent column */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <div style={{
              width: '1px',
              height: '80px',
              background: 'linear-gradient(to bottom, var(--gold), transparent)',
              marginBottom: '1rem',
            }} />
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.125rem',
              fontStyle: 'italic',
              color: 'var(--ivory)',
              lineHeight: 1.4,
              marginBottom: '0.75rem',
            }}>
              &ldquo;Negócios reais.<br />Resultados verificáveis.&rdquo;
            </p>
            <p style={{ fontSize: '0.625rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold-dim)' }}>
              — Osvaldo Matos de Melo Júnior<br />
              <span style={{ color: 'rgba(196,150,58,0.4)' }}>CEO & Fundador · BM5</span>
            </p>
          </div>
        </div>

        {/* Bottom row */}
        <div style={{
          paddingTop: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
          <p style={{ fontSize: '0.6875rem', color: 'rgba(191,184,158,0.4)', lineHeight: 1.6 }}>
            {t('rights', { year })}
          </p>
          <p style={{
            fontSize: '0.6875rem',
            color: 'rgba(191,184,158,0.3)',
            maxWidth: '480px',
            lineHeight: 1.6,
            textAlign: 'right',
          }}>
            {t('disclaimer')}
          </p>
        </div>
      </div>
    </footer>
  );
}
