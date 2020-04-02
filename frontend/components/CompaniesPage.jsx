import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Tabs from "./Tabs";
import Tab from "./Tab";
import List from "./List";
import Prospect from "../resources/prospect_company";
import Client from "../resources/client_company";

export default ({ location: { pathname } }) => (
  <div className="root-container">
    {/* TODO: remove pathname from props-- able to get if use withRouter HOC */}
    <Tabs pathname={pathname}>
      <Tab to="/companies/clients">Clients</Tab>
      <Tab to="/companies/prospects">Prospects</Tab>
    </Tabs>
    <Switch>
      <Route
        exact
        path="/companies/clients"
        render={() => <List type="companies" resource={Client} isRoot />}
      />
      <Route
        exact
        path="/companies/prospects"
        render={() => <List type="companies" resource={Prospect} isRoot />}
      />
      <Redirect exact from="/companies" to="/companies/clients" />
    </Switch>
  </div>
);
