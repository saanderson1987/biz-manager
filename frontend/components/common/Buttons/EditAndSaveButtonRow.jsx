import React from "react";
import SaveButton from "./SaveButton";
import CancelButton from "./CancelButton";
import EditButton from "./EditButton";

const EditAndSaveButtonRow = ({ save, inEditMode, toggleEditMode }) => {
  return inEditMode ? (
    <div className="save-cancel-buttons">
      <SaveButton onClick={save} />
      <CancelButton onClick={toggleEditMode} />
    </div>
  ) : (
    <EditButton onClick={toggleEditMode} />
  );
};

export default EditAndSaveButtonRow;
