// Vercel Serverless Function — Contact form proxy with anti-spam
// Endpoint: /api/contact
// Flow: client → /api/contact (honeypot check + rate limit + validation) → Formspree (server-side)
// Formspree ID disimpan di env FORMSPREE_ID (bukan di client bundle)

const FORMSPREE_ID = process.env.FORMSPREE_ID || 'xpwybogk';
const FORMSPREE_URL = `https://formspree.io/f/${FORMSPREE_ID}`;

// Simple file-backed rate limit store (survives cold starts; shared per instance)
// Format: { ip: { count, firstTs } }
const RATE_LIMIT = {
  windowMs: 10 * 60 * 1000, // 10 minutes
  maxRequests: 3,           // max 3 submissions per window
  store: new Map(),
};

function getClientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (fwd) {
    return String(fwd).split(',')[0].trim();
  }
  return req.headers['x-real-ip'] || req.headers['x-vercel-forwarded-for'] || 'unknown';
}

function checkRateLimit(ip) {
  const now = Date.now();
  const record = RATE_LIMIT.store.get(ip);
  if (!record || now - record.firstTs > RATE_LIMIT.windowMs) {
    RATE_LIMIT.store.set(ip, { count: 1, firstTs: now });
    return { allowed: true, remaining: RATE_LIMIT.maxRequests - 1 };
  }
  if (record.count >= RATE_LIMIT.maxRequests) {
    return { allowed: false, remaining: 0 };
  }
  record.count += 1;
  return { allowed: true, remaining: RATE_LIMIT.maxRequests - record.count };
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

export default async function handler(req, res) {
  // Only POST allowed
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Parse body (JSON or form-encoded)
  let body = {};
  try {
    if (req.headers['content-type']?.includes('application/json')) {
      body = req.body || {};
    } else {
      body = req.body || {};
    }
  } catch (e) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  // --- HONEYPOT: hidden field must be EMPTY ---
  // Bots fill every field they see; humans never see the hidden field
  const honeypot = body.website || body.company || body._honeypot;
  if (honeypot && String(honeypot).trim() !== '') {
    // Silently pretend success (don't let bot know it was caught)
    return res.status(200).json({ ok: true, _honeypot: true });
  }

  // --- Rate limit per IP ---
  const ip = getClientIp(req);
  const rate = checkRateLimit(ip);
  res.setHeader('X-RateLimit-Limit', RATE_LIMIT.maxRequests);
  res.setHeader('X-RateLimit-Remaining', rate.remaining);
  if (!rate.allowed) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  // --- Server-side validation ---
  const name = String(body.name || '').trim().slice(0, 200);
  const email = String(body.email || '').trim().slice(0, 200);
  const message = String(body.message || '').trim().slice(0, 5000);

  if (!name) return res.status(400).json({ error: 'Name is required.' });
  if (!isValidEmail(email)) return res.status(400).json({ error: 'Valid email is required.' });
  if (!message || message.length < 3) return res.status(400).json({ error: 'Message is too short.' });

  // --- Forward to Formspree (server-side, no secret exposed) ---
  try {
    const formData = new URLSearchParams();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);

    const fsRes = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
      body: formData.toString(),
    });

    if (fsRes.ok) {
      return res.status(200).json({ ok: true });
    }
    const fsJson = await fsRes.json().catch(() => ({}));
    return res.status(502).json({ error: fsJson.error || 'Upstream error.' });
  } catch (err) {
    return res.status(502).json({ error: 'Failed to reach mail service.' });
  }
}
