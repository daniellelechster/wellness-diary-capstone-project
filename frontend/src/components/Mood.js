import React from "react";
import { MoodSlider } from "./MoodSlider";
import { MoodIcons } from "./MoodIcons";
import "../Mood.css";

export default function Mood() {
  return (
    <div className="moodSpace">
      <h2 className="moodHeader">Mood Tracker</h2>
      <MoodIcons />
      <MoodSlider />
    </div>
  );
}
