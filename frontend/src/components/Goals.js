import React, { useState, useEffect } from "react";
import "./Goals.css";

function Goals() {
  const [goalText, setGoalText] = useState("");
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const savedGoals = JSON.parse(localStorage.getItem("goals-list")) || [];
    setGoals(savedGoals);
  }, []);

  const handleSaveGoal = () => {
    if (!goalText.trim()) return;
    const newGoal = {
      id: Date.now(),
      text: goalText,
      status: "added",
    };
    const updatedGoals = [newGoal, ...goals];
    setGoals(updatedGoals);
    localStorage.setItem("goals-list", JSON.stringify(updatedGoals));
    setGoalText("");
  };

  const updateGoalStatus = (id, newStatus) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === id ? { ...goal, status: newStatus } : goal
    );
    setGoals(updatedGoals);
    localStorage.setItem("goals-list", JSON.stringify(updatedGoals));
  };

  const handleDeleteGoal = (id) => {
    const updatedGoals = goals.filter((goal) => goal.id !== id);
    setGoals(updatedGoals);
    localStorage.setItem("goals-list", JSON.stringify(updatedGoals));
  };

  return (
    <div className="journals-container">
      <h1>Goals</h1>

      <div className="journal-entry">
        <h3>Add a Goal:</h3>
        <textarea
          value={goalText}
          onChange={(e) => setGoalText(e.target.value)}
          placeholder="Enter a goal here..."
        />
        <button onClick={handleSaveGoal}>Save Goal</button>
      </div>

      <div className="journal-history">
        <h3>Goal Tracker</h3>
        {goals.length === 0 ? (
          <p>No goals yet.</p>
        ) : (
          <ul>
            {goals.map((goal) => (
              <li key={goal.id}>
                <p>{goal.text}</p>
                <p>Status: <em>{goal.status}</em></p>
                <div>
                  {goal.status !== "in progress" && (
                    <button onClick={() => updateGoalStatus(goal.id, "in progress")}>
                      Mark In Progress
                    </button>
                  )}
                  {goal.status !== "completed" && (
                    <button onClick={() => updateGoalStatus(goal.id, "completed")}>
                      Mark Completed
                    </button>
                  )}
                  <button onClick={() => handleDeleteGoal(goal.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Goals;