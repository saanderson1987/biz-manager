import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NotFound from "./NotFound";
import NavBar from "./NavBar";
import CompaniesPage from "./CompaniesPage";
import List from "./List";

export default () => (
  <div>
    <NavBar />
    <Switch>
      <Route path="/companies" component={CompaniesPage} />
      <Route
        path="/jobs"
        render={() => <List type="jobs" statePath={["jobs"]} isRoot />}
      />
      <Route
        path="/orders"
        render={() => (
          <List type="job_orders" statePath={["job_orders"]} isRoot />
        )}
      />
      <Route
        path="/installations"
        render={() => (
          <List type="installations" statePath={["installations"]} isRoot />
        )}
      />
      <Route
        path="/receiveables"
        render={() => (
          <List type="receiveables" statePath={["receiveables"]} isRoot />
        )}
      />
      <Redirect exact from="/" to="/companies" />
      <Route component={NotFound} />
    </Switch>
  </div>
);
