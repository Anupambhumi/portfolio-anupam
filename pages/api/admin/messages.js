import { allowMethods, requireAdmin } from '@/lib/server/api';
import { deleteMessage, listMessages, updateMessage } from '@/lib/server/messages';

export default async function handler(req, res) {
  if (!allowMethods(req, res, ['GET', 'PATCH', 'DELETE'])) return;
  if (!requireAdmin(req, res)) return;
  res.setHeader('Cache-Control', 'no-store');

  const id = typeof req.query.id === 'string' ? req.query.id : null;
  if (req.method === 'GET') return res.status(200).json({ messages: await listMessages() });
  if (!id) return res.status(400).json({ error: 'Missing ?id=' });

  if (req.method === 'PATCH') {
    const message = await updateMessage(id, req.body || {});
    return message ? res.status(200).json({ message }) : res.status(404).json({ error: 'Not found' });
  }
  await deleteMessage(id);
  return res.status(204).end();
}
