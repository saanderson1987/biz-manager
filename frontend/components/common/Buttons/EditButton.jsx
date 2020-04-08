import React from "react";

const EditButton = ({ onClick }) => {
  return (
    <button className="button--small" onClick={onClick}>
      <i className="button-icon pencil-icon fas fa-pencil-alt"></i>
      <span>Edit</span>
    </button>
  );
};

export default EditButton;
