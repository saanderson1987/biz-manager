import React, { useState, useEffect, createRef } from "react";
import Loader from "./common/Loader";
import Input from "./common/Input";
import DisplayValue from "./common/DisplayValue";
import EditAndSaveButtonRow from "./common/buttons/EditAndSaveButtonRow";

const formatDetailValueState = (value, type) => {
  if (type === "date") {
    return value ? new Date(value) : new Date();
  }
  return value;
};

const ItemDetail = ({
  field: {
    columnName,
    displayName,
    type,
    getDisplayValue,
    valueOptions,
    isReadOnly,
  },
  value,
  updateValue,
}) => {
  const [inEditMode, setInEditMode] = useState(false);
  const [isValueUpdating, setIsValueUpdating] = useState(false);
  const [editedValue, setEditedValue] = useState(
    formatDetailValueState(value, type)
  );

  useEffect(() => {
    setEditedValue(formatDetailValueState(value, type));
    if (isValueUpdating) {
      setIsValueUpdating(false);
    }
  }, [value]);

  useEffect(() => {
    if (
      inEditMode &&
      inputToFocusRef.current &&
      inputToFocusRef.current.focus
    ) {
      inputToFocusRef.current.focus();
    }
  }, [inEditMode]);

  const save = () => {
    setInEditMode(!inEditMode);
    if (editedValue !== value) {
      setIsValueUpdating(true);
      updateValue(editedValue);
    }
  };

  const inputToFocusRef = createRef();

  return (
    <tr className="item-detail-row">
      <td className="item-detail-name">
        {displayName
          ? displayName
          : columnName.charAt(0).toUpperCase() + columnName.slice(1)}
        :
      </td>
      <td className="item-detail-value">
        {isValueUpdating ? (
          <Loader isInline />
        ) : inEditMode ? (
          <Input
            value={editedValue}
            type={type}
            onChange={setEditedValue}
            valueOptions={valueOptions}
            save={save}
            inputRef={inputToFocusRef}
          />
        ) : (
          <DisplayValue
            value={getDisplayValue ? getDisplayValue(value) : value}
            type={type}
          />
        )}
      </td>
      <td className="item-detail-edit-and-save">
        <EditAndSaveButtonRow
          save={save}
          inEditMode={inEditMode}
          toggleEditMode={() => {
            setInEditMode(!inEditMode);
          }}
        />
      </td>
    </tr>
  );
};

export default ItemDetail;
