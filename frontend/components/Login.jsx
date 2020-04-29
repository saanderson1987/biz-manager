import React, { useState, useContext } from "react";
import { StoreContext } from "../store";
import Modal from "./Modal";
import Input from "./common/Input";

const Login = () => {
  const {
    login,
    state: {
      authentication: { error },
    },
  } = useContext(StoreContext);
  const [formData, setFormData] = useState({ username: "", password: "" });

  const fields = [
    { fieldName: "username", displayName: "Username", type: "text" },
    { fieldName: "password", displayName: "Password", type: "password" },
  ];

  const save = () => login(formData);

  return (
    <Modal>
      <div className="form">
        <div className="form-header">Login</div>
        <div className="form-body">
          <table className="form-table">
            <tbody>
              {fields.map(({ fieldName, displayName, type }, i) => (
                <tr key={i}>
                  <td className="item-detail-name">{displayName}</td>
                  <td className="item-detail-value">
                    <Input
                      value={formData[fieldName]}
                      type={type}
                      onChange={(newVal) =>
                        setFormData((prev) => ({
                          ...prev,
                          [fieldName]: newVal,
                        }))
                      }
                      save={save}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="button-row-single-button">
            <button className="button--save" onClick={save}>
              Login
            </button>
          </div>
          {error && (
            <div className="error-message-container">
              <p className="error-message">{error}</p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default Login;
