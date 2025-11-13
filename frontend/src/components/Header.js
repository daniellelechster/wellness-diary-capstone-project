import React from 'react'
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <nav className="nav-list">
                <Link to="/">Home</Link>
                <Link to ="journals">Journal</Link>
                <Link to="mood">Mood</Link>
                <Link to ="wellness">Wellness</Link>
                <Link to ="calendar">Calendar</Link>
                <Link to="goals">Goals</Link>
                <Link to="contact">Contact</Link>
            </nav>
        </header>
    );
}

export default Header;
