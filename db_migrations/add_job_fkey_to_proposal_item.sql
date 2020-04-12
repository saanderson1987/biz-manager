\c anderson_art_group;

ALTER TABLE public.proposal_item
ADD job_id INTEGER REFERENCES job(id);