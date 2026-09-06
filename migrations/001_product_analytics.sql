BEGIN;

CREATE TABLE IF NOT EXISTS analytics_sessions (
  session_id TEXT PRIMARY KEY,
  user_id TEXT NULL,
  anonymous_id TEXT NOT NULL,
  started_at TIMESTAMPTZ NOT NULL,
  last_activity_at TIMESTAMPTZ NOT NULL,
  ended_at TIMESTAMPTZ NULL,
  device_type TEXT NOT NULL,
  browser TEXT NOT NULL,
  viewport_width INTEGER NULL,
  entry_page TEXT NOT NULL,
  referrer_domain TEXT NULL
);

CREATE TABLE IF NOT EXISTS analytics_events (
  event_id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL REFERENCES analytics_sessions(session_id) ON DELETE CASCADE,
  user_id TEXT NULL,
  anonymous_id TEXT NOT NULL,
  event_name TEXT NOT NULL,
  event_timestamp TIMESTAMPTZ NOT NULL,
  received_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  page TEXT NOT NULL,
  previous_page TEXT NULL,
  properties JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS analytics_sessions_started_at_idx
  ON analytics_sessions(started_at);
CREATE INDEX IF NOT EXISTS analytics_sessions_user_id_idx
  ON analytics_sessions(user_id) WHERE user_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS analytics_sessions_anonymous_id_idx
  ON analytics_sessions(anonymous_id);
CREATE INDEX IF NOT EXISTS analytics_events_timestamp_idx
  ON analytics_events(event_timestamp);
CREATE INDEX IF NOT EXISTS analytics_events_session_id_timestamp_idx
  ON analytics_events(session_id, event_timestamp);
CREATE INDEX IF NOT EXISTS analytics_events_user_id_timestamp_idx
  ON analytics_events(user_id, event_timestamp) WHERE user_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS analytics_events_anonymous_id_timestamp_idx
  ON analytics_events(anonymous_id, event_timestamp);
CREATE INDEX IF NOT EXISTS analytics_events_name_timestamp_idx
  ON analytics_events(event_name, event_timestamp);

COMMIT;
