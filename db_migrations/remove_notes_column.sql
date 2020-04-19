/* A foreign key with a cascade delete means that if a record in the parent
table is deleted, then the corresponding records in the child table will
automatically be deleted. This is called a cascade delete. */

\c anderson_art_group;

ALTER TABLE public.company
DROP COLUMN notes;

ALTER TABLE public.job_order
DROP COLUMN notes;

ALTER TABLE public.vendor_order
DROP COLUMN notes;
