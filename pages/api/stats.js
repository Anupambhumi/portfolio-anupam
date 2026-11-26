import { allowMethods } from '@/lib/server/api';
import { getStats, publicStats } from '@/lib/server/stats';

export default async function handler(req, res) {
  if (!allowMethods(req, res, ['GET'])) return;
  res.setHeader('Cache-Control', 'public, s-maxage=60');
  res.status(200).json(publicStats(await getStats()));
}
