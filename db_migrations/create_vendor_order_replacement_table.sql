\c anderson_art_group;

CREATE TABLE vendor_order_replacement (
  id SERIAL PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  vendor_order_id INTEGER REFERENCES vendor_order(id),
  item_number VARCHAR (255)
);

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON vendor_order_replacement
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();