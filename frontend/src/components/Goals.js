import React, { useState, useEffect } from "react";
import "./Goals.css";
import "../App.css";
import SaveButton from "./SaveGoalsButton";

export default function Goals({ goals = [], setGoals }) {
  const [newGoal, setNewGoal] = useState("");

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
    <div className="goals-page">
      <h2>My Goals</h2>

      {/* Add Goal Form */}
      <div className="add-goal-form">
        <input
          type="text"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          placeholder="Enter a new goal..."
        />
        <SaveButton saveProp={newGoal} setGoals={setGoals} onSaved={() => setNewGoal("")} />
      </div>

      {/* Goals In Progress */}
      <div className="goals-section">
        <h3>Goals In Progress</h3>
        {inProgressGoals.length === 0 ? (
          <p>No goals in progress</p>
        ) : (
          <ul>
            {inProgressGoals.map((goal) => (
              <li key={goal.id}>
                {goal.text}
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
      <div className="goals-section">
        <h3>Completed Goals</h3>
        {completedGoals.length === 0 ? (
          <p>No completed goals</p>
        ) : (
          <ul>
            {completedGoals.map((goal) => (
              <li key={goal.id}>
                {goal.text}
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





// import React, { useState } from "react";
// import "../App.css";
// import SaveButton from "./SaveGoalsButton";

// export default function Goals({ goals = [], setGoals }) {
//   const [newGoal, setNewGoal] = useState("");

//   // --- Delete a goal ---
//   const handleDeleteGoal = (id) => {
//     fetch(`http://localhost:8080/api/wellness/goal/${id}`, {
//       method: "DELETE",
//     })
//       .then(() => {
//         setGoals((prev) => prev.filter((g) => g.id !== id));
//       })
//       .catch((err) => console.error("Error deleting goal:", err));
//   };

//   // --- Update goal status ---
//   const handleUpdateStatus = (id, status) => {
//     fetch(`http://localhost:8080/api/wellness/goal/${id}/status`, {
//       method: "PUT",
//       headers: { "Content-Type": "text/plain" }, // send plain text
//       body: status,
//     })
//       .then((res) => res.json())
//       .then((updated) => {
//         setGoals((prev) =>
//           prev.map((g) => (g.id === id ? { ...g, status: updated.status } : g))
//         );
//       })
//       .catch((err) => console.error("Error updating goal:", err));
//   };

//   const inProgressGoals = goals.filter(
//     (g) => g.status?.toLowerCase() === "in progress"
//   );
//   const completedGoals = goals.filter(
//     (g) => g.status?.toLowerCase() === "completed"
//   );

//   return (
//     <div className="goals-page">
//       <h2>My Goals</h2>

//       {/* Add Goal Form */}
//       <div className="add-goal-form">
//         <input
//           type="text"
//           value={newGoal}
//           onChange={(e) => setNewGoal(e.target.value)}
//           placeholder="Enter a new goal..."
//         />
//         {/* Use SaveButton component */}
//         <SaveButton saveProp={newGoal} setGoals={setGoals} />
//       </div>

//       {/* Goals In Progress */}
//       <div className="goals-section">
//         <h3>Goals In Progress</h3>
//         {inProgressGoals.length === 0 ? (
//           <p>No goals in progress</p>
//         ) : (
//           <ul>
//             {inProgressGoals.map((goal) => (
//               <li key={goal.id}>
//                 {goal.text}
//                 <button onClick={() => handleUpdateStatus(goal.id, "completed")}>
//                   Complete
//                 </button>
//                 <button onClick={() => handleDeleteGoal(goal.id)}>Delete</button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Completed Goals */}
//       <div className="goals-section">
//         <h3>Completed Goals</h3>
//         {completedGoals.length === 0 ? (
//           <p>No completed goals</p>
//         ) : (
//           <ul>
//             {completedGoals.map((goal) => (
//               <li key={goal.id}>
//                 {goal.text}
//                 <button onClick={() => handleUpdateStatus(goal.id, "in progress")}>
//                   Undo
//                 </button>
//                 <button onClick={() => handleDeleteGoal(goal.id)}>Delete</button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }






// import React, { useState } from "react";
// import "../App.css";
// import SaveButton from "./SaveGoalsButton";

// export default function Goals({ goals = [], setGoals }) {
//   const [newGoal, setNewGoal] = useState("");

//   // --- Add a new goal ---
//   const handleAddGoal = () => {
//     if (!newGoal.trim()) return;

//     const payload = { text: newGoal, status: "in progress" };

//     fetch("http://localhost:8080/api/wellness/goal", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     })
//       .then((res) => res.json())
//       .then((saved) => {
//         setGoals((prev) => [...prev, saved]); // 🔑 update shared state
//         setNewGoal("");
//       })
//       .catch((err) => console.error("Error adding goal:", err));
//   };

//   // --- Delete a goal ---
//   const handleDeleteGoal = (id) => {
//     fetch(`http://localhost:8080/api/wellness/goal/${id}`, {
//       method: "DELETE",
//     })
//       .then(() => {
//         setGoals((prev) => prev.filter((g) => g.id !== id)); // 🔑 update shared state
//       })
//       .catch((err) => console.error("Error deleting goal:", err));
//   };

//   // --- Update goal status ---
//   const handleUpdateStatus = (id, status) => {
//     fetch(`http://localhost:8080/api/wellness/goal/${id}/status`, {
//       method: "PUT",
//       headers: { "Content-Type": "text/plain" }, // 🔑 send plain text
//       body: status, // not JSON.stringify
//     })
//       .then((res) => res.json())
//       .then((updated) => {
//         setGoals((prev) =>
//           prev.map((g) => (g.id === id ? { ...g, status: updated.status } : g))
//         );
//       })
//       .catch((err) => console.error("Error updating goal:", err));
//   };


//   const inProgressGoals = goals.filter((g) => g.status === "in progress");
//   const completedGoals = goals.filter((g) => g.status === "completed");

//   return (
//     <div className="goals-page">
//       <h2>My Goals</h2>

//       {/* Add Goal Form */}
//       <div className="add-goal-form">
//         <input
//           type="text"
//           value={newGoal}
//           onChange={(e) => setNewGoal(e.target.value)}
//           placeholder="Enter a new goal..."
//         />
//         <SaveButton saveProp={newGoal} setGoals={setGoals} />
//       </div>

//       {/* Goals In Progress */}
//       <div className="goals-section">
//         <h3>Goals In Progress</h3>
//         {inProgressGoals.length === 0 ? (
//           <p>No goals in progress</p>
//         ) : (
//           <ul>
//             {inProgressGoals.map((goal) => (
//               <li key={goal.id}>
//                 {goal.text}
//                 <button onClick={() => handleUpdateStatus(goal.id, "completed")}>
//                   Complete
//                 </button>
//                 <button onClick={() => handleDeleteGoal(goal.id)}>Delete</button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Completed Goals */}
//       <div className="goals-section">
//         <h3>Completed Goals</h3>
//         {completedGoals.length === 0 ? (
//           <p>No completed goals</p>
//         ) : (
//           <ul>
//             {completedGoals.map((goal) => (
//               <li key={goal.id}>
//                 {goal.text}
//                 <button onClick={() => handleUpdateStatus(goal.id, "in progress")}>
//                   Undo
//                 </button>
//                 <button onClick={() => handleDeleteGoal(goal.id)}>Delete</button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }











// import React, { useState, useEffect } from "react";
// import "../App.css";

// export default function Goals({ goals, setGoals }) {
//   const [goals, setGoals] = useState([]);
//   const [newGoal, setNewGoal] = useState("");

//   // --- Load all goals from backend ---
//   useEffect(() => {
//     fetch("http://localhost:8080/api/wellness/goal/all")
//       .then((res) => res.json())
//       .then((data) => setGoals(data))
//       .catch((err) => console.error("Error fetching goals:", err));
//   }, []);

//   // --- Add a new goal ---
//   const handleAddGoal = () => {
//     if (!newGoal.trim()) return;

//     const payload = { text: newGoal, status: "in progress" };

//     fetch("http://localhost:8080/api/wellness/goal", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     })
//       .then((res) => res.json())
//       .then((saved) => {
//         setGoals((prev) => [...prev, saved]);
//         setNewGoal("");
//       })
//       .catch((err) => console.error("Error adding goal:", err));
//   };

//   // --- Delete a goal ---
//   const handleDeleteGoal = (id) => {
//     fetch(`http://localhost:8080/api/wellness/goal/${id}`, {
//       method: "DELETE",
//     })
//       .then(() => {
//         setGoals((prev) => prev.filter((g) => g.id !== id));
//       })
//       .catch((err) => console.error("Error deleting goal:", err));
//   };

//   // --- Update goal status ---
//   const handleUpdateStatus = (id, status) => {
//     fetch(`http://localhost:8080/api/wellness/goal/${id}/status`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(status),
//     })
//       .then((res) => res.json())
//       .then((updated) => {
//         setGoals((prev) =>
//           prev.map((g) => (g.id === id ? { ...g, status: updated.status } : g))
//         );
//       })
//       .catch((err) => console.error("Error updating goal:", err));
//   };

//   const inProgressGoals = goals.filter((g) => g.status === "in progress");
//   const completedGoals = goals.filter((g) => g.status === "completed");

//   return (
//     <div className="goals-page">
//       <h2>My Goals</h2>

//       {/* Add Goal Form */}
//       <div className="add-goal-form">
//         <input
//           type="text"
//           value={newGoal}
//           onChange={(e) => setNewGoal(e.target.value)}
//           placeholder="Enter a new goal..."
//         />
//         <button onClick={handleAddGoal}>Add Goal</button>
//       </div>

//       {/* Goals In Progress */}
//       <div className="goals-section">
//         <h3>Goals In Progress</h3>
//         {inProgressGoals.length === 0 ? (
//           <p>No goals in progress</p>
//         ) : (
//           <ul>
//             {inProgressGoals.map((goal) => (
//               <li key={goal.id}>
//                 {goal.text}
//                 <button onClick={() => handleUpdateStatus(goal.id, "completed")}>
//                   Complete
//                 </button>
//                 <button onClick={() => handleDeleteGoal(goal.id)}>Delete</button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Completed Goals */}
//       <div className="goals-section">
//         <h3>Completed Goals</h3>
//         {completedGoals.length === 0 ? (
//           <p>No completed goals</p>
//         ) : (
//           <ul>
//             {completedGoals.map((goal) => (
//               <li key={goal.id}>
//                 {goal.text}
//                 <button onClick={() => handleUpdateStatus(goal.id, "in progress")}>
//                   Undo
//                 </button>
//                 <button onClick={() => handleDeleteGoal(goal.id)}>Delete</button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }















// import React, { useState, useEffect } from "react";
// import confetti from "canvas-confetti";
// import "./Goals.css";

// function Goals() {
//   const [goalText, setGoalText] = useState("");
//   const [goals, setGoals] = useState([]);
//   const [celebration, setCelebration] = useState("");

//   useEffect(() => {
//     const savedGoals = JSON.parse(localStorage.getItem("goals-list")) || [];
//     setGoals(savedGoals);
//   }, []);

//   const handleSaveGoal = () => {
//     if (!goalText.trim()) return;
//     const newGoal = {
//       id: Date.now(),
//       text: goalText,
//       status: "added",
//     };
//     const updatedGoals = [newGoal, ...goals];
//     setGoals(updatedGoals);
//     localStorage.setItem("goals-list", JSON.stringify(updatedGoals));
//     setGoalText("");
//   };

//   const updateGoalStatus = (id, newStatus) => {
//     const updatedGoals = goals.map((goal) =>
//       goal.id === id ? { ...goal, status: newStatus } : goal
//     );
//     setGoals(updatedGoals);
//     localStorage.setItem("goals-list", JSON.stringify(updatedGoals));

//     if (newStatus === "completed") {
//       confetti({
//         particleCount: 100,
//         spread: 70,
//         origin: { y: 0.6},
//       })
//       setCelebration("🎉 Goal completed! Great job!");
//       setTimeout(() => setCelebration(""), 3000);
//     }
//   };

//   const handleDeleteGoal = (id) => {
//     const updatedGoals = goals.filter((goal) => goal.id !== id);
//     setGoals(updatedGoals);
//     localStorage.setItem("goals-list", JSON.stringify(updatedGoals));
//   };

//   return (
//     <div className="goals-container">
//       <h1>Goals</h1>
//       {celebration && <div className="goal-celebration">{celebration}</div>}

//       <div className="goal-entry">
//         <h3>Add a Goal:</h3>
//         <textarea
//           value={goalText}
//           onChange={(e) => setGoalText(e.target.value)}
//           placeholder="Enter a goal here..."
//         />
//         <button onClick={handleSaveGoal}>Save Goal</button>
//       </div>

//       <div className="goal-section">
//         <h3>Added Goals</h3>
//         <ul>
//           {goals.filter(goal => goal.status === "added").map((goal) => (
//             <li key={goal.id}>
//               <p className="goal-text">{goal.text}</p>
//               <p>Status: <em>{goal.status}</em></p>
//               <div>
//                 <button onClick={() => updateGoalStatus(goal.id, "in progress")}>
//                   Mark In Progress
//                 </button>
//                 <button onClick={() => updateGoalStatus(goal.id, "completed")}>
//                   Mark Completed
//                 </button>
//                 <button onClick={() => handleDeleteGoal(goal.id)}>Delete</button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="goal-section">
//         <h3>Goals In Progress</h3>
//         <ul>
//           {goals.filter(goal => goal.status === "in progress").map((goal) => (
//             <li key={goal.id}>
//               <p className="goal-text">{goal.text}</p>
//               <p>Status: <em>{goal.status}</em></p>
//               <div>
//                 <button onClick={() => updateGoalStatus(goal.id, "completed")}>
//                   Mark Completed
//                 </button>
//                 <button onClick={() => handleDeleteGoal(goal.id)}>Delete</button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="goal-section">
//         <h3>Completed Goals</h3>
//         <ul>
//           {goals.filter(goal => goal.status === "completed").map((goal) => (
//             <li key={goal.id}>
//               <p className="goal-text">{goal.text}</p>
//               <p>Status: <em>{goal.status}</em></p>
//               <div>
//                 <button onClick={() => handleDeleteGoal(goal.id)}>Delete</button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>

//     </div>
//   );
// }

// export default Goals;