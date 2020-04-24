import React from "react";
import classNames from "classnames";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { capitalize } from "../../../util/functions";

// if props.save is defined and props.type is text, then `save` will be called if user presses enter in the text input.
const Input = ({
  type,
  value,
  onChange,
  valueOptions,
  save,
  inputRef,
  className,
}) => {
  const commonInputProps = {
    onKeyUp: ({ keyCode }) => {
      if (save && keyCode === 13 /* 13 is enter key */) {
        save();
      }
    },
    ref: inputRef,
    className,
  };

  if (type === "date") {
    return <DatePicker selected={value} onChange={(date) => onChange(date)} />;
  }
  if (type === "checkbox") {
    return (
      <input
        type="checkbox"
        checked={value}
        onChange={({ target: { checked } }) => onChange(checked)}
        {...commonInputProps}
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
          {...commonInputProps}
        />
        <div className="radio-button-display-name">
          <label htmlFor={option.value}>
            {option.displayName || capitalize(option.value)}
          </label>
        </div>
      </div>
    ));
  }
  if (type === "dropdown") {
    return (
      <select
        value={value || ""}
        onChange={({ target: { value } }) => onChange(value)}
        {...commonInputProps}
      >
        {valueOptions.map((option) => (
          <option
            value={option.value}
            disabled={option.isDisabled}
            key={option.value}
          >
            {option.displayName || option.value}
          </option>
        ))}
      </select>
    );
  }
  if (type === "text-box") {
    return (
      <textarea
        value={value}
        onChange={({ target: { value } }) => onChange(value)}
        ref={inputRef}
        className={classNames(className, "text-box")}
      />
    );
  }
  if (type === "password") {
    return (
      <input
        type="password"
        value={value}
        onChange={({ target: { value } }) => onChange(value)}
        {...commonInputProps}
      />
    );
  }
  return (
    <input
      type="text"
      value={value}
      onChange={({ target: { value } }) => onChange(value)}
      {...commonInputProps}
    />
  );
};

export default Input;
