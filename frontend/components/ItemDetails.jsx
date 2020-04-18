import React, { useContext, useEffect } from "react";
import get from "lodash.get";
import {
  apiRouteByItemType,
  itemDetailFieldsByItemType,
  createItemDetailsGetByIdQueryOptions,
} from "../constants";
import { StoreContext } from "../store";
import ItemDetail from "./ItemDetail";

const ItemDetails = ({ type, itemId, statePath }) => {
  const { state, getById, updateRecord } = useContext(StoreContext);

  const route = apiRouteByItemType[type];
  const item = get(state, [...statePath, itemId]);

  useEffect(() => {
    if (itemId) {
      getById(createItemDetailsGetByIdQueryOptions(type, itemId, statePath));
    }
  }, [itemId]);

  return (
    item && (
      <table>
        <tbody>
          {itemDetailFieldsByItemType[type].map((field, i) => (
            <ItemDetail
              field={field}
              value={item[field.columnName]}
              updateValue={(newValue) =>
                updateRecord({
                  route,
                  record: {
                    id: item.id,
                    [field.columnName]: newValue || null,
                  },
                  statePath,
                })
              }
              key={i}
            />
          ))}
        </tbody>
      </table>
    )
  );
};

export default ItemDetails;
