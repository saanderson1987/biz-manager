import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import "../public/stylesheets/main.scss";
import { StoreProvider } from "./store";
import Protected from "./components/Protected";
import App from "./components/App";

render(
  <StoreProvider>
    <BrowserRouter>
      <Protected>
        <Route path="/" component={App} />
      </Protected>
    </BrowserRouter>
  </StoreProvider>,
  document.getElementById("root")
);
