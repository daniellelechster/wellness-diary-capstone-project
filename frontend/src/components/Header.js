import React from "react";
import { Link } from "react-router-dom";
import logo from "./images/logo.png";
import MusicToggle from "./MusicToggle";
import "../App.css";

function Header({ musicOn, toggleMusic }) {
  return (
    <header className="header">
      <nav className="main-nav">
        
        {/* LEFT SIDE: logo + title */}
        <div className="nav-logo">
    <img src={logo} alt="Logo" className="navbar-logo" />
  </div>

  {/* MIDDLE: Title */}
  <h1 className="site-title">WELLNESS DIARY</h1>

  {/* RIGHT: Nav Links + Music Toggle */}
  <div className="nav-right">
    <ul className="nav-links">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/journals">Journal</Link></li>
      <li><Link to="/mood">Mood</Link></li>
      <li><Link to="/wellness">Wellness</Link></li>
      <li><Link to="/goals">Goals</Link></li>
      <li><Link to="/calendar">Calendar</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/contact">Contact</Link></li>
    </ul>

    <MusicToggle musicOn={musicOn} toggleMusic={toggleMusic} />
  </div>

</nav>
    </header>
  );
}

export default Header;