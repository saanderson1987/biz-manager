import React from "react";

export default props => {
  const tabs = React.Children.map(props.children, (child, idx) => {
    const spacer = idx === 0 ? null : <div className="spacer"></div>;
    return [spacer, React.cloneElement(child, { pathname: props.pathname })];
  });

  return (
    <div id="company-tabs" className="tabs">
      {tabs}
      <div className="empty-tab"></div>
    </div>
  );
};
