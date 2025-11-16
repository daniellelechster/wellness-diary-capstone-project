import React, { useState } from "react";
import "./Goals.css";

export default function Goals() {
  const [goal, setGoal] = useState("");
  const [goalsList, setGoalsList] = useState([]);

  const handleAddGoal = () => {
    if (goal.trim() !== "") {
      setGoalsList([...goalsList, goal]);
      setGoal(""); // Clear input after adding
    }
  };

  return (
    <div className="personal-goals-container">
      <div className="personalGoals">
        <h2>Personal Goals Page</h2>

        <div className="addGoalSection">
          <input
            type="text"
            placeholder="Enter a goal..."
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
          <button onClick={handleAddGoal}>Add Goal</button>
        </div>

        <ul className="goalsList">
          {goalsList.map((g, index) => (
            <li key={index}>{g}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
