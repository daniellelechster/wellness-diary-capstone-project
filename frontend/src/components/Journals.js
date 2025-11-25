import React, { useState, useEffect, useCallback } from "react";
import "../App.css";
import DailyQuote from "./DailyQuote";
import serenity1 from "./images/serenity1.jpg";

function Journals({ journals, setJournals, entries }) {
  const [moodLabel, setMoodLabel] = useState("");
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [dailyQuote, setDailyQuote] = useState("");
  const [editingEntryId, setEditingEntryId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const today = new Date().toISOString().split("T")[0];
  const todaysMood = entries[today]?.mood;
  
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
     Update mood + prompt when entries change
  --------------------------*/
  useEffect(() => {
    if (todaysMood) {
      setMoodLabel(getMoodLabel(todaysMood));
      const prompts = getPromptsForMood(todaysMood);
      setCurrentPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
    } else {
      setMoodLabel("Not tracked");
    }
  }, [todaysMood, getPromptsForMood]);

  /* -------------------------
     Load journal entries from backend
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

    setDailyQuote("Every day is a fresh start.");
  }, [getPromptsForMood, setJournals]);

  /* -------------------------
     Save Entry (POST)
  --------------------------*/
  const handleSaveEntry = async () => {
    if (!response.trim()) return;

    const payload = { prompt: currentPrompt, text: response };

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

      setJournals((prev) => [frontendEntry, ...prev]);
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
              const prompts = getPromptsForMood(todaysMood || "Not Tracked");
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

