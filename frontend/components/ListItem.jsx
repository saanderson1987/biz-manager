import React, { useState } from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import ItemDetails from "./ItemDetails";
import DeleteWarning from "./DeleteWarning";
import { getItemNameFuncByItemType } from "../constants";

const ListItem = ({
  type,
  item,
  isFirst,
  deleteItem,
  resource,
  subset,
  route
}) => {
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
          resource={resource}
          subset={subset}
          route={route}
        />
      )}
      {isDeleteWarningVisible && (
        <DeleteWarning
          itemName={itemName}
          closeModal={() => setIsDeleteWarningVisible(false)}
          deleteItem={() => deleteItem(item.id)}
        />
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch, { resource, subset, route }) => ({
  deleteItem: id => dispatch(resource.delete(id, subset, route))
});

export default connect(null, mapDispatchToProps)(ListItem);
