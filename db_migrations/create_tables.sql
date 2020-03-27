\c anderson_art_group;

CREATE TABLE company (
  id SERIAL PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  name VARCHAR (255),
  status VARCHAR (255),
  notes TEXT
);

CREATE TABLE job (
  id SERIAL PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  company_id INTEGER REFERENCES company(id),
  name VARCHAR (255),
  po_num  VARCHAR (255)
);

CREATE TABLE job_order (
  id SERIAL PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  job_id INTEGER REFERENCES job(id),
  date_ordered DATE,
  notes TEXT
);

CREATE TABLE employee (
  id SERIAL PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  first_name VARCHAR (255),
  last_name VARCHAR (255),
  role VARCHAR (255)
);

CREATE TABLE installation (
  id SERIAL PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  installer INTEGER REFERENCES employee(id),
  installation_date DATE,
  completed BOOLEAN
);

CREATE TABLE installation_job_order (
  id SERIAL PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  job_order_id INTEGER REFERENCES job_order(id),
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
BEFORE UPDATE ON company
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON job
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON job_order
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON installation
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON employee
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON installation_job_order
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();
