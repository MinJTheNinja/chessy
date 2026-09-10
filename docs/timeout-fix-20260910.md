# League and login timeout follow-up — 2026-09-10

## Evidence and limits
The reported Google login error is a database connection timeout. Production health returned 200 and the frontend contained yesterday's changes during the read-only check. The old health handler only checked startup readiness, so this did not prove database availability.
A user-provided Render log screenshot subsequently showed repeated analytics connection timeouts from 10:53:41 AM through 11:00:34 AM (displayed timezone/date not shown). The exact message maps to the installed pg-pool checkout wait timeout, confirming failure to obtain an available application pool connection. Both login_failed and login_completed analytics events were affected. Analytics recording is fire-and-forget, so these warnings do not prove analytics caused login failure; some authentication operations completed. The screenshot does not identify the original connection holder or prove which reproduced defect triggered this incident. Direct database access is still unavailable. The startup count of 1 user/1 session can be historical migration details returned by the already-applied migration fast path; it is not evidence of current user counts or data loss.

A real HTTP regression against HEAD (870d626) showed that one incomplete league join upload blocks another student's join until timeout. The same test passes with this patch. Previously readBody waited only for data/end, without abort/error/deadline handling, while the global state transaction was already open.
All shared-state requests also borrowed database connections before waiting for the same row lock. A slow lock owner could fill the pool with waiters, starving login.
Room synchronization awaited optional Redis HTTP calls with no deadline while holding the global state lock.

## Changes
- Parse size-limited JSON before authentication or transaction acquisition; reject aborted/failed uploads and apply a 10-second body deadline.
- Serialize shared-state writes within each process before borrowing connections; preserve PostgreSQL row locking across processes.
- Apply a 5-second state lock timeout, 8-second PostgreSQL statement timeout and 10-second idle transaction timeout. Handle connection error events.
- Defer Redis room writes until after successful commit and connection release; discard them on rollback. Redis requests have a 2-second deadline.
- Bound Google signing-key fetches to 8 seconds.
- Health checks now query PostgreSQL instead of trusting startup readiness.

## Validation
Build passed. Full suite: 24 passed, 1 skipped (requires an explicitly configured non-production PostgreSQL database).
Includes 100-user identity concurrency, 16 concurrent league joins with restart persistence, incomplete/aborted HTTP uploads, constrained two-connection pool with concurrent login, rollback recovery, and stalled Redis after commit.
The pool test is a model, not a real PostgreSQL load test.

## Deployment
This patch is local and has not been deployed. Deploy the updated chessy server through the existing Render service and restart/replace the old process so any abandoned transactions are released. No schema migration or membership reset is needed.
After deployment, verify health, Google login, session restoration and league membership using an authorized test account, and inspect connection/lock errors during the next class. No production load tests or user-data mutations were performed.
