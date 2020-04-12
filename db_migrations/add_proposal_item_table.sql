\c anderson_art_group;

CREATE TABLE proposal_item_type (
  id SERIAL PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  name VARCHAR (255)
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON proposal_item_type
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TABLE proposal_item (
  id SERIAL PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  proposal_item_type_id INTEGER REFERENCES proposal_item_type(id)
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON proposal_item
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

INSERT INTO "proposal_item_type"("name") 
VALUES
  ('budget'),
  ('image proposal'),
  ('art plan');