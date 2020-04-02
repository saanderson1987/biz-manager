import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { capitalize } from "../../util/functions";
import Dropdown from "./Dropdown";

const NewItemDetail = ({
  detailValue,
  onValueChange,
  field: { displayName, columnName, type, valueOptions }
}) => {
  const getInput = () => {
    switch (type) {
      case "radio":
        return valueOptions.map(valueOption => (
          <div className="radio-buttons-row" key={valueOption.value}>
            <input
              type="radio"
              className="radio-button"
              value={valueOption.value}
              checked={detailValue === valueOption.value}
              onChange={() => onValueChange(valueOption.value)}
            />
            <div className="radio-button-display-name">
              {valueOption.displayName || capitalize(valueOption.value)}
            </div>
          </div>
        ));

      case "date":
        return (
          <DatePicker
            selected={moment(detailValue)}
            onChange={date => onValueChange(date)}
            popperPlacement="bottom"
          />
        );
      case "checkbox":
        return (
          <input
            type="checkbox"
            checked={detailValue}
            onChange={e => onValueChange(e.target.checked)}
          />
        );
      case "dropdown":
        return (
          <Dropdown
            resource={itemDetail.resource}
            value={detailValue}
            onChange={newValue => onValueChange(newValue)}
          />
        );
      default:
        return (
          <input
            type="text"
            value={detailValue}
            onChange={e => onValueChange(e.target.value)}
          />
        );
    }
  };

  return (
    <div className="form-item-detail">
      <div className="item-detail-name">
        {displayName
          ? displayName + ":"
          : columnName.charAt(0).toUpperCase() + columnName.slice(1) + ":"}
      </div>
      <div className="item-detail-value">{getInput()}</div>
    </div>
  );
};

export default NewItemDetail;
