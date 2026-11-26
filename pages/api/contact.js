import { allowMethods, clientIp, rateLimited } from '@/lib/server/api';
import { notifyByEmail, saveMessage, validateMessage } from '@/lib/server/messages';

export default async function handler(req, res) {
  if (!allowMethods(req, res, ['POST'])) return;

  const body = req.body || {};
  // Honeypot: real visitors never see or fill this field.
  if (body.website) return res.status(200).json({ ok: true });

  if (rateLimited(`contact:${clientIp(req)}`, { limit: 5, windowMs: 60 * 60 * 1000 })) {
    return res.status(429).json({ error: 'Too many messages. Please try again later.' });
  }

  const { clean, errors } = validateMessage(body);
  if (Object.keys(errors).length) return res.status(400).json({ error: 'Please fix the highlighted fields.', errors });

  try {
    const message = await saveMessage({ ...clean, userAgent: req.headers['user-agent'] || '' });
    await notifyByEmail(message).catch((err) => console.error('Contact email failed', err));
    return res.status(201).json({ ok: true });
  } catch (err) {
    console.error('Saving contact message failed', err);
    return res.status(500).json({ error: 'Could not send your message right now. Please email me instead.' });
  }
}
