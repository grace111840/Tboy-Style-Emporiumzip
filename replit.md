# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/scripts run seed-tboys` — seed TBOY'S products + default site content

## TBOY'S Clothing (artifacts/tboys)

Luxury fashion storefront. Frontend: React + Vite + wouter + shadcn/ui + Tailwind v4.

- **Storefront pages**: Home, Collections, Shop, ProductDetail, Contact — all read products and hero/site content from the API.
- **Admin**: `/admin` route — manage products (create/update/delete), edit hero copy / WhatsApp number / contact email, and view newsletter subscribers. No auth gate.
- **Newsletter signup**: Footer form persists emails to the `subscribers` table via `POST /api/subscribers`.
- **Backend**: Express routes in `artifacts/api-server/src/routes/{products,subscribers,site-content}.ts`.
- **DB tables**: `products`, `subscribers`, `site_content` (single row, id=1) — schemas in `lib/db/src/schema/`.

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
