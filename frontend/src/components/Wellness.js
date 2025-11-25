import React, { useState, useEffect } from "react";
import meditationImg from "./images/meditation.png";
import RunningImg from "./images/Running.png";
import nutritionImg from "./images/nutrition.png";
import WaterImg from "./images/Water.png";

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
    snacksTimestamps: [],
  },
  water: 0,
};

function Wellness() {
  const [wellness, setWellness] = useState(defaultWellness);

  // --- Hydration API states ---
  const [hydrationHistory, setHydrationHistory] = useState(null);
  const [hydrationError, setHydrationError] = useState(null);
  const [hydrationLoading, setHydrationLoading] = useState(true);

  // --- Load hydration history from API ---
  useEffect(() => {
    async function fetchHydration() {
      try {
        setHydrationLoading(true);

        const todayDate = new Date();

        const today =
          todayDate.getFullYear() +
          "-" +
          String(todayDate.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(todayDate.getDate()).padStart(2, "0");

        const res = await fetch(
          "http://localhost:8080/api/wellness/water/date/" + today
        );

        if (!res.ok) throw new Error("Failed to fetch hydration history");

        const data = await res.json();
        console.log(data);
        // 🔥 EXPECTED BACKEND RESPONSE (single JSON):
        // { id, date, glasses, createdAt }

        if (data && typeof data === "object" && data.glasses !== undefined) {
          setHydrationHistory(data);

          setWellness((prev) => ({
            ...prev,
            water: data.glasses ?? 0,
          }));

          setHydrationError(null);
        } else {
          // Backend returned null or empty response
          setHydrationHistory(null);

          setWellness((prev) => ({
            ...prev,
            water: 0,
          }));
        }
      } catch (err) {
        setHydrationError(err.message);
        setHydrationHistory(null);
      } finally {
        setHydrationLoading(false);
      }
    }

    fetchHydration();
  }, []);

  const formatTime = (ts) => {
    if (!ts) return "";
    return new Date(ts).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (ts) => {
    if (!ts) return "";
    return new Date(ts).toLocaleDateString([], {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // --- Meditation update ---
  const updateMeditation = (minutes) => {
    const updated = {
      ...wellness,
      meditation: {
        completed: true,
        minutes,
        timestamp: new Date().toISOString(),
      },
    };
    setWellness(updated);
  };

  // --- Workout update ---
  const updateWorkout = (minutes, type) => {
    const updated = {
      ...wellness,
      workout: {
        completed: true,
        type,
        minutes,
        timestamp: new Date().toISOString(),
      },
    };
    setWellness(updated);
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
          : null,
      },
    };
    setWellness(updated);
  };

  // --- Water update hooked to backend ---
  const updateWater = async (amount) => {
    const newAmount = Math.max(0, wellness.water + amount);

    // Update UI immediately
    setWellness({ ...wellness, water: newAmount });

    try {
      await fetch(
        "http://localhost:8080/api/wellness/water/" +
          hydrationHistory.id +
          "/add",
        {
          method: "POST",
        }
      );
    } catch (err) {
      console.error("Hydration update failed:", err);
    }
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

  return (
    <div className="wellness-container">
      <h1>Your Wellness Home</h1>
      <br />

      <h2>Daily Wellness Progress</h2>
      <br />

      {/* Progress Card */}
      <div className="card progress-card">
        <p className="great-work">Keep up the great work!</p>

        <progress
          value={calculateCompletionRate()}
          max="100"
          className="wellness-progress-bar"
        />
        <p>{Math.round(calculateCompletionRate())}% Complete</p>
      </div>

      {/* 🧘 Meditation */}
      <h3>🧠 Meditation & Mindfulness</h3>
      <br />
      <div
        className="meditation-card"
        style={{
          backgroundImage: `url(${meditationImg})`,
        }}
      >
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
            onChange={(e) => updateMeditation(parseInt(e.target.value) || 0)}
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
                Date: {formatDate(wellness.meditation.timestamp)} / Time:{" "}
                {formatTime(wellness.meditation.timestamp)}
              </p>
            )}
          </>
        )}
      </div>

      {/* 🏋️ Workout */}
      <h3>🏋️ Exercise & Movement</h3>
      <br />
      <div
        className="exercise-card"
        style={{
          backgroundImage: `url(${RunningImg})`,
        }}
      >
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
              setWellness({
                ...wellness,
                workout: { ...wellness.workout, type: e.target.value },
              })
            }
            placeholder="Type (Running, Yoga)"
          />

          <input
            type="number"
            value={wellness.workout.minutes}
            onChange={(e) =>
              setWellness({
                ...wellness,
                workout: {
                  ...wellness.workout,
                  minutes: parseInt(e.target.value) || 0,
                },
              })
            }
            placeholder="Minutes"
          />

          <button
            onClick={() =>
              updateWorkout(wellness.workout.minutes, wellness.workout.type)
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
                Date: {formatDate(wellness.workout.timestamp)} / Time:{" "}
                {formatTime(wellness.workout.timestamp)}
              </p>
            )}
          </>
        )}
      </div>

      {/* 🍽 Meals */}
      <h3>🍽 Meals & Nutrition</h3>
      <br />
      <div
        className="food-card"
        style={{
          backgroundImage: `url(${nutritionImg})`,
        }}
      >
        <div className="meals-card">
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
                  {formatDate(wellness.meals[`${meal}Timestamp`])} —{" "}
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
                setWellness({
                  ...wellness,
                  meals: {
                    ...wellness.meals,
                    snacks: wellness.meals.snacks + 1,
                    snacksTimestamps: [
                      ...wellness.meals.snacksTimestamps,
                      new Date().toISOString(),
                    ],
                  },
                })
              }
            >
              + Add Snack
            </button>

            {wellness.meals.snacks > 0 && (
              <button
                onClick={() =>
                  setWellness({
                    ...wellness,
                    meals: {
                      ...wellness.meals,
                      snacks: Math.max(0, wellness.meals.snacks - 1),
                      snacksTimestamps: wellness.meals.snacksTimestamps.slice(
                        0,
                        -1
                      ),
                    },
                  })
                }
              >
                - Remove
              </button>
            )}

            {wellness.meals.snacksTimestamps.length > 0 && (
              <p className="timestamp">
                Date:{" "}
                {formatDate(
                  wellness.meals.snacksTimestamps[
                    wellness.meals.snacksTimestamps.length - 1
                  ]
                )}{" "}
                / Time:{" "}
                {formatTime(
                  wellness.meals.snacksTimestamps[
                    wellness.meals.snacksTimestamps.length - 1
                  ]
                )}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 💧 Water Intake */}
      <h3>💧 Water Intake</h3>
      <br />
      <div
        className="waterdrop-card"
        style={{
          backgroundImage: `url(${WaterImg})`,
        }}
      >
        <div className="water-card">
          <p>Goal: 8 glasses per day</p>

          {hydrationLoading && <p>Loading hydration...</p>}
          {hydrationError && (
            <p className="error">Could not load hydration history.</p>
          )}
          {!hydrationLoading && !hydrationHistory && (
            <p>No hydration data yet.</p>
          )}

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
    </div>
  );
}

export default Wellness;
