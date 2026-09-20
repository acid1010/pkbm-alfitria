# PKBM Al-Fitria

Next.js portal for PKBM Al-Fitria: public information, PPDB, attendance, and role-based admin, teacher, and student portals.

## Local development

1. Copy `.env.example` to `.env.local` and fill in PostgreSQL, Auth.js, and seed values.
2. Install dependencies:

   ```bash
   npm ci
   ```

3. Apply migrations and start development:

   ```bash
   npm run db:migrate
   npm run dev
   ```

The database is required. The application does not use demo fallback data.

## Development data

The seed is destructive and refuses to run with `NODE_ENV=production`:

```bash
SEED_DEFAULT_PASSWORD='strong-password' \
SEED_SUPERUSER_PASSWORD='another-strong-password' \
npm run db:seed
```

Importing the student roster also requires an explicit password:

```bash
IMPORT_STUDENT_PASSWORD='strong-password' npx tsx prisma/import-siswa.ts
```

## VPS deployment

Use persistent VPS directories for private PPDB documents and attendance selfies. Set `PPDB_UPLOAD_DIR` and `SELFIE_UPLOAD_DIR` to directories outside the public web root.

Public attendance kiosks are available at `/absensi/murid` and `/absensi/guru`. Student and teacher selfies are private; assigned teachers can see their class selfies, and admins can see all attendance selfies from `/admin/absensi`.

```bash
npm ci
npm run db:generate
npm run db:migrate:deploy
npm run build
NODE_ENV=production HOSTNAME=0.0.0.0 PORT=3000 npm start
```

With PM2, start the committed ecosystem config from the project directory. Next.js loads the VPS `.env` automatically:

```bash
pm2 start ecosystem.config.cjs
pm2 save
```

Run the app under systemd, Docker, or another process manager and put it behind the VPS reverse proxy with HTTPS. Back up PostgreSQL, `PPDB_UPLOAD_DIR`, and `SELFIE_UPLOAD_DIR`.

## Checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```
