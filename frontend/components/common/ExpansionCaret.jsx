import React from "react";

const ExpansionCaret = ({ isExpanded, onClick, className = "" }) => (
  <span onClick={onClick}>
    {isExpanded ? (
      <i className={`${className} fas fa-caret-down`}></i>
    ) : (
      <i className={`${className} fas fa-caret-right`}></i>
    )}
  </span>
);

export default ExpansionCaret;
