import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import WeatherDisplay from "./WeatherDisplay";
import "../App.css";

export default function Home({
  entries,
  goals = [],
  journals = [],
  // meditation2 = [],
  hydration,
  meals,
}) {
  const [todaysMood, setTodaysMood] = useState(null);
  const [journalEntry, setJournalEntry] = useState("");
  const [meditation, setMeditation] = useState(null);
  const [exercise, setExercise] = useState(null);
   // const [exercise, setExercise] = useState(null);

   // Helper: normalize prop to array and sum minutes
const toArray = (val) => (val == null ? [] : Array.isArray(val) ? val : [val]);

const sumMinutes = (items) =>
  toArray(items).reduce((acc, it) => acc + (Number(it?.minutes) || 0), 0);

// Compute totals
const meditationTotal = sumMinutes(meditation);
const exerciseTotal = sumMinutes(exercise);

  // --- Build wellness summary directly from props ---
  const wellnessSummary = {
    meditation:

      meditationTotal > 0
        ? `${meditationTotal} ${meditationTotal === 1 ? "minute" :"minutes"}`
        : "Not completed",



    workout:
      exerciseTotal > 0
        ? `${exerciseTotal} ${exerciseTotal === 1 ? "minute" :"minutes"}`
        : "Not completed",


    meals:
      meals &&
      (meals.breakfast || meals.lunch || meals.dinner || meals.snacks > 0)
        ? "Meals logged"
        : "Not logged",

    hydration:
      hydration?.glasses > 0
        ? `${hydration.glasses} ${hydration.glasses === 1 ? "glass" :"glasses"} of water`
        : "Not completed",
  };

  useEffect(() => {
      const todayDate = new Date();
          const today =
            todayDate.getFullYear() +
            "-" +
            String(todayDate.getMonth() + 1).padStart(2, "0") +
            "-" +
            String(todayDate.getDate()).padStart(2, "0");
      fetch(`http://localhost:8080/api/wellness/meditation/date/${today}`)
         .then((res) => res.json())
         .then((data) => setMeditation(data))
        .catch((err) => console.error("Error fetching meditation:", err));
    }, []);

  useEffect(() => {
    const todayDate = new Date();
        const today =
          todayDate.getFullYear() +
          "-" +
          String(todayDate.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(todayDate.getDate()).padStart(2, "0");
                    
    fetch(`http://localhost:8080/api/wellness/exercise/date/${today}`)
      .then((res) => res.json())
      .then((data) => setExercise(data))
      .catch((err) => console.error("Error fetching exercise:", err));
  }, []);

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
        const latest = todaysEntries[0];
        const snippet =
          latest.text.length > 60
            ? latest.text.substring(0, 60) + "..."
            : latest.text;
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
  const inProgressGoals = goals.filter(
    (g) => g.status === "in progress"
  ).length;
  const goalProgress =
    goals.length > 0 ? (completedGoals / goals.length) * 100 : 0;

  const wellnessActivities = wellnessSummary
    ? [
        wellnessSummary.meditation !== "Not completed",
        wellnessSummary.workout !== "Not completed",
        wellnessSummary.meals !== "Not logged",
        wellnessSummary.hydration !== "Not completed",
      ].filter(Boolean).length
    : 0;

  const wellnessProgress = (wellnessActivities / 4) * 100;

  return (
    <div className="home-background">
      <div className="home-container">
        <div className="home-card-header-card">
          <h2 className="home-header-title">
            Welcome to Your Wellness Dashboard
          </h2>
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
                  {todaysMood
                    ? `Level ${todaysMood}/9`
                    : "Track your mood today"}
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
                  <span className="home-small-text">
                    {wellnessActivities}/4
                  </span>
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
                  {wellnessActivities === 4
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
                  <span className="home-small-text">
                    {journalEntry ? "✓" : "○"}
                  </span>
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
              <span className="home-icon indigo">⛅</span>
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
              {
                key: "meditation",
                label: "Meditation",
                value: wellnessSummary?.meditation,
              },
              {
                key: "exercise",
                label: "Workout",
                value: wellnessSummary?.workout,
              },
              {
                key: "meals",
                label: "Healthy Eating",
                value: meals && (meals.breakfast || meals.lunch || meals.dinner || meals.snacks > 0)
                  ? `Breakfast: ${meals.breakfast ? "✓" : "○"}, Lunch: ${meals.lunch ? "✓" : "○"}, Dinner: ${meals.dinner ? "✓" : "○"}, Snacks: ${meals.snacks || 0}`
                  : "Not logged",

              },
              {
                key: "hydration",
                label: "Hydration",
                value: wellnessSummary?.hydration,
              },
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
