import crypto from 'node:crypto';
import { openStore } from './store';

const store = () => openStore('contact-messages');

const LIMITS = { name: 100, email: 200, subject: 150, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateMessage(body = {}) {
  const errors = {};
  const clean = {};
  for (const field of Object.keys(LIMITS)) {
    const value = typeof body[field] === 'string' ? body[field].trim() : '';
    if (value.length > LIMITS[field]) errors[field] = `Keep it under ${LIMITS[field]} characters.`;
    clean[field] = value;
  }
  if (!clean.name) errors.name = 'Please tell me your name.';
  if (!EMAIL_RE.test(clean.email)) errors.email = 'Please enter a valid email address.';
  if (clean.message.length < 10) errors.message = 'Message should be at least 10 characters.';
  return { clean, errors };
}

export async function saveMessage(data) {
  const createdAt = new Date().toISOString();
  // Time-sortable key so listings come back newest-last without extra work.
  const id = `${createdAt.replace(/[-:.TZ]/g, '')}-${crypto.randomBytes(4).toString('hex')}`;
  const message = { id, ...data, createdAt, read: false };
  await store().set(id, message);
  return message;
}

export async function listMessages() {
  const s = store();
  const keys = await s.keys();
  const messages = await Promise.all(keys.map((k) => s.get(k)));
  return messages.filter(Boolean).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function updateMessage(id, patch) {
  const s = store();
  const current = await s.get(id);
  if (!current) return null;
  const next = { ...current, read: Boolean(patch.read) };
  await s.set(id, next);
  return next;
}

export async function deleteMessage(id) {
  await store().delete(id);
}

// Optional email notification through Resend's HTTP API.
export async function notifyByEmail(message) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) return false;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>',
      to: [to],
      reply_to: message.email,
      subject: `Portfolio contact: ${message.subject || message.name}`,
      text: `From: ${message.name} <${message.email}>\n\n${message.message}`,
    }),
  });
  return res.ok;
}
