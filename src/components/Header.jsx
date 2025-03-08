import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./../styles/Header.css";

const Header = () => {
  const location = useLocation();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // Don't show navbar on login/signup pages
  if (!loggedInUser || ["/login", "/signup"].includes(location.pathname)) {
    return null;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 shadow-sm">
      <Link to="/" className="navbar-brand fs-4">
        🎯 Gig Worker Hub
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/financial-dashboard" className="nav-link">Financial Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/rate-calculator" className="nav-link">Rate Calculator</Link>
          </li>
          <li className="nav-item">
            <Link to="/client-management" className="nav-link">Client Management</Link>
          </li>
          <li className="nav-item">
            <Link to="/skill-development" className="nav-link">Skill Development</Link>
          </li>
        </ul>
      </div>
      <div className="d-flex align-items-center">
        <img src="/assets/logo.png" alt="Profile" width="35" height="35" className="rounded-circle me-2" />
        <div className="dropdown">
          <Link
            to="#"
            className="text-white text-decoration-none dropdown-toggle"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
          >
            {loggedInUser.name || "User"}
          </Link>
          <ul className="dropdown-menu dropdown-menu-end">
            <li><Link to="/profile" className="dropdown-item">Profile</Link></li>
            <li><Link to="/settings" className="dropdown-item">Settings</Link></li>
            <li><hr className="dropdown-divider" /></li>
            <li>
              <Link
                to="/login"
                className="dropdown-item"
                onClick={() => {
                  localStorage.removeItem("loggedInUser");
                }}
              >
                Sign out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
