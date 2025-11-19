import React, { useState, useEffect } from "react";
import "../App.css";

export default function Home() {
  
  const [todaysMood, setTodaysMood] = useState(null);
  const [goals, setGoals] = useState([]);
  const [wellness, setWellness] = useState({
    meditation: false,
    workout: false,
    healthyEating: false,
  });
  const [journalEntry, setJournalEntry] = useState("");

  // Function to load today's data
  const loadTodaysData = () => {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

    // Load mood
    const moodData = JSON.parse(localStorage.getItem("moodData") || "[]");
    const todayMood = moodData.find((m) => m.date === today);
    setTodaysMood(todayMood ? todayMood.mood : null);

    // Load goals
    const goalsData = localStorage.getItem("goals");
    if (goalsData) setGoals(JSON.parse(goalsData));

    // Load wellness
    const wellnessData = localStorage.getItem(`wellness-${today}`);
    if (wellnessData) setWellness(JSON.parse(wellnessData));

    // Load journal entry
    const journalData = localStorage.getItem("journalEntries");
    if (journalData) {
      const entries = JSON.parse(journalData);
      const todayEntry = entries.find((e) => e.date === today);
      setJournalEntry(todayEntry ? todayEntry.entry : "");
    }
  };

  // Load data when component mounts
  useEffect(() => {
    loadTodaysData();
  }, []);

  const getMoodEmoji = (mood) =>
    ["😒","😢","😣","😕","😐","😏","😊","😄","😍"][mood-1] || "—";
  
  const getMoodLabel = (mood) =>
    ["Very Low","Down","Frustrated","Meh","In the Middle","Okay","Content","Very Good","Amazing"][mood-1] || "Not tracked";

  const completedGoals = goals.filter((g) => g.completed).length;
  const goalProgress = goals.length > 0 ? (completedGoals / goals.length) * 100 : 0;
  const wellnessActivities = Object.values(wellness).filter(Boolean).length;
  const wellnessProgress = (wellnessActivities / 3) * 100;

  return (
    <div className="home-background">
    <div className="home-container">
      <h1>Your Wellness Home</h1>

      <div className="home-card-header-card">
        <h2 className="home-header-title">Welcome to Your Wellness Dashboard</h2>
        <p className="home-header-subtitle">Here's a quick overview of your day</p>
      </div>

      <div className="home-grid">
        {/* Mood Card */}
        <div className="home-card">
          <div className="home-card-header">
            <div className="home-icon-row">
              <span className="home-icon red">❤️</span>
              <span className="home-emoji">{todaysMood ? getMoodEmoji(todaysMood) : "—"}</span>
            </div>
            <h3>Mood</h3>
          </div>
          <div className="home-card-content">
            <p className="home-value">{todaysMood ? getMoodLabel(todaysMood) : "Not tracked"}</p>
            <p className="home-subtext">
              {todaysMood ? `Level ${todaysMood}/10` : "Track your mood today"}
            </p>
          </div>
        </div>

        {/* Wellness Card */}
        <div className="home-card">
          <div className="home-card-header">
            <div className="home-icon-row">
              <span className="home-icon purple">✨</span>
              <span className="home-small-text">{wellnessActivities}/3</span>
            </div>
            <h3>Wellness</h3>
          </div>
          <div className="home-card-content">
            <div className="home-progress-bar">
              <div className="home-progress-fill" style={{ width: `${wellnessProgress}%` }}></div>
            </div>
            <p className="home-subtext">
              {wellnessActivities === 3
                ? "All activities complete!"
                : wellnessActivities > 0
                ? "Keep going!"
                : "Start your wellness journey"}
            </p>
          </div>
        </div>

        {/* Goals Card */}
        <div className="home-card">
          <div className="home-card-header">
            <div className="home-icon-row">
              <span className="home-icon blue">🎯</span>
              <span className="home-small-text">
                {completedGoals}/{goals.length}
              </span>
            </div>
            <h3>Goals</h3>
          </div>
          <div className="home-card-content">
            <div className="home-progress-bar">
              <div className="home-progress-fill" style={{ width: `${goalProgress}%` }}></div>
            </div>
            <p className="home-subtext">
              {goals.length === 0
                ? "No goals set"
                : completedGoals === goals.length
                ? "All goals achieved!"
                : `${goals.length - completedGoals} remaining`}
            </p>
          </div>
        </div>

        {/* Journal Card */}
        <div className="home-card">
          <div className="home-card-header">
            <div className="home-icon-row">
              <span className="home-icon indigo">📖</span>
              <span className="home-small-text">{journalEntry ? "✓" : "○"}</span>
            </div>
            <h3>Journal</h3>
          </div>
          <div className="home-card-content">
            <p className="home-value">{journalEntry ? "Written" : "Not started"}</p>
            <p className="home-subtext">
              {journalEntry
                ? `${journalEntry.length} characters`
                : "Write your thoughts"}
            </p>
          </div>
        </div>
      </div>

      {/* Wellness Activities */}
      <div className="home-card">
        <div className="home-card-header">
          <span className="home-icon purple">🌸</span>
          <h3>Wellness Activities</h3>
        </div>
        <p className="home-subtext">Your self-care for today</p>
        <div className="home-activities">
          {["meditation", "workout", "healthyEating"].map((key) => (
            <div
              key={key}
              className={`home-activity ${
                wellness[key] ? "activity-complete" : "activity-incomplete"
              }`}
            >
              <div className="home-activity-header">
                <span>{key === "healthyEating" ? "Healthy Eating" : key.charAt(0).toUpperCase() + key.slice(1)}</span>
                <span>{wellness[key] ? "✓" : "○"}</span>
              </div>
              <p className="home-subtext">
                {wellness[key] ? "Completed" : "Not yet"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
