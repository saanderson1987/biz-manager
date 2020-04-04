import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import get from "lodash.get";
import {
  listNameByItemType,
  parentColumnByItemType,
  listQueryColumnNamesByItemType,
} from "../constants";
import ListItem from "./ListItem";
import NewItemModal from "./NewItemModal";

const List = ({
  getAll,
  items,
  type,
  isRoot,
  resource,
  subset,
  route,
  parentId,
}) => {
  const [isNewItemModalVisible, setIsNewItemModalVisible] = useState(false);
  useEffect(() => {
    getAll();
  }, []);

  return (
    <div className={"list"}>
      {!isRoot && <div className="list-name">{listNameByItemType[type]}:</div>}
      <div className={classNames("list-items", { "list-items--root": isRoot })}>
        <div
          className={classNames({ "root-list-new-button-container": isRoot })}
        >
          <button
            className="button--new"
            onClick={() => setIsNewItemModalVisible(true)}
          >
            <i className="fas fa-plus-circle"></i>
            <span>Create new</span>
          </button>
        </div>
        {items.map((item, idx) => (
          <ListItem
            type={type}
            item={item}
            isFirst={idx === 0}
            resource={resource}
            subset={subset}
            route={route}
            key={item.id}
          />
        ))}
      </div>
      {isNewItemModalVisible && (
        <NewItemModal
          type={type}
          closeModal={() => setIsNewItemModalVisible(false)}
          resource={resource}
          subset={subset}
          route={route}
          parentId={parentId}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state, { resource, subset }) => ({
  items: Object.values(
    subset ? get(state[resource.name], subset, {}) : state[resource.name]
  ),
});

const mapDispatchToProps = (
  dispatch,
  { resource: { getByQuery }, type, parentId, subset, route }
) => {
  const parentColumn = parentColumnByItemType[type];
  const parentIdQuery =
    parentColumn && parentId ? { [parentColumn]: parentId } : {};
  return {
    getAll: () =>
      dispatch(
        getByQuery(
          { columns: listQueryColumnNamesByItemType[type], ...parentIdQuery },
          subset,
          route
        )
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
