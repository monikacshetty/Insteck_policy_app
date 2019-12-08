import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div>
          <a href="instech.no" className="navbar-brand">
            Instech
          </a>
        </div>
        <ul className="navbar-nav">
          <li>
            <Link className="nav-link" to="/view">
              Home
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/create">
              Policy
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default withRouter(Header);
