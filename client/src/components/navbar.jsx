import React from "react";
import { Link, NavLink } from "react-router-dom";
import undraw_profile_1 from "../img/undraw_profile_1.svg";

const Navbar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top position-absolute w-100 bg-dark shadow ">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Hotel-Booker
        </NavLink>
        {!user.name && (
          <React.Fragment>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/register-user">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </React.Fragment>
        )}
        {user.name && (
          <div className="flex-shrink-0 dropdown profile-menu me-3">
            <a
              href="#"
              className="d-block link-light text-decoration-none"
              id="dropdownUser2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="text-light me-2 d-md-inline d-none">
                {user.name}
              </span>
              <img
                src={undraw_profile_1}
                alt="mdo"
                style={{ width: "32px", height: "32px" }}
                className="rounded-circle border border-2"
              />
            </a>
            <ul
              className="dropdown-menu text-small shadow dropdown-menu-end"
              aria-labelledby="dropdownUser2"
            >
              {user.isAdmin === "true" ? (
                <li>
                  <Link className="dropdown-item" to="/admin">
                    Admin Panel
                  </Link>
                </li>
              ) : null}
              <li>
                <Link className="dropdown-item" to="/profile">
                  Profile
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link className="dropdown-item" to="/logout">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
