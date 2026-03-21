'use client';

import { useEffect, useRef, useState } from 'react';

const STEPS = [
  {
    n: '01',
    title: 'ICPO + KYC',
    body: 'Comprador envia ICPO com KYC completo e BCL/RWA verificável para o e-mail corporativo de compliance.',
    tag: 'Iniciação',
  },
  {
    n: '02',
    title: 'FCO do Vendedor',
    body: 'Vendedor emite a Full Corporate Offer (FCO) com condições, preço e especificações do produto.',
    tag: 'Oferta',
  },
  {
    n: '03',
    title: 'POF via MT799',
    body: 'Comprador assina a FCO e envia Proof of Funds (POF) via MT799 bank-to-bank.',
    tag: 'Fundos',
  },
  {
    n: '04',
    title: 'SPA Preliminar + SBLC',
    body: 'Vendedor emite SPA preliminar. Comprador revisa, assina e envia o texto da SBLC para checagem no banco do vendedor.',
    tag: 'Contrato',
  },
  {
    n: '05',
    title: 'SPA Final — 15 dias',
    body: 'Vendedor devolve SPA final assinado. Após aprovação da minuta, a SBLC deve ser emitida em até 15 dias.',
    tag: 'Prazo',
  },
  {
    n: '06',
    title: 'MT760 → POP → SBLC Operativa',
    body: 'Comprador envia verbiage da MT760. Vendedor aceita e envia POP bank-to-bank. Com POP validada, comprador emite SBLC operativa.',
    tag: 'Instrumento',
  },
  {
    n: '07',
    title: 'Confirmação de SWIFTs',
    body: 'Comprador encaminha cópia de todos os SWIFTs ao banco do vendedor para conferência e validação.',
    tag: 'Confirmação',
  },
  {
    n: '08',
    title: 'Proforma Invoice',
    body: 'Vendedor emite Proforma Invoice; comprador revisa e assina formalizando as condições do embarque.',
    tag: 'Fatura',
  },
  {
    n: '09',
    title: 'Performance Bond 2%',
    body: 'PB de 2% emitida pelo vendedor em até 10 dias após a ativação do instrumento financeiro.',
    tag: 'Garantia',
  },
  {
    n: '10',
    title: 'Embarque → MT103',
    body: 'Documentos originais de embarque seguem ao banco do comprador, que libera o MT103. O ciclo se repete a cada remessa.',
    tag: 'Entrega',
  },
];

const GUARANTEES = [
  'SBLC transferível, divisível e irrevogável (12+1)',
  '100% cashback garantido conforme instrumento',
  '1 mês de valor facial em segurança',
  'Bancos Top-50 em ambas as pontas',
  'Primeira entrega em 30–45 dias após SBLC ativada',
];

export default function HowWeOperateSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="como-operamos"
      style={{
        background: 'var(--navy)',
        position: 'relative',
        padding: 'clamp(4rem, 8vw, 7rem) 0',
      }}
    >
      {/* Top rule */}
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
          gap: '2rem',
          marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }} className="how-header">
          <div>
            <span className="eyebrow" style={{ display: 'block', marginBottom: '1rem' }}>
              Procedimentos ICC / OMC
            </span>
            <span className="gold-rule" style={{ display: 'block', marginBottom: '1rem' }} />
            <h2 className="section-headline">Como Operamos</h2>
          </div>
          <div>
            <p style={{
              fontSize: '0.875rem',
              color: 'var(--ivory-dim)',
              maxWidth: '340px',
              lineHeight: 1.75,
              textAlign: 'right',
            }}>
              Fluxo padronizado para bancos Top-50 · Modelo 12 meses rolling · SLA logístico garantido
            </p>
          </div>
        </div>

        {/* Steps grid */}
        <div className="how-steps-grid" style={{ marginBottom: '3rem' }}>
          {STEPS.map((step, i) => (
            <div
              key={step.n}
              className="how-step-card"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.6s ease ${i * 0.05}s, transform 0.6s ease ${i * 0.05}s`,
              }}
            >
              {/* Step number */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.875rem',
              }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'rgba(212,165,60,0.15)',
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                }}>
                  {step.n}
                </span>
                <span style={{
                  fontSize: '0.5rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  background: 'rgba(212,165,60,0.08)',
                  border: '1px solid rgba(212,165,60,0.2)',
                  padding: '0.15rem 0.5rem',
                }}>
                  {step.tag}
                </span>
              </div>

              <div style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--ivory)',
                marginBottom: '0.5rem',
                letterSpacing: '-0.01em',
                lineHeight: 1.3,
              }}>
                {step.title}
              </div>

              <div style={{
                fontSize: '0.75rem',
                color: 'var(--ivory-dim)',
                lineHeight: 1.65,
              }}>
                {step.body}
              </div>
            </div>
          ))}
        </div>

        {/* Guarantees strip */}
        <div style={{
          background: 'rgba(212,165,60,0.04)',
          border: '1px solid rgba(212,165,60,0.15)',
          padding: 'clamp(1.5rem, 3vw, 2rem) clamp(1.5rem, 4vw, 2.5rem)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.7s ease 0.55s',
        }}>
          <div style={{
            fontSize: '0.5rem',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            opacity: 0.7,
            marginBottom: '1rem',
          }}>
            Garantias Exigidas — Tier Banco Top-50
          </div>
          <div className="how-guarantees">
            {GUARANTEES.map((g, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem' }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0, marginTop: '2px' }}>
                  <path d="M2 6L5 9L10 3" stroke="rgba(212,165,60,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ fontSize: '0.8125rem', color: 'var(--ivory-dim)', lineHeight: 1.5 }}>{g}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance clause note */}
        <div style={{
          marginTop: '1.5rem',
          padding: 'clamp(1.25rem, 2.5vw, 1.75rem) clamp(1.5rem, 4vw, 2.5rem)',
          borderLeft: '3px solid var(--gold)',
          background: 'rgba(212,165,60,0.03)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.7s ease 0.65s',
        }}>
          <div style={{
            fontSize: '0.5rem',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            opacity: 0.7,
            marginBottom: '0.625rem',
          }}>
            Cláusula de Veracidade — Obrigatória em Todas as Operações
          </div>
          <p style={{ fontSize: '0.8125rem', color: 'var(--ivory-dim)', lineHeight: 1.75, margin: 0 }}>
            Todas as negociações intermediadas pela BM5 exigem declaração de veracidade sob plena responsabilidade civil e penal.
            Seller deve possuir controle direto ou autorização formal do produto (POP, CIS, certificados). Buyer deve apresentar
            prova de fundos legítima (BCL, RWA, POF). Documentação falsa ou capacidade financeira simulada resultará em exclusão
            imediata da operação e reporte às autoridades competentes.
          </p>
        </div>
      </div>

      <style>{`
        .how-steps-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1.5px;
          background: rgba(212,165,60,0.08);
        }
        .how-step-card {
          background: var(--navy);
          padding: clamp(1.25rem, 2.5vw, 1.75rem);
          border-top: 2px solid transparent;
          transition: border-top-color 0.25s ease, background 0.25s ease;
          position: relative;
        }
        .how-step-card:hover {
          background: var(--navy-mid);
          border-top-color: var(--gold);
        }
        .how-guarantees {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
        }
        .how-header {
          grid-template-columns: 1fr auto;
        }
        @media (max-width: 1100px) {
          .how-steps-grid { grid-template-columns: repeat(4, 1fr); }
        }
        @media (max-width: 860px) {
          .how-steps-grid { grid-template-columns: repeat(2, 1fr); }
          .how-guarantees { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .how-steps-grid { grid-template-columns: 1fr 1fr; }
          .how-guarantees { grid-template-columns: 1fr; }
          .how-header { grid-template-columns: 1fr !important; }
          .how-header > div:last-child p { text-align: left !important; }
        }
        @media (max-width: 400px) {
          .how-steps-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
