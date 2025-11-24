import React, { useState, useEffect, useCallback } from "react";
import "../App.css";
import DailyQuote from "./DailyQuote";
import serenity1 from "./images/serenity1.jpg";

function Journals({ journals, setJournals }) {
  const [moodLabel, setMoodLabel] = useState("");
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [dailyQuote, setDailyQuote] = useState("");
  const [editingEntryId, setEditingEntryId] = useState(null);
  const [editingText, setEditingText] = useState("");


  const todayKey = new Date().toISOString().split("T")[0];

  /* -------------------------
     Prompts Based on Mood
  --------------------------*/
  const getPromptsForMood = useCallback((mood) => {
    if (mood >= 8) return ["What made you feel grateful today?", "What's something that brought you joy?"];
    if (mood >= 5) return ["What went well today?", "What's something you'd like to improve tomorrow?"];
    return ["What’s been challenging today?", "What can you do to be kind to yourself?"];
  }, []);

  const getMoodLabel = (mood) =>
    ["Very Low 😒","Down 😢","Frustrated 😣","Meh 😕","In the Middle 😐","Okay 😏","Content 😊","Very Good 😄","Amazing 😍"][mood - 1] || "Not tracked";

  /* -------------------------
     Load Entries from Backend
  --------------------------*/
  useEffect(() => {
    async function fetchEntries() {
      try {
        const res = await fetch("http://localhost:8080/api/wellness/journal/all");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        const mapped = data
          .map((j) => {
            const created = j.createdAt ? new Date(j.createdAt) : new Date();
            return {
              id: j.id,
              prompt: j.prompt,
              text: j.text,
              createdAt: j.createdAt,
              date: created.toISOString().split("T")[0],
              time: created.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
            };
          })
          .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

        setJournals(mapped);
      } catch (err) {
        console.error("Error loading journals:", err);
        setJournals([]);
      }
    }
    fetchEntries();

    // Mock mood + prompt for now
    const mood = 5;
    setMoodLabel(getMoodLabel(mood));
    const prompts = getPromptsForMood(mood);
    setCurrentPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
    setDailyQuote("Every day is a fresh start.");
  }, [getPromptsForMood, setJournals]);

  /* -------------------------
     Save Entry (POST)
  --------------------------*/
  const handleSaveEntry = async () => {
    if (!response.trim()) return;

    const payload = {
      prompt: currentPrompt,
      text: response,
    };

    try {
      const res = await fetch("http://localhost:8080/api/wellness/journal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Save failed: ${res.status}`);

      const saved = await res.json();
      const created = saved.createdAt ? new Date(saved.createdAt) : new Date();
      const frontendEntry = {
        id: saved.id,
        prompt: saved.prompt,
        text: saved.text,
        createdAt: saved.createdAt,
        date: created.toISOString().split("T")[0],
        time: created.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
      };

      setJournals((prev) => [frontendEntry, ...prev]); // update App state
      setResponse("");
    } catch (err) {
      console.error("Error saving entry:", err);
      alert("Unable to save entry — try again.");
    }
  };

  /* -------------------------
     Delete Entry (DELETE)
  --------------------------*/
  const handleDeleteEntry = async (id) => {
    if (!window.confirm("Delete this entry?")) return;
    try {
      const res = await fetch(`http://localhost:8080/api/wellness/journal/${id}`, { method: "DELETE" });
      if (!res.ok && res.status !== 204) throw new Error(`Delete failed ${res.status}`);
      setJournals((prev) => prev.filter((entry) => entry.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Unable to delete entry — try again.");
    }
  };

  /* -------------------------
     Update Entry (PUT)
  --------------------------*/
  const handleEditEntry = async (id, updatedText) => {
    const entryToUpdate = journals.find((e) => e.id === id);
    if (!entryToUpdate) return;
    try {
      const res = await fetch(`http://localhost:8080/api/wellness/journal/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...entryToUpdate, text: updatedText }),
      });
      if (!res.ok) throw new Error(`Update failed ${res.status}`);
      const updated = await res.json();
      const created = updated.createdAt ? new Date(updated.createdAt) : new Date();
      const frontendUpdated = {
        id: updated.id,
        prompt: updated.prompt,
        text: updated.text,
        createdAt: updated.createdAt,
        date: created.toISOString().split("T")[0],
        time: created.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
      };
      setJournals((prev) => prev.map((e) => (e.id === id ? frontendUpdated : e)));
    } catch (err) {
      console.error("Update error:", err);
      alert("Unable to update entry — try again.");
    }
  };

  /* -------------------------
    UI
  --------------------------*/
  return (
    <div className="journals-container" style={{ backgroundImage: `url(${serenity1})` }}>
      <h1>Today's Journal</h1>
      <h2>Mood: {moodLabel}</h2>

      <div className="daily-quote">
        <DailyQuote text={dailyQuote} />
      </div>

      {/* Journal Entry */}
      <div className="journal-entry">
        <h3>Journal Entry</h3>
        <p>
          {currentPrompt}
          <button
            onClick={() => {
              const prompts = getPromptsForMood(5);
              const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
              setCurrentPrompt(randomPrompt);
              setResponse("");
            }}
            style={{ marginLeft: "12px" }}
          >
            New Prompt
          </button>
        </p>

        <textarea
          className="placeholder"
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Write your thoughts here..."
        />

        <button onClick={handleSaveEntry}>Save Entry</button>
      </div>

      {/* History */}
      <div className="journal-history">
        <h3>Journal History</h3>
        {journals.length === 0 ? (
          <p>No journal entries yet.</p>
        ) : (
          <ul>
            {journals.map((entry) => (
            <li key={entry.id} className={editingEntryId === entry.id ? "editing" : ""}>
              <strong>{entry.date}</strong> at <em>{entry.time}</em> — {entry.prompt}

              {editingEntryId === entry.id ? (
                <>
                  <textarea
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    style={{ width: "100%", minHeight: "80px" }}
                  />
                  <button
                    onClick={() => {
                      handleEditEntry(entry.id, editingText);
                      setEditingEntryId(null);
                      setEditingText("");
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingEntryId(null);
                      setEditingText("");
                    }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <p style={{ whiteSpace: "pre-wrap" }}>{entry.text}</p>
                  <button onClick={() => handleDeleteEntry(entry.id)}>Delete</button>
                  <button
                    onClick={() => {
                      setEditingEntryId(entry.id);
                      setEditingText(entry.text);
                    }}
                  >
                    Edit
                  </button>
                </>
              )}
            </li>
          ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Journals;




// import React, { useState, useEffect, useCallback } from "react";
// import "../App.css";
// import DailyQuote from "./DailyQuote";
// import serenity1 from "./images/serenity1.jpg";

// function Journals() {
//   const [entries, setEntries] = useState([]);
//   const [moodLabel, setMoodLabel] = useState("");
//   const [currentPrompt, setCurrentPrompt] = useState("");
//   const [response, setResponse] = useState("");
//   const [dailyQuote, setDailyQuote] = useState("");
//   // const [journals, setJournals] = useState([]);
//   const [editingEntryId, setEditingEntryId] = useState(null);
//   const [editingText, setEditingText] = useState("");


//   // const todayKey = new Date().toISOString().split("T")[0];

//   /* -------------------------
//      Prompts Based on Mood
//   --------------------------*/
//   const getPromptsForMood = useCallback((mood) => {
//     if (mood >= 8) return ["What made you feel grateful today?", "What's something that brought you joy?"];
//     if (mood >= 5) return ["What went well today?", "What's something you'd like to improve tomorrow?"];
//     return ["What’s been challenging today?", "What can you do to be kind to yourself?"];
//   }, []);

//   const getMoodLabel = (mood) =>
//     ["Very Low 😒","Down 😢","Frustrated 😣","Meh 😕","In the Middle 😐","Okay 😏","Content 😊","Very Good 😄","Amazing 😍"][mood - 1] || "Not tracked";

//   /* -------------------------
//      Load Entries from Backend
//   --------------------------*/
//   useEffect(() => {
//     async function fetchEntries() {
//       try {
//         const res = await fetch("http://localhost:8080/api/wellness/journal/all");
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         const data = await res.json();

//         // map server objects to frontend shape, parse createdAt into date/time
//         const mapped = data
//           .map((j) => {
//             const created = j.createdAt ? new Date(j.createdAt) : new Date();
//             return {
//               id: j.id,
//               prompt: j.prompt,
//               text: j.text,
//               createdAt: j.createdAt,
//               // easier display fields:
//               date: created.toLocaleDateString(),
//               time: created.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
//             };
//           })
//           // show newest first
//           .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

//         setEntries(mapped);
//       } catch (err) {
//         console.error("Error loading journals:", err);
//         setEntries([]);
//       }
//     }
//     fetchEntries();

//     // Mock mood + prompt for now (you can replace with real mood later)
//     const mood = 5;
//     setMoodLabel(getMoodLabel(mood));
//     const prompts = getPromptsForMood(mood);
//     setCurrentPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
//     setDailyQuote("Every day is a fresh start.");
//   }, [getPromptsForMood]);

//   /* -------------------------
//      Save Entry (POST)
//   --------------------------*/
//   const handleSaveEntry = async () => {
//     if (!response.trim()) return;

//     const payload = {
//       prompt: currentPrompt,
//       text: response,
//     };

//     try {
//       const res = await fetch("http://localhost:8080/api/wellness/journal", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) throw new Error(`Save failed: ${res.status}`);

//       const saved = await res.json();

//       // derive display fields from server's createdAt
//       const created = saved.createdAt ? new Date(saved.createdAt) : new Date();
//       const frontendEntry = {
//         id: saved.id,
//         prompt: saved.prompt,
//         text: saved.text,
//         createdAt: saved.createdAt,
//         date: created.toLocaleDateString(),
//         time: created.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
//       };

//       // prepend newest
//       setEntries((prev) => [frontendEntry, ...prev]);
//       setResponse("");
//     } catch (err) {
//       console.error("Error saving entry:", err);
//       alert("Unable to save entry — try again.");
//     }
//   };

//   /* -------------------------
//      Delete Entry (DELETE)
//   --------------------------*/
//   const handleDeleteEntry = async (id) => {
//     if (!window.confirm("Delete this entry?")) return;
//     try {
//       const res = await fetch(`http://localhost:8080/api/wellness/journal/${id}`, { method: "DELETE" });
//       if (!res.ok && res.status !== 204) throw new Error(`Delete failed ${res.status}`);
//       setEntries((prev) => prev.filter((entry) => entry.id !== id));
//     } catch (err) {
//       console.error("Delete failed:", err);
//       alert("Unable to delete entry — try again.");
//     }
//   };

//   /* -------------------------
//      Update Entry (PUT)
//   --------------------------*/
//   const handleEditEntry = async (id, updatedText) => {
//     const entryToUpdate = entries.find((e) => e.id === id);
//     if (!entryToUpdate) return;
//     try {
//       const res = await fetch(`http://localhost:8080/api/wellness/journal/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...entryToUpdate, text: updatedText }),
//       });
//       if (!res.ok) throw new Error(`Update failed ${res.status}`);
//       const updated = await res.json();
//       const created = updated.createdAt ? new Date(updated.createdAt) : new Date();
//       const frontendUpdated = {
//         id: updated.id,
//         prompt: updated.prompt,
//         text: updated.text,
//         createdAt: updated.createdAt,
//         date: created.toLocaleDateString(),
//         time: created.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
//       };
//       setEntries((prev) => prev.map((e) => (e.id === id ? frontendUpdated : e)));
//     } catch (err) {
//       console.error("Update error:", err);
//       alert("Unable to update entry — try again.");
//     }
//   };

//   /* -------------------------
//     UI
//   --------------------------*/
//   return (
//     <div className="journals-container" style={{ backgroundImage: `url(${serenity1})` }}>
//       <h1>Today's Journal</h1>
//       <h2>Mood: {moodLabel}</h2>

//       <div className="daily-quote">
//         <DailyQuote text={dailyQuote} />
//       </div>

//       {/* Journal Entry */}
//       <div className="journal-entry">
//         <h3>Journal Entry</h3>
//         <p>
//           {currentPrompt}
//           <button
//             onClick={() => {
//               const prompts = getPromptsForMood(5);
//               const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
//               setCurrentPrompt(randomPrompt);
//               setResponse("");
//             }}
//             style={{ marginLeft: "12px" }}
//           >
//             New Prompt
//           </button>
//         </p>

//         <textarea
//           className="placeholder"
//           value={response}
//           onChange={(e) => setResponse(e.target.value)}
//           placeholder="Write your thoughts here..."
//         />

//         <button onClick={handleSaveEntry}>Save Entry</button>
//       </div>

//       {/* History */}
//       <div className="journal-history">
//         <h3>Journal History</h3>
//         {entries.length === 0 ? (
//           <p>No journal entries yet.</p>
//         ) : (
//           <ul>
//             {entries.map((entry) => (
//               <li key={entry.id}>
//                 <strong>{entry.date}</strong> at <em>{entry.time}</em> — {entry.prompt}

//                 {editingEntryId === entry.id ? (
//                   <>
//                     <textarea
//                       value={editingText}
//                       onChange={(e) => setEditingText(e.target.value)}
//                       style={{ width: "100%", minHeight: "80px" }}
//                     />
//                     <button className="save-btn"
//                       onClick={() => {
//                         handleEditEntry(entry.id, editingText);
//                         setEditingEntryId(null);
//                         setEditingText("");
//                       }}
//                     >
//                       Save
//                     </button>
//                     <button className="cancel-btn"
//                       onClick={() => {
//                         setEditingEntryId(null);
//                         setEditingText("");
//                       }}
//                     >
//                       Cancel
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <p style={{ whiteSpace: "pre-wrap" }}>{entry.text}</p>
//                     <button onClick={() => handleDeleteEntry(entry.id)}>Delete</button>
//                     <button
//                       onClick={() => {
//                         setEditingEntryId(entry.id);
//                         setEditingText(entry.text);
//                       }}
//                     >
//                       Edit
//                     </button>
//                   </>
//                 )}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//     </div>
//   );
// }

// export default Journals;









// import React, { useState, useEffect, useCallback } from "react";
// import "../App.css";
// import DailyQuote from "./DailyQuote";
// import serenity1 from "./images/serenity1.jpg";

// function Journals() {
//   const [entries, setEntries] = useState([]);
//   const [moodLabel, setMoodLabel] = useState("");
//   const [currentPrompt, setCurrentPrompt] = useState("");
//   const [response, setResponse] = useState("");
//   const [dailyQuote, setDailyQuote] = useState("");

//   const todayKey = new Date().toISOString().split("T")[0];

//   /* -------------------------
//      Prompts Based on Mood
//   --------------------------*/
//   const getPromptsForMood = useCallback((mood) => {
//     if (mood >= 8) return ["What made you feel grateful today?", "What's something that brought you joy?"];
//     if (mood >= 5) return ["What went well today?", "What's something you'd like to improve tomorrow?"];
//     return ["What’s been challenging today?", "What can you do to be kind to yourself?"];
//   }, []);

//   const getMoodLabel = (mood) =>
//     ["Very Low 😒","Down 😢","Frustrated 😣","Meh 😕","In the Middle 😐","Okay 😏","Content 😊","Very Good 😄","Amazing 😍"][mood - 1] || "Not tracked";

//   /* -------------------------
//      Load Entries from Backend
//   --------------------------*/
//   useEffect(() => {
//     async function fetchEntries() {
//       const res = await fetch("/api/wellness/journal/all");
//       const data = await res.json();
//       setEntries(data);
//     }
//     fetchEntries();

//     // Mock mood + prompt for now
//     const mood = 5;
//     setMoodLabel(getMoodLabel(mood));
//     const prompts = getPromptsForMood(mood);
//     setCurrentPrompt(prompts[Math.floor(Math.random() * prompts.length)]);

//     // Mock daily quote
//     setDailyQuote("Every day is a fresh start.");
//   }, [getPromptsForMood]);

//   /* -------------------------
//      Save Entry (POST)
//   --------------------------*/
//   const handleSaveEntry = async () => {
//     if (!response.trim()) return;

//     const now = new Date();
//     const time = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

//     const newEntry = {
//       date: todayKey,
//       time,
//       prompt: currentPrompt,
//       text: response,
//     };

//     const res = await fetch("http://localhost:8080/api/wellness/journal", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newEntry),
//     });

//     const saved = await res.json();
//     setEntries([saved, ...entries]);
//     setResponse("");
//   };

//   /* -------------------------
//      Delete Entry (DELETE)
//   --------------------------*/
//   const handleDeleteEntry = async (id) => {
//     await fetch(`/api/wellness/journal/${id}`, { method: "DELETE" });
//     setEntries(entries.filter((entry) => entry.id !== id));
//   };

//   /* -------------------------
//      Update Entry (PUT)
//   --------------------------*/
//   const handleEditEntry = async (id, updatedText) => {
//     const entryToUpdate = entries.find((e) => e.id === id);
//     const res = await fetch(`/api/wellness/journal/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ ...entryToUpdate, text: updatedText }),
//     });
//     const updated = await res.json();
//     setEntries(entries.map((e) => (e.id === id ? updated : e)));
//   };

//   /* -------------------------
//     UI
//   --------------------------*/
//   return (
//     <div className="journals-container" style={{ backgroundImage: `url(${serenity1})` }}>
//       <h1>Today's Journal</h1>
//       <h2>Mood: {moodLabel}</h2>

// <div className="daily-quote">
//   <DailyQuote />
// </div>


//       {/* Journal Entry */}
//       <div className="journal-entry">
//         <h3>Journal Entry</h3>
//         <p>
//           {currentPrompt}
//           <button
//             onClick={() => {
//               const prompts = getPromptsForMood(5);
//               const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
//               setCurrentPrompt(randomPrompt);
//               setResponse("");
//             }}
//           >
//             New Prompt
//           </button>
//         </p>

//         <textarea
//           className="placeholder"
//           value={response}
//           onChange={(e) => setResponse(e.target.value)}
//           placeholder="Write your thoughts here..."
//         />

//         <button onClick={handleSaveEntry}>Save Entry</button>
//       </div>

//       {/* History */}
//       <div className="journal-history">
//         <h3>Journal History</h3>
//         {entries.length === 0 ? (
//           <p>No journal entries yet.</p>
//         ) : (
//           <ul>
//             {entries.map((entry) => (
//               <li key={entry.id}>
//                 <strong>{entry.date}</strong> at <em>{entry.time}</em> — {entry.prompt}
//                 <p>{entry.text}</p>
//                 <button onClick={() => handleDeleteEntry(entry.id)}>Delete</button>
//                 <button
//                   onClick={() => {
//                     const updatedText = prompt("Edit your entry:", entry.text);
//                     if (updatedText) handleEditEntry(entry.id, updatedText);
//                   }}
//                 >
//                   Edit
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Journals;







// import React, { useState, useEffect, useCallback } from "react";
// import serenity1 from "./images/serenity1.jpg";


// function Journals() {
//   const [entries, setEntries] = useState([]);
//   const [, setCurrentMood] = useState(null);
//   const [moodLabel, setMoodLabel] = useState("");
//   const [currentPrompt, setCurrentPrompt] = useState("");
//   const [response, setResponse] = useState("");
//   const [dailyQuote, setDailyQuote] = useState("");
//   const [dailyQuotes, setDailyQuotes] = useState([]);

//   const todayKey = new Date().toISOString().split("T")[0];

//   /* -------------------------
//      Load Quotes (Mock API)
//   --------------------------*/
//   useEffect(() => {
//     async function fetchQuotes() {
//       const mockQuotes = [
//         "Take a deep breath. You are doing great.",
//         "Progress, not perfection.",
//         "Be kind to yourself today.",
//         "Even the smallest step forward is progress.",
//         "You are enough, exactly as you are.",
//         "You are stronger than you think.",
//         "Take it one step at a time.",
//         "Even small progress is progress.",
//         "Breathe. You're doing better than you think.",
//         "Focus on the step in front of you, not the whole staircase.",
//         "You deserve kindness — especially from yourself.",
//         "Every day is a fresh start.",
//         "Peace begins the moment you choose it.",
//         "Let go of what you can't control.",
//       ];
//       await new Promise((res) => setTimeout(res, 300));
//       setDailyQuotes(mockQuotes);
//     }
//     fetchQuotes();
//   }, []);

//   /* -------------------------
//      Prompts Based on Mood
//   --------------------------*/
//   const getPromptsForMood = useCallback((mood) => {
//     if (mood >= 8)
//       return [
//         "What made you feel grateful today?",
//         "What's something that brought you joy?",
//         "What made today so wonderful?",
//         "What are three things you're grateful for right now?",
//         "How can you share this positive energy with others?",
//         "What accomplishment are you most proud of today?",
//         "Who or what brought joy to your day?",
//         "What would you like to celebrate about today?",
//         "How can you carry this good feeling into tomorrow?",
//         "What's something you're looking forward to?",
//         "What moment from today will you treasure?",
//         "How did you spread kindness today?",
//       ];

//     if (mood >= 5)
//       return [
//         "What went well today?",
//         "What's something you'd like to improve tomorrow?",
//         "What's one small thing that went well today?",
//         "What challenged you today and how did you handle it?",
//         "What's one thing you learned about yourself today?",
//         "How did you take care of yourself today?",
//         "What would you like to accomplish tomorrow?",
//         "What are you grateful for, even on an average day?",
//         "What emotion did you feel most today and why?",
//         "What boundary did you set or honor today?",
//         "How can you make tomorrow a bit brighter?",
//         "What moment from today deserves recognition?",
//       ];

//     return [
//       "What’s been challenging today?",
//       "What can you do to be kind to yourself?",
//       "What's one kind thing you can do for yourself right now?",
//       "What small comfort brought you peace today?",
//       "Who or what can you reach out to for support?",
//       "What would you tell a friend feeling this way?",
//       "What's one tiny thing you accomplished today, no matter how small?",
//       "What feelings are you experiencing and why might they be there?",
//       "What do you need most right now?",
//       "What's one thing that might help you feel a little better tomorrow?",
//       "How have you been brave or strong today, even in small ways?",
//       "What can you let go of or forgive yourself for today?",
//     ];
//   }, []);

//   /* -------------------------
//      Load Saved Data
//   --------------------------*/
//   const getMoodLabel = (mood) =>
//     [
//       "Very Low 😒",
//       "Down 😢",
//       "Frustrated 😣",
//       "Meh 😕",
//       "In the Middle 😐",
//       "Okay 😏",
//       "Content 😊",
//       "Very Good 😄",
//       "Amazing 😍",
//     ][mood - 1] || "Not tracked";

//   useEffect(() => {
//     const savedEntries =
//       JSON.parse(localStorage.getItem("journal-entries")) || [];
//     setEntries(savedEntries);

//     const mood = parseInt(localStorage.getItem("currentMood")) || 5;
//     setCurrentMood(mood);
//     setMoodLabel(getMoodLabel(mood));

//     const prompts = getPromptsForMood(mood);
//     const savedPrompt = localStorage.getItem(`current-prompt-${todayKey}`);

//     if (savedPrompt && prompts.includes(savedPrompt)) {
//       setCurrentPrompt(savedPrompt);
//       const savedResponse = localStorage.getItem(
//         `reflection-${todayKey}-${savedPrompt}`
//       );
//       if (savedResponse) setResponse(savedResponse);
//     } else {
//       const randomPrompt =
//         prompts[Math.floor(Math.random() * prompts.length)];
//       setCurrentPrompt(randomPrompt);
//       localStorage.setItem(`current-prompt-${todayKey}`, randomPrompt);
//     }

//     const savedQuote = localStorage.getItem(`daily-quote-${todayKey}`);
//     if (savedQuote) {
//       setDailyQuote(savedQuote);
//     } else if (dailyQuotes.length > 0) {
//       const randomQuote =
//         dailyQuotes[Math.floor(Math.random() * dailyQuotes.length)];
//       setDailyQuote(randomQuote);
//       localStorage.setItem(`daily-quote-${todayKey}`, randomQuote);
//     }
//   }, [dailyQuotes, getPromptsForMood, todayKey]);

//   /* -------------------------
//      Save Entry (With Timestamp)
//   --------------------------*/
//   const handleSaveEntry = () => {
//     if (!response.trim()) return;

//     const now = new Date();
//     const time = now.toLocaleTimeString([], {
//       hour: "numeric",
//       minute: "2-digit",
//     });

//     const newEntry = {
//       date: todayKey,
//       time,
//       prompt: currentPrompt,
//       text: response,
//     };

//     const updatedEntries = [newEntry, ...entries];
//     setEntries(updatedEntries);
//     localStorage.setItem("journal-entries", JSON.stringify(updatedEntries));
//     setResponse("");
//   };

//   /* -------------------------
//      Delete Entry
//   --------------------------*/
//   const handleDeleteEntry = (index) => {
//     const updatedEntries = entries.filter((_, i) => i !== index);
//     setEntries(updatedEntries);
//     localStorage.setItem("journal-entries", JSON.stringify(updatedEntries));
//   };

//   /* -------------------------
//      UI
//   --------------------------*/
//   return (
//     <div
//       className="journals-container"
//       style={{ backgroundImage: `url(${serenity1})` }}
//     >
//       <h1>Today's Journal</h1>
//       <h2>Mood: {moodLabel}</h2>

//       <div className="daily-quote">
//         <span role="img" aria-label="sun and moon">
//           🌞🌙
//         </span>
//         <strong> Daily Quote:</strong> {dailyQuote}
//       </div>

//       {/* Journal Entry */}
//       <div className="journal-entry">
//         <h3>Journal Entry</h3>
//         <p>
//           {currentPrompt}
//           <button
//             onClick={() => {
//               const prompts = getPromptsForMood(5);
//               const randomPrompt =
//                 prompts[Math.floor(Math.random() * prompts.length)];
//               setCurrentPrompt(randomPrompt);
//               setResponse("");
//             }}
//           >
//             New Prompt
//           </button>
//         </p>

//         <textarea
//           className="placeholder"
//           value={response}
//           onChange={(e) => setResponse(e.target.value)}
//           placeholder="Write your thoughts here..."
//         />

//         <button onClick={handleSaveEntry}>Save Entry</button>
//       </div>

//       {/* History */}
//       <div className="journal-history">
//         <h3>Journal History</h3>

//         {entries.length === 0 ? (
//           <p>No journal entries yet.</p>
//         ) : (
//           <ul>
//             {entries.map((entry, index) => (
//               <li key={index}>
//                 <strong>{entry.date}</strong> at{" "}
//                 <em>{entry.time}</em> — {entry.prompt}
//                 <p>{entry.text}</p>

//                 <button onClick={() => handleDeleteEntry(index)}>Delete</button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Journals;
