import { allowMethods, requireAdmin } from '@/lib/server/api';
import { getStats } from '@/lib/server/stats';

export default async function handler(req, res) {
  if (!allowMethods(req, res, ['GET'])) return;
  if (!requireAdmin(req, res)) return;
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json(await getStats());
}
