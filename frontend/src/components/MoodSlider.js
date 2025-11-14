import React, { useState } from "react";
import "../Mood.css";

export function MoodSlider() {
  const [mood, setMood] = useState(9);
  const moodColors = ["#ff4d4d", "#ff944d", "#ffe14d", "#a1ff4d", "#4dff88"];
  const moodLabels = [
    "mood1 😢",
    "mood2 😴",
    "mood3 😴",
    "mood4 😴",
    "mood5 😊",
    "mood6 😄",
    "mood7 🤩",
    "mood8 😄",
    "mood9 🤩"
  ];

return (
    <div className="moodSlider">
      <input
        type="range"
        min="1"
        max="9"
        value={mood}
        onChange={(e) => setMood(Number(e.target.value))}
        className="w-full"
      />
      <div
        className="moodStyle"
        style={{ backgroundColor: moodColors[mood - 1] }}
      ></div>
      <p>Your current mood: <strong>{moodLabels[mood - 1]}</strong></p>
    </div>
  );
}