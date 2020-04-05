import React, { useContext, useEffect } from "react";
import get from "lodash.get";
import { apiRouteByItemType, itemDetailFieldsByItemType } from "../constants";
import { StoreContext } from "../store";
import ItemDetail from "./ItemDetail";
import List from "./List";

const ItemDetails = ({ type, itemId, statePath }) => {
  const { state, getById, updateRecord } = useContext(StoreContext);

  const route = apiRouteByItemType[type];
  const item = get(state, [...statePath, itemId]);

  useEffect(() => {
    if (itemId) {
      getById({ route, id: itemId, statePath });
    }
  }, [itemId]);

  return (
    item && (
      <div className="item-details">
        {itemDetailFieldsByItemType[type].map((field, i) => {
          if (field.type === "list") {
            return (
              <List
                type={field.columnName}
                parentId={itemId}
                statePath={[...statePath, itemId, field.columnName]}
                key={i}
              />
            );
          } else {
            return (
              <ItemDetail
                field={field}
                detailValue={item[field.columnName]}
                updateDetail={(newValue) =>
                  updateRecord({
                    route,
                    record: { id: item.id, [field.columnName]: newValue },
                    statePath,
                  })
                }
                key={i}
              />
            );
          }
        })}
      </div>
    )
  );
};

export default ItemDetails;
