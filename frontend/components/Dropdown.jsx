import React, { useContext, useState, useEffect } from "react";
import {
  apiRouteByItemType,
  queryParamsByItemType,
  getItemNameFuncByItemType,
  itemNameByItemType,
} from "../constants";
import NewItemModal from "./NewItemModal";
import { StoreContext } from "../store";

const Dropdown = ({ type, value, onChange }) => {
  const { state, getByQuery } = useContext(StoreContext);

  const [isNewItemModalVisible, setIsNewItemModalVisible] = useState(false);

  useEffect(() => {
    getByQuery({
      route: apiRouteByItemType[type],
      queryParams: {
        ...queryParamsByItemType[type],
      },
      statePath: [type],
    });
  }, []);

  const items = Object.values(state[type]);
  const itemTypeName = itemNameByItemType[type];

  return (
    <div>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option disabled value="">
          {" "}
          -- select a {itemTypeName} --{" "}
        </option>
        {items.map((item) => (
          <option value={item.id} key={item.id}>
            {getItemNameFuncByItemType[type](item).itemName}
          </option>
        ))}
      </select>
      <div>
        <button
          className="button--new"
          onClick={() => setIsNewItemModalVisible(true)}
        >
          <i className="fas fa-plus-circle"></i>
          <span>Create new {itemTypeName}</span>
        </button>
      </div>
      {isNewItemModalVisible && (
        <NewItemModal
          type={type}
          closeModal={() => setIsNewItemModalVisible(false)}
          statePath={[type]}
        />
      )}
    </div>
  );
};

export default Dropdown;
