import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { capitalize } from "../../../util/functions";

const Input = ({ type, value, onChange, valueOptions }) => {
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
  if (type === "radio") {
    return valueOptions.map((option) => (
      <div className="radio-buttons-row" key={option.value}>
        <input
          type="radio"
          value={option.value}
          checked={value === option.value}
          onChange={() => onChange(option.value)}
          id={option.value}
        />
        <div className="radio-button-display-name">
          <label htmlFor={option.value}>
            {option.displayName || capitalize(option.value)}
          </label>
        </div>
      </div>
    ));
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
