# AGENTS.md — pkbm-alfitria

## Project Overview

School management portal for PKBM Al-Fitria (Community Learning Center) in Purwakarta, Indonesia.
Handles student enrollment (PPDB), grades, attendance, scheduling, and documents across three roles:
Admin, Guru (Teacher), Siswa (Student). All UI text is in Indonesian.

**Stack:** Next.js 14 (App Router) · React 18 · TypeScript (strict) · Tailwind CSS 3 · Prisma 5 (PostgreSQL) · NextAuth v5 (beta) · Zod · shadcn/ui · react-hook-form

## Build / Lint / Test Commands

```bash
npm run dev            # Start dev server (next dev)
npm run build          # prisma generate && next build
npm run start          # Start production server
npm run lint           # next lint (ESLint with next/core-web-vitals)
npm run db:generate    # prisma generate
npm run db:migrate     # prisma migrate dev
npm run db:seed        # prisma db seed (runs tsx prisma/seed.ts)
```

### Tests

No test framework is configured. There are no test files, no test runner, and no `test` script.
If adding tests, install Vitest or Jest and add a `test` script to package.json.

### Environment

Required variables (see `.env.example`):
- `DATABASE_URL` — PostgreSQL connection string
- `AUTH_SECRET` — Random secret for NextAuth (generate with `openssl rand -base64 32`)
- `NEXTAUTH_URL` — App base URL (production: `https://pkbmalfitria.me`, local: `http://localhost:3000`)

The app gracefully falls back to demo data when `DATABASE_URL` is absent.

## Project Structure

```
app/
  (public)/         — Public pages (landing, news, contact, PPDB enrollment)
  (auth)/login/     — Login page + server action
  (admin)/admin/    — Admin dashboard (auth-guarded layout)
  (guru)/guru/      — Teacher portal (auth-guarded layout)
  (siswa)/siswa/    — Student portal (auth-guarded layout)
  api/auth/         — NextAuth catch-all route (only API route)
  sitemap.ts        — Dynamic sitemap generator (/sitemap.xml)
  robots.ts         — Robots.txt configuration (/robots.txt)
  opengraph-image.tsx — OG image for social media sharing
components/
  shared/           — App-level components (navbar, sidebar, data-table, structured-data, etc.)
  ui/               — shadcn/ui primitives (button, card, dialog, form, etc.)
lib/
  auth.ts           — NextAuth setup (credentials provider, bcrypt)
  auth.config.ts    — NextAuth callbacks, route-role mapping
  prisma.ts         — Prisma client singleton
  db-config.ts      — Database availability check + fallback helper
  demo-data.ts      — Demo data when no DB is connected
  utils.ts          — cn() utility (clsx + tailwind-merge)
  validations/      — Zod schemas (auth, ppdb)
prisma/
  schema.prisma     — 10 models, 4 enums
  seed.ts           — Seed script (admin + teachers + students + PPDB + news)
types/              — AppRole type, NextAuth module augmentation
middleware.ts       — Auth middleware protecting /siswa, /guru, /admin
```

## Code Style Guidelines

### Imports

- Use the `@/` path alias for all internal imports (maps to project root).
- External packages first, then `@/` internal imports separated by a blank line.
- No import sorting tool is configured; maintain the existing order convention.

```ts
import { redirect } from "next/navigation";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
```

### Naming Conventions

| Element          | Convention          | Example                          |
|------------------|---------------------|----------------------------------|
| Files            | kebab-case          | `page-shell.tsx`, `db-config.ts` |
| Components       | PascalCase          | `PageShell`, `DataTable`         |
| Functions        | camelCase           | `loginAction`, `submitPpdbAction`|
| Types/Interfaces | PascalCase          | `LoginState`, `PpdbInput`        |
| Constants        | camelCase           | `adminMenu`, `roleByPrefix`      |
| Prisma Enums     | SCREAMING_SNAKE     | `PENDING`, `APPROVED`, `HADIR`   |

### TypeScript

- **Strict mode is enabled** — do not use `any` or `@ts-ignore` without justification.
- Use Zod schemas as the single source of truth for validation; derive TS types with `z.infer<>`.
- Use `satisfies` for type-safe config objects.
- Declare explicit return types on server actions (e.g. `Promise<LoginState>`).
- NextAuth types are augmented in `types/next-auth.d.ts` — update there when adding session fields.

### Components

- **Server Components by default** — pages and layouts are async server components.
- Mark client components explicitly with `"use client"` at the top of the file.
- Server Actions use `"use server"` and live in co-located `actions.ts` files.
- No standalone API routes — all mutations use Server Actions.
- Default exports only for Next.js pages/layouts; named exports everywhere else.

### Styling

- Tailwind CSS with custom color scales: `oxford` (navy primary) and `gold` (accent).
- Custom font families: `font-sans` (Plus Jakarta Sans), `font-heading` (Playfair Display).
- Use `cn()` from `@/lib/utils` for conditional class merging (clsx + tailwind-merge).
- UI primitives in `components/ui/` follow shadcn/ui patterns with CVA variants.

### Forms

- `react-hook-form` + `@hookform/resolvers/zod` for client-side validation.
- shadcn `<Form>` / `<FormField>` wrappers for consistent form UI.
- Server Actions re-validate with `schema.safeParse()` — never trust client-only validation.

### Error Handling

- **Auth errors:** Catch `instanceof AuthError`, return user-friendly Indonesian messages.
- **Validation errors:** Use Zod `.safeParse()` with early return of the first error message.
- **Database absence:** Use `runWhenDatabaseReady(query, fallback)` from `lib/db-config.ts`.
- **Auth guards:** Server-side `auth()` check in layouts with `redirect("/login")` for unauthorized.
- **No try/catch around Prisma by default** — let Next.js error boundaries handle unexpected errors.

### Auth / Authorization

- Middleware in `middleware.ts` protects `/siswa/*`, `/guru/*`, `/admin/*` via NextAuth.
- Each protected route group layout re-checks `session.user.role` and redirects if mismatched.
- Role mapping: `{ "/siswa": "SISWA", "/guru": "GURU", "/admin": "ADMIN" }`.
- JWT strategy — `id` and `role` are injected into the token via NextAuth callbacks.

### Database

- Prisma singleton in `lib/prisma.ts` — always import from there, never instantiate directly.
- Models: User, Student, Teacher, Class, Subject, Attendance, Grade, PPDB, News, Document.
- Enums: Role, AttendanceStatus, GradeType, PPDBStatus, DocumentStatus.
- Seed credentials: `admin@pkbm.id` / `pkbm12345` (and `guru1-3@`, `siswa1-10@`).

### Data Tables

- Use `@tanstack/react-table` with the `<DataTable>` wrapper from `components/shared/data-table.tsx`.
- Column definitions go in separate files (e.g. `admin-ppdb-columns.tsx`).

### General Rules

- All user-facing text must be in Indonesian.
- Do not add API routes — use Server Actions for all data mutations.
- Keep the `postinstall` hook (`prisma generate`) intact for deployment compatibility.
- No Prettier is configured — match the formatting style of surrounding code.
- ESLint config is minimal (`next/core-web-vitals` only) — run `npm run lint` before committing.

## SEO & Metadata

- **Sitemap**: Auto-generated at `/sitemap.xml` (see `app/sitemap.ts`)
- **Robots**: Configured at `/robots.txt` (see `app/robots.ts`)
- **Structured Data**: JSON-LD schemas in `components/shared/structured-data.tsx`
  - OrganizationStructuredData — Organization info
  - FAQStructuredData — FAQ rich snippets
  - ArticleStructuredData — News articles
- **Open Graph**: Each page has OG metadata for social media previews
  - Custom OG images in `opengraph-image.tsx` files
- **Production URL**: `https://pkbmalfitria.me`
- **School Address**: Kp. Peuntas RT 011/004, Desa Taringgul Tonggoh, Kec. Wanayasa, Kab. Purwakarta, Jawa Barat

## Deployment

- Production URL: `https://pkbmalfitria.me`
- Recommended: Vercel (auto-deploys from git)
- Set environment variables in deployment platform
- Database: PostgreSQL (Vercel Postgres or external provider)
- Run `npm run build` locally to verify before deploying
