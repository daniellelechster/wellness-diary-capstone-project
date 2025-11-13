import React, { useState } from "react";

export function MoodSlider() {
  const [mood, setMood] = useState(5);
  const moodColors = ["#ff4d4d", "#ff944d", "#ffe14d", "#a1ff4d", "#4dff88"];

  return (
    <div className="moodSlider">
      <input
        type="range"
        min="1"
        max="5"
        value={mood}
        onChange={(e) => setMood(Number(e.target.value))}
        className="w-full"
      />
      <div
        className="moodStyle"
        style={{ backgroundColor: moodColors[mood - 1] }}
      ></div>
      <p>Your current mood: {mood}</p>
      <p>hi</p>
    </div>
  );
}