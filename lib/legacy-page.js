import fs from 'node:fs/promises';
import path from 'node:path';

export async function loadLegacyBody(filePath) {
  const absolutePath = path.join(process.cwd(), filePath);
  const html = await fs.readFile(absolutePath, 'utf8');
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const body = bodyMatch ? bodyMatch[1] : html;

  return body.replace(/<script[\s\S]*?<\/script>/gi, '');
}
