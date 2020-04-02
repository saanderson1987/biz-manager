import React from "react";

const Modal = ({ closeModal, children }) => (
  <div>
    <div className="modal-overlay" onClick={closeModal}></div>
    <div className="modal-">
      <div className="modal-contents">{children}</div>
    </div>
  </div>
);

export default Modal;
