import React from "react";
import Modal from "./Modal";
import NewItemForm from "./NewItemForm";

const NewItemModal = ({ closeModal, type, statePath, parentId }) => (
  <Modal closeModal={closeModal}>
    <NewItemForm
      type={type}
      closeModal={closeModal}
      statePath={statePath}
      parentId={parentId}
    />
  </Modal>
);

export default NewItemModal;
