import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import rootReducer from "./rootReducer";
import App from "./components/App";

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={App} />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
