import { useState, useEffect } from 'react';
import '../App.css';

export function Wellness() {
  const [wellness, setWellness] = useState({
    meditation: { completed: false, minutes: 0 },
    workout: { completed: false, minutes: 0, type: '' },
    meals: { breakfast: false, lunch: false, dinner: false, snacks: 0 },
    water: 0
  });

  const getStorageKey = () => {
    const today = new Date().toISOString().split('T')[0];
    return `wellness-${today}`;
  };

  useEffect(() => {
    const saved = localStorage.getItem(getStorageKey());
    if (saved) {
      setWellness(JSON.parse(saved));
    }
  }, []);

  const saveWellness = (updatedWellness) => {
    setWellness(updatedWellness);
    localStorage.setItem(getStorageKey(), JSON.stringify(updatedWellness));
  };

  const updateMeditation = (minutes) => {
    const updated = {
      ...wellness,
      meditation: { completed: minutes > 0, minutes }
    };
    saveWellness(updated);
    alert('Meditation tracked!');
  };

  const updateWorkout = (minutes, type) => {
    const updated = {
      ...wellness,
      workout: { completed: minutes > 0, minutes, type }
    };
    saveWellness(updated);
    alert('Workout tracked!');
  };

  const toggleMeal = (meal) => {
    const updated = {
      ...wellness,
      meals: { ...wellness.meals, [meal]: !wellness.meals[meal] }
    };
    saveWellness(updated);
  };

  const updateWater = (change) => {
    const newAmount = Math.max(0, wellness.water + change);
    saveWellness({ ...wellness, water: newAmount });
  };

  const calculateCompletionRate = () => {
    let completed = 0;
    let total = 6;

    if (wellness.meditation.completed) completed++;
    if (wellness.workout.completed) completed++;
    if (wellness.meals.breakfast) completed++;
    if (wellness.meals.lunch) completed++;
    if (wellness.meals.dinner) completed++;
    if (wellness.water >= 8) completed++;

    return (completed / total) * 100;
  };

  return (
    <div className="wellness-container">
      {/* Overall Progress */}
      <div className="card progress-card">
        <h2>Daily Wellness Progress</h2>
        <p>Keep up the great work!</p>
        <progress value={calculateCompletionRate()} max="100" className="progress-bar" />
        <p>{Math.round(calculateCompletionRate())}% Complete</p>
      </div>

      {/* Meditation Tracker */}
      <div className="card">
        <h3>🧠 Meditation & Mindfulness</h3>
        <div>
          <label>
            <input
              type="checkbox"
              checked={wellness.meditation.completed}
              onChange={() => {}}
            /> Meditation session completed
          </label>
        </div>
        <div className="input-row">
          <input
            type="number"
            value={wellness.meditation.minutes}
            onChange={(e) => updateMeditation(parseInt(e.target.value) || 0)}
            placeholder="Minutes"
          />
          <button onClick={() => updateMeditation(wellness.meditation.minutes)}>Log</button>
        </div>
        {wellness.meditation.completed && (
          <p className="success-text">✓ {wellness.meditation.minutes} minutes meditated today</p>
        )}
      </div>

      {/* Workout Tracker */}
      <div className="card">
        <h3>🏋️ Exercise & Movement</h3>
        <div>
          <label>
            <input
              type="checkbox"
              checked={wellness.workout.completed}
              onChange={() => {}}
            /> Workout completed
          </label>
        </div>
        <div className="input-row">
          <input
            type="text"
            value={wellness.workout.type}
            onChange={(e) => saveWellness({ ...wellness, workout: { ...wellness.workout, type: e.target.value } })}
            placeholder="Type (Running, Yoga)"
          />
          <input
            type="number"
            value={wellness.workout.minutes}
            onChange={(e) => saveWellness({ ...wellness, workout: { ...wellness.workout, minutes: parseInt(e.target.value) || 0 } })}
            placeholder="Minutes"
          />
          <button onClick={() => updateWorkout(wellness.workout.minutes, wellness.workout.type)}>Log</button>
        </div>
        {wellness.workout.completed && (
          <p className="success-text">✓ {wellness.workout.type} for {wellness.workout.minutes} minutes</p>
        )}
      </div>

      {/* Meals Tracker */}
      <div className="card">
        <h3>🍽️ Meals & Nutrition</h3>
        {['breakfast', 'lunch', 'dinner'].map(meal => (
          <div key={meal}>
            <label>
              <input
                type="checkbox"
                checked={wellness.meals[meal]}
                onChange={() => toggleMeal(meal)}
              /> {meal.charAt(0).toUpperCase() + meal.slice(1)}
            </label>
          </div>
        ))}
        <div className="snacks-row">
          <p>Snacks: {wellness.meals.snacks}</p>
          <button onClick={() => saveWellness({ ...wellness, meals: { ...wellness.meals, snacks: wellness.meals.snacks + 1 }})}>+ Add Snack</button>
          {wellness.meals.snacks > 0 && (
            <button onClick={() => saveWellness({ ...wellness, meals: { ...wellness.meals, snacks: wellness.meals.snacks - 1 }})}>- Remove</button>
          )}
        </div>
      </div>

      {/* Water Tracker */}
      <div className="card">
        <h3>💧 Water Intake</h3>
        <p>Goal: 8 glasses per day</p>
        <div className="water-display">
          <div className="water-count">{wellness.water} 💧</div>
          <div className="water-bar-bg">
            <div
              className="water-bar-fill"
              style={{ width: `${(wellness.water / 8) * 100}%` }}
            />
          </div>
        </div>
        <div className="water-buttons">
          <button onClick={() => updateWater(1)}>+ Add Glass</button>
          {wellness.water > 0 && <button onClick={() => updateWater(-1)}>- Remove</button>}
        </div>
      </div>
    </div>
  );
}

export default Wellness;