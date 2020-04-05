import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { StoreProvider } from "./store";
import App from "./components/App";

render(
  <StoreProvider>
    <BrowserRouter>
      <Route path="/" component={App} />
    </BrowserRouter>
  </StoreProvider>,
  document.getElementById("root")
);
