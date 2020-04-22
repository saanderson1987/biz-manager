import React, { createContext, useState } from "react";
import axios from "axios";
import cloneDeep from "lodash.clonedeep";
import merge from "lodash.merge";
import unset from "lodash.unset";
import update from "lodash.update";

export const StoreContext = createContext({});

const baseUrl = "/api/";
const handleError = (error) => console.log(error);
const log = ({ functionName, statePath, oldState, data, newState }) => {
  console.groupCollapsed(`${functionName} at ${JSON.stringify(statePath)}`);
  console.log("oldState:", oldState);
  console.log("data:", data);
  console.log("newState:", newState);
  console.groupEnd();
};

export const StoreProvider = ({ children }) => {
  const [state, setState] = useState({
    prospects: {},
    vendors: {},
    clients: {},
    jobs: {},
    job_orders: {},
    installations: {},
    authentication: {
      isAuthenticated: null /* set to null to prevent the Login screen from flashing upon reload if user is authenticated */,
      error: "",
    },
    user: {},
  });

  const updaterFunctions = {
    createRecord: ({ route, newRecord, statePath }) =>
      axios
        .post(baseUrl + route, newRecord)
        .then(({ data }) =>
          setState((oldState) => {
            const newState = update(
              cloneDeep(oldState),
              [...statePath, data.id],
              (currVal) => merge({}, currVal, data)
            );
            log({
              functionName: "createRecord",
              statePath,
              oldState,
              data,
              newState,
            });
            return newState;
          })
        )
        .catch(handleError),

    getByQuery: ({ route, queryParams, statePath }) =>
      axios
        .get(baseUrl + route, {
          params: queryParams,
        })
        .then(({ data }) =>
          setState((oldState) => {
            const newState = update(cloneDeep(oldState), statePath, (currVal) =>
              merge({}, currVal, data)
            );
            log({
              functionName: "getByQuery",
              statePath,
              oldState,
              data,
              newState,
            });
            return newState;
          })
        )
        .catch(handleError),

    getById: ({ route, id, queryParams, statePath }) =>
      axios
        .get(baseUrl + route + "/" + id, { params: queryParams })
        .then(({ data }) =>
          setState((oldState) => {
            const newState = update(
              cloneDeep(oldState),
              [...statePath, data.id],
              (currVal) => merge({}, currVal, data)
            );
            log({
              functionName: "getById",
              statePath,
              oldState,
              data,
              newState,
            });
            return newState;
          })
        )
        .catch(handleError),

    updateRecord: ({ route, record, statePath }) =>
      axios
        .put(baseUrl + route + "/" + record.id, record)
        .then(({ data }) => {
          setState((oldState) => {
            const newState = update(
              cloneDeep(oldState),
              [...statePath, data.id],
              (currVal) => merge({}, currVal, data)
            );
            log({
              functionName: "updateRecord",
              statePath,
              oldState,
              data,
              newState,
            });
            return newState;
          });
        })
        .catch(handleError),

    deleteRecord: ({ route, id, statePath }) =>
      axios
        .delete(baseUrl + route + "/" + id)
        .then(({ data }) =>
          setState((oldState) => {
            const newState = cloneDeep(oldState);
            unset(newState, [...statePath, data.id]);
            log({
              functionName: "deleteRecord",
              statePath,
              oldState,
              data,
              newState,
            });
            return newState;
          })
        )
        .catch(handleError),

    getAuthenticationStatus: () =>
      axios
        .get("/isAuthenticated")
        .then(({ data }) => {
          const { isAuthenticated, user } = data;
          setState((oldState) => {
            const newState = {
              ...oldState,
              user,
              authentication: { isAuthenticated },
            };
            log({
              functionName: "getAuthenticationStatus",
              statePath: [["authentication", "isAuthenticated"], ["user"]],
              oldState,
              data,
              newState,
            });
            return newState;
          });
        })
        .catch(handleError),

    login: (data) =>
      axios
        .post("/login", data)
        .then(({ data }) => {
          const { isAuthenticated, user } = data;
          setState((oldState) => {
            const newState = {
              ...oldState,
              user,
              authentication: { isAuthenticated },
            };
            log({
              functionName: "login",
              statePath: [["authentication", "isAuthenticated"], ["user"]],
              oldState,
              data,
              newState,
            });
            return newState;
          });
        })
        .catch((e) => {
          console.log(e);
          setState((oldState) => ({ ...oldState, error: JSON.stringify(e) }));
        }),

    logout: () =>
      axios
        .get("/logout")
        .then(({ data: { isAuthenticated } }) =>
          setState((oldState) => {
            const newState = {
              ...oldState,
              authentication: { isAuthenticated },
            };
            log({
              functionName: "logout",
              statePath: ["authentication", "isAuthenticated"],
              oldState,
              data: isAuthenticated,
              newState,
            });
            return newState;
          })
        )
        .catch(handleError),
  };

  return (
    <StoreContext.Provider value={{ state, ...updaterFunctions }}>
      {children}
    </StoreContext.Provider>
  );
};
