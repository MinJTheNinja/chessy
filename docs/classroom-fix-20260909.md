# Classroom concurrency and training navigation fix — 2026-09-09

## Diagnosed causes

- Shared-state mutations acquired an app_state row lock and then requested a second PostgreSQL pool connection to authenticate. With enough simultaneous mutations, all connections could be held by row-lock waiters, leaving the lock owner unable to authenticate and commit. Authentication now reuses its transaction connection.
- The fast-route dispatcher authenticated requests it did not handle, causing an extra session query. Session restoration also hydrated every user unnecessarily. These duplicate reads are removed.
- Joining changed a separately loaded user object while the response roster still referenced the old object. The current user is now shared with the request's roster and achievement calculations.
- A slow startup/session or active-game lookup could call setView after the player had opened a lesson. That call reset the training module to its home. A navigation revision and open-module guard preserve the player's current activity.
- The join code dialog lacked pending feedback inside the dialog. It now shows a spinner, pending label and inline status, blocks duplicate submits, and restores controls with retry guidance after a 20-second timeout. A repeated successful join remains idempotent.
- Simultaneous cold static-file requests duplicated compression work. They now share the in-flight compression promise.

## Verification

- Build and complete test suite: 20 passed, 1 skipped. The skipped test requires an explicitly configured non-production PostgreSQL database.
- Local HTTP: 16 independent students joined concurrently; all 16 responses included the joining student. Repeated joins and a server restart preserved exactly 17 memberships including the teacher. Local batch latency was 143 ms; this is not a production latency measurement.
- Bounded PostgreSQL pool model: 16 mutations completed with two available connections. The same regression against the original source timed out with a connection-pool deadlock. This models connection ownership and row locks, not a real PostgreSQL load test.
- Both delayed-response navigation regressions fail against the original source and pass after the fix.
- Browser: original-edition pawn, rook and knight checks completed; delaying session restoration during the knight scene preserved the same scene. The actual join dialog displayed pending feedback, saved membership, and produced no browser errors.
- Production health and source were inspected read-only; no production test accounts, load tests or schema changes were used.
