// Single source for portfolio content. Pages read it at build time and the
// /api/* routes serve the same data, so the two can never drift apart.
import profile from '@/data/profile.json';
import experience from '@/data/experience.json';
import education from '@/data/education.json';
import publications from '@/data/publications.json';
import skills from '@/data/skills.json';
import rawProjects from '@/data/projects.json';

export const CATEGORIES = {
  basicweb: 'Web',
  ml: 'Machine Learning',
  android: 'Android',
};

// "#" and "" were placeholders in the old JSON; treat them as "no link".
const cleanLink = (url) => (url && url !== '#' ? url : null);

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatMonth(ym) {
  const [y, m] = ym.split('-').map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

function monthsBetween(start, end) {
  const [sy, sm] = start.split('-').map(Number);
  const [ey, em] = end.split('-').map(Number);
  return (ey - sy) * 12 + (em - sm) + 1;
}

function formatDuration(months) {
  const y = Math.floor(months / 12);
  const m = months % 12;
  const parts = [];
  if (y) parts.push(`${y} yr${y > 1 ? 's' : ''}`);
  if (m) parts.push(`${m} mo${m > 1 ? 's' : ''}`);
  return parts.join(' ');
}

export function getProfile() {
  return profile;
}

export function getExperience(now = new Date()) {
  const current = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  return experience.map((job) => ({
    ...job,
    period: `${formatMonth(job.start)} – ${job.end ? formatMonth(job.end) : 'Present'}`,
    duration: formatDuration(monthsBetween(job.start, job.end || current)),
    current: !job.end,
  }));
}

export function getEducation() {
  return education;
}

export function getPublications() {
  return publications.map((p) => ({
    ...p,
    displayDate: new Date(p.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
  }));
}

export function getSkills() {
  return skills.map((s) => ({ invertDark: false, ...s }));
}

export function getProjects() {
  return rawProjects.map((p, i) => ({
    id: i + 1,
    slug: p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    name: p.name.replace(/-/g, ' '),
    description: p.desc,
    image: `/assets/images/projects/${p.image}.png`,
    category: p.category,
    categoryLabel: CATEGORIES[p.category] || p.category,
    links: { view: cleanLink(p.links.view), code: cleanLink(p.links.code) },
  }));
}
