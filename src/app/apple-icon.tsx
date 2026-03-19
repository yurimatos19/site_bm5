import { ImageResponse } from 'next/og';

export const size        = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
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
        {/* Subtle glow */}
        <div
          style={{
            position: 'absolute',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(196,150,58,0.2) 0%, transparent 65%)',
          }}
        />

        {/* BM5 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '1px',
            position: 'relative',
          }}
        >
          <span
            style={{
              fontFamily: 'serif',
              fontSize: '72px',
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
              fontSize: '72px',
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
            bottom: '22px',
            left: '28px',
            right: '28px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #C4963A 30%, #DFB56A 70%, transparent)',
          }}
        />
      </div>
    ),
    { width: 180, height: 180 }
  );
}
