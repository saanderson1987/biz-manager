import React, { useState, useContext } from "react";
import { StoreContext } from "../store";
import Modal from "./Modal";
import Input from "./common/Input";

const Login = () => {
  const { login } = useContext(StoreContext);
  const [formData, setFormData] = useState({ username: "", password: "" });

  const fields = [
    { fieldName: "username", displayName: "Username", type: "text" },
    { fieldName: "password", displayName: "Password", type: "password" },
  ];
  return (
    <Modal>
      <div className="form">
        <div className="form-header">Login</div>
        <div className="form-body">
          <table>
            <tbody>
              {fields.map(({ fieldName, displayName, type }, i) => (
                <tr>
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
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="button-row">
          {/* <button onClick={}>Cancel</button> */}
          <button className="button--save" onClick={() => login(formData)}>
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Login;