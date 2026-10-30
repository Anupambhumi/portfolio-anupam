import { openStore } from './store';

const store = () => openStore('visitor-stats');
const KEY = 'summary';
const MAX_DAYS = 90;

const empty = () => ({ total: 0, paths: {}, days: {}, updatedAt: null });

export async function getStats() {
  return (await store().get(KEY)) || empty();
}

// Counts are read-modify-write, so two visits landing in the same instant can
// lose one increment. That is fine for a portfolio view counter.
export async function recordVisit(pathname) {
  const stats = await getStats();
  const day = new Date().toISOString().slice(0, 10);

  stats.total += 1;
  stats.paths[pathname] = (stats.paths[pathname] || 0) + 1;
  stats.days[day] = (stats.days[day] || 0) + 1;

  const days = Object.keys(stats.days).sort();
  for (const old of days.slice(0, Math.max(0, days.length - MAX_DAYS))) delete stats.days[old];

  stats.updatedAt = new Date().toISOString();
  await store().set(KEY, stats);
  return stats;
}

export function publicStats(stats) {
  const today = new Date().toISOString().slice(0, 10);
  return { total: stats.total, today: stats.days[today] || 0 };
}
