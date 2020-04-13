\c anderson_art_group

CREATE UNIQUE INDEX CONCURRENTLY proposal_item_proposal_item_type_id 
ON proposal_item (proposal_item_type_id);

ALTER TABLE proposal_item
ADD CONSTRAINT unique_proposal_item_type_id
UNIQUE USING INDEX proposal_item_proposal_item_type_id;