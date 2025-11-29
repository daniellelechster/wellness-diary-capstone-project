import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "./images/logo.png";
import MusicToggle from "./MusicToggle";
import "../App.css";

function Header({ musicOn, toggleMusic }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [homeDropdownOpen, setHomeDropdownOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => {
    setMenuOpen(false);
    setHomeDropdownOpen(false);
  };

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
                          <li
                className={`dropdown ${homeDropdownOpen ? "open" : ""}`}
                onClick={(e) => {
                  // Only toggle dropdown on mobile
                  if (window.innerWidth <= 1150) {
                    e.stopPropagation();
                    setHomeDropdownOpen(!homeDropdownOpen);
                  }
                }}
              >
                <span className="dropdown-title">
                  Home ▾
                </span>

                <ul className="dropdown-menu">
                  <li><Link to="/" onClick={closeMenu}>Home Dashboard</Link></li>                  
                  <li><Link to="/about" onClick={closeMenu}>About</Link></li>
                </ul>
              </li>

              {/* SAME LINKS AS BEFORE */}
              <li><Link to="/journals" onClick={closeMenu}>Journal</Link></li>
              <li><Link to="/mood" onClick={closeMenu}>Mood</Link></li>
              <li><Link to="/wellness" onClick={closeMenu}>Wellness</Link></li>
              <li><Link to="/goals" onClick={closeMenu}>Goals</Link></li>
              <li><Link to="/calendar" onClick={closeMenu}>Calendar</Link></li>
              <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
              <li><Link to="/articles" onClick={closeMenu}>Articles</Link></li>
            </ul>

            <MusicToggle musicOn={musicOn} toggleMusic={toggleMusic} />
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