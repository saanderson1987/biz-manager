import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

const formatDetailValueFromProps = value =>
  value instanceof Date
    ? moment(value)
        .locale(moment.locale())
        .format("L")
    : value;

const ItemDetail = props => {
  const { columnName, updateDetail, displayName } = props;
  const [inEditMode, setInEditMode] = useState(false);
  const [isDetailValueUpdating, setIsDetailValueUpdating] = useState(false);
  const [detailValueState, setDetailValueState] = useState(
    formatDetailValueFromProps(props.detailValue)
  );

  useEffect(() => {
    setDetailValueState(formatDetailValueFromProps(props.detailValue));
    if (isDetailValueUpdating) {
      setIsDetailValueUpdating(false);
    }
  }, [props.detailValue]);

  const getInput = () => {
    if (props.detailValue instanceof Date) {
      return (
        <DatePicker
          selected={detailValueState}
          onChange={date => setDetailValueState(date)}
        />
      );
    }
    if (typeof props.detailValue === "boolean") {
      return (
        <input
          type="checkbox"
          checked={detailValueState}
          onChange={({ target: { checked } }) => setDetailValueState(checked)}
        />
      );
    }
    return (
      <input
        type="text"
        value={detailValueState}
        onChange={({ target: { value } }) => setDetailValueState(value)}
      />
    );
  };

  const getDisplayValue = () => {
    if (typeof props.detailValue === "boolean") {
      return <input type="checkbox" checked={props.detailValue} disabled />;
    }
    return props.detailValue;
  };

  const editIcons = inEditMode ? (
    <div className="save-cancel-buttons">
      <button
        className="button--small"
        onClick={() => {
          setInEditMode(false);
          if (props.detailValue !== detailValueState) {
            setIsDetailValueUpdating(true);
            updateDetail(detailValueState);
          }
        }}
      >
        <i className="button-icon check-icon far fa-check-circle"></i>
        <span>Save</span>
      </button>
      <button className="button--small" onClick={() => setInEditMode(false)}>
        Cancel
      </button>
    </div>
  ) : (
    <div className="save-cancel-buttons">
      <button className="button--small" onClick={() => setInEditMode(true)}>
        <i className="button-icon pencil-icon fas fa-pencil-alt"></i>
        <span>Edit</span>
      </button>
    </div>
  );

  const detailValueContainer = isDetailValueUpdating ? (
    <div className="loader inline" />
  ) : (
    <div className="detail-value-container">
      <div className="item-detail-value">
        {inEditMode ? getInput() : getDisplayValue()}
      </div>
      {editIcons}
    </div>
  );

  return (
    <div className="item-detail">
      <div className="item-detail-name">
        {displayName
          ? displayName
          : columnName.charAt(0).toUpperCase() + columnName.slice(1)}
        :
      </div>
      {detailValueContainer}
    </div>
  );
};

export default ItemDetail;
