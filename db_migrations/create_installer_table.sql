\c anderson_art_group;

CREATE TABLE installer (
  id SERIAL PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  contact_id INTEGER REFERENCES contact(id),
  installation_id INTEGER REFERENCES installation(id)
);

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON installer
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();
