import React, { useEffect } from "react";
import { connect } from "react-redux";
import get from "lodash.get";
import ItemDetail from "./ItemDetail";
import List from "./List";
import { itemDetailFieldsByItemType } from "../constants";

const ItemDetails = ({
  type,
  itemId,
  item,
  getItemById,
  update,
  resource,
  subset,
  route,
}) => {
  useEffect(() => {
    if (itemId) {
      getItemById(itemId);
    }
  }, []);

  return (
    item && (
      <div className="item-details">
        {itemDetailFieldsByItemType[type].map((field, i) => {
          if (field.type === "list") {
            return (
              <List
                type={field.columnName}
                resource={resource}
                parentId={itemId}
                subset={[...(subset || []), itemId, field.columnName]}
                // TODO should field.columnName correspond to route ??
                route={field.columnName}
                key={i}
              />
            );
          } else {
            return (
              <ItemDetail
                field={field}
                detailValue={item[field.columnName]}
                updateDetail={(newValue) =>
                  update({ id: item.id, [field.columnName]: newValue })
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

const mapStateToProps = (state, { subset, resource, itemId }) => {
  return {
    item: subset
      ? get(state[resource.name], [...subset, itemId])
      : state[resource.name][itemId],
  };
};

const mapDispatchToProps = (dispatch, { resource, subset, route }) => ({
  getItemById: (id) => dispatch(resource.getById(id, subset, route)),
  update: (record) => dispatch(resource.update(record, subset, route)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetails);
