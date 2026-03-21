'use client';
import { useState, useEffect } from 'react';

const SECTIONS = [
  { label: 'Início',        offset: 0 },
  { label: 'Sobre',         offset: 1200 },
  { label: 'Presença',      offset: 2800 },
  { label: 'Produtos',      offset: 5000 },
  { label: 'Osvaldo',       offset: 9500 },
  { label: 'Como Operamos', offset: 13000 },
  { label: 'Contato',       offset: 17000 },
];

function getActiveIndex(scrollY: number): number {
  // Walk backwards to find the highest threshold we've crossed
  for (let i = SECTIONS.length - 1; i >= 0; i--) {
    if (scrollY >= SECTIONS[i].offset - 200) return i;
  }
  return 0;
}

export default function SectionNav() {
  const [scrollY, setScrollY] = useState(0);
  const [active, setActive] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      setActive(getActiveIndex(y));
      setVisible(y >= 600);
    };

    // Set initial values
    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (index: number) => {
    const section = SECTIONS[index];

    // For "Como Operamos" try to use the known id first
    if (index === 5) {
      const el = document.getElementById('como-operamos');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }

    window.scrollTo({ top: section.offset, behavior: 'smooth' });
  };

  return (
    <nav
      aria-label="Navegação por seção"
      style={{
        position: 'fixed',
        right: '1.5rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.4s ease',
      }}
    >
      {SECTIONS.map((section, i) => {
        const isActive = active === i;
        const isHovered = hoveredIndex === i;

        return (
          <div
            key={i}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            {/* Tooltip */}
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                right: 'calc(100% + 0.6rem)',
                whiteSpace: 'nowrap',
                fontSize: '0.7rem',
                fontWeight: 500,
                letterSpacing: '0.05em',
                color: 'var(--ivory)',
                backgroundColor: 'rgba(5, 7, 13, 0.82)',
                backdropFilter: 'blur(6px)',
                border: '1px solid rgba(196, 160, 80, 0.25)',
                borderRadius: '4px',
                padding: '0.25rem 0.5rem',
                pointerEvents: 'none',
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? 'translateX(0)' : 'translateX(4px)',
                transition: 'opacity 0.2s ease, transform 0.2s ease',
              }}
            >
              {section.label}
            </span>

            {/* Dot button */}
            <button
              onClick={() => handleClick(i)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              aria-label={`Ir para seção: ${section.label}`}
              style={{
                width: isActive ? '12px' : '8px',
                height: isActive ? '12px' : '8px',
                borderRadius: '50%',
                border: isActive
                  ? '2px solid var(--gold)'
                  : '1.5px solid rgba(196, 160, 80, 0.45)',
                backgroundColor: isActive ? 'var(--gold)' : 'transparent',
                cursor: 'pointer',
                padding: 0,
                outline: 'none',
                transition: 'width 0.25s ease, height 0.25s ease, background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
                boxShadow: isActive
                  ? '0 0 6px 2px rgba(196, 160, 80, 0.35)'
                  : isHovered
                  ? '0 0 0 3px rgba(196, 160, 80, 0.15)'
                  : 'none',
                flexShrink: 0,
              }}
            />
          </div>
        );
      })}
    </nav>
  );
}
