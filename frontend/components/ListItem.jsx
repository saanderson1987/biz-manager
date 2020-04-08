import React, { useContext, useState } from "react";
import classNames from "classnames";
import { getItemNameFuncByItemType, apiRouteByItemType } from "../constants";
import { StoreContext } from "../store";
import ListItemHeader from "./ListItemHeader";
import ItemDetails from "./ItemDetails";
import DeleteWarning from "./DeleteWarning";

const ListItem = ({ type, item, isFirst, parentId, statePath }) => {
  const { updateRecord, deleteRecord } = useContext(StoreContext);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleteWarningVisible, setIsDeleteWarningVisible] = useState(false);

  const { itemName, itemNameColumnName } = getItemNameFuncByItemType[type](
    item
  );

  return (
    <div className={classNames("list-item", { "list-item--first": isFirst })}>
      <ListItemHeader
        itemName={itemName}
        isExpanded={isExpanded}
        toggleExpanded={() => setIsExpanded(!isExpanded)}
        isEditable={!!itemNameColumnName}
        save={(newValue) =>
          updateRecord({
            route: apiRouteByItemType[type],
            record: { id: item.id, [itemNameColumnName]: newValue },
            statePath,
          })
        }
      />
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
