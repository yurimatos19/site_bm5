import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL   = process.env.CONTACT_TO_EMAIL   ?? 'Osvaldo@bm5comex.com';
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev';

// Rate limit: track IPs in-memory (resets on cold start — good enough for MVP)
const rateMap = new Map<string, number[]>();
const RATE_WINDOW_MS = 60_000; // 1 minute
const RATE_MAX       = 3;       // max 3 submissions per IP per minute

function isRateLimited(ip: string): boolean {
  const now  = Date.now();
  const hits = (rateMap.get(ip) ?? []).filter(t => now - t < RATE_WINDOW_MS);
  hits.push(now);
  rateMap.set(ip, hits);
  return hits.length > RATE_MAX;
}

export async function POST(req: NextRequest) {
  // ── IP rate limiting ──────────────────────────────────────────────────────
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  // ── Parse body ────────────────────────────────────────────────────────────
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { name, company, email, phone, product, volume, message, _hp } = body;

  // ── Honeypot: bots fill hidden fields, humans leave them empty ────────────
  if (_hp) {
    // Silently accept so bots don't know they were caught
    return NextResponse.json({ ok: true });
  }

  // ── Basic validation ──────────────────────────────────────────────────────
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: 'name, email and message are required' },
      { status: 422 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 422 });
  }

  // ── Send email via Resend ─────────────────────────────────────────────────
  const subject = `[BM5 Comex] New enquiry from ${name}${company ? ` — ${company}` : ''}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: Georgia, serif; background: #05070D; color: #F2EDE3; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 0 auto; padding: 40px 32px; }
    .logo { font-size: 28px; letter-spacing: -0.02em; margin-bottom: 32px; }
    .logo span { color: #C4963A; }
    .divider { border: none; border-top: 1px solid rgba(196,150,58,0.3); margin: 24px 0; }
    .field-label { font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase;
                   color: rgba(200,192,168,0.5); margin-bottom: 4px; }
    .field-value { font-size: 15px; color: #F2EDE3; margin-bottom: 20px; line-height: 1.6; }
    .message-box { background: rgba(196,150,58,0.06); border: 1px solid rgba(196,150,58,0.15);
                   padding: 20px 24px; margin-top: 8px; white-space: pre-wrap; }
    .footer { margin-top: 40px; font-size: 11px; color: rgba(200,192,168,0.35);
              letter-spacing: 0.08em; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="logo">BM<span>5</span> <small style="font-size:11px;letter-spacing:0.2em;color:rgba(200,192,168,0.4);">COMEX</small></div>
    <h2 style="font-size:20px;font-weight:400;margin:0 0 8px;">New Contact Enquiry</h2>
    <p style="font-size:13px;color:rgba(200,192,168,0.5);margin:0 0 32px;">
      Submitted via bm5comex.com
    </p>
    <hr class="divider" />

    <div class="field-label">Name</div>
    <div class="field-value">${escHtml(name)}</div>

    ${company ? `<div class="field-label">Company</div><div class="field-value">${escHtml(company)}</div>` : ''}

    <div class="field-label">Email</div>
    <div class="field-value"><a href="mailto:${escHtml(email)}" style="color:#C4963A;">${escHtml(email)}</a></div>

    ${phone ? `<div class="field-label">Phone / WhatsApp</div><div class="field-value">${escHtml(phone)}</div>` : ''}
    ${product ? `<div class="field-label">Product of Interest</div><div class="field-value">${escHtml(product)}</div>` : ''}
    ${volume ? `<div class="field-label">Desired Volume</div><div class="field-value">${escHtml(volume)}</div>` : ''}

    <hr class="divider" />
    <div class="field-label">Message</div>
    <div class="message-box">${escHtml(message)}</div>

    <div class="footer">
      Sent from BM5 Comex contact form · ${new Date().toUTCString()}
    </div>
  </div>
</body>
</html>`;

  const text = [
    `New enquiry — BM5 Comex`,
    ``,
    `Name:    ${name}`,
    company  ? `Company: ${company}` : '',
    `Email:   ${email}`,
    phone    ? `Phone:   ${phone}`   : '',
    product  ? `Product: ${product}` : '',
    volume   ? `Volume:  ${volume}`  : '',
    ``,
    `Message:`,
    message,
    ``,
    `— Sent from bm5comex.com · ${new Date().toUTCString()}`,
  ].filter(l => l !== null).join('\n');

  try {
    const { error } = await resend.emails.send({
      from:    FROM_EMAIL,
      to:      TO_EMAIL,
      replyTo: email,
      subject,
      html,
      text,
    });

    if (error) {
      console.error('[contact] Resend error:', error);
      return NextResponse.json({ error: 'Email delivery failed' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] Unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/** Minimal HTML escaping — prevents injected tags in the email body */
function escHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
