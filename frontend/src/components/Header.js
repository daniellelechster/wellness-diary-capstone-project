import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "./images/logo.png";
import MusicToggle from "./MusicToggle";
import "../App.css";

function Header({ musicOn, toggleMusic }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  // ---------------------------
  // Prevent body scroll when menu is open
  // ---------------------------
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }

    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  return (
    <>
      <header className="header">
        <nav className="main-nav">

          {/* LEFT SIDE: logo */}
          <div className="nav-logo">
            <img src={logo} alt="Logo" className="navbar-logo" />
          </div>

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
      <li><Link to="/articles">Articles</Link></li>
    </ul>
          {/* MIDDLE: Title */}
          <h1 className="site-title">WELLNESS DIARY</h1>

          {/* HAMBURGER */}
          <div
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/* RIGHT: Nav Links + Music Toggle */}
          <div className="nav-right">
            <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
              <li><Link to="/" onClick={closeMenu}>Home</Link></li>
              <li><Link to="/journals" onClick={closeMenu}>Journal</Link></li>
              <li><Link to="/mood" onClick={closeMenu}>Mood</Link></li>
              <li><Link to="/wellness" onClick={closeMenu}>Wellness</Link></li>
              <li><Link to="/goals" onClick={closeMenu}>Goals</Link></li>
              <li><Link to="/calendar" onClick={closeMenu}>Calendar</Link></li>
              <li><Link to="/about" onClick={closeMenu}>About</Link></li>
              <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
            </ul>

            <MusicToggle musicOn={musicOn} toggleMusic={toggleMusic} />
          </div>
    </div>
        </nav>
      </header>

      {/* Overlay */}
      <div
        className={`drawer-overlay ${menuOpen ? "show" : ""}`}
        onClick={closeMenu}
      />
    </>
  );
}

export default Header;
