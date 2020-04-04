import React from "react";
import Modal from "./Modal";
import NewItemForm from "./NewItemForm";

const NewItemModal = ({
  closeModal,
  type,
  resource,
  subset,
  route,
  parentId,
}) => (
  <Modal closeModal={closeModal}>
    <NewItemForm
      type={type}
      closeModal={closeModal}
      resource={resource}
      subset={subset}
      route={route}
      parentId={parentId}
    />
  </Modal>
);

export default NewItemModal;
