import React from "react";
import classNames from "classnames";

const Loader = ({ isInline }) => (
  <div className={classNames("loader", { inline: isInline })} />
);

export default Loader;
