import { allowMethods, clientIp, rateLimited } from '@/lib/server/api';
import { publicStats, recordVisit } from '@/lib/server/stats';

const BOT_RE = /bot|crawl|spider|slurp|preview|lighthouse|headless/i;

export default async function handler(req, res) {
  if (!allowMethods(req, res, ['POST'])) return;

  const pathname = typeof req.body?.path === 'string' ? req.body.path.split(/[?#]/)[0].slice(0, 100) : '';
  if (!pathname.startsWith('/') || pathname.startsWith('/admin') || BOT_RE.test(req.headers['user-agent'] || '')) {
    return res.status(204).end();
  }
  if (rateLimited(`visit:${clientIp(req)}`, { limit: 60, windowMs: 60 * 1000 })) return res.status(204).end();

  try {
    const stats = await recordVisit(pathname);
    res.status(200).json(publicStats(stats));
  } catch (err) {
    console.error('Recording visit failed', err);
    res.status(204).end();
  }
}
