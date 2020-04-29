import React, { useContext, useState } from "react";
import { capitalize } from "../../util/functions";
import {
  itemNameByItemType,
  newItemFormFieldsByItemType,
  apiRouteByItemType,
  getNewItemRecordBase,
  onAddOrRemoveByType,
} from "../constants";
import { StoreContext } from "../store";
import NewItemDetail from "./NewItemDetail";

const createPendingNewRecord = (type) =>
  newItemFormFieldsByItemType[type].reduce((acc, field) => {
    if (field.type === "checkbox") {
      acc[field.columnName] = false;
    } else if (field.type === "date") {
      acc[field.columnName] = new Date();
    } else {
      acc[field.columnName] = "";
    }
    return acc;
  }, {});

const NewItemForm = ({ type, parentId, statePath, closeModal }) => {
  const storeContext = useContext(StoreContext);
  const {
    state: { user },
    createRecord,
  } = storeContext;
  const [pendingNewRecord, setPendingNewRecord] = useState(
    createPendingNewRecord(type)
  );

  return (
    <div className="form">
      <div className="form-header">
        Create New {capitalize(itemNameByItemType[type])}
      </div>
      <div className="form-body">
        <table className="form-table">
          <tbody>
            {newItemFormFieldsByItemType[type].map((field, i) => (
              <NewItemDetail
                field={field}
                detailValue={pendingNewRecord[field.columnName]}
                displayName={field.displayName}
                onValueChange={(value) =>
                  setPendingNewRecord((prev) => ({
                    ...prev,
                    [field.columnName]: value,
                  }))
                }
                key={i}
              />
            ))}
          </tbody>
        </table>
        <div className="button-row">
          <button onClick={closeModal}>Cancel</button>
          <button
            className="button--save"
            onClick={() => {
              const newRecordBase = getNewItemRecordBase({
                type,
                parentId,
                parentType: statePath[statePath.length - 3],
                userId: user ? user.id : "",
                type,
                hasNotes: pendingNewRecord.notes,
              });
              const newRecord = { ...newRecordBase, ...pendingNewRecord };
              createRecord({
                route: apiRouteByItemType[type],
                newRecord,
                statePath,
              }).then(() => {
                if (onAddOrRemoveByType[type]) {
                  onAddOrRemoveByType[type](statePath, storeContext);
                }
              });
              closeModal();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewItemForm;
