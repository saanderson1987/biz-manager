/* A foreign key with a cascade delete means that if a record in the parent
table is deleted, then the corresponding records in the child table will
automatically be deleted. This is called a cascade delete. */

\c anderson_art_group;

alter table public.installation_job_order
drop constraint installation_job_order_installation_id_fkey,
add constraint installation_job_order_installation_id_fkey
 foreign key (installation_id)
 references installation(id)
 on delete cascade;

alter table public.installation_job_order
drop constraint installation_job_order_job_order_id_fkey,
add constraint installation_job_order_job_order_id_fkey
  foreign key (job_order_id)
  references job_order(id)
  on delete cascade;
