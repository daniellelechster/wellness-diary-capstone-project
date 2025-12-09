import React, { useState, useEffect } from "react";
import meditationImg from "./images/meditation.png";
import RunningImg from "./images/Running.png";
import nutritionImg from "./images/nutrition.png";
import WaterImg from "./images/Water.png";

function Wellness({
  meditation,
  setMeditation,
  exercise,
  setExercise,
  hydration,
  setHydration,
  meals,
  setMeals,
}) {
  // --- Exercise API state ---
  const [exerciseList, setExerciseList] = useState([]);
  const [exerciseLoading, setExerciseLoading] = useState(true);
  const [exerciseError, setExerciseError] = useState(null);

  // --- Local form state for new exercise ---
  const [newExerciseText, setNewExerciseText] = useState("");
  const [newExerciseMinutes, setNewExerciseMinutes] = useState("");

  // --- Hydration API states ---
  const [hydrationHistory, setHydrationHistory] = useState(null);
  const [hydrationError, setHydrationError] = useState(null);
  const [hydrationLoading, setHydrationLoading] = useState(true);

  // --- Meditation API states ---
  const [meditationError, setMeditationError] = useState(null);
  const [meditationLoading, setMeditationLoading] = useState(true);
  const [meditationList, setMeditationList] = useState([]);
  const [newMeditationMinutes, setNewMeditationMinutes] = useState("");

  // --- Helpers ---
  const formatTime = (ts) =>
    ts
      ? new Date(ts).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";
  const formatDate = (ts) =>
    ts
      ? new Date(ts).toLocaleDateString([], {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "";

  //Water percentages
  const dailyWaterGoal = 8; // glasses per day
  const hydrationWeight = 17; // hydration contributes 17% of total wellness

  const calculateHydrationContribution = (glasses) => {
    if (!glasses || glasses <= 0) return 0;
    const progressFraction = Math.min(glasses / dailyWaterGoal, 1);
    return progressFraction * hydrationWeight;
  };

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
        if (data && typeof data === "object" && data.glasses !== undefined) {
          setHydrationHistory(data);
          setHydrationError(null);
        } else {
          setHydration({ glasses: 0 });
          setHydrationHistory(null);
        }
      } catch (err) {
        setHydrationError(err.message);
        setHydration(null);
      } finally {
        setHydrationLoading(false);
      }
    }
    fetchHydration();
  }, [setHydration]);

  // --- Load meditation for today ---
  useEffect(() => {
    async function fetchMeditations() {
      try {
        setMeditationLoading(true);
        const today = new Date().toISOString().split("T")[0];
        const res = await fetch(`http://localhost:8080/api/wellness/meditation/date/${today}`);
        if (!res.ok) throw new Error("Failed to fetch meditations");
        const data = await res.json();
        setMeditationList(Array.isArray(data) ? data : [data]);
        setMeditationError(null);
      } catch (err) {
        setMeditationError(err.message);
        setMeditationList([]);
      } finally {
        setMeditationLoading(false);
      }
    }
    fetchMeditations();
  }, []);


  // --- Meditation update hooked to backend ---
  const updateMeditation = async (minutes) => {
    const safeMinutes = Math.max(0, minutes);
    const payload = {
      text: "Meditation",
      minutes: safeMinutes,
      completed: safeMinutes > 0,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("http://localhost:8080/api/wellness/meditation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to add meditation");

      const data = await res.json();
      setMeditation(data);
      setMeditationList(prevList => [ ...prevList, data]);
      setNewMeditationMinutes("");
    } catch (err) {
      console.error("Meditation update failed:", err);
    }
  };

  // --- Exercise update hooked to backend ---
  const addExercise = async (text, minutes) => {
    const today = new Date().toISOString().split("T")[0];
    const safeMinutes = Math.max(0, minutes);

    const payload = {
      text,
      minutes: safeMinutes,
      completed: safeMinutes > 0,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("http://localhost:8080/api/wellness/exercise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to add exercise");

      const data = await res.json();
      setExercise(data);
      setExerciseList(prevList => [ ...prevList, data]);      
      setNewExerciseText("");
      setNewExerciseMinutes("");
    } catch (err) {
      console.error("Error adding exercise:", err);
    }
  };

  const deleteMeditation = async (id) => {
    try {
      setMeditationList(prevList => prevList.filter(med => med.id !== id));

      const res = await fetch(`http://localhost:8080/api/wellness/meditation/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete meditation");
      setMeditation(prev => {
        if (!prev) return null;
      });
    } catch (err) {
      console.error("Error deleting meditation:", err);
    }
  };


  const deleteExercise = async (id) => {
    try {
      setExerciseList(prevList => prevList.filter(ex => ex.id !== id));

      const res = await fetch(`http://localhost:8080/api/wellness/exercise/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete exercise");

      // ✅ Update global state (App.js)
      setExercise(prev => {
        if (!prev) return null;
        return prev.id === id ? null : prev;
      });
    } catch (err) {
      console.error("Error deleting exercise:", err);
    }
  };



  // --- Meal toggle ---
  const toggleMeal = async (mealType) => {
    if (!meals) return;
    try {
      const res = await fetch(
        `http://localhost:8080/api/wellness/meals/${meals.id}/${mealType}`,
        {
          method: "PUT",
        }
      );
      const data = await res.json();
      setMeals(data);
    } catch (err) {
      console.error(`Failed to goggle ${mealType}:`, err);
    }
  };

  const addSnack = async () => {
    if (!meals) return;
    try {
      const res = await fetch(
        `http://localhost:8080/api/wellness/meals/${meals.id}/snack/add`,
        {
          method: "PUT",
        }
      );
      const data = await res.json();
      setMeals(data);
    } catch (err) {
      console.error("Failed to add snack:", err);
    }
  };

  const removeSnack = async () => {
    if (!meals) return;
    try {
      const res = await fetch(
        `http://localhost:8080/api/wellness/meals/${meals.id}/snack/remove`,
        {
          method: "PUT",
        }
      );
      const data = await res.json();
      setMeals(data);
    } catch (err) {
      console.error("Failed to remove snack:", err);
    }
  };

  // --- Water update hooked to backend ---
  const updateWater = async (amount) => {
    if (!hydration) return;
    const newAmount = Math.max(0, hydration.glasses + amount);

    // Optimistic UI update
    setHydration({ ...hydration, glasses: newAmount });

    try {
      const endpoint =
        amount > 0
          ? `http://localhost:8080/api/wellness/water/${hydrationHistory.id}/add`
          : `http://localhost:8080/api/wellness/water/${hydrationHistory.id}/remove`;

      const res = await fetch(endpoint, { method: "POST" });
      const data = await res.json();
      setHydration(data); //sync with backend
    } catch (err) {
      console.error("Hydration update failed:", err);
    }
  };

  // --- Completion % ---
  const calculateCompletionRate = () => {
    let total = 0;
    let completed = 0;

    // Meditation
    total += 1;
    if (meditationList?.some(med => med.minutes > 0)) completed++;

    // Exercise
    total += 1;
    if (exerciseList?.some(ex => ex.minutes > 0)) completed++;

    // Meals (breakfast, lunch, dinner)
    total += 3;
    ["breakfast", "lunch", "dinner"].forEach((meal) => {
      if (meals?.[meal]) completed++;
    });

    const hydrationContribution = calculateHydrationContribution(
      hydration?.glasses
    );

    // New: scale completed/total into 83%, then add hydration’s weighted % (17%)
    const nonHydrationPercent = (completed / total) * (100 - hydrationWeight);

    return nonHydrationPercent + hydrationContribution;
  };

  // --- Load today's exercise from backend ---
  useEffect(() => {
    async function fetchExercises() {
      try {
        setExerciseLoading(true);
        const today = new Date().toISOString().split("T")[0];

        const res = await fetch(
          `http://localhost:8080/api/wellness/exercise/date/${today}`
        );
        if (!res.ok) throw new Error("Failed to fetch exercise data");

        const data = await res.json();
        setExerciseList(Array.isArray(data) ? data : [data]);
        setExerciseError(null);
      } catch (err) {
        setExerciseError(err.message);
        setExerciseList([]);
      } finally {
        setExerciseLoading(false);
      }
    }
    fetchExercises();
  }, []);

  return (
    <div className="wellness-container">
      <br></br>
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
        <p className="percent-complete">
          {Math.round(calculateCompletionRate())}% Complete
        </p>
      </div>

      {/* 🧘 Meditation */}
      <h3>🧠 Meditation & Mindfulness</h3>
      <br />
      <div className="meditation-card" style={{ backgroundImage: `url(${meditationImg})` }}>
        {meditationLoading ? (
          <p>Loading meditation ... </p>
        ) : meditationError ? (
          <p className="error">{meditationError}</p>
        ) : (
          <>
            <div className="input-row">
              <input
                type="number"
                value={newMeditationMinutes}
                onChange={(e) => setNewMeditationMinutes(Math.max(0, parseInt(e.target.value) || 0))}
                placeholder="Minutes"
              />
              <button onClick={() => updateMeditation(newMeditationMinutes)}>Log</button>
            </div>

            {/* ✅ Show meditation list here */}
            {meditationList.length > 0 ? (
              <ul className="meditation-list">
                {meditationList
                  .filter(med => med.minutes > 0)
                  .map(med => (
                    <li key={med.id} className="meditation-row">
                      <span>🧘 {med.text} — {med.minutes} min</span>
                      {med.createdAt && (
                        <p className="timestamp">
                          {new Date(med.createdAt).toLocaleDateString()} —{" "}
                          {new Date(med.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      )}
                      <button className="delete-btn" onClick={() => deleteMeditation(med.id)}>Delete</button>
                    </li>
                  ))}
              </ul>
            ) : (
              <p>No meditations logged yet.</p>
            )}
          </>
        )}
      </div>


      {/* 🏋️ Workout */}
      <h3>🏋️ Exercise & Movement</h3>
      <div className="exercise-card" style={{ backgroundImage: `url(${RunningImg})` }}>
        {exerciseLoading ? (
          <p>Loading exercise...</p>
        ) : exerciseError ? (
          <p className="error">{exerciseError}</p>
        ) : (
          <>
            <div className="input-row">
              <input
                type="text"
                value={newExerciseText}
                onChange={(e) => setNewExerciseText(e.target.value)}
                placeholder="Type (Running, Yoga)"
              />
              <input
                type="number"
                value={newExerciseMinutes}
                onChange={(e) => setNewExerciseMinutes(Math.max(0, parseInt(e.target.value) || 0))}
                placeholder="Minutes"
              />
              <button onClick={() => addExercise(newExerciseText, newExerciseMinutes)}>+ Add Exercise</button>
            </div>

            {exerciseList.length > 0 ? (
              <ul className="exercise-list">
                {exerciseList
                  .filter(ex => ex.minutes > 0)
                  .map((ex) => (
                    <li key={ex.id} className="exercise-row">
                      <span>{ex.text} - {ex.minutes} minutes</span>
                      {ex.createdAt && (
                        <p className="timestamp">
                          {formatDate(ex.createdAt)} —{" "}
                          {formatTime(ex.createdAt)}
                        </p>
                      )}
                      
                      <button onClick={() => deleteExercise(ex.id)}>Delete</button>
                    </li>
                  ))}
              </ul>
            ) : (
              <p>No exercises logged yet.</p>
            )}
          </>
        )}
      </div>

      {/* 🍽 Meals */}
      <h3>🍽 Meals & Nutrition</h3>
      <br />
      <div
        className="food-card"
        style={{ backgroundImage: `url(${nutritionImg})` }}
      >
        <div className="meals-card">
          {["breakfast", "lunch", "dinner"].map((meal) => (
            <div key={meal}>
              <label>
                <input
                  type="checkbox"
                  checked={meals?.[meal] || false}
                  onChange={() => toggleMeal(meal)}
                />{" "}
                {meal.charAt(0).toUpperCase() + meal.slice(1)}
              </label>

              {meals?.[`${meal}Timestamp`] && (
                <p className="timestamp">
                  {formatDate(meals[`${meal}Timestamp`])} —{" "}
                  {formatTime(meals[`${meal}Timestamp`])}
                </p>
              )}
            </div>
          ))}

          {/* Snacks */}
          <div className="snacks-row">
            <p>Snacks: {meals?.snacks || 0}</p>
            <button onClick={addSnack}>+ Add Snack</button>
            {meals?.snacks > 0 && (
              <button onClick={removeSnack}>- Remove</button>
            )}
            {meals?.snacksTimestamps?.length > 0 && (
              <p className="timestamp">
                Date:{" "}
                {formatDate(
                  meals.snacksTimestamps[meals.snacksTimestamps.length - 1]
                )}{" "}
                / Time:{" "}
                {formatTime(
                  meals.snacksTimestamps[meals.snacksTimestamps.length - 1]
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
        style={{ backgroundImage: `url(${WaterImg})` }}
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
            <div className="water-count">{hydration?.glasses || 0} 💧</div>
            <div className="water-bar-bg">
              <div
                className="water-bar-fill"
                style={{ width: `${((hydration?.glasses || 0) / 8) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="water-buttons">            
            {hydration?.glasses > 0 && (
              <button onClick={() => updateWater(-1)}>- Remove</button>
            )}
            <button onClick={() => updateWater(1)}>+ Add Glass</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wellness;
