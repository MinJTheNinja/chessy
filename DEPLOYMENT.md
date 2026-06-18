# Live Chess Deployment

## Free Shared Backend Setup

Use one Render Web Service URL for every player. Do not share localhost links.

### Supabase Postgres

1. Create a Supabase project.
2. Copy the Postgres connection string.
3. In Render, add this environment variable:
   - `DATABASE_URL`: your Supabase Postgres connection string

The app stores users, sessions, queues, matches, transcripts, reviews, reports, and voice letters in Postgres when `DATABASE_URL` exists.

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

Expected production shape:

```json
{
  "ok": true,
  "storage": "postgres",
  "postgresProvider": "supabase",
  "redis": "upstash"
}
```
