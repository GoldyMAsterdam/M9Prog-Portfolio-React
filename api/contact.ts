import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'POST only' });
    return;
  }

  const { name, email, message, website } = req.body ?? {};

  // honeypot
  if (website) {
    res.status(200).json({ ok: true });
    return;
  }

  const valid =
    typeof name === 'string' && name.trim() && name.length <= 100 &&
    typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 200 &&
    typeof message === 'string' && message.trim() && message.length <= 5000;

  if (!valid) {
    res.status(400).json({ error: 'Invalid form' });
    return;
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    res.status(500).json({ error: 'RESEND_API_KEY is not configured' });
    return;
  }

  // free tier only sends to the account's own address
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'Portfolio <onboarding@resend.dev>',
      to: 'webtychoboom@gmail.com',
      reply_to: email,
      subject: `Portfolio: ${name}`,
      text: message,
    }),
  });

  if (!response.ok) {
    res.status(502).json({ error: 'Mail provider failed' });
    return;
  }

  res.status(200).json({ ok: true });
}
