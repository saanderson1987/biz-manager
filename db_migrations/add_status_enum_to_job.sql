\c anderson_art_group;

CREATE TYPE job_status_enum AS ENUM (
    'in_progress',
    'on_hold',
    'completed'
);

ALTER TABLE public.job
ADD status job_status_enum;