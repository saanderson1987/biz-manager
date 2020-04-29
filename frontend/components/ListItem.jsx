import React, { useContext, useState } from "react";
import classNames from "classnames";
import {
  getItemNameFuncByItemType,
  apiRouteByItemType,
  itemListsByItemType,
  getItemWarningByItemType,
  onAddOrRemoveByType,
} from "../constants";
import { StoreContext } from "../store";
import ListItemHeader from "./ListItemHeader";
import ItemDetails from "./ItemDetails";
import List from "./List";
import DeleteWarning from "./DeleteWarning";

const ListItem = ({ type, item, isFirst, parentId, statePath }) => {
  const storeContext = useContext(StoreContext);
  const { updateRecord, deleteRecord } = storeContext;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleteWarningVisible, setIsDeleteWarningVisible] = useState(false);

  const { itemName, itemNameColumnName } = getItemNameFuncByItemType[type](
    item
  );
  const route = apiRouteByItemType[type];

  return (
    <div className={classNames("list-item", { "list-item--first": isFirst })}>
      <ListItemHeader
        itemName={itemName}
        isExpanded={isExpanded}
        toggleExpanded={() => setIsExpanded(!isExpanded)}
        isEditable={!!itemNameColumnName}
        warning={
          getItemWarningByItemType[type] && getItemWarningByItemType[type](item)
        }
        update={(newValue) =>
          updateRecord({
            route,
            record: { id: item.id, [itemNameColumnName]: newValue },
            statePath,
          })
        }
        onClickDelete={() => setIsDeleteWarningVisible(true)}
      />
      {isExpanded && (
        <>
          <ItemDetails
            type={type}
            itemId={item.id}
            parentId={parentId}
            statePath={statePath}
          />
          {(itemListsByItemType[type] || []).map((list, i) => (
            <List
              type={list.type}
              parentId={item.id}
              statePath={[...statePath, item.id, list.type]}
              key={i}
            />
          ))}
        </>
      )}
      {isDeleteWarningVisible && (
        <DeleteWarning
          itemName={itemName}
          closeModal={() => setIsDeleteWarningVisible(false)}
          deleteItem={() =>
            deleteRecord({ route, id: item.id, statePath }).then(() => {
              if (onAddOrRemoveByType[type]) {
                onAddOrRemoveByType[type](statePath, storeContext);
              }
            })
          }
        />
      )}
    </div>
  );
};

export default ListItem;
