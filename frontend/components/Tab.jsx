import React from "react";
import classNames from "classnames";
import { Link, withRouter } from "react-router-dom";

const Tab = ({ location: { pathname }, to, children }) => {
  const isActive = pathname === to;
  return (
    <Link to={to} className={classNames("tab", { "active-tab": isActive })}>
      {children}
    </Link>
  );
};

export default withRouter(Tab);
