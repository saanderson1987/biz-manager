import React from "react";
import Modal from "./Modal";

const DeleteWarning = ({ closeModal, itemName, deleteItem }) => (
  <Modal closeModal={closeModal}>
    <div className="warning">
      <div className="warning-text">
        Are you sure you want to delete {itemName}?
      </div>
      <div className="button-row">
        <button
          className="button--delete"
          onClick={() => {
            closeModal();
            deleteItem();
          }}
        >
          Delete
        </button>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </div>
  </Modal>
);

export default DeleteWarning;
