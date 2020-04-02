import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NotFound from "./NotFound";
import NavBar from "./NavBar";
import CompaniesPage from "./CompaniesPage";

export default () => (
  <div>
    <NavBar />
    <Switch>
      <Route path="/companies" component={CompaniesPage} />
      <Redirect exact from="/" to="/companies" />
      <Route component={NotFound} />
    </Switch>
  </div>
);
