import React, { useContext, useState, useEffect } from "react";
import classNames from "classnames";
import get from "lodash.get";
import {
  createListGetByQueryOptions,
  getDefaultListSortFuncByItemType,
  listNameByItemType,
} from "../constants";
import { StoreContext } from "../store";
import ListItem from "./ListItem";
import NewItemModal from "./NewItemModal";

const List = ({ type, parentId, statePath, isRoot }) => {
  const { state, getByQuery } = useContext(StoreContext);

  const [isNewItemModalVisible, setIsNewItemModalVisible] = useState(false);

  useEffect(() => {
    getByQuery(createListGetByQueryOptions(type, parentId, statePath));
  }, [type]);

  const sortFunc = getDefaultListSortFuncByItemType(type);
  const items = Object.values(get(state, statePath, {})).sort(sortFunc);

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
            parentId={parentId}
            statePath={statePath}
            key={item.id}
          />
        ))}
      </div>
      {isNewItemModalVisible && (
        <NewItemModal
          type={type}
          closeModal={() => setIsNewItemModalVisible(false)}
          statePath={statePath}
          parentId={parentId}
        />
      )}
    </div>
  );
};

export default List;
