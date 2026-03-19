import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';

// No 'edge' runtime — use Node.js so generateStaticParams works
export const alt         = 'BM5 Comex — Inteligência Global em Commodities';
export const size        = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });

  const line1 = t('headline1');
  const line2 = t('headline2');
  const line3 = t('headline3');
  const sub   = t('sub').slice(0, 120) + '…';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#05070D',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Top gold bar */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, transparent, #C4963A 30%, #DFB56A 70%, transparent)',
          }}
        />

        {/* Left fade for text legibility */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, #05070D 45%, rgba(5,7,13,0.6) 75%, transparent)',
          }}
        />

        {/* Glow top-right */}
        <div
          style={{
            position: 'absolute',
            top: '-200px',
            right: '-150px',
            width: '700px',
            height: '700px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(196,150,58,0.12) 0%, transparent 65%)',
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            padding: '56px 72px',
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
            <span
              style={{
                fontFamily: 'serif',
                fontSize: '40px',
                fontWeight: 600,
                color: '#F2EDE3',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              BM
            </span>
            <span
              style={{
                fontFamily: 'serif',
                fontSize: '40px',
                fontWeight: 600,
                color: '#C4963A',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              5
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(200,192,168,0.5)',
                marginLeft: '10px',
                marginBottom: '-4px',
              }}
            >
              Comex
            </span>
          </div>

          {/* Main headline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
            {/* Eyebrow */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '20px',
              }}
            >
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  background: '#C4963A',
                  transform: 'rotate(45deg)',
                }}
              />
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: '#C4963A',
                }}
              >
                Recife · Pernambuco · Brasil
              </span>
            </div>

            {/* Headline */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: 'serif',
                  fontSize: '86px',
                  fontWeight: 500,
                  color: '#F2EDE3',
                  lineHeight: 0.95,
                  letterSpacing: '-0.03em',
                }}
              >
                {line1}
              </span>
              <span
                style={{
                  fontFamily: 'serif',
                  fontSize: '86px',
                  fontWeight: 300,
                  color: 'rgba(200,192,168,0.55)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.03em',
                }}
              >
                {line2}
              </span>
              <span
                style={{
                  fontFamily: 'serif',
                  fontSize: '86px',
                  fontWeight: 500,
                  fontStyle: 'italic',
                  color: '#C4963A',
                  lineHeight: 0.95,
                  letterSpacing: '-0.03em',
                }}
              >
                {line3}
              </span>
            </div>

            {/* Separator */}
            <div
              style={{
                width: '48px',
                height: '1px',
                background: '#C4963A',
                marginTop: '28px',
                marginBottom: '20px',
              }}
            />

            {/* Sub */}
            <span
              style={{
                fontSize: '16px',
                color: 'rgba(200,192,168,0.6)',
                lineHeight: 1.6,
                maxWidth: '540px',
              }}
            >
              {sub}
            </span>
          </div>

          {/* Bottom stats row */}
          <div style={{ display: 'flex', gap: '48px' }}>
            {[
              { value: '30+', label: 'Anos' },
              { value: '7',   label: 'Mercados' },
              { value: '100%', label: 'Compliance' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontFamily: 'serif',
                    fontSize: '36px',
                    fontWeight: 300,
                    color: '#F2EDE3',
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                  }}
                >
                  {s.value}
                </span>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 500,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(200,192,168,0.4)',
                    marginTop: '6px',
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom gold bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(196,150,58,0.3) 50%, transparent)',
          }}
        />
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
