CREATE TABLE IF NOT EXISTS matches (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  status TEXT GENERATED ALWAYS AS (data->>'status') STORED,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS matches_status_idx ON matches (status);
CREATE INDEX IF NOT EXISTS matches_created_at_idx ON matches (created_at DESC);
CREATE INDEX IF NOT EXISTS matches_data_path_idx ON matches USING GIN (data jsonb_path_ops);
