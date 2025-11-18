import React, { useState, useEffect } from "react";

// --- Default wellness structure ---
const defaultWellness = {
  meditation: { completed: false, minutes: 0, timestamp: null },
  workout: { completed: false, type: "", minutes: 0, timestamp: null },
  meals: {
    breakfast: false,
    lunch: false,
    dinner: false,
    breakfastTimestamp: null,
    lunchTimestamp: null,
    dinnerTimestamp: null,
    snacks: 0,
    snacksTimestamps: []
  },
  water: 0
};

function Wellness() {
  const [wellness, setWellness] = useState(defaultWellness);

  // --- Load from localStorage ---
  useEffect(() => {
    const saved = localStorage.getItem("wellness");
    if (saved) setWellness(JSON.parse(saved));
  }, []);

  // --- Save to localStorage ---
  const saveWellness = (updated) => {
    setWellness(updated);
    localStorage.setItem("wellness", JSON.stringify(updated));
  };

  const formatTime = (ts) => {
    if (!ts) return "";
    return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // --- Meditation update ---
  const updateMeditation = (minutes) => {
    const updated = {
      ...wellness,
      meditation: {
        completed: true,
        minutes,
        timestamp: new Date().toISOString()
      }
    };
    saveWellness(updated);
  };

  // --- Workout update ---
  const updateWorkout = (minutes, type) => {
    const updated = {
      ...wellness,
      workout: {
        completed: true,
        type,
        minutes,
        timestamp: new Date().toISOString()
      }
    };
    saveWellness(updated);
  };

  // --- Meal toggle ---
  const toggleMeal = (meal) => {
    const updated = {
      ...wellness,
      meals: {
        ...wellness.meals,
        [meal]: !wellness.meals[meal],
        [`${meal}Timestamp`]: !wellness.meals[meal]
          ? new Date().toISOString()
          : null
      }
    };
    saveWellness(updated);
  };

  // --- Water update ---
  const updateWater = (amount) => {
    const updated = {
      ...wellness,
      water: Math.max(0, wellness.water + amount)
    };
    saveWellness(updated);
  };

  // --- Completion % ---
  const calculateCompletionRate = () => {
    let total = 0;
    let completed = 0;

    total += 1;
    if (wellness.meditation.completed) completed++;

    total += 1;
    if (wellness.workout.completed) completed++;

    total += 3;
    ["breakfast", "lunch", "dinner"].forEach((m) => {
      if (wellness.meals[m]) completed++;
    });

    total += 1;
    if (wellness.water > 0) completed++;

    return (completed / total) * 100;
  };

  // --- MAIN RENDER ---
  return (
    <div className="wellness-container">
      <h1>Your Wellness Home</h1>

      {/* Progress Card */}
      <div className="card progress-card">
        <h2>Daily Wellness Progress</h2>
        <p>Keep up the great work!</p>
        <progress
          value={calculateCompletionRate()}
          max="100"
          className="progress-bar"
        />
        <p>{Math.round(calculateCompletionRate())}% Complete</p>
      </div>

      {/* 🧘 Meditation */}
      <div className="card">
        <h3>🧠 Meditation & Mindfulness</h3>

        <label>
          <input
            type="checkbox"
            checked={wellness.meditation.completed}
            onChange={() => {}}
          />{" "}
          Meditation session completed
        </label>

        <div className="input-row">
          <input
            type="number"
            value={wellness.meditation.minutes}
            onChange={(e) =>
              updateMeditation(parseInt(e.target.value) || 0)
            }
            placeholder="Minutes"
          />
          <button onClick={() => updateMeditation(wellness.meditation.minutes)}>
            Log
          </button>
        </div>

        {wellness.meditation.completed && (
          <>
            <p className="success-text">
              ✓ {wellness.meditation.minutes} minutes meditated today
            </p>
            {wellness.meditation.timestamp && (
              <p className="timestamp">
                🕒 Logged at: {formatTime(wellness.meditation.timestamp)}
              </p>
            )}
          </>
        )}
      </div>

      {/* 🏋️ Exercise */}
      <div className="card">
        <h3>🏋️ Exercise & Movement</h3>

        <label>
          <input
            type="checkbox"
            checked={wellness.workout.completed}
            onChange={() => {}}
          />{" "}
          Workout completed
        </label>

        <div className="input-row">
          <input
            type="text"
            value={wellness.workout.type}
            onChange={(e) =>
              saveWellness({
                ...wellness,
                workout: { ...wellness.workout, type: e.target.value }
              })
            }
            placeholder="Type (Running, Yoga)"
          />
          <input
            type="number"
            value={wellness.workout.minutes}
            onChange={(e) =>
              saveWellness({
                ...wellness,
                workout: {
                  ...wellness.workout,
                  minutes: parseInt(e.target.value) || 0
                }
              })
            }
            placeholder="Minutes"
          />
          <button
            onClick={() =>
              updateWorkout(
                wellness.workout.minutes,
                wellness.workout.type
              )
            }
          >
            Log
          </button>
        </div>

        {wellness.workout.completed && (
          <>
            <p className="success-text">
              ✓ {wellness.workout.type} for {wellness.workout.minutes} minutes
            </p>
            {wellness.workout.timestamp && (
              <p className="timestamp">
                🕒 Logged at: {formatTime(wellness.workout.timestamp)}
              </p>
            )}
          </>
        )}
      </div>

      {/* 🍽 Meals */}
      <div className="card">
        <h3>🍽 Meals & Nutrition</h3>

        {["breakfast", "lunch", "dinner"].map((meal) => (
          <div key={meal}>
            <label>
              <input
                type="checkbox"
                checked={wellness.meals[meal]}
                onChange={() => toggleMeal(meal)}
              />{" "}
              {meal.charAt(0).toUpperCase() + meal.slice(1)}
            </label>

            {wellness.meals[`${meal}Timestamp`] && (
              <p className="timestamp">
                🕒 Logged at:{" "}
                {formatTime(wellness.meals[`${meal}Timestamp`])}
              </p>
            )}
          </div>
        ))}

        {/* Snacks */}
        <div className="snacks-row">
          <p>Snacks: {wellness.meals.snacks}</p>

          <button
            onClick={() =>
              saveWellness({
                ...wellness,
                meals: {
                  ...wellness.meals,
                  snacks: wellness.meals.snacks + 1,
                  snacksTimestamps: [
                    ...wellness.meals.snacksTimestamps,
                    new Date().toISOString()
                  ]
                }
              })
            }
          >
            + Add Snack
          </button>

          {wellness.meals.snacks > 0 && (
            <button
              onClick={() =>
                saveWellness({
                  ...wellness,
                  meals: {
                    ...wellness.meals,
                    snacks: Math.max(0, wellness.meals.snacks - 1),
                    snacksTimestamps:
                      wellness.meals.snacksTimestamps.slice(0, -1)
                  }
                })
              }
            >
              - Remove
            </button>
          )}

          {wellness.meals.snacksTimestamps.length > 0 && (
            <p className="timestamp">
              Latest snack at:{" "}
              {formatTime(
                wellness.meals.snacksTimestamps[
                  wellness.meals.snacksTimestamps.length - 1
                ]
              )}
            </p>
          )}
        </div>
      </div>

      {/* 💧 Water Intake */}
      <div className="card">
        <h3>💧 Water Intake</h3>
        <p>Goal: 8 glasses per day</p>

        <div className="water-display">
          <div className="water-count">{wellness.water} 💧</div>

          <div className="water-bar-bg">
            <div
              className="water-bar-fill"
              style={{ width: `${(wellness.water / 8) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="water-buttons">
          <button onClick={() => updateWater(1)}>+ Add Glass</button>
          {wellness.water > 0 && (
            <button onClick={() => updateWater(-1)}>- Remove</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Wellness;