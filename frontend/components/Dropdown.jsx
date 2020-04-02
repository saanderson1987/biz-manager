import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import NewItemModal from "./NewItemModal";

const Dropdown = ({ value, onChange, items, resource }) => {
  const [isNewItemModalVisible, setIsNewItemModalVisible] = useState(false);

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div>
      <select value={value} onChange={e => onChange(e.target.value)}>
        <option disabled value="">
          {" "}
          -- select a vendor --{" "}
        </option>
        {items.map(item => (
          <option value={item.id}>{item.name}</option>
        ))}
      </select>
      <div>
        <button
          className="button--new"
          onClick={() => setIsNewItemModalVisible(true)}
        >
          <i className="fas fa-plus-circle"></i>
          <span>Create new vendor</span>
        </button>
      </div>
      {isNewItemModalVisible && (
        <NewItemModal
          type={"vendor"}
          closeModal={() => setIsNewItemModalVisible(false)}
          resource={resource}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state, { resource }) => ({
  items: Object.values(state[resource.name])
});

const mapDispatchToProps = (dispatch, { resource }) => ({
  getAll: () => dispatch(resource.getByQuery({ columns: "name" }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);
