import React, { useState } from "react";
import classNames from "classnames";
import ExpansionCaret from "./common/ExpansionCaret";
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
  const [editedItemName, setEditedItemName] = useState(itemName);

  return (
    <div className="list-item-header">
      <div>
        <ExpansionCaret
          isExpanded={isExpanded}
          onClick={() => toggleExpanded()}
        />
        <div className={"list-item-name"}>
          {inEditMode && isEditable ? (
            <Input value={editedItemName} onChange={setEditedItemName} />
          ) : (
            <div
              onClick={() => toggleExpanded()}
              className={classNames({ bold: isExpanded })}
            >
              <DisplayValue value={itemName} />
            </div>
          )}
        </div>
        {isExpanded && isEditable && (
          <div className={"EditAndSaveButtonRow-container"}>
            <EditAndSaveButtonRow
              save={() => {
                setInEditMode(!inEditMode);
                save(editedItemName);
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
