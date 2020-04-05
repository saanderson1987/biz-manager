import React from "react";
import { Link, withRouter } from "react-router-dom";
import classNames from "classnames";

export const Tabs = ({ children }) => (
  <div id="company-tabs" className="tabs">
    {React.Children.map(children, (child, idx) => (
      <>
        {idx > 0 && <div className="spacer"></div>}
        {child}
      </>
    ))}
    <div className="empty-tab"></div>
  </div>
);

export const Tab = withRouter(({ location: { pathname }, to, children }) => (
  <Link
    to={to}
    className={classNames("tab", { "active-tab": pathname === to })}
  >
    {children}
  </Link>
));
