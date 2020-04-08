import React from "react";
import { getDateString } from "../../../util/functions";

const DisplayValue = ({ value, type }) => {
  if (type === "checkbox") {
    return <input type="checkbox" checked={!!value} disabled />;
  }
  if (type === "date") {
    return <span>{getDateString(value)}</span>;
  }
  return <span>{value}</span>;
};

export default DisplayValue;
