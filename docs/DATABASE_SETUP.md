# MIBA Awards Database Setup Guide

## 1. Create PostgreSQL database in Hostinger

In Hostinger hPanel:

1. Open Databases.
2. Create a PostgreSQL database.
3. Save the database name, username, password, host, and port.
4. Allow access from the Node.js application environment if Hostinger exposes this setting.

## 2. DATABASE_URL format

Use this format:

```bash
DATABASE_URL="postgresql://DB_USER:DB_PASSWORD@DB_HOST:5432/DB_NAME?schema=public&sslmode=require"
```

If Hostinger provides a non-standard PostgreSQL port, replace `5432`.

If your password contains special characters, URL-encode them.

Examples:

- `@` becomes `%40`
- `#` becomes `%23`
- `:` becomes `%3A`
- `/` becomes `%2F`

## 3. Apply Prisma schema

For production deployment, use:

```bash
npm run prisma:generate
npm run prisma:deploy
```

Use `prisma:migrate` only in local development because it creates new migrations interactively.

## 4. Seed first deployment

For a fresh database only:

```bash
npm run prisma:seed
```

This creates sample categories, nominees, judges, sponsors, event settings, and announcements.

## 5. Hostinger PostgreSQL compatibility notes

- Prisma provider is `postgresql`.
- Schema uses standard PostgreSQL-compatible scalar types.
- IDs use Prisma `cuid()` strings, so no database extension is required.
- Relation cascades are supported by PostgreSQL.
- SSL may be required; keep `sslmode=require` unless Hostinger documents otherwise.

## 6. Verify database connection

Run:

```bash
npx prisma db pull --print
```

Or check application pages that query the database:

- `/categories`
- `/admin/dashboard`
- `/ceremony`
