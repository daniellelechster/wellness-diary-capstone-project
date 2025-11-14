import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Header() {
  return (
    <header className="header">
      <h1>Wellness Diary</h1>
      <nav>
    <ul className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/journals">Journals</Link>
        <Link to="/mood">Mood</Link>
        <Link to="/wellness">Wellness</Link>
        <Link to="/goals">Goals</Link>
        <Link to="/calendar">Calendar</Link>
        <Link to="/contact">Contact</Link>
    </ul>
      </nav>
    </header>
  );
}

export default Header;
