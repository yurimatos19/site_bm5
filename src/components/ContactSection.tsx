'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState, FormEvent } from 'react';

function useInView(threshold = 0.15) {
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

export default function ContactSection() {
  const t = useTranslations('contact');
  const { ref, inView } = useInView();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const fd = new FormData(e.currentTarget);
    const body = {
      name:    fd.get('name')    as string,
      company: fd.get('company') as string,
      email:   fd.get('email')   as string,
      phone:   fd.get('phone')   as string,
      product: fd.get('product') as string,
      volume:  fd.get('volume')  as string,
      message: fd.get('message') as string,
      _hp:     fd.get('_hp')     as string, // honeypot
    };

    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? 'Something went wrong. Please try again or email us directly.');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  const infoItems = [
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 1C5.239 1 3 3.239 3 6C3 9.5 8 15 8 15C8 15 13 9.5 13 6C13 3.239 10.761 1 8 1Z" stroke="currentColor" strokeWidth="1"/>
          <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1"/>
        </svg>
      ),
      label: t('address_title'),
      value: 'Rua Cap. José da Luz, 107 — Sala 203\nIlha do Leite, Recife — PE\nBrasil · CEP 50070-540',
      href: null,
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 2H6L7.5 5.5L5.5 7C6.5 9 7 9.5 9 10.5L10.5 8.5L14 10V13C14 13.552 13.552 14 13 14C6.925 14 2 9.075 2 3C2 2.448 2.448 2 3 2Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
        </svg>
      ),
      label: t('phone_title'),
      value: '+55 (81) 3265-0131',
      href: 'tel:+558132650131',
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 2C4.686 2 2 4.686 2 8C2 11.314 4.686 14 8 14C11.314 14 14 11.314 14 8C14 4.686 11.314 2 8 2Z" stroke="currentColor" strokeWidth="1"/>
          <path d="M5 11C5 11 5 8 7 7.5C9 7 11 9 11 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
          <circle cx="8" cy="5.5" r="1" fill="currentColor"/>
        </svg>
      ),
      label: t('whatsapp_title'),
      value: '+55 (81) 99103-2272',
      href: 'https://wa.me/5581991032272',
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="2" y="4" width="12" height="9" rx="1" stroke="currentColor" strokeWidth="1"/>
          <path d="M2 5L8 9L14 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        </svg>
      ),
      label: t('email_title'),
      value: 'Osvaldo@bm5comex.com',
      href: 'mailto:Osvaldo@bm5comex.com',
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1"/>
          <path d="M8 4V8.5L11 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        </svg>
      ),
      label: t('hours_title'),
      value: 'Mon – Fri\n09:00 – 18:00 BRT',
      href: null,
    },
  ];

  return (
    <section
      ref={ref}
      className="section"
      id="contact"
      style={{ background: 'var(--navy-mid)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Gold diagonal line */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '40%',
        height: '100%',
        background: 'linear-gradient(135deg, transparent 50%, rgba(201,168,76,0.02) 50%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(3rem, 6vw, 6rem)',
          alignItems: 'flex-start',
        }}
        className="contact-grid"
        >
          {/* Left: Info */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateX(0)' : 'translateX(-20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}>
            <span className="eyebrow" style={{ display: 'block', marginBottom: '1rem' }}>{t('tag')}</span>
            <span className="gold-rule" style={{ display: 'block', marginBottom: '1.25rem' }} />
            <h2 className="section-headline" style={{ marginBottom: '1.25rem' }}>{t('headline')}</h2>
            <p style={{ fontSize: '0.9375rem', color: 'var(--ivory-dim)', lineHeight: 1.8, marginBottom: '3rem' }}>
              {t('sub')}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {infoItems.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    border: '1px solid rgba(201,168,76,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--gold)',
                    flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <p style={{
                      fontSize: '0.625rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--gold-dim)',
                      marginBottom: '0.25rem',
                    }}>
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        style={{
                          fontSize: '0.875rem',
                          color: 'var(--ivory)',
                          textDecoration: 'none',
                          whiteSpace: 'pre-line',
                          transition: 'color 0.2s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--ivory)')}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p style={{ fontSize: '0.875rem', color: 'var(--ivory)', whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateX(0)' : 'translateX(20px)',
            transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
          }}>
            {submitted ? (
              <div style={{
                border: '1px solid rgba(201,168,76,0.3)',
                padding: '3rem 2.5rem',
                textAlign: 'center',
                background: 'rgba(201,168,76,0.04)',
              }}>
                <div style={{ color: 'var(--gold)', marginBottom: '1.25rem' }}>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1"/>
                    <path d="M12 20L17 25L28 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '0.75rem' }}>
                  {t('form_success').split('.')[0]}
                </h3>
                <p style={{ color: 'var(--ivory-dim)', fontSize: '0.9375rem' }}>
                  {t('form_success').split('.')[1]}
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                }}
              >
                {/* Honeypot — hidden from real users, bots fill it */}
                <input
                  type="text"
                  name="_hp"
                  defaultValue=""
                  aria-hidden="true"
                  tabIndex={-1}
                  style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', height: 0, width: 0 }}
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div>
                    <label className="form-label">{t('form_name')}</label>
                    <input required name="name" className="form-field" type="text" placeholder="—" />
                  </div>
                  <div>
                    <label className="form-label">{t('form_company')}</label>
                    <input name="company" className="form-field" type="text" placeholder="—" />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div>
                    <label className="form-label">{t('form_email')}</label>
                    <input required name="email" className="form-field" type="email" placeholder="—" />
                  </div>
                  <div>
                    <label className="form-label">{t('form_phone')}</label>
                    <input name="phone" className="form-field" type="tel" placeholder="—" />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div>
                    <label className="form-label">{t('form_product')}</label>
                    <input name="product" className="form-field" type="text" placeholder="—" />
                  </div>
                  <div>
                    <label className="form-label">{t('form_volume')}</label>
                    <input name="volume" className="form-field" type="text" placeholder="—" />
                  </div>
                </div>
                <div>
                  <label className="form-label">{t('form_message')}</label>
                  <textarea
                    required
                    name="message"
                    className="form-field"
                    rows={5}
                    placeholder="—"
                    style={{ resize: 'vertical' }}
                  />
                </div>

                {/* Error message */}
                {error && (
                  <div style={{
                    fontSize: '0.8125rem',
                    color: '#E07070',
                    border: '1px solid rgba(224,112,112,0.25)',
                    padding: '0.75rem 1rem',
                    lineHeight: 1.5,
                  }}>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading}
                  style={{
                    justifyContent: 'center',
                    opacity: loading ? 0.7 : 1,
                    transition: 'opacity 0.2s, background 0.2s, transform 0.2s',
                  }}
                >
                  {loading ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ animation: 'spin 0.8s linear infinite' }}>
                        <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="20" strokeDashoffset="10" strokeLinecap="round"/>
                      </svg>
                      {t('form_submit')}
                    </span>
                  ) : (
                    <>
                      {t('form_submit')}
                      <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                        <path d="M1 5H13M9 1L13 5L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </>
                  )}
                </button>

                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
