# Match storage verification — 2026-10-09

## Test environment

- Isolated Supabase test project, PostgreSQL Nano, Seoul (`ap-northeast-2`), session pooler (15 database connections), TLS verified with the official Supabase CA.
- Windows client, Node.js 24.15.0, one app server process, default `pg` pool settings.
- `scripts/bench-match-moves.js`: create practice rooms, then submit 12 legal moves per room (6 for 256 and 512 rooms), sequentially within each room and concurrently across rooms. Values below measure only move requests, excluding signup and room creation. Each level is a short burst, not a sustained soak test.
- No production database was used.

## PostgreSQL move results

| Rooms | Moves | Success | Moves/s | p50 | p95 | Max |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | 12 | 12 | 12.6 | 76 ms | 93 ms | 93 ms |
| 4 | 48 | 48 | 48.7 | 72 ms | 140 ms | 167 ms |
| 8 | 96 | 96 | 77.8 | 87 ms | 127 ms | 253 ms |
| 16 | 192 | 192 | 128.8 | 114 ms | 159 ms | 213 ms |
| 32 | 384 | 384 | 136.7 | 225 ms | 265 ms | 324 ms |
| 64 | 768 | 768 | 140.7 | 439 ms | 490 ms | 651 ms |
| 128 | 1,536 | 1,536 | 142.7 | 873 ms | 953 ms | 1,121 ms |
| 256 | 1,536 | 1,536 | 112.8 | 2,122 ms | 2,380 ms | 2,770 ms |
| 512 | 3,072 | 3,072 | 124.8 | 3,934 ms | 4,229 ms | 4,389 ms |

After the database held over 1,000 match rows, a second 32-room run completed 384/384 moves at 107.6 moves/s, p50 280 ms, p95 335 ms.

With over 1,000 existing matches, room creation ran at about 3.8 rooms/second (p95 296 ms for 32 new rooms; 291 ms for 128 new rooms). The 32-room and 128-room follow-up move bursts also succeeded 192/192 and 768/768, with p95 384 ms and 1,150 ms respectively. Room creation still uses the legacy shared `app_state` transaction and loads the match list; it is a separate scaling bottleneck from ordinary moves.

## Local JSON comparison

| Rooms | Moves | Success | Moves/s | p95 |
| ---: | ---: | ---: | ---: | ---: |
| 8 | 96 | 96 | 118.3 | 89 ms |
| 16 | 192 | 192 | 57.0 | 435 ms |
| 32 | 384 | 384 | 60.0 | 607 ms |
| 64 | 768 | 768 | 60.9 | 1,258 ms |
| 128 | 1,536 | 1,536 | 27.7 | 6,399 ms |

Local JSON is a different storage environment; compare the scaling trend rather than the absolute latency.

## Correctness checks

- PostgreSQL migrations 001 and 002 passed on a disposable schema, including idempotency, backup, and exact match payload verification.
- Full two-player HTTP lifecycle passed on PostgreSQL: create, join, legal and illegal turns, move, transcript, resign, single reward, restart, and persisted state.
- Concurrent duplicate moves in one room produced exactly one accepted move; moves in different rooms both succeeded.
- The test project's `app_state` has no legacy `matches` key. The match table held 1,054 rows when checked after the first benchmark runs.
- The complete repository test suite: 32 passed, 3 failed. The failures are in Cheoinseong puzzle gating, mixed learning-point mutations, and missing English translations for four Korean UI strings. All match-storage tests passed.

## Interpretation

In the first burst test, 128 concurrently active rooms stayed just under 1 second at p95 with no move errors; after the database grew, the 128-room follow-up measured 1.15 seconds. At 256 rooms p95 exceeded 2 seconds, and at 512 rooms exceeded 4 seconds. Throughput plateaued around 140 moves/second on this setup. This is an observed performance boundary for one app process and one Nano test project, not a production capacity guarantee. A sustained soak test, realistic two-player sessions, voice traffic, and multiple server instances were not measured.

## Bottleneck diagnosis

The test database held 1,222 match rows (1.38 MiB of JSONB) during a five-run query profile. The generic mutation path locked and transferred all rows in **155.8 ms on average** (the first cold run took 330.6 ms); comparing them with `JSON.stringify` took another **15.5 ms**. Locking one match row took **9.5 ms**, and reading `app_state` without a lock took **9.0 ms**. `POST /api/matches/start` still uses the generic path: a process-local mutation queue, an `app_state` row lock, all match rows locked and loaded, all user profiles loaded, and a full match comparison before writing. This explains its 3.8 rooms/s creation rate with over 1,000 stored matches. `GET /api/matches/active` also takes this generic write transaction to expire private rooms, so active-state polling can contend with match writes even when nothing expires.

Ordinary move requests use one match row, but the app's `pg` pool does not set `max`, so `pg-pool` defaults to **10 connections**. The measured throughput plateau near 140 moves/s, paired with rising p95 latency as concurrent rooms increase, is consistent with requests waiting for those connections. This is an inference from the pool limit and observed scaling; pool acquisition wait has not been instrumented directly. The Supabase session pooler for this Nano project allows 15 underlying database connections, so increasing the app pool limit would need a separate controlled test.

## Sequential optimizations and follow-up measurements

`POST /api/matches/start` now inserts one room in a match-scoped transaction. With over 1,200 historical matches, 32 sequential room creations improved from about 3.8/s (p95 296 ms) to 10.2/s (p95 114–116 ms). A later 32-room run measured 13.4/s (p95 96 ms); these are short runs and database load varies.

`GET /api/matches/active` now reads the shared metadata and queries one relevant match row. The rare expired-challenge case still uses the existing transactional expiry path. A 20-request sequential sample measured p50 38.8 ms and p95 49.6 ms. A GIN JSONB path index supports the player lookup.

The move transaction now records connection acquisition time when `MATCH_PERF_PROFILE=1`, and `PG_POOL_MAX` can override the default 10. Under 128 concurrent rooms and six moves per room, the 10-connection run completed 768/768 at 148.1 moves/s (move p95 904 ms), with sampled pool wait p95 reaching 828 ms. The 15-connection run completed 768/768 at 210.3 moves/s (move p95 642 ms), with sampled pool wait p95 up to 612 ms. Parallel room creation was 110.7/s and 133.2/s respectively. This directly confirms that pool acquisition contributes heavily to burst latency. Keep the default at 10 until the connection budget across all app instances and other clients is known; using 15 in this one-process test consumed the Nano project's entire stated connection allowance.

After these changes, PostgreSQL migration, match lifecycle, and same-room/cross-room concurrency tests all passed (3/3). The independent full-suite failures above remain unrelated to match storage.

## Extended verification and observed limit

- PostgreSQL checks passed for migration, full match lifecycle, same-room/cross-room concurrency, direct match lookup and joining, and two app servers sharing one database (5 tests). The two-server test confirmed one accepted duplicate move, one reward, and shared ended state.
- With 64 rooms owned by one account, 5,120 non-ending moves completed 5,120/5,120 at 91.7 moves/s, p95 767 ms. After restricting end-of-match history reads to participant matches, 6,400 moves including simultaneous 50-move-rule endings completed 6,400/6,400 at 85.5 moves/s, p95 718 ms. Before that change, comparable 64-room ending tests had 17–27 connection acquisition timeouts.
- With 128 rooms owned by one account, 10,240 non-ending moves completed 10,240/10,240 at 94.7 moves/s, p95 1,747 ms. Adding simultaneous endings produced 12,717/12,800 successes and 83 connection acquisition timeouts. This is a measurable pathological limit: all rooms contend on the same user's reward row. Increasing pool size alone did not eliminate it.
- A separate-account 32-room ending test completed 3,200/3,200 at 117.6 moves/s, p95 321 ms. The user then asked to stop Supabase testing because usage was exhausted. No larger distinct-user or multi-server load run was performed.
- PostgreSQL paths for direct match viewing, normal room joining, and lobby polling now avoid loading or locking all match history. Private-challenge joins still use the combined transaction to update both challenge metadata and the match atomically. Other matchmaking and challenge mutations still use the shared `app_state` and all-match path; those remain structural scaling risks.

These are short isolated-project runs, not a production capacity guarantee. The complete repository suite still has three unrelated failures in puzzle gating, mixed learning points, and missing translations. The test harness's own `performance` mock failure was corrected and its targeted test passed.
