# Backend folder structure

Paths are relative to `backend/`.

## `src/`

```
src/
├── config/                  # Env validation; app, db, JWT loaders and types (`index.ts`, `*.config.ts`)
├── common/                  # Shared barrel (extend: guards, decorators, filters, pipes, interceptors)
├── database/                # TypeORM root module; `database.config.ts` helpers (master vs tenant connection)
├── modules/
│   ├── public/              # Global / catalog APIs (not tenant schema scope)
│   │   ├── accounts/      # Identity feature (`identity.module.ts`, controller, service, entity, dto/)
│   │   ├── tenants/       # controllers/, services/, entities/, dto/, `tenants.module.ts`
│   │   └── memberships/   # Barrel / membership wiring (`index.ts`)
│   └── tenanted/            # Tenant-scoped features
│       ├── auth/            # JWT strategy, guards, user entity, `auth.module.ts`
│       ├── users/
│       ├── products/
│       ├── cats/
│       ├── cats-2/          # Alternate cats sample (also exports `CatsModule` — do not register both)
│       └── tasks/
├── shared/                  # Cross-cutting infra reused by the app (not “public API” vs “tenanted” split)
│   ├── health/              # `HealthModule`, controller, service, specs
│   ├── audit/               # Placeholder (`index.ts`)
│   ├── jobs/                # Placeholder for job processors (`index.ts`)
│   └── mailer/              # Placeholder (`index.ts`)
├── tenancy/                 # Multi-tenancy: middleware, tenant connection service, utils, symbols
├── main.ts
├── app.module.ts
├── app.controller.ts
├── app.service.ts
└── app.controller.spec.ts
```

Per-feature folders under `modules/public/` and `modules/tenanted/` typically contain `*.module.ts`, controllers, services, `dto/`, and `entities/` (or entity files) as needed. There is no single `modules/*/migrations/` tree yet; add migrations when you wire TypeORM migrations.

JWT and RBAC live under `modules/tenanted/auth/`, not under a top-level `auth/` folder.

## Root `AppModule` imports (current)

- `ConfigModule` (global), `DatabaseModule`, `HealthModule` (`shared/health`), `CatsModule`, `TasksModule`

Other `*.module.ts` files under `src/` exist but are not imported in `app.module.ts` until wired in.

## Repo sibling of `src/`

```
backend/
├── src/                 # above
├── test/                # E2E (e.g. jest-e2e.json, app.e2e-spec.ts)
├── dist/                # build output
├── package.json
├── nest-cli.json
├── tsconfig.json
├── tsconfig.build.json
└── eslint.config.mjs
```
