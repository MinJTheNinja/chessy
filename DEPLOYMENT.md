# Live Chess Deployment

## Free Shared Backend Setup

Use one Render Web Service URL for every player. Do not share localhost links.

### Supabase Postgres

1. Create a Supabase project.
2. Copy the Postgres connection string.
3. In Render, add this environment variable:
   - `DATABASE_URL`: your Supabase Postgres connection string

Use the Supabase session pooler connection string when available. Supabase connections are automatically opened with TLS; `sslmode=disable` is only for a deliberately non-TLS local database.

The app stores users, sessions, queues, matches, transcripts, reviews, reports, and voice letters in Postgres when `DATABASE_URL` exists.

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
