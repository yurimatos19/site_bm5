'use client';

export default function ShipDivider() {
  return (
    <div style={{ position: 'relative', height: '420px', overflow: 'hidden' }}>
      {/* Ship photo */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url('/cargo-ship.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        backgroundAttachment: 'fixed',
      }} />
      {/* Gradient overlays */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, var(--navy) 0%, rgba(6,13,26,0.45) 30%, rgba(6,13,26,0.45) 70%, var(--navy) 100%)',
      }} />
      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
        padding: '0 2rem',
        textAlign: 'center',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
        }}>
          <span style={{ display: 'block', width: '60px', height: '1px', background: 'var(--gold-dim)' }} />
          <span style={{
            fontSize: '0.6875rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            fontWeight: 500,
          }}>
            Origem Brasileira · Destino Global
          </span>
          <span style={{ display: 'block', width: '60px', height: '1px', background: 'var(--gold-dim)' }} />
        </div>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.5rem, 3.5vw, 2.75rem)',
          fontWeight: 300,
          color: 'var(--ivory)',
          lineHeight: 1.25,
          maxWidth: '800px',
          letterSpacing: '-0.02em',
        }}>
          Do Porto de Santos ao mundo —<br />
          <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Origem Brasileira</em>, destino global
        </p>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginTop: '0.5rem',
        }}>
          {['Porto de Santos', 'Porto de Suape', 'Porto de Paranaguá', 'Porto de Itajaí'].map((p, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'rgba(196,150,58,0.7)', letterSpacing: '0.1em' }}>{p}</span>
              {i < 3 && <span style={{ color: 'rgba(196,150,58,0.3)', fontSize: '0.75rem' }}>·</span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
