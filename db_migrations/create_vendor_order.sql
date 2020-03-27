\c anderson_art_group;

CREATE TABLE vendor_order (
  id SERIAL PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  job_order_id INTEGER REFERENCES job_order(id),
  vendor_id INTEGER REFERENCES company(id),
  price INTEGER,
  number_of_pieces INTEGER
);

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON vendor_order
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();
