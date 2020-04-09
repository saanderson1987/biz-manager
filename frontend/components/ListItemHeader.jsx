import React, { useState, useEffect } from "react";
import classNames from "classnames";
import ExpansionCaret from "./common/ExpansionCaret";
import Loader from "./common/Loader";
import Input from "./common/Input";
import DisplayValue from "./common/DisplayValue";
import EditAndSaveButtonRow from "./common/buttons/EditAndSaveButtonRow";
import DeleteButton from "./common/buttons/DeleteButton";
import "./ListItemHeader.scss";

const ListItemHeader = ({
  itemName,
  isExpanded,
  toggleExpanded,
  isEditable,
  save,
}) => {
  const [inEditMode, setInEditMode] = useState(false);
  const [isValueUpdating, setIsValueUpdating] = useState(false);
  const [editedItemName, setEditedItemName] = useState(itemName);

  useEffect(() => {
    setEditedItemName(itemName);
    if (isValueUpdating) {
      setIsValueUpdating(false);
    }
  }, [itemName]);

  return (
    <div className="list-item-header">
      <div
        onClick={(e) => {
          if (
            e.target.className.split(" ").includes("expandable-on-click") &&
            !inEditMode
          ) {
            toggleExpanded();
          }
        }}
        style={{ display: "flex", width: "100%" }}
        className="expandable-on-click"
      >
        <ExpansionCaret
          isExpanded={isExpanded}
          className="expandable-on-click"
        />
        <div className={"list-item-name"}>
          {isValueUpdating ? (
            <Loader isInline />
          ) : inEditMode && isEditable ? (
            <Input value={editedItemName} onChange={setEditedItemName} />
          ) : (
            <div className={classNames({ bold: isExpanded })}>
              <DisplayValue value={itemName} className="expandable-on-click" />
            </div>
          )}
        </div>
        {isExpanded && isEditable && (
          <div
            // style={{ width: "100%" }}
            className={"EditAndSaveButtonRow-container"}
          >
            <EditAndSaveButtonRow
              save={() => {
                setInEditMode(!inEditMode);
                if (editedItemName !== itemName) {
                  setIsValueUpdating(true);
                  save(editedItemName);
                }
              }}
              inEditMode={inEditMode}
              toggleEditMode={() => setInEditMode(!inEditMode)}
            />
          </div>
        )}
      </div>
      {isExpanded && (
        <DeleteButton onClick={() => setIsDeleteWarningVisible(true)} />
      )}
    </div>
  );
};

export default ListItemHeader;
