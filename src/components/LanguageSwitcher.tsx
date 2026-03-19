'use client';

import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { routing } from '@/i18n/routing';

const LANG_META: Record<string, { label: string; flag: string; native: string }> = {
  pt: { label: 'PT', flag: '🇧🇷', native: 'Português' },
  en: { label: 'EN', flag: '🇬🇧', native: 'English' },
  de: { label: 'DE', flag: '🇩🇪', native: 'Deutsch' },
  zh: { label: '中文', flag: '🇨🇳', native: '中文' },
  es: { label: 'ES', flag: '🇪🇸', native: 'Español' },
  fr: { label: 'FR', flag: '🇫🇷', native: 'Français' },
  ja: { label: 'JP', flag: '🇯🇵', native: '日本語' },
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname(); // e.g. /pt/about
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, []);

  function switchLocale(next: string) {
    if (next === locale) { setOpen(false); return; }
    // Replace locale segment and hard-navigate so the server re-renders
    // with the new locale's full message bundle.
    const segments = pathname.split('/'); // ['', 'pt', 'about', ...]
    segments[1] = next;
    const newPath = segments.join('/') || `/${next}`;
    window.location.href = newPath;
  }

  const current = LANG_META[locale] ?? LANG_META['en'];

  return (
    <div ref={ref} style={{ position: 'relative', zIndex: 60 }}>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(v => !v)}
        aria-label="Select language"
        aria-expanded={open}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          background: 'transparent',
          border: '1px solid rgba(196,150,58,0.22)',
          padding: '0.4rem 0.875rem',
          cursor: 'pointer',
          color: 'var(--ivory-mid)',
          fontFamily: 'var(--font-body)',
          fontSize: '0.6875rem', fontWeight: 600,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          transition: 'border-color 0.2s, color 0.2s',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.borderColor = 'var(--gold)';
          el.style.color = 'var(--gold)';
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.borderColor = 'rgba(196,150,58,0.22)';
          el.style.color = 'var(--ivory-mid)';
        }}
      >
        <span style={{ fontSize: '1rem', lineHeight: 1 }}>{current.flag}</span>
        <span>{current.label}</span>
        <svg
          width="8" height="5" viewBox="0 0 8 5" fill="none"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
        >
          <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 10px)',
          right: 0,
          background: 'var(--navy-mid)',
          border: '1px solid rgba(196,150,58,0.18)',
          minWidth: '175px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
          overflow: 'hidden',
        }}>
          <div style={{ height: '1px', background: 'var(--gold)', opacity: 0.4 }} />
          {routing.locales.map(loc => {
            const isCurrent = loc === locale;
            return (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.875rem',
                  width: '100%', padding: '0.75rem 1rem',
                  background: isCurrent ? 'rgba(196,150,58,0.07)' : 'transparent',
                  border: 'none', cursor: 'pointer',
                  color: isCurrent ? 'var(--gold)' : 'var(--ivory-mid)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8125rem', textAlign: 'left',
                  transition: 'background 0.15s, color 0.15s',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                }}
                onMouseEnter={e => {
                  if (!isCurrent) {
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.04)';
                    (e.currentTarget as HTMLButtonElement).style.color = 'var(--ivory)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isCurrent) {
                    (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                    (e.currentTarget as HTMLButtonElement).style.color = 'var(--ivory-mid)';
                  }
                }}
              >
                <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>{LANG_META[loc].flag}</span>
                <span>{LANG_META[loc].native}</span>
                {isCurrent && (
                  <svg style={{ marginLeft: 'auto' }} width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
