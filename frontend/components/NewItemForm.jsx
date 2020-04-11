import React, { useContext, useState } from "react";
import { capitalize } from "../../util/functions";
import {
  itemNameByItemType,
  newItemFormFieldsByItemType,
  parentColumnByItemType,
  apiRouteByItemType,
  newItemRecordBaseByItemType,
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
  const { createRecord } = useContext(StoreContext);

  const [pendingNewRecord, setPendingNewRecord] = useState(
    createPendingNewRecord(type)
  );

  return (
    <div className="form">
      <div className="form-header">
        Create New {capitalize(itemNameByItemType[type])}
      </div>
      <div className="form-body">
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
        <div className="button-row">
          <button onClick={closeModal}>Cancel</button>
          <button
            className="button--save"
            onClick={() => {
              const newRecordBase = newItemRecordBaseByItemType[type] || {};
              const newRecord = { ...newRecordBase, ...pendingNewRecord };
              if (parentId) {
                newRecord[parentColumnByItemType[type]] = parentId;
              }
              if (type === "vendors") {
                newRecord.status = "vendor";
              }
              createRecord({
                route: apiRouteByItemType[type],
                newRecord,
                statePath,
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
