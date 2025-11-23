import React, { useState } from "react";
import "../App.css";
import MoodHistoryChart from "./MoodHistoryChart";

export default function Mood({ entries, setEntries }) {
  const [mood, setMood] = useState(5);

  const moodMap = {
    1: { label: "Very Low", emoji: "😒" },
    2: { label: "Down", emoji: "😢" },
    3: { label: "Frustrated", emoji: "😣" },
    4: { label: "Meh", emoji: "😕" },
    5: { label: "In the Middle", emoji: "😐" },
    6: { label: "Okay", emoji: "😏" },
    7: { label: "Content", emoji: "😊" },
    8: { label: "Very Good", emoji: "😄" },
    9: { label: "Amazing", emoji: "😍" }
  };

  const handleSubmit = async () => {
    const today = new Date().toISOString().split("T")[0];
    const payload = { date: today + "T00:00:00", rating: mood };

    try {
      const res = await fetch("http://localhost:8080/api/wellness/mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const saved = await res.json();
        const dateStr = saved.date.split("T")[0];

        // 🔑 Update shared entries in App.js
        setEntries(prev => ({
          ...prev,
          [dateStr]: { date: dateStr, mood: saved.rating }
        }));

        alert(`Mood submitted: ${moodMap[mood].label} ${moodMap[mood].emoji}`);
      }
    } catch (err) {
      console.error("Error saving mood:", err);
    }
  };

  return (
    <div className="moodBox">
      <h2 className="moodHeader">Mood Check-In</h2>

      <div className="emojiNumberContainer">
        <div className="emojiRow">
          {Object.values(moodMap).map((m, i) => (
            <span key={i} className="emojiItem">{m.emoji}</span>
          ))}
        </div>
        <div className="numberRow">
          {Object.keys(moodMap).map(num => (
            <span key={num}>{num}</span>
          ))}
        </div>
      </div>

      <input
        type="range"
        min="1"
        max="9"
        step="1"
        value={mood}
        onChange={(e) => setMood(Number(e.target.value))}
        className="moodSlider"
      />

      <p className="moodFeedback">
        You feel: <strong>{moodMap[mood].label}</strong> {moodMap[mood].emoji}
      </p>

      <button className="moodSubmitButton" onClick={handleSubmit}>
        Submit
      </button>

      {/* Chart now uses shared entries */}
      <MoodHistoryChart entries={Object.values(entries)} />
    </div>
  );
}









// import React, { useState, useEffect } from "react";
// import "../App.css";
// import MoodHistoryChart from "./MoodHistoryChart";

// export default function Mood({ onSubmitMood, entries }) {
//   const [mood, setMood] = useState(5);
//   const [history, setHistory] = useState([]);

//   const moodMap = {
//     1: { label: "Very Low", emoji: "😒" },
//     2: { label: "Down", emoji: "😢" },
//     3: { label: "Frustrated", emoji: "😣" },
//     4: { label: "Meh", emoji: "😕" },
//     5: { label: "In the Middle", emoji: "😐" },
//     6: { label: "Okay", emoji: "😏" },
//     7: { label: "Content", emoji: "😊" },
//     8: { label: "Very Good", emoji: "😄" },
//     9: { label: "Amazing", emoji: "😍" }
//   };

//   // Load mood history from backend
//   useEffect(() => {
//     fetch("http://localhost:8080/api/wellness/mood/all")
//       .then(res => res.json())
//       .then(data => {
//         const formatted = data.map(m => ({
//           date: m.date.split("T")[0],   // keep YYYY-MM-DD
//           mood: m.rating
//         }));
//         setHistory(formatted);
//       })
//       .catch(err => console.error("Error fetching mood history:", err));
//   }, []);

//   const handleSubmit = () => {
//     const today = new Date().toISOString().split("T")[0];
//     const payload = {
//       date: today + "T00:00:00",
//       rating: mood
//     };

//     fetch("http://localhost:8080/api/wellness/mood", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload)
//     })
//       .then(res => res.json())
//       .then(saved => {
//         // Add new mood to local chart data
//         setHistory(prev => [
//           ...prev,
//           {
//             date: saved.date.split("T")[0],
//             mood: saved.rating
//           }
//         ]);

//         alert(`Mood submitted: ${moodMap[mood].label} ${moodMap[mood].emoji}`);
//       })
//       .catch(err => console.error("Error saving mood:", err));
//   };

  

//   return (
//     <div className="moodBox">
//       <h2 className="moodHeader">Mood Check-In</h2>

//       <div className="emojiNumberContainer">
//         <div className="emojiRow">
//           {Object.values(moodMap).map((m, i) => (
//             <span key={i} className="emojiItem">{m.emoji}</span>
//           ))}
//         </div>
//         <div className="numberRow">
//           {Object.keys(moodMap).map(num => (
//             <span key={num}>{num}</span>
//           ))}
//         </div>
//       </div>

//       <input
//         type="range"
//         min="1"
//         max="9"
//         step="1"
//         value={mood}
//         onChange={(e) => setMood(Number(e.target.value))}
//         className="moodSlider"
//       />

//       <p className="moodFeedback">
//         You feel: <strong>{moodMap[mood].label}</strong> {moodMap[mood].emoji}
//       </p>

//       <button className="moodSubmitButton" onClick={handleSubmit}>
//         Submit
//       </button>

//       <MoodHistoryChart entries={history} />
//     </div>
//   );
// }



















// import React, { useState } from "react";
// import "../App.css";
// import MoodHistoryChart from "./MoodHistoryChart";

// export default function MoodScale({ onSubmitMood, entries }) {
//   const [mood, setMood] = useState(5);
//   // const handleSubmit = () => {
//   //   // alert(`Mood submitted: ${moodMap[mood].label} ${moodMap[mood].emoji}`);
//   // };
  
//   const moodMap = {
//     1: { label: "Very Low", emoji: "😒" },
//     2: { label: "Down", emoji: "😢" },
//     3: { label: "Frustrated", emoji: "😣" },
//     4: { label: "Meh", emoji: "😕" },
//     5: { label: "In the Middle", emoji: "😐" },
//     6: { label: "Okay", emoji: "😏" },
//     7: { label: "Content", emoji: "😊" },
//     8: { label: "Very Good", emoji: "😄" },
//     9: { label: "Amazing", emoji: "😍" }
//   };

//   const handleSubmit = () => {
//     const today = new Date().toISOString().split("T")[0];

//     onSubmitMood(today, mood);

//     alert(`Mood for today submitted: ${moodMap[mood].label} ${moodMap[mood].emoji}`);
//   };

//   return (
//     <div className="moodBox">
//       <h2 className="moodHeader">Mood Check-In</h2>

//       <div className="emojiNumberContainer">
//         <div className="emojiRow">
//           {Object.values(moodMap).map((m, i) => (
//             <span key={i} className="emojiItem">{m.emoji}</span>
//           ))}
//         </div>
//         <div className="numberRow">
//           {Object.keys(moodMap).map((num) => (
//             <span key={num}>{num}</span>
//           ))}
//         </div>
//       </div>

//       <input
//         type="range"
//         min="1"
//         max="9"
//         step="1"
//         value={mood}
//         onChange={(e) => setMood(Number(e.target.value))}
//         className="moodSlider"
//       />

//       <p className="moodFeedback">
//         You feel: <strong>{moodMap[mood].label}</strong> {moodMap[mood].emoji}
//       </p>  
//       <button className="moodSubmitButton" onClick={() => handleSubmit()}>
//         Submit
//       </button>

//       <MoodHistoryChart entries={entries} />
//     </div>
//   );
// }

