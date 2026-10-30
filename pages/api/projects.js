import { getProjects } from '@/lib/content';
import { allowMethods, sendData } from '@/lib/server/api';

const ALIASES = { web: 'basicweb' };

export default function handler(req, res) {
  if (!allowMethods(req, res, ['GET'])) return;
  const { category } = req.query;
  let projects = getProjects();
  if (category) {
    const wanted = ALIASES[category] || category;
    projects = projects.filter((p) => p.category === wanted);
  }
  sendData(res, { projects });
}
