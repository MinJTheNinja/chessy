# EasyMate product analytics

## Architecture

EasyMate uses first-party, event-based analytics. The browser queues a small set of meaningful product events and sends batches to `POST /api/analytics/events`. The backend validates event names, discards unapproved properties, derives the authenticated user from the `lc_session` cookie, and persists analytics separately from account/profile data.

Production uses the dedicated PostgreSQL tables `analytics_sessions` and `analytics_events`. Local development and tests use `.localappdata/live-chess/analytics.json`, separate from the application state file. No third-party analytics SDK or tracker is used.

Analytics is optional. The browser does not create a persistent `anonymous_id` or send events until the visitor chooses **Allow**. Choosing **Decline** removes the local analytics identifiers and stops collection. The privacy dialog lets the visitor change that choice later.

## Session definition

- A session starts on the first consented analytics request.
- The default inactivity timeout is 30 minutes.
- Activity within the timeout continues the same session, including across reloads on the same browser.
- Activity after the timeout receives a new server-accepted session ID.
- `session_ended` is sent with a keepalive request on `pagehide` as a best-effort signal. Analysis must infer abandonment from the final meaningful event because lifecycle delivery is not guaranteed.
- `page_viewed` stores the current logical SPA page and `previous_page`, so chronological event order can reveal backtracking.

The browser stores only `anonymous_id`, `session_id`, start time, and last-activity time. Device and browser values are coarse families derived server-side from the request user agent. Referrers are reduced to a domain.

## Anonymous-to-authenticated association

The browser never submits a trusted `user_id`. When a user signs in, the server reads the existing application session cookie and attaches the real EasyMate user ID to subsequent analytics events. It also associates the current analytics session with that user. Earlier anonymous events remain unchanged, but staff queries resolve the session through the associated user, allowing the pre-sign-in and post-sign-in flow to be analyzed without copying email, name, or credentials into analytics.

## Event envelope

```json
{
  "event_id": "ae_…",
  "session_id": "as_…",
  "anonymous_id": "anon_…",
  "event_name": "matchmaking_started",
  "timestamp": "2026-09-06T08:00:00.000Z",
  "page": "/play",
  "previous_page": "/home",
  "properties": {
    "match_type": "quick",
    "rated": false,
    "time_control": "10+0",
    "experiment": "homepage_design",
    "variant": "B"
  }
}
```

`event_id` is idempotent. Duplicate IDs are ignored. `experiment` and `variant` are allowed on every event, so future experiments do not require a schema change.

## Event taxonomy

“Client” means the browser decides that the interaction occurred; every event is still validated and stored by the backend. “Server” means the backend records the confirmed outcome after the core operation succeeds or fails.

| Event name | Source | Trigger | Allowed properties | Meaning | Example |
|---|---|---|---|---|---|
| `session_started` | Server | A new analytics session is created. | experiment, variant | Session cohort and entry point. | First consented visit. |
| `page_viewed` | Client | Logical SPA page changes. | page_load_duration_ms, experiment, variant | Navigation, backtracking, and page funnels. | `/home` → `/play`. |
| `session_ended` | Client | Best-effort `pagehide`. | experiment, variant | Optional explicit end signal. | Browser tab closes. |
| `signup_started` | Client | A valid sign-up form is submitted. | provider | Sign-up funnel entry. | Password sign-up submitted. |
| `signup_completed` | Server | Account creation or existing-account recovery succeeds. | provider | Confirmed sign-up conversion. | Password account created. |
| `signup_failed` | Server | Sign-up validation or account conflict fails. | failure_reason, provider | Sign-up friction without form contents. | `account_exists`. |
| `login_started` | Client | Password or Google login begins. | provider | Login funnel entry. | Google credential flow starts. |
| `login_completed` | Server | Authentication succeeds. | provider | Confirmed login conversion. | Password login succeeds. |
| `login_failed` | Server | Authentication fails. | failure_reason, provider | Login friction without credentials. | `invalid_credentials`. |
| `logout_completed` | Server | Application session is removed. | — | Confirmed logout. | User signs out. |
| `play_page_viewed` | Client | `/play` becomes active. | — | Quick-match funnel stage. | User opens Play. |
| `quick_match_clicked` | Client | Quick Match is selected. | match_type, rated, time_control | Explicit feature intent. | 10+0 casual selected. |
| `matchmaking_started` | Client | Quick matchmaking begins. | match_type, rated, time_control | Queue funnel stage. | User enters quick pool. |
| `matchmaking_cancelled` | Client | User cancels the queue. | match_type, matchmaking_duration_ms | Intentional queue abandonment. | Cancel after 12 seconds. |
| `match_found` | Client | A deduplicated match reaches the client through API or WebSocket. | match_type, rated, time_control, matchmaking_duration_ms | Successful match conversion for each player. | Opponent matched. |
| `match_started` | Client | A quick match is rendered for the first time. | match_type, rated, time_control | Quick-match play begins. | Board opens after pairing. |
| `match_completed` | Server | A non-resignation match ends. | match_type, rated, game_duration_ms, result | Confirmed completed match. | Checkmate or draw. |
| `match_abandoned` | Server | A match ends by resignation. | match_type, rated, game_duration_ms, result | Explicit match abandonment. | `resigned`. |
| `room_create_clicked` | Client | Private-room creation begins. | match_type, time_control | Private-room funnel entry. | User creates a 10+0 room. |
| `room_created` | Server | Private room and code are persisted. | match_type, time_control, room_creation_duration_ms | Confirmed room creation. | Shareable room created. |
| `invite_shared` | Client | Room link copy succeeds. | join_method | Invite engagement without storing the link or secret. | `link`. |
| `room_join_attempted` | Client | A valid-looking room code is submitted. | join_method | Join funnel entry. | Code submit. |
| `room_joined` | Server | Room join is persisted. | join_method, wait_duration_ms | Confirmed room conversion. | Friend joins by code. |
| `room_join_failed` | Server | Room is missing, owned by caller, or unavailable. | join_method, failure_reason | Product-level join failure. | `not_found`. |
| `game_started` | Client | A private match is rendered for the first time. | match_type, time_control | Private-room play begins for each player. | Second player connects. |
| `game_completed` | Server | A private-room game ends. | match_type, rated, game_duration_ms, result | Confirmed private-game completion. | Draw agreed. |
| `training_opened` | Client | `/training` becomes active. | — | Training feature adoption. | User opens Training. |
| `puzzle_started` | Client | A puzzle iframe opens. | puzzle_id, difficulty | Puzzle funnel entry. | Cheoinseong stage 1. |
| `puzzle_attempted` | Client | Completion message confirms at least one attempt. | puzzle_id, attempt_count, duration_ms | Attempt engagement. | Puzzle solved after attempts. |
| `puzzle_completed` | Server or client | Server persists a signed-in completion; anonymous/local completion is sent by the client. | puzzle_id, duration_ms | Confirmed puzzle completion. | Stage completed. |
| `puzzle_abandoned` | Client | User opens another puzzle or leaves Training before completion. | puzzle_id, duration_ms | Puzzle drop-off. | Leaves after 40 seconds. |
| `review_opened` | Client | User requests a real match review. | source_feature | Review feature adoption. | Review after completed match. |
| `review_started` | Client | Review request is sent. | source_feature | Review generation funnel entry. | Backend request begins. |
| `review_completed` | Server | Review is generated and stored. | review_generation_duration_ms | Confirmed review conversion and latency. | Review ready in 120 ms. |
| `review_abandoned` | Client | User leaves Play while review is in progress. | duration_ms | Review funnel abandonment. | Navigates home while waiting. |
| `community_opened` | Client | `/community` becomes active. | — | Community feature adoption. | User opens 게시판. |
| `post_opened` | Client | A post is expanded for the first time in the page session. | post_id, category | Content engagement without post text. | Question post expanded. |
| `post_created` | Server | Forum post is persisted. | post_id, category | Confirmed community contribution without content. | Question created. |
| `profile_opened` | Client | `/profile` becomes active. | — | Profile feature adoption. | User opens profile. |
| `piece_guide_opened` | Client | The chess-piece guide opens. | source, mode | Piece-guide feature adoption. | User opens the guide from a puzzle header. |
| `piece_guide_auto_opened` | Client | The first-use puzzle guide opens automatically. | mode | Measures onboarding exposure. | First puzzle visit. |
| `piece_guide_closed` | Client | The piece guide closes. | source, mode | Completes the guide engagement path. | User closes the guide. |
| `culture_content_impression` | Client | A culture/history collection or review insight is visibly rendered. | content_id, content_type, region, category, source_feature | Exposure to local culture/history. | Cheoinseong puzzle path shown. |
| `culture_content_opened` | Client | A culture/history item opens. | content_id, content_type, region, category, source_feature | Direct culture/history engagement. | Cheoinseong history puzzle opens. |
| `culture_content_completed` | Client or server | A history puzzle completes or a culture note is persisted. | content_id, content_type, region, category, source_feature, duration_ms | Meaningful completion of culture engagement. | History puzzle solved. |
| `culture_related_content_opened` | Client (reserved) | Future related-content link opens. | content_id, content_type, region, category, source_feature | Cross-content discovery. | Related local story opens. No current EasyMate UI emits this event. |
| `api_error` | Client | A non-analytics API request fails. | error_code, operation, http_status, duration_ms | Correlates technical failures/latency with abandonment. | `/api/matches/:id/review` returns 500. |
| `matchmaking_error` | Client | Quick matchmaking request fails. | error_code, http_status, duration_ms | Distinguishes technical queue failure from cancellation. | Queue request times out. |
| `room_creation_error` | Client | Private-room creation request fails. | error_code, http_status, duration_ms | Technical room-creation failure. | Backend returns 503. |
| `room_join_error` | Client | Join request fails technically or returns an error. | error_code, http_status, join_method, duration_ms | Client-observed join failure/latency. | Join API returns 404. |
| `game_connection_error` | Client | WebSocket closes during an active match. | error_code | Connection-related abandonment signal. | `websocket_closed`. |
| `review_generation_error` | Client | Review request fails. | error_code, http_status, review_generation_duration_ms | Technical review failure. | Generation returns 500. |

Property names not listed in the backend allowlist are discarded. Unknown event names reject the full batch.

## Privacy and data minimization

Analytics does not store:

- email, display name, password hash, passwords, or authentication tokens;
- room codes, invite links, opponent IDs, authorization headers, or raw request bodies;
- forum post text, profile form contents, private messages, transcripts, captions, voice recordings, clipboard contents, or keystrokes;
- full IP addresses, exact location, or fingerprinting attributes.

The rate limiter may temporarily use a request address in process memory to prevent abuse, following the existing backend pattern. It is not written to analytics storage. API operation paths are normalized so match IDs, room codes, and similar path parameters are replaced with placeholders before persistence.

## Staff query layer

`GET /api/admin/analytics/summary?days=30` requires the same server-side staff authorization as the existing admin tools. The range is limited to 1–90 days. It returns:

- total sessions, unique users/anonymous visitors, median session duration, and events per session;
- the ordered funnel `page_viewed → play_page_viewed → quick_match_clicked → matchmaking_started → match_found → match_started → match_completed`;
- users, conversion rate, drop-off count, and drop-off rate at each stage;
- feature usage for Quick Match, private rooms, training, review, community, and culture/history;
- exact-day D1, D7, and D30 retention-ready counts and rates.

The initial implementation reads at most 50,000 sessions and 100,000 events for a summary request. Move aggregation into dedicated SQL/materialized views before exceeding that scale.

## Retention definitions

- Identity is `user_id` when a session becomes authenticated; otherwise it is `anonymous_id`.
- D1/D7/D30 retention means that an identity with a first event on day 0 has at least one event exactly 1, 7, or 30 UTC calendar days later.
- Repeat game rate can be derived by counting identities with more than one `match_completed`/`game_completed` event.
- Return after first completed game can be derived by finding any later session for the same identity after its first completion event.

## Adding a new event safely

1. Confirm that the action is meaningful for a product decision; do not track every click, scroll, keypress, or rerender.
2. Add the event name to `allowedEventNames` in `analytics.js`.
3. Reuse an existing safe property or add a narrowly typed property to `propertyRules`.
4. Prefer a server event for confirmed persisted outcomes and a client event for intent/navigation.
5. Never send raw form fields, user-generated text, secrets, URLs containing tokens, stack traces, or arbitrary nested objects.
6. Use `trackEvent(name, properties)` in `app.js`; React-style mount duplication is not present, and existing dedupe sets guard render-driven events.
7. Add or update tests and this data dictionary.

## Deployment

Run `migrations/001_product_analytics.sql` against the production PostgreSQL database before or with deployment. Every statement is additive and idempotent; it does not rewrite existing data. The server also performs the same `CREATE TABLE IF NOT EXISTS` and `CREATE INDEX IF NOT EXISTS` checks at startup, matching EasyMate's current storage-initialization convention.

No new required environment variable is introduced. Optional settings:

- `ANALYTICS_SESSION_TIMEOUT_MS`: inactivity timeout; default `1800000` (30 minutes).
- `EASYMATE_DATA_DIR`: local/test data directory override; production PostgreSQL deployments do not need it.

Do not expose the staff endpoint through a public proxy that bypasses EasyMate's cookie authentication and staff-role check.
