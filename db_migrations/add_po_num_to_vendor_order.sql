/* A foreign key with a cascade delete means that if a record in the parent
table is deleted, then the corresponding records in the child table will
automatically be deleted. This is called a cascade delete. */

\c anderson_art_group;

ALTER TABLE public.vendor_order
ADD po_num VARCHAR (255);
