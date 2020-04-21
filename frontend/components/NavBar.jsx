import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { StoreContext } from "../store";

const NavBar = () => {
  const { logout } = useContext(StoreContext);
  const links = [
    <NavLink to="/companies">Companies</NavLink>,
    <NavLink to="/jobs">Jobs</NavLink>,
    <NavLink to="/orders">Orders</NavLink>,
    <NavLink to="/installations">Installations</NavLink>,
    <NavLink to="/receivables">Receivables</NavLink>,
    <a onClick={() => logout()}>LOG OUT</a>,
  ];

  const key = Math.random();
  return (
    <nav id="navbar" className="navbar navbar-expand-md">
      <img className="navbar-logo" src="/images/taag_logo_circle.png" />
      <div
        className="navbar-toggler-"
        data-toggle="collapse"
        data-target={`#nav-bar-links${key}`}
        aria-controls={`nav-bar-links${key}`}
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i
          className="fas fa-bars"
          style={{ color: "#ffff", fontSize: "2rem" }}
        ></i>
      </div>
      <div className="collapse navbar-collapse" id={`nav-bar-links${key}`}>
        <ul className="navbar-nav mr-auto">
          {links.map((link, i) => {
            return (
              <li className="nav-item" key={i}>
                <span className="nav-link">{link}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
