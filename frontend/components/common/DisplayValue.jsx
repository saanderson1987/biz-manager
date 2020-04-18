import React from "react";
import { getDateString, capitalize } from "../../../util/functions";

const DisplayValue = ({ value, type, className }) => {
  let displayValue = value;
  if (type === "checkbox") {
    return (
      <input type="checkbox" checked={!!value} disabled className={className} />
    );
  }
  if (type === "date") {
    displayValue = getDateString(value);
  }
  if (type === "radio") {
    displayValue = capitalize(value);
  }
  if (type === "text-box") {
    return (value || "")
      .split("\n")
      .map((line) => (line ? <div>{line}</div> : <br />));
  }
  return <span className={className}>{displayValue}</span>;
};

export default DisplayValue;
