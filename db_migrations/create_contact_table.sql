\c anderson_art_group;

CREATE TABLE contact (
  id SERIAL PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  company_id INTEGER REFERENCES company(id),
  name VARCHAR (255),
  phone_num VARCHAR(255),
  email VARCHAR(255),
  position VARCHAR(255)
);

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON contact
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();