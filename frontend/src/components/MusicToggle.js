import React from "react";
import "./MusicToggle.css";

function MusicToggle({ musicOn, toggleMusic }) {
    return (
        <div className="music-toggle-container">
        <label className="switch">
            <input type="checkbox" checked={musicOn} onChange={toggleMusic} />
            <span className="slider round"></span>
        </label>
        <span className="music-label">{musicOn ? "Music On" : "Music Off"}</span>
        </div>
    );
}

export default MusicToggle;