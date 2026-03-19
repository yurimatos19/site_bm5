import { ImageResponse } from 'next/og';

export const size        = { width: 512, height: 512 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#05070D',
          position: 'relative',
        }}
      >
        {/* Subtle gold glow */}
        <div
          style={{
            position: 'absolute',
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(196,150,58,0.18) 0%, transparent 65%)',
          }}
        />

        {/* BM5 text mark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '2px',
            position: 'relative',
          }}
        >
          <span
            style={{
              fontFamily: 'serif',
              fontSize: '200px',
              fontWeight: 700,
              color: '#F2EDE3',
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >
            BM
          </span>
          <span
            style={{
              fontFamily: 'serif',
              fontSize: '200px',
              fontWeight: 700,
              color: '#C4963A',
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >
            5
          </span>
        </div>

        {/* Bottom gold bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            left: '80px',
            right: '80px',
            height: '3px',
            background: 'linear-gradient(90deg, transparent, #C4963A 30%, #DFB56A 70%, transparent)',
          }}
        />
      </div>
    ),
    { width: 512, height: 512 }
  );
}
