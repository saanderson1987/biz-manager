import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Input = ({ type, value, onChange }) => {
  if (type === "date") {
    return <DatePicker selected={value} onChange={(date) => onChange(date)} />;
  }
  if (type === "checkbox") {
    return (
      <input
        type="checkbox"
        checked={value}
        onChange={({ target: { checked } }) => onChange(checked)}
      />
    );
  }
  return (
    <input
      type="text"
      value={value}
      onChange={({ target: { value } }) => onChange(value)}
    />
  );
};

export default Input;
