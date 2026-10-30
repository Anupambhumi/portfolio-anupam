import { allowMethods, sendData } from '@/lib/server/api';

export default function handler(req, res) {
  if (!allowMethods(req, res, ['GET'])) return;
  sendData(res, {
    name: 'Anupam portfolio API',
    endpoints: {
      'GET /api/profile': 'Name, title, summary, socials',
      'GET /api/projects': 'All projects (filter with ?category=web|ml|android)',
      'GET /api/skills': 'Skills list',
      'GET /api/experience': 'Work experience',
      'GET /api/education': 'Education',
      'GET /api/publications': 'Publications',
      'GET /api/stats': 'Total and today page views',
      'POST /api/contact': 'Send a message { name, email, subject?, message }',
    },
  });
}
