import React, { useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
  newItemNameByItemType,
  newItemFormFieldsByItemType
} from "../constants";
import NewItemDetail from "./NewItemDetail";

const createPendingNewRecord = type =>
  newItemFormFieldsByItemType[type].reduce((acc, field) => {
    if (field.type === "checkbox") {
      acc[field.columnName] = false;
    } else if (field.type === "date") {
      acc[field.columnName] = moment();
    } else {
      acc[field.columnName] = "";
    }
    return acc;
  }, {});

const NewItemForm = ({ type, closeModal, create }) => {
  const [pendingNewRecord, setPendingNewRecord] = useState(
    createPendingNewRecord(type)
  );

  return (
    <div className="form">
      <div className="form-header">
        Create New {newItemNameByItemType[type]}
      </div>
      <div className="form-body">
        {newItemFormFieldsByItemType[type].map((field, i) => (
          <NewItemDetail
            field={field}
            detailValue={pendingNewRecord[field.columnName]}
            displayName={field.displayName}
            onValueChange={value =>
              setPendingNewRecord(prev => ({
                ...prev,
                [field.columnName]: value
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
              const newRecord = { ...pendingNewRecord };
              if (parent) {
                newRecord[parent.column] = parent.id;
              }
              create({ ...pendingNewRecord });
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

const mapDispatchToProps = (dispatch, { resource, subset, route }) => ({
  create: record => dispatch(resource.create(record, subset, route))
});

export default connect(null, mapDispatchToProps)(NewItemForm);
