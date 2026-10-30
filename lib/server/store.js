// Tiny key/value store for the backend.
// On Netlify it uses Netlify Blobs (persistent, zero config). Anywhere else
// (local `next dev` / `next start`) it falls back to JSON files in `.data/`.
import fs from 'node:fs/promises';
import path from 'node:path';
import { getStore } from '@netlify/blobs';

const DATA_DIR = path.join(process.cwd(), '.data');

function fileStore(name) {
  const dir = path.join(DATA_DIR, name);
  const fileFor = (key) => path.join(dir, `${encodeURIComponent(key)}.json`);

  return {
    async get(key) {
      try {
        return JSON.parse(await fs.readFile(fileFor(key), 'utf8'));
      } catch (err) {
        if (err.code === 'ENOENT') return null;
        throw err;
      }
    },
    async set(key, value) {
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(fileFor(key), JSON.stringify(value, null, 2));
    },
    async delete(key) {
      await fs.rm(fileFor(key), { force: true });
    },
    async keys(prefix = '') {
      try {
        const files = await fs.readdir(dir);
        return files
          .filter((f) => f.endsWith('.json'))
          .map((f) => decodeURIComponent(f.slice(0, -5)))
          .filter((k) => k.startsWith(prefix));
      } catch (err) {
        if (err.code === 'ENOENT') return [];
        throw err;
      }
    },
  };
}

function blobStore(name) {
  const store = getStore({ name, consistency: 'strong' });
  return {
    get: (key) => store.get(key, { type: 'json' }),
    set: (key, value) => store.setJSON(key, value),
    delete: (key) => store.delete(key),
    async keys(prefix = '') {
      const { blobs } = await store.list({ prefix });
      return blobs.map((b) => b.key);
    },
  };
}

const cache = new Map();

export function openStore(name) {
  if (!cache.has(name)) {
    let store;
    try {
      // Throws when the Netlify Blobs environment isn't present.
      store = blobStore(name);
    } catch {
      store = fileStore(name);
    }
    cache.set(name, store);
  }
  return cache.get(name);
}
