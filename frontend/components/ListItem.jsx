import React, { useContext, useState } from "react";
import classNames from "classnames";
import ItemDetails from "./ItemDetails";
import DeleteWarning from "./DeleteWarning";
import { getItemNameFuncByItemType } from "../constants";
import { StoreContext } from "../store";

const ListItem = ({ type, item, isFirst, parentId, statePath }) => {
  const { deleteRecord } = useContext(StoreContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleteWarningVisible, setIsDeleteWarningVisible] = useState(false);
  const itemName = getItemNameFuncByItemType[type](item);

  return (
    <div className={classNames("list-item", { "list-item--first": isFirst })}>
      <div className="list-item-header">
        <div
          className={classNames("list-item-label", { bold: isExpanded })}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <i className="fas fa-caret-down"></i>
          ) : (
            <i className="fas fa-caret-right"></i>
          )}
          <span>{itemName}</span>
        </div>
        {isExpanded && (
          <button
            className="button--small"
            onClick={() => setIsDeleteWarningVisible(true)}
          >
            Delete
          </button>
        )}
      </div>
      {isExpanded && (
        <ItemDetails
          type={type}
          itemId={item.id}
          parentId={parentId}
          statePath={statePath}
        />
      )}
      {isDeleteWarningVisible && (
        <DeleteWarning
          itemName={itemName}
          closeModal={() => setIsDeleteWarningVisible(false)}
          deleteItem={() => deleteRecord({ route, id: item.id, statePath })}
        />
      )}
    </div>
  );
};

export default ListItem;
