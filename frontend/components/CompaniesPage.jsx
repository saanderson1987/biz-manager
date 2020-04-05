import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Tabs, Tab } from "./Tabs";
import List from "./List";

export default () => (
  <div className="root-container">
    <Tabs>
      <Tab to="/companies/clients">Clients</Tab>
      <Tab to="/companies/prospects">Prospects</Tab>
    </Tabs>
    <Switch>
      <Route
        exact
        path="/companies/clients"
        render={() => <List type="clients" statePath={["clients"]} isRoot />}
      />
      <Route
        exact
        path="/companies/prospects"
        render={() => (
          <List type="prospects" statePath={["prospects"]} isRoot />
        )}
      />
      <Redirect exact from="/companies" to="/companies/clients" />
    </Switch>
  </div>
);
