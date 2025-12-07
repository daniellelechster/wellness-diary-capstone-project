import React, { useState, useEffect } from "react";
import "../App.css";
import MoodHistoryChart from "./MoodHistoryChart";

const moodMap = {
  1: { label: "Very Low", emoji: "😒", color: "#8b0000" },
  2: { label: "Down", emoji: "😢", color: "#b22222" },
  3: { label: "Frustrated", emoji: "😣", color: "#ff4500" },
  4: { label: "Meh", emoji: "😕", color: "#ffa500" },
  5: { label: "In the Middle", emoji: "😐", color: "#cccc00" },
  6: { label: "Okay", emoji: "😏", color: "#9acd32" },
  7: { label: "Content", emoji: "😊", color: "#32cd32" },
  8: { label: "Very Good", emoji: "😄", color: "#00fa9a" },
  9: { label: "Amazing", emoji: "😍", color: "#00ced1" },
};

export default function Mood({ entries, setEntries }) {
  const today = new Date().toISOString().split("T")[0];
  const todaysMood = entries[today]?.mood;

  const [mood, setMood] = useState(todaysMood ?? 5);
  const [notification, setNotification] = useState("");
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (todaysMood) {
      setMood(todaysMood);
    } else {
      setMood(5);
    }
  }, [todaysMood]);

  const handleSubmit = async () => {
    const payload = { date: today + "T00:00:00", rating: mood };

    try {
      const res = await fetch("http://localhost:8080/api/wellness/mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const saved = await res.json();
        const dateStr = saved.date.split("T")[0];

        setEntries((prev) => ({
          ...prev,
          [dateStr]: { date: dateStr, mood: saved.rating },
        }));

        if (moodMap[mood]) {
          setNotification(
            `Mood submitted: ${moodMap[mood].label} ${moodMap[mood].emoji}`
          );
        } else {
          setNotification(`Mood submitted: ${mood}`);
        }

        setFadeOut(false);

        setTimeout(() => setFadeOut(true), 2700);
        setTimeout(() => setNotification(""), 3000);
      }
    } catch (err) {
      console.error("Error saving mood:", err);
      setNotification("Error saving mood. Please try again.");
      setFadeOut(false);
      setTimeout(() => setFadeOut(true), 2700);
      setTimeout(() => setNotification(""), 3000);
    }
  };

  return (
    <div className="moodBox">
      <h2 className="moodHeader">Mood Check-In</h2>

      {!todaysMood && (
        <p className="moodPrompt">
          No mood submitted yet for today — please check in below!
        </p>
      )}

      <div className="emojiNumberContainer">
        <div className="emojiRow">
          {Object.values(moodMap).map((m, i) => (
            <span key={i} className="emojiItem">
              {m.emoji}
            </span>
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
        You feel: <strong>{moodMap[mood]?.label || "Unknown"}</strong>{" "}
        {moodMap[mood]?.emoji || ""}
      </p>

      <button className="moodSubmitButton" onClick={handleSubmit}>
        Submit
      </button>

      {notification && (
        <div className={`moodNotification ${fadeOut ? "fadeOut" : ""}`}>
          {notification}
        </div>
      )}

      <MoodHistoryChart entries={Object.values(entries)} />
    </div>
  );
}
