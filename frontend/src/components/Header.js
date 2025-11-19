import React from "react";
import { Link } from "react-router-dom";   // <-- REQUIRED import
import logo from "./images/logo.png"
import "../App.css";

function Header() {
  return (
    <header className="header">

      <nav className="main-nav">
      <img src={logo} alt="Logo" className="navbar-logo" />        
        <h1 className="site-title">WELLNESS DIARY</h1>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/journals">Journal</Link></li>
          <li><Link to="/mood">Mood</Link></li>
          <li><Link to="/wellness">Wellness</Link></li>
          <li><Link to="/goals">Goals</Link></li>
          <li><Link to="/calendar">Calendar</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;