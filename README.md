# Anupam Portfolio

Next.js (pages router) portfolio with a small backend, deployed on Netlify.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Content

All content lives in `data/*.json` (profile, experience, education, publications, skills, projects).
Pages render it at build time and the API serves the same data. Images are in `public/assets/images`.

## API

| Route | What it does |
| --- | --- |
| `GET /api` | Lists the endpoints |
| `GET /api/profile`, `/api/projects?category=web\|ml\|android`, `/api/skills`, `/api/experience`, `/api/education`, `/api/publications` | Portfolio data as JSON |
| `POST /api/contact` | Contact form `{ name, email, subject?, message }`: validated, rate limited, stored |
| `POST /api/visit`, `GET /api/stats` | Page-view counter |
| `GET/PATCH/DELETE /api/admin/messages`, `GET /api/admin/stats` | Admin only (`Authorization: Bearer <ADMIN_TOKEN>`) |

The admin dashboard is at `/admin`.

Storage uses Netlify Blobs on Netlify and JSON files in `.data/` locally.

## Environment variables (Netlify → Site configuration → Environment variables)

| Name | Required | Purpose |
| --- | --- | --- |
| `ADMIN_TOKEN` | for `/admin` | Long random string used to sign in to the admin dashboard |
| `RESEND_API_KEY` + `CONTACT_TO_EMAIL` | optional | Email a copy of each contact message via Resend |
| `CONTACT_FROM_EMAIL` | optional | Sender address for those emails (verified Resend domain) |

## Deploy

`netlify.toml` builds the Next.js app with the Netlify Next.js runtime (`npm run build`, publish `.next`).
The site chat assistant is loaded in `pages/_app.js`; its token is tied to the `anupambhumiportfolio.netlify.app` domain.
