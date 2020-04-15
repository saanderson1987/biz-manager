\c anderson_art_group

CREATE TYPE job_receivable_status_enum AS ENUM (
    'PO sent',
    '50% paid',
    '100% paid'
);

ALTER TABLE public.job
ADD receivable_status job_receivable_status_enum;
