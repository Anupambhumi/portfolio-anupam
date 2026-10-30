import crypto from 'node:crypto';

export function allowMethods(req, res, methods) {
  if (methods.includes(req.method)) return true;
  res.setHeader('Allow', methods.join(', '));
  res.status(405).json({ error: `Method ${req.method} not allowed` });
  return false;
}

export function clientIp(req) {
  const forwarded = req.headers['x-nf-client-connection-ip'] || req.headers['x-forwarded-for'];
  return (Array.isArray(forwarded) ? forwarded[0] : forwarded || req.socket?.remoteAddress || 'unknown')
    .split(',')[0]
    .trim();
}

// Best-effort, per-instance limiter. Serverless instances are short-lived, so
// this only stops bursts; the honeypot field catches most bots.
const hits = new Map();

export function rateLimited(key, { limit, windowMs }) {
  const now = Date.now();
  const recent = (hits.get(key) || []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > limit;
}

// Admin endpoints are only enabled when ADMIN_TOKEN is set.
export function requireAdmin(req, res) {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) {
    res.status(503).json({ error: 'Admin is disabled: set ADMIN_TOKEN to enable it.' });
    return false;
  }
  const given = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  const a = crypto.createHash('sha256').update(given).digest();
  const b = crypto.createHash('sha256').update(expected).digest();
  if (!given || !crypto.timingSafeEqual(a, b)) {
    res.status(401).json({ error: 'Invalid admin token' });
    return false;
  }
  return true;
}

export function sendData(res, data, maxAge = 300) {
  res.setHeader('Cache-Control', `public, s-maxage=${maxAge}, stale-while-revalidate=86400`);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json(data);
}
