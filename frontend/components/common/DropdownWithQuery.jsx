import React, { useState, useEffect, useContext } from "react";
import {
  apiRouteByItemType,
  queryParamsByItemType,
  getItemNameFuncByItemType,
  itemNameByItemType,
} from "../../constants";
import { StoreContext } from "../../store";
import Input from "./Input";
import NewItemModal from "../NewItemModal";

const DropdownWithQuery = ({ value, type, onChange }) => {
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
    <>
      <Input
        value={value}
        type={"dropdown"}
        onChange={onChange}
        valueOptions={[
          {
            value: "",
            displayName: ` -- select a ${itemTypeName} -- `,
            isDisabled: true,
          },
          ...items.map((item) => ({
            value: item.id,
            displayName: getItemNameFuncByItemType[type](item).itemName,
          })),
        ]}
      />
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
    </>
  );
};

export default DropdownWithQuery;
