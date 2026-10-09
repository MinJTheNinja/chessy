# Live Chess Deployment

## Normalized storage

Identity and tutorial data no longer live in the shared `app_state` JSON document:

- `users`: one row per user. `LOWER(email)` has a unique index; password/auth columns are first-class and variable profile, achievement, puzzle, and review data live in the per-user `profile JSONB`.
- `sessions`: SHA-256 token hashes only, with a user foreign key, `ON DELETE CASCADE`, and a 30-day `expires_at`.
- `tutorial_progress`: one row per user/module with `PRIMARY KEY (user_id, module_id)`.
- `schema_migrations`: applied migration versions and initial before/after counts.
- `app_state_legacy_backup`: the untouched pre-normalization JSON snapshot for rollback.

`users`, `sessions`, and `tutorial_progress` are the only sources of truth for their domains. Runtime `app_state` writes strip `users`, `sessions`, and top-level `training`. The compatibility `db.users` list is derived from `users` and is never serialized by `writeDb()`.

Matches and their transcripts live in the `matches` table (migration `002_normalize_matches`). Move, transcript, and end requests lock only their match row. The migration backs up the legacy state and verifies every copied match before removing `app_state.matches`. Queue, seek, challenge, review, report, shop, league, and forum metadata remain in `app_state`; legacy mutations that can also change matches lock all match rows before writing.

## Free Shared Backend Setup

Use one Render Web Service URL for every player. Do not share localhost links.

### Supabase Postgres

1. Create a Supabase project.
2. Copy the Postgres connection string.
3. In Render, add this environment variable:
   - `DATABASE_URL`: your Supabase Postgres connection string

Use the Supabase session pooler connection string when available. Supabase connections are automatically opened with TLS; `sslmode=disable` is only for a deliberately non-TLS local database.

The app stores normalized identity/tutorial rows and the remaining shared application state in Postgres when `DATABASE_URL` exists.

### Required environment variables

- `DATABASE_URL`: runtime PostgreSQL connection string.
- `MIGRATION_DATABASE_URL`: optional migration-only connection string; preferred for `npm run migrate`. If absent, the command uses `DATABASE_URL`.
- `PGSSLMODE=require`: optional when the URL does not already include an SSL mode.
- `PGSSLROOTCERT`: optional path to the PostgreSQL CA certificate. When set, the server verifies the database certificate instead of using its legacy permissive TLS setting. Use this for the isolated Supabase test project and production deployments.
- `LOCAL_DATA_DIR`: optional local JSON fallback directory, useful for tests and local isolation.
- `TEST_DATABASE_URL` plus `ALLOW_TEST_DATABASE_WRITE=1`: enables the isolated-schema PostgreSQL migration test. Never point this at production.

## Migration and deployment order

1. Create a database backup or Supabase point-in-time recovery checkpoint.
2. Deploy no application traffic yet. Run `npm ci` and `npm run build`.
3. Set `MIGRATION_DATABASE_URL` to the intended database and run `npm run migrate`. The command is transactional, advisory-locked, and idempotent.
4. Confirm the printed legacy and normalized user/session/tutorial counts. A lower post-migration count aborts and rolls back.
5. Deploy the new server code. Do not run old server code after new writes begin because the old code treats `app_state.users` as authoritative.
6. Verify signup, login, logout, session restoration, and one tutorial completion with non-production test accounts only.

Migration `001_normalize_identity` copies the original `app_state.data` to `app_state_legacy_backup`, hashes legacy raw session tokens, and moves identity and tutorial data. Migration `002_normalize_matches` makes another backup, copies each match to its own row, checks the copied JSONB against the original, and removes the legacy match list only after verification succeeds. Both migrations are transactional and idempotent.

## Backup and rollback

Preferred rollback is a database restore to the pre-deploy checkpoint plus deployment of the previous server artifact. A manual rollback requires stopping new-server traffic and restoring the matching `app_state_legacy_backup` snapshots for both migrations before deploying the previous server. Do not run old and new versions simultaneously: that would recreate two writable sources of truth.

The local JSON fallback writes `db.pre-normalization.json` once and keeps identity data in `identity.json`. Its mutation queues use fresh snapshots, preventing lost updates within one Node process.

## Tests

- `npm run build`: syntax checks server, migration code, and frontend JavaScript.
- `npm test`: runs local HTTP concurrency, legacy password compatibility, session lifecycle, account cascade, and PostgreSQL migration tests. PostgreSQL is skipped unless both safe test variables above are set.
- `TEST_DATABASE_URL=... ALLOW_TEST_DATABASE_WRITE=1 npm test`: creates and drops a randomly named schema in the explicitly supplied test database and runs the migration twice.

Never use `easymate.online` or the production Supabase database for load or migration tests.

## Post-deploy monitoring

Watch PostgreSQL connection saturation, per-match row lock wait time, transaction duration, signup/login p95 latency, PBKDF2 worker-pool latency, duplicate-email conflict rate, expired-session row count, 5xx rate, and match/transcript write latency. Match creation and other mixed metadata writes still use the `app_state` lock; ordinary moves do not.

## Diverged branch integration

The local branch is ahead of and behind `origin/main`. Preserve the dirty design work first in a separate user-controlled backup or commit. Then fetch in a clean integration clone/worktree, create a temporary integration branch from the desired remote base, cherry-pick the backend change commit after the user creates it, resolve conflicts there, and run `npm test`. Only after review should the user merge or push. Do not reset, stash, pull, rebase, or merge in the current dirty working tree.

### Google Sign-In

1. In Google Cloud Console, create a Web application OAuth client.
2. Add the Render service origin (for example, `https://chessy-singapore.onrender.com`) to Authorized JavaScript origins.
3. In Render, set `GOOGLE_CLIENT_ID` to the OAuth Web client ID and redeploy.

The value must be the client ID ending in `.apps.googleusercontent.com`, not the client secret.

### Upstash Redis

1. Create an Upstash Redis database.
2. Copy the REST URL and REST token.
3. In Render, add these environment variables:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

Redis is used for shared match room/presence state. The app still works without Redis, but shared room coordination is stronger with it.

### Room Links

After a match is created, the app shows a room link like:

```text
https://your-render-app.onrender.com/match/match_abc123
```

Share that link with the other player so both browsers load the same match room.

### Health Check

Open:

```text
https://your-render-app.onrender.com/api/health
```

Expected production shape (HTTP 200):

```json
{
  "ok": true,
  "storage": "postgres",
  "postgresProvider": "supabase",
  "redis": "upstash"
}
```

If Postgres is unavailable, the health endpoint returns HTTP 503 with `storageStatus: "connecting"` so Render reports the deployment as unhealthy instead of silently serving broken sign-up.
