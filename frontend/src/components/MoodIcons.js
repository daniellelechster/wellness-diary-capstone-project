import React from "react";
import "../Mood.css";

const moods = [
  { label: "mood1", emoji: "😣" },
  { label: "mood2", emoji: "" },
  { label: "mood3", emoji: "😌" },
  { label: "mood4", emoji: "😊" },
  { label: "mood5", emoji: "🤩" }
];

export function MoodIcons() {
  return (
    <div className="moodIconRow">
      {moods.map((mood, index) => (
        <div key={index} className="moodIcon">
          <div className="emojiCircle">{mood.emoji}</div>
          <p>{mood.label}</p>
        </div>
      ))}
    </div>
  );
}
