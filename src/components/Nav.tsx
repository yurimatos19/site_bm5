'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';

const NAV_ITEMS = [
  { key: 'about', href: '/about' },
  { key: 'products', href: '/products' },
  { key: 'leadership', href: '/leadership' },
  { key: 'compliance', href: '/compliance' },
  { key: 'contact', href: '/contact' },
] as const;

export default function Nav() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY;
      setScrolled(sy > 40);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(total > 0 ? (sy / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const localePath = (href: string) => `/${locale}${href}`;

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease',
          background: scrolled
            ? 'rgba(7,9,15,0.92)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(201,168,76,0.12)'
            : '1px solid transparent',
        }}
      >
        {/* Scroll progress indicator */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '1px',
          width: `${scrollPct}%`,
          background: 'linear-gradient(90deg, var(--gold-dim), var(--gold), var(--gold-light))',
          transition: 'width 0.12s linear',
          opacity: scrolled ? 1 : 0,
          transitionProperty: 'width, opacity',
        }} />
        <div className="container" style={{ display: 'flex', alignItems: 'center', height: '5rem', gap: '2rem' }}>
          {/* Logo */}
          <Link
            href={`/${locale}`}
            style={{
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              lineHeight: 1,
              flexShrink: 0,
            }}
          >
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.75rem',
              fontWeight: 600,
              color: 'var(--ivory)',
              letterSpacing: '-0.02em',
            }}>
              BM<span style={{ color: 'var(--gold)' }}>5</span>
            </span>
            <span style={{
              fontSize: '0.5625rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--ivory-dim)',
              marginTop: '1px',
            }}>
              Comex
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.25rem',
              marginLeft: 'auto',
            }}
            className="desktop-nav"
          >
            {NAV_ITEMS.map(item => (
              <Link
                key={item.key}
                href={localePath(item.href)}
                className={`nav-link ${pathname.includes(item.href) ? 'active' : ''}`}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '1.5rem' }}>
            <LanguageSwitcher />
            <Link
              href={localePath('/contact')}
              className="btn-primary"
              style={{ padding: '0.625rem 1.25rem', fontSize: '0.6875rem', display: 'none' }}
              id="nav-cta"
            >
              {t('cta')}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '0.25rem',
              color: 'var(--ivory)',
              marginLeft: 'auto',
            }}
            id="hamburger"
          >
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
              {mobileOpen ? (
                <>
                  <path d="M2 2L20 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M20 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </>
              ) : (
                <>
                  <path d="M2 2H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M2 8H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M2 14H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </>
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            top: '5rem',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'var(--navy)',
            zIndex: 49,
            padding: '2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
          }}
        >
          {NAV_ITEMS.map(item => (
            <Link
              key={item.key}
              href={localePath(item.href)}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                fontWeight: 400,
                color: pathname.includes(item.href) ? 'var(--gold)' : 'var(--ivory)',
                textDecoration: 'none',
                padding: '0.75rem 0',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                transition: 'color 0.2s ease',
              }}
            >
              {t(item.key)}
            </Link>
          ))}
          <div style={{ marginTop: '2rem' }}>
            <LanguageSwitcher />
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          #hamburger { display: flex !important; }
          #nav-cta { display: none !important; }
        }
        @media (min-width: 769px) {
          #nav-cta { display: inline-flex !important; }
        }
      `}</style>
    </>
  );
}
