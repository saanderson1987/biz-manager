import React from "react";

const ExpansionCaret = ({ isExpanded, onClick }) => (
  <span onClick={onClick}>
    {isExpanded ? (
      <i className="fas fa-caret-down"></i>
    ) : (
      <i className="fas fa-caret-right"></i>
    )}
  </span>
);

export default ExpansionCaret;
