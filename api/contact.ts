import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  try {
    const { fullName, email, company, message = '' } = req.body || {};
    if (!fullName || !email) {
      return res.status(400).json({ ok: false, error: 'Missing required fields' });
    }

    const to = process.env.CONTACT_TO || process.env.CONTACT_FROM || '';
    if (!to) {
      return res.status(500).json({ ok: false, error: 'CONTACT_TO or CONTACT_FROM env var not set' });
    }

    const subject = `Portfolio message from ${fullName}`;
    const text = [
      `Name: ${fullName}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : undefined,
      message ? `Message: ${message}` : undefined,
    ].filter(Boolean).join('\n');

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const from = process.env.CONTACT_FROM || 'Portfolio <onboarding@resend.dev>';

    if (!RESEND_API_KEY) {
      return res.status(500).json({ ok: false, error: 'RESEND_API_KEY not set' });
    }

    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        text,
      }),
    });

    if (!r.ok) {
      const err = await r.text();
      return res.status(500).json({ ok: false, error: err || 'Email send failed' });
    }

    return res.status(200).json({ ok: true });
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message || 'Unexpected error' });
  }
}

