import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  listQueryColumnNamesByItemType,
  getItemNameFuncByItemType,
  itemNameByItemType,
} from "../constants";
import NewItemModal from "./NewItemModal";

const Dropdown = ({ type, getAll, value, onChange, items, resource }) => {
  const [isNewItemModalVisible, setIsNewItemModalVisible] = useState(false);

  useEffect(() => {
    getAll();
  }, []);

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
            {getItemNameFuncByItemType[type](item)}
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
          resource={resource}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state, { resource }) => ({
  items: Object.values(state[resource.name]),
});

const mapDispatchToProps = (dispatch, { resource, type }) => ({
  getAll: () =>
    dispatch(
      resource.getByQuery({ columns: listQueryColumnNamesByItemType[type] })
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);
