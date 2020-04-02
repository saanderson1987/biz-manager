import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

export default ({ pathname, to, children }) => {
  const isActive = pathname === to;
  return (
    <Link to={to} className={classNames("tab", { "active-tab": isActive })}>
      {children}
    </Link>
  );
};
