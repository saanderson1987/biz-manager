import React from "react";

const SaveButton = ({ onClick }) => {
  return (
    <button className="button--small" onClick={onClick}>
      <i className="button-icon check-icon far fa-check-circle"></i>
      <span>Save</span>
    </button>
  );
};

export default SaveButton;
