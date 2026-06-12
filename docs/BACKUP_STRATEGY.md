# MIBA Awards Backup Strategy

## Goals

- Protect PostgreSQL records for nominations, votes, judges, scores, email logs, sponsors, events, and announcements.
- Keep recovery simple for Hostinger production.
- Avoid storing secrets in Git.

## Database backup schedule

Recommended:

- Daily automated PostgreSQL backup.
- Weekly manual export before major awards workflow changes.
- Immediate backup before running `npm run prisma:deploy`.
- Immediate backup before bulk importing nominees, judges, or votes.

## Manual PostgreSQL backup

Use Hostinger backup tools if available. If terminal access includes `pg_dump`, run:

```bash
pg_dump "$DATABASE_URL" --format=custom --file="miba-backup-$(date +%Y-%m-%d).dump"
```

Plain SQL alternative:

```bash
pg_dump "$DATABASE_URL" --file="miba-backup-$(date +%Y-%m-%d).sql"
```

## Restore backup

Custom dump:

```bash
pg_restore --clean --if-exists --dbname="$DATABASE_URL" miba-backup-YYYY-MM-DD.dump
```

Plain SQL:

```bash
psql "$DATABASE_URL" < miba-backup-YYYY-MM-DD.sql
```

## File and upload backups

Current implementation validates uploads but does not store uploaded files yet. If file uploads are later connected:

- Store files outside the Git repository.
- Back up upload storage daily.
- Restrict uploads to JPG, PNG, and WebP.
- Keep file size at or below `MAX_UPLOAD_BYTES`.

## Environment backup

Keep a secure password-manager copy of production variables:

- `DATABASE_URL`
- `ADMIN_PASSWORD`
- `JUDGE_PASSWORD`
- SMTP credentials

Never commit `.env` or `.env.production`.

## Recovery checklist

1. Restore source code from GitHub.
2. Restore `.env` values from the secure store.
3. Restore PostgreSQL backup.
4. Run `npm ci`.
5. Run `npm run prisma:generate`.
6. Run `npm run build`.
7. Start with `npm run start`.
8. Verify `/admin/dashboard`, `/ceremony`, `/vote`, and `/winners`.
