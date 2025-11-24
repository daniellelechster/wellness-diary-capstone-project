import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import WeatherDisplay from "./WeatherDisplay";   // <-- ADDED
import "../App.css";

export default function Home({ entries, goals = [], journals = [] }) {
  const [todaysMood, setTodaysMood] = useState(null);
  const [wellnessSummary, setWellnessSummary] = useState(null);
  const [journalEntry, setJournalEntry] = useState("");

  const getWellnessSummary = (w) => {
    if (!w) return null;
    return {
      meditation: w.meditation?.completed
        ? `${w.meditation.minutes} min meditated`
        : "Not completed",
      workout: w.workout?.completed
        ? `${w.workout.type} • ${w.workout.minutes} min`
        : "Not completed",
      healthyEating:
        w.meals?.breakfast || w.meals?.lunch || w.meals?.dinner
          ? `${[
              w.meals.breakfast && "Breakfast",
              w.meals.lunch && "Lunch",
              w.meals.dinner && "Dinner",
            ]
              .filter(Boolean)
              .join(", ")} eaten`
          : "None logged",
    };
  };

  // --- Load other Home data (goals, wellness, journal) once ---
  const loadOtherData = useCallback(() => {
    const today = new Date().toISOString().split("T")[0];

    // Wellness
    const wellnessData = localStorage.getItem(`wellness-${today}`);
    if (wellnessData) {
      const w = JSON.parse(wellnessData);
      setWellnessSummary(getWellnessSummary(w));
    }
  }, []);

  useEffect(() => {
    loadOtherData();
  }, [loadOtherData]);

  // --- Update mood whenever entries changes ---
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    if (entries[today]) {
      setTodaysMood(entries[today].mood);
    } else {
      setTodaysMood(null);
    }
  }, [entries]);

  // --- Update journal snippet for today ---
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];

    if (Array.isArray(journals)) {
      const todaysEntries = journals.filter((j) => j.date === today);
      if (todaysEntries.length > 0) {
        const latest = todaysEntries[0]; // newest first
        const snippet =
          latest.text.length > 60 ? latest.text.substring(0, 60) + "..." : latest.text;
        setJournalEntry(snippet);
      } else {
        setJournalEntry("");
      }
    }
  }, [journals]);

  const getMoodEmoji = (mood) =>
    ["😒", "😢", "😣", "😕", "😐", "😏", "😊", "😄", "😍"][mood - 1] || "—";

  const getMoodLabel = (mood) =>
    [
      "Very Low",
      "Down",
      "Frustrated",
      "Meh",
      "In the Middle",
      "Okay",
      "Content",
      "Very Good",
      "Amazing",
    ][mood - 1] || "Not tracked";

  const completedGoals = goals.filter((g) => g.status === "completed").length;
  const inProgressGoals = goals.filter((g) => g.status === "in progress").length;
  const goalProgress =
    goals.length > 0 ? (completedGoals / goals.length) * 100 : 0;

  const wellnessActivities = wellnessSummary
    ? [
        wellnessSummary.meditation !== "Not completed",
        wellnessSummary.workout !== "Not completed",
        wellnessSummary.healthyEating !== "None logged",
      ].filter(Boolean).length
    : 0;

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
          <Link to="/mood" className="home-card-link">
            <div className="home-card">
              <div className="home-card-header">
                <div className="home-icon-row">
                  <span className="home-icon red">❤️</span>
                  <span className="home-emoji">
                    {todaysMood ? getMoodEmoji(todaysMood) : "—"}
                  </span>
                </div>
                <h3>Mood</h3>
              </div>
              <div className="home-card-content">
                <p className="home-value">
                  {todaysMood ? getMoodLabel(todaysMood) : "Not tracked"}
                </p>
                <p className="home-subtext">
                  {todaysMood ? `Level ${todaysMood}/9` : "Track your mood today"}
                </p>
              </div>
            </div>
          </Link>

          {/* Wellness Card */}
          <Link to="/wellness" className="home-card-link">
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
                  <div
                    className="home-progress-fill"
                    style={{ width: `${wellnessProgress}%` }}
                  ></div>
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
          </Link>

          {/* Goals Card */}
          <Link to="/goals" className="home-card-link">
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
                  <div
                    className="home-progress-fill"
                    style={{ width: `${goalProgress}%` }}
                  ></div>
                </div>
                <p className="home-subtext">
                  {goals.length === 0
                    ? "No goals set"
                    : completedGoals === goals.length
                    ? "All goals achieved!"
                    : `${inProgressGoals} in progress`}
                </p>
              </div>
            </div>
          </Link>

          {/* Journal Card */}
          <Link to="/journals" className="home-card-link">
            <div className="home-card">
              <div className="home-card-header">
                <div className="home-icon-row">
                  <span className="home-icon indigo">📖</span>
                  <span className="home-small-text">{journalEntry ? "✓" : "○"}</span>
                </div>
                <h3>Journal</h3>
              </div>
              <div className="home-card-content">
                <p className="home-value">
                  {journalEntry ? "Written" : "Not started"}
                </p>
                <p className="home-subtext">
                  {journalEntry ? `"${journalEntry}"` : "Write your thoughts"}
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Weather Card */}
        <div className="home-card">
          <div className="home-card-header">
            <div className="home-icon-row">
              <span className="home-icon indigo">⛅
</span>
              <span className="home-small-text">Now</span>
            </div>
            <h3>Weather</h3>
          </div>

          <div className="home-card-content">
            <WeatherDisplay />
          </div>
        </div>


        {/* Wellness Activities */}
        <div className="wellness-home-card">
          <div className="home-card-header">
            <span className="home-icon purple">🌸</span>
            <h3>Wellness Activities</h3>
          </div>
          <p className="home-subtext">Your self-care for today</p>


        <div className="home-activities">

          {[
            { key: "meditation", label: "Meditation", value: wellnessSummary?.meditation },
            { key: "workout", label: "Workout", value: wellnessSummary?.workout },
            { key: "healthyEating", label: "Healthy Eating", value: wellnessSummary?.healthyEating }
          ].map((item) => (
            <div
              key={item.key}
              className={`home-activity ${
                item.value && !item.value.includes("Not") 
                  ? "activity-complete" 
                  : "activity-incomplete"
              }`}
            >
              <div className="home-activity-header">
                <span>{item.label}</span>
                <span>
                  {item.value && !item.value.includes("Not") ? "✓" : "○"}
                </span>
              </div>

              <p className="home-subtext">{item.value || "No data"}</p>
            </div>
          ))}

        </div>
      </div>
    </div>
    </div>
  );
}
