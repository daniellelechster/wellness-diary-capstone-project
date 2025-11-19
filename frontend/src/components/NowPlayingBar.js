import React from "react";
import "./App.css";

export default function NowPlayingBar({ isPlaying, trackName }) {
  return (
    <div className="now-playing-bar">
      <div className={`pulse ${isPlaying ? "active" : ""}`}></div>
      <span>{trackName}</span>
    </div>
  );
}