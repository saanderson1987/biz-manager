import React from "react";
import { getDateString } from "../../../util/functions";

const DisplayValue = ({ value, type, className }) => {
  if (type === "checkbox") {
    return (
      <input type="checkbox" checked={!!value} disabled className={className} />
    );
  }
  if (type === "date") {
    return <span className={className}>{getDateString(value)}</span>;
  }
  return <span className={className}>{value}</span>;
};

export default DisplayValue;
