import { getExperience } from '@/lib/content';
import { allowMethods, sendData } from '@/lib/server/api';

export default function handler(req, res) {
  if (!allowMethods(req, res, ['GET'])) return;
  sendData(res, { experience: getExperience() });
}
