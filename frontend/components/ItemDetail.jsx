import React, { useState, useEffect } from "react";
import Loader from "./common/Loader";
import Input from "./common/Input";
import DisplayValue from "./common/DisplayValue";
import EditAndSaveButtonRow from "./common/buttons/EditAndSaveButtonRow";

const formatDetailValueState = (value, type) =>
  type === "date" ? new Date(value) : value;

const ItemDetail = ({
  field: { columnName, displayName, type, valueOptions },
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

  return (
    <div className="item-detail">
      <div className="item-detail-name">
        {displayName
          ? displayName
          : columnName.charAt(0).toUpperCase() + columnName.slice(1)}
        :
      </div>
      {isValueUpdating ? (
        <Loader isInline />
      ) : (
        <div className="detail-value-container">
          <div className="item-detail-value">
            {inEditMode ? (
              <Input
                value={editedValue}
                type={type}
                onChange={setEditedValue}
                valueOptions={valueOptions}
              />
            ) : (
              <DisplayValue value={value} type={type} />
            )}
          </div>
          <div className={"EditAndSaveButtonRow-container"}>
            <EditAndSaveButtonRow
              save={() => {
                setInEditMode(!inEditMode);
                if (editedValue !== value) {
                  setIsValueUpdating(true);
                  updateValue(editedValue);
                }
              }}
              inEditMode={inEditMode}
              toggleEditMode={() => setInEditMode(!inEditMode)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetail;
