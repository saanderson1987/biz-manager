\c anderson_art_group

ALTER TABLE proposal_item_type
ALTER COLUMN name SET NOT NULL;

ALTER TABLE proposal_item
ALTER COLUMN proposal_item_type_id SET NOT NULL;
