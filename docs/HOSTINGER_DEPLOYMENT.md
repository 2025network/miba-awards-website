# MIBA Awards Hostinger Deployment Guide

## 1. Prerequisites

- Hostinger plan with Node.js application support.
- Hostinger PostgreSQL database created.
- A domain or subdomain pointed to the Hostinger app.
- Node.js 20+ selected in Hostinger if available.

## 2. Upload or clone the project

Recommended workflow:

```bash
git clone https://github.com/YOUR_USERNAME/miba-awards-website.git
cd miba-awards-website
npm ci
```

If using Hostinger file upload, upload the project without these folders:

- `node_modules/`
- `.next/`
- `.env`

## 3. Environment variables

Create production environment variables in Hostinger from `.env.production.example`.

Required variables:

```bash
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
DATABASE_URL=postgresql://DB_USER:DB_PASSWORD@DB_HOST:5432/DB_NAME?schema=public&sslmode=require
ADMIN_EMAIL=admin@your-domain.com
ADMIN_PASSWORD=replace-with-long-random-password
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=no-reply@your-domain.com
SMTP_PASS=replace-with-mailbox-password
SMTP_FROM="MIBA Awards <no-reply@your-domain.com>"
```

Use `sslmode=require` when Hostinger requires encrypted PostgreSQL connections.

## 4. Build commands

Run these on Hostinger terminal or deployment hook:

```bash
npm ci
npm run prisma:generate
npm run prisma:deploy
npm run build
```

Optional seed for first deployment only:

```bash
npm run prisma:seed
```

## 5. Start command

Use this as the Hostinger Node.js startup command:

```bash
npm run start
```

If Hostinger asks for an entry point, use:

```bash
node_modules/next/dist/bin/next start
```

## 6. Production hardening included

- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` disabling camera, microphone, and geolocation
- Next.js powered-by header disabled
- Strict TypeScript and ESLint build checks enabled
- CSRF same-origin checks on public mutation APIs
- In-memory rate limits for nominations, voting, contact, and sponsor inquiries
- Server-side form validation for public mutation APIs
- Upload validation helper for image upload endpoints
- Structured server error logging

## 7. Post-deployment checks

Visit:

- `/`
- `/nominate`
- `/vote`
- `/admin/login`
- `/judge/login`
- `/ceremony`

Then verify server logs for Prisma connection errors or SMTP failures.
