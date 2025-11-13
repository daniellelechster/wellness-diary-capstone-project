import React from "react";
import { MoodSlider } from "./MoodSlider";

export default function Mood() {
  return (
    <div className="moodSpace">
      <h2 className="moodHeader">Mood Tracker</h2>
      <MoodSlider />
    </div>
  );
}