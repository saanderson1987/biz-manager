import React from "react";

const CancelButton = ({ onClick }) => {
  return (
    <button className="button--small" onClick={onClick}>
      Cancel
    </button>
  );
};

export default CancelButton;
