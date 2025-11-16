import React, { useState } from "react";
import "./Mood.css";

export default function MoodScale() {
  const [mood, setMood] = useState(5);
  const handleSubmit = () => {
    // alert(`Mood submitted: ${moodMap[mood].label} ${moodMap[mood].emoji}`);
  };
  
  const moodMap = {
    1: { label: "Very Low", emoji: "😠" },
    2: { label: "Down", emoji: "😢" },
    3: { label: "Frustrated", emoji: "😣" },
    4: { label: "Meh", emoji: "😕" },
    5: { label: "In the Middle", emoji: "😐" },
    6: { label: "Okay", emoji: "😏" },
    7: { label: "Content", emoji: "😊" },
    8: { label: "Very Good", emoji: "😄" },
    9: { label: "Amazing", emoji: "😍" }
  };

  return (
    <div className="moodBox">
      <h2 className="moodHeader">Mood Check-In</h2>

      <div className="emojiNumberContainer">
        <div className="emojiRow">
          {Object.values(moodMap).map((m, i) => (
            <span key={i} className="emojiItem">{m.emoji}</span>
          ))}
        </div>
        <div className="numberRow">
          {Object.keys(moodMap).map((num) => (
            <span key={num}>{num}</span>
          ))}
        </div>
      </div>

      <input
        type="range"
        min="1"
        max="9"
        step="1"
        value={mood}
        onChange={(e) => setMood(Number(e.target.value))}
        className="moodSlider"
      />

      <p className="moodFeedback">
        You feel: <strong>{moodMap[mood].label}</strong> {moodMap[mood].emoji}
      </p>  
      <button className="moodSubmitButton" onClick={() => handleSubmit()}>
        Submit
      </button>   
    </div>
  );
}