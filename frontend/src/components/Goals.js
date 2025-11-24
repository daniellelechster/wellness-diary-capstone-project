import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import "./Goals.css";
// import "../App.css";
import SaveButton from "./SaveGoalsButton";

export default function Goals({ goals = [], setGoals }) {
  const [newGoal, setNewGoal] = useState("");
  const [celebration, setCelebration] = useState(""); // 🎉 track celebration message

  // Debug: log goals state whenever it changes
  useEffect(() => {
    console.log("Goals state:", goals);
  }, [goals]);

  // --- Delete a goal ---
  const handleDeleteGoal = (id) => {
    fetch(`http://localhost:8080/api/wellness/goal/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setGoals((prev) => prev.filter((g) => g.id !== id));
      })
      .catch((err) => console.error("Error deleting goal:", err));
  };

  // --- Update goal status ---
  const handleUpdateStatus = (id, status) => {
    fetch(`http://localhost:8080/api/wellness/goal/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "text/plain" },
      body: status,
    })
      .then((res) => res.json())
      .then((updated) => {
        setGoals((prev) =>
          prev.map((g) => (g.id === id ? { ...g, status: updated.status } : g))
        );
        // 🎉 Trigger celebration if completed
        if (status === "completed") {
          setCelebration("Goal completed! 🎉");
          setTimeout(() => setCelebration(""), 3000); // clear after animation
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
          });
        }

      })
      .catch((err) => console.error("Error updating goal:", err));
  };

  // --- Normalize status values ---
  const normalizeStatus = (status) =>
    status?.toLowerCase().replace("_", " ").trim();

  const inProgressGoals = goals.filter(
    (g) => normalizeStatus(g.status) === "in progress"
  );
  const completedGoals = goals.filter(
    (g) => normalizeStatus(g.status) === "completed"
  );

  return (
    <div className="goals-container">
      <h2>My Goals</h2>

      {/* Add Goal Form */}
      <div className="goal-entry">
        <input
          type="text"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          placeholder="Enter a new goal..."
        />
        <SaveButton saveProp={newGoal} setGoals={setGoals} onSaved={() => setNewGoal("")} />
      </div>

      {/* Celebration message */}
      {celebration && <div className="goal-celebration">{celebration}</div>}

      {/* Goals In Progress */}
      <div className="goal-section">
        <h3>Goals In Progress</h3>
        {inProgressGoals.length === 0 ? (
          <p>No goals in progress</p>
        ) : (
          <ul>
            {inProgressGoals.map((goal) => (
              <li key={goal.id}>
                <span className="goal-text">{goal.text}</span>
                <button onClick={() => handleUpdateStatus(goal.id, "completed")}>
                  Complete
                </button>
                <button onClick={() => handleDeleteGoal(goal.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Completed Goals */}
      <div className="goal-section">
        <h3>Completed Goals</h3>
        {completedGoals.length === 0 ? (
          <p>No completed goals</p>
        ) : (
          <ul>
            {completedGoals.map((goal) => (
              <li key={goal.id}>
                <span className="goal-text">{goal.text}</span>
                <button onClick={() => handleUpdateStatus(goal.id, "in progress")}>
                  Undo
                </button>
                <button onClick={() => handleDeleteGoal(goal.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
