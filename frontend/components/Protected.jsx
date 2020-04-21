import React, { useEffect, useContext } from "react";
import { StoreContext } from "../store";
import Login from "./Login";

const Protected = ({ children }) => {
  const {
    state: {
      authentication: { isAuthenticated },
    },
    getAuthenticationStatus,
  } = useContext(StoreContext);

  useEffect(() => {
    getAuthenticationStatus();
  }, []);

  return isAuthenticated ? children : <Login />;
};

export default Protected;
