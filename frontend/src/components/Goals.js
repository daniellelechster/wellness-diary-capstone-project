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