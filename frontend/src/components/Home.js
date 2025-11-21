import React, { useState, useEffect, useCallback } from "react";
import "../App.css";

export default function Home() {

  const [todaysMood, setTodaysMood] = useState(null);
  const [goals, setGoals] = useState([]);
  const [wellnessSummary, setWellnessSummary] = useState(null);
  const [journalEntry, setJournalEntry] = useState("");

  // Format wellness summaries
  const getWellnessSummary = (w) => {
    if (!w) return null;

    return {
      meditation: w.meditation?.completed
        ? `${w.meditation.minutes} min meditated`
        : "Not completed",

      workout: w.workout?.completed
        ? `${w.workout.type} • ${w.workout.minutes} min`
        : "Not completed",

      healthyEating:
        w.meals?.breakfast || w.meals?.lunch || w.meals?.dinner
          ? `${[
              w.meals.breakfast && "Breakfast",
              w.meals.lunch && "Lunch",
              w.meals.dinner && "Dinner",
            ]
              .filter(Boolean)
              .join(", ")} eaten`
          : "None logged",
    };
  };

  // Load today's data
  const loadTodaysData = useCallback(() => {
    const today = new Date().toISOString().split("T")[0];

    // Mood
    const moodData = JSON.parse(localStorage.getItem("moods") || "{}");

    if (moodData[today]) {
      setTodaysMood(moodData[today]); // mood value (1–9)
    } else {
      setTodaysMood(null);
    }

    // Goals
    const goalsData = localStorage.getItem("goals-list");
    if (goalsData) setGoals(JSON.parse(goalsData));

    // Wellness
    const wellnessData = localStorage.getItem(`wellness-${today}`);
    if (wellnessData) {
      const w = JSON.parse(wellnessData);
      setWellnessSummary(getWellnessSummary(w));
    }

    // Journal — collect ALL of today’s entries
    const journalData = localStorage.getItem("journal-entries");
    if (journalData) {
      const entries = JSON.parse(journalData);

      const todaysEntries = entries.filter((e) => e.date === today);

      if (todaysEntries.length > 0) {
        const combinedSnippet = todaysEntries
          .map((e) =>
            e.text.length > 60 ? e.text.substring(0, 60) + "..." : e.text
          )
          .join(" • ");

        setJournalEntry(combinedSnippet);
      } else {
        setJournalEntry("");
      }
    }
  }, []); // No dependencies, safe memoization

  useEffect(() => {
    loadTodaysData();
  }, [loadTodaysData]);

  const getMoodEmoji = (mood) =>
    ["😒","😢","😣","😕","😐","😏","😊","😄","😍"][mood-1] || "—";
  
  const getMoodLabel = (mood) =>
    ["Very Low","Down","Frustrated","Meh","In the Middle","Okay","Content","Very Good","Amazing"][mood-1] || "Not tracked";

  // --- Updated goal logic ---
  const completedGoals = goals.filter((g) => g.status === "completed").length;
  const inProgressGoals = goals.filter((g) => g.status === "in progress").length;

  const goalProgress =
    goals.length > 0 ? (completedGoals / goals.length) * 100 : 0;

  const wellnessActivities = wellnessSummary
    ? [
        wellnessSummary.meditation !== "Not completed",
        wellnessSummary.workout !== "Not completed",
        wellnessSummary.healthyEating !== "None logged",
      ].filter(Boolean).length
    : 0;

  const wellnessProgress = (wellnessActivities / 3) * 100;

  return (
    <div className="home-background">
    <div className="home-container">
      <h1>Your Wellness Home</h1>

      <div className="home-card-header-card">
        <h2 className="home-header-title">Welcome to Your Wellness Dashboard</h2>
        <p className="home-header-subtitle">Here's a quick overview of your day</p>
      </div>

      <div className="home-grid">

        {/* Mood Card */}
        <div className="home-card">
          <div className="home-card-header">
            <div className="home-icon-row">
              <span className="home-icon red">❤️</span>
              <span className="home-emoji">{todaysMood ? getMoodEmoji(todaysMood) : "—"}</span>
            </div>
            <h3>Mood</h3>
          </div>
          <div className="home-card-content">
            <p className="home-value">{todaysMood ? getMoodLabel(todaysMood) : "Not tracked"}</p>
            <p className="home-subtext">
              {todaysMood ? `Level ${todaysMood}/9` : "Track your mood today"}
            </p>
          </div>
        </div>

        {/* Wellness Card */}
        <div className="home-card">
          <div className="home-card-header">
            <div className="home-icon-row">
              <span className="home-icon purple">✨</span>
              <span className="home-small-text">{wellnessActivities}/3</span>
            </div>
            <h3>Wellness</h3>
          </div>
          <div className="home-card-content">
            <div className="home-progress-bar">
              <div className="home-progress-fill" style={{ width: `${wellnessProgress}%` }}></div>
            </div>
            <p className="home-subtext">
              {wellnessActivities === 3
                ? "All activities complete!"
                : wellnessActivities > 0
                ? "Keep going!"
                : "Start your wellness journey"}
            </p>
          </div>
        </div>

        {/* Goals Card */}
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
              <div className="home-progress-fill" style={{ width: `${goalProgress}%` }}></div>
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

        {/* Journal Card */}
        <div className="home-card">
          <div className="home-card-header">
            <div className="home-icon-row">
              <span className="home-icon indigo">📖</span>
              <span className="home-small-text">{journalEntry ? "✓" : "○"}</span>
            </div>
            <h3>Journal</h3>
          </div>
          <div className="home-card-content">
            <p className="home-value">{journalEntry ? "Written" : "Not started"}</p>
            <p className="home-subtext">
              {journalEntry ? `"${journalEntry}"` : "Write your thoughts"}
            </p>
          </div>
        </div>
      </div>

      {/* Wellness Activities */}
      <div className="home-card">
        <div className="home-card-header">
          <span className="home-icon purple">🌸</span>
          <h3>Wellness Activities</h3>
        </div>
        <p className="home-subtext">Your self-care for today</p>

        <div className="home-activities">

          {[
            { key: "meditation", label: "Meditation", value: wellnessSummary?.meditation },
            { key: "workout", label: "Workout", value: wellnessSummary?.workout },
            { key: "healthyEating", label: "Healthy Eating", value: wellnessSummary?.healthyEating }
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


















// import React, { useState, useEffect } from "react";
// import "../App.css";

// export default function Home() {

//   const [todaysMood, setTodaysMood] = useState(null);
//   const [goals, setGoals] = useState([]);
//   const [, setWellness] = useState(null);
//   const [wellnessSummary, setWellnessSummary] = useState(null);
//   const [journalEntry, setJournalEntry] = useState("");

//   // Format wellness summaries
//   const getWellnessSummary = (w) => {
//     if (!w) return null;

//     return {
//       meditation: w.meditation?.completed
//         ? `${w.meditation.minutes} min meditated`
//         : "Not completed",

//       workout: w.workout?.completed
//         ? `${w.workout.type} • ${w.workout.minutes} min`
//         : "Not completed",

//       healthyEating:
//         w.meals?.breakfast || w.meals?.lunch || w.meals?.dinner
//           ? `${[
//               w.meals.breakfast && "Breakfast",
//               w.meals.lunch && "Lunch",
//               w.meals.dinner && "Dinner",
//             ]
//               .filter(Boolean)
//               .join(", ")} eaten`
//           : "None logged",
//     };
//   };

//   // Load today's data
//   const loadTodaysData = () => {
//     const today = new Date().toISOString().split("T")[0];

//     // Mood
// const moodData = JSON.parse(localStorage.getItem("moods") || "{}");

// if (moodData[today]) {
//   setTodaysMood(moodData[today]); // mood value (1–9)
// } else {
//   setTodaysMood(null);
// }


//     // Goals (correct key: "goals-list")
//     const goalsData = localStorage.getItem("goals-list");
//     if (goalsData) setGoals(JSON.parse(goalsData));

//     // Wellness
//     const wellnessData = localStorage.getItem(`wellness-${today}`);
//     if (wellnessData) {
//       const w = JSON.parse(wellnessData);
//       setWellness(w);
//       setWellnessSummary(getWellnessSummary(w));
//     }

//     // Journal — collect ALL of today’s entries
//     const journalData = localStorage.getItem("journal-entries");
//     if (journalData) {
//       const entries = JSON.parse(journalData);

//       const todaysEntries = entries.filter((e) => e.date === today);

//       if (todaysEntries.length > 0) {
//         const combinedSnippet = todaysEntries
//           .map((e) =>
//             e.text.length > 60 ? e.text.substring(0, 60) + "..." : e.text
//           )
//           .join(" • ");

//         setJournalEntry(combinedSnippet);
//       } else {
//         setJournalEntry("");
//       }
//     }
//   };

//   useEffect(() => {
//     loadTodaysData();
//   }, []);

//   const getMoodEmoji = (mood) =>
//     ["😒","😢","😣","😕","😐","😏","😊","😄","😍"][mood-1] || "—";
  
//   const getMoodLabel = (mood) =>
//     ["Very Low","Down","Frustrated","Meh","In the Middle","Okay","Content","Very Good","Amazing"][mood-1] || "Not tracked";

//   // --- Updated goal logic ---
//   const completedGoals = goals.filter((g) => g.status === "completed").length;
//   const inProgressGoals = goals.filter((g) => g.status === "in progress").length;

//   const goalProgress =
//     goals.length > 0 ? (completedGoals / goals.length) * 100 : 0;

//   const wellnessActivities = wellnessSummary
//     ? [
//         wellnessSummary.meditation !== "Not completed",
//         wellnessSummary.workout !== "Not completed",
//         wellnessSummary.healthyEating !== "None logged",
//       ].filter(Boolean).length
//     : 0;

//   const wellnessProgress = (wellnessActivities / 3) * 100;

//   return (
//     <div className="home-background">
//     <div className="home-container">
//       <h1>Your Wellness Home</h1>

//       <div className="home-card-header-card">
//         <h2 className="home-header-title">Welcome to Your Wellness Dashboard</h2>
//         <p className="home-header-subtitle">Here's a quick overview of your day</p>
//       </div>

//       <div className="home-grid">

//         {/* Mood Card */}
//         <div className="home-card">
//           <div className="home-card-header">
//             <div className="home-icon-row">
//               <span className="home-icon red">❤️</span>
//               <span className="home-emoji">{todaysMood ? getMoodEmoji(todaysMood) : "—"}</span>
//             </div>
//             <h3>Mood</h3>
//           </div>
//           <div className="home-card-content">
//             <p className="home-value">{todaysMood ? getMoodLabel(todaysMood) : "Not tracked"}</p>
//             <p className="home-subtext">
//               {todaysMood ? `Level ${todaysMood}/10` : "Track your mood today"}
//             </p>
//           </div>
//         </div>

//         {/* Wellness Card */}
//         <div className="home-card">
//           <div className="home-card-header">
//             <div className="home-icon-row">
//               <span className="home-icon purple">✨</span>
//               <span className="home-small-text">{wellnessActivities}/3</span>
//             </div>
//             <h3>Wellness</h3>
//           </div>
//           <div className="home-card-content">
//             <div className="home-progress-bar">
//               <div className="home-progress-fill" style={{ width: `${wellnessProgress}%` }}></div>
//             </div>
//             <p className="home-subtext">
//               {wellnessActivities === 3
//                 ? "All activities complete!"
//                 : wellnessActivities > 0
//                 ? "Keep going!"
//                 : "Start your wellness journey"}
//             </p>
//           </div>
//         </div>

//         {/* Goals Card */}
//         <div className="home-card">
//           <div className="home-card-header">
//             <div className="home-icon-row">
//               <span className="home-icon blue">🎯</span>
//               <span className="home-small-text">
//                 {completedGoals}/{goals.length}
//               </span>
//             </div>
//             <h3>Goals</h3>
//           </div>
//           <div className="home-card-content">
//             <div className="home-progress-bar">
//               <div className="home-progress-fill" style={{ width: `${goalProgress}%` }}></div>
//             </div>
//             <p className="home-subtext">
//               {goals.length === 0
//                 ? "No goals set"
//                 : completedGoals === goals.length
//                 ? "All goals achieved!"
//                 : `${inProgressGoals} in progress`}
//             </p>
//           </div>
//         </div>

//         {/* Journal Card */}
//         <div className="home-card">
//           <div className="home-card-header">
//             <div className="home-icon-row">
//               <span className="home-icon indigo">📖</span>
//               <span className="home-small-text">{journalEntry ? "✓" : "○"}</span>
//             </div>
//             <h3>Journal</h3>
//           </div>
//           <div className="home-card-content">
//             <p className="home-value">{journalEntry ? "Written" : "Not started"}</p>
//             <p className="home-subtext">
//               {journalEntry ? `"${journalEntry}"` : "Write your thoughts"}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Wellness Activities */}
//       <div className="home-card">
//         <div className="home-card-header">
//           <span className="home-icon purple">🌸</span>
//           <h3>Wellness Activities</h3>
//         </div>
//         <p className="home-subtext">Your self-care for today</p>

//         <div className="home-activities">

//           {[
//             { key: "meditation", label: "Meditation", value: wellnessSummary?.meditation },
//             { key: "workout", label: "Workout", value: wellnessSummary?.workout },
//             { key: "healthyEating", label: "Healthy Eating", value: wellnessSummary?.healthyEating }
//           ].map((item) => (
//             <div
//               key={item.key}
//               className={`home-activity ${
//                 item.value && !item.value.includes("Not") 
//                   ? "activity-complete" 
//                   : "activity-incomplete"
//               }`}
//             >
//               <div className="home-activity-header">
//                 <span>{item.label}</span>
//                 <span>
//                   {item.value && !item.value.includes("Not") ? "✓" : "○"}
//                 </span>
//               </div>

//               <p className="home-subtext">{item.value || "No data"}</p>
//             </div>
//           ))}

//         </div>
//       </div>
//     </div>
//     </div>
//   );
// }