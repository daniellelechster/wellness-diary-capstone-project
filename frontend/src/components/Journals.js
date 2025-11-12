import React, { useState, useEffect } from "react";
import "../App.css";

function Journals({ onNewEntry }) {
  // -------------------
  // JOURNAL ENTRY STATE
  // -------------------
  const [entry, setEntry] = useState("");
  const [entries, setEntries] = useState([]);
  const [lastSaved, setLastSaved] = useState(null);

  // -------------------
  // REFLECTION PROMPTS STATE
  // -------------------
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [currentMood, setCurrentMood] = useState(null);
  const [moodLabel, setMoodLabel] = useState("");

  // -------------------
  // DAILY QUOTE STATE
  // -------------------
  const [dailyQuote, setDailyQuote] = useState("");

  // -------------------
  // MOOD PROMPTS
  // -------------------
  const highMoodPrompts = [
    "What made today so wonderful?",
    "What are three things you're grateful for right now?",
    "How can you share this positive energy with others?",
    "What accomplishment are you most proud of today?",
    "Who or what brought joy to your day?",
    "What would you like to celebrate about today?",
    "How can you carry this good feeling into tomorrow?",
    "What's something you're looking forward to?",
    "What moment from today will you treasure?",
    "How did you spread kindness today?",
  ];

  const mediumMoodPrompts = [
    "What's one small thing that went well today?",
    "What challenged you today and how did you handle it?",
    "What's one thing you learned about yourself today?",
    "How did you take care of yourself today?",
    "What would you like to accomplish tomorrow?",
    "What are you grateful for, even on an average day?",
    "What emotion did you feel most today and why?",
    "What boundary did you set or honor today?",
    "How can you make tomorrow a bit brighter?",
    "What moment from today deserves recognition?",
  ];

  const lowMoodPrompts = [
    "What's one kind thing you can do for yourself right now?",
    "What small comfort brought you peace today?",
    "Who or what can you reach out to for support?",
    "What would you tell a friend feeling this way?",
    "What's one tiny thing you accomplished today, no matter how small?",
    "What feelings are you experiencing and why might they be there?",
    "What do you need most right now?",
    "What's one thing that might help you feel a little better tomorrow?",
    "How have you been brave or strong today, even in small ways?",
    "What can you let go of or forgive yourself for today?",
  ];

  // -------------------
  // DAILY QUOTES
  // -------------------
  const dailyQuotes = [
    "You are stronger than you think.",
    "Take it one step at a time.",
    "Even small progress is progress.",
    "Breathe. You’re doing better than you think.",
    "Focus on the step in front of you, not the whole staircase.",
    "You deserve kindness — especially from yourself.",
    "Every day is a fresh start.",
    "Peace begins the moment you choose it.",
    "Let go of what you can’t control.",
    "You are enough, just as you are."
  ];

  // -------------------
  // HELPERS
  // -------------------
  const todayKey = new Date().toISOString().split("T")[0];

  const getMoodLabel = (mood) => {
    if (mood === null) return "";
    if (mood >= 70) return "feeling great";
    if (mood >= 40) return "doing okay";
    return "having a tough time";
  };

  const getMoodColor = (mood) => {
    if (mood === null) return "#f3e8ff";
    if (mood >= 70) return "#dcfce7";
    if (mood >= 40) return "#fef9c3";
    return "#fee2e2";
  };

  const getPromptsForMood = (mood) => {
    if (mood === null) return mediumMoodPrompts;
    if (mood >= 70) return highMoodPrompts;
    if (mood >= 40) return mediumMoodPrompts;
    return lowMoodPrompts;
  };

  // -------------------
  // EFFECTS
  // -------------------
  useEffect(() => {
    // Load saved journal entries
    const savedEntries = JSON.parse(localStorage.getItem("journal-entries")) || [];
    setEntries(savedEntries);

    // Load saved mood and prompt
    const mood = parseInt(localStorage.getItem("currentMood")) || null;
    setCurrentMood(mood);
    setMoodLabel(getMoodLabel(mood));

    const prompts = getPromptsForMood(mood);
    const savedPrompt = localStorage.getItem(`current-prompt-${todayKey}`);
    if (savedPrompt && prompts.includes(savedPrompt)) {
      setCurrentPrompt(savedPrompt);
      const savedResponse = localStorage.getItem(`reflection-${todayKey}-${savedPrompt}`);
      if (savedResponse) setResponse(savedResponse);
    } else {
      const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
      setCurrentPrompt(randomPrompt);
      localStorage.setItem(`current-prompt-${todayKey}`, randomPrompt);
    }

    
        // Load or generate daily quote
    const savedQuote = localStorage.getItem(`daily-quote-${todayKey}`);
    if (savedQuote) {
      setDailyQuote(savedQuote);
    } else {
      const randomQuote = dailyQuotes[Math.floor(Math.random() * dailyQuotes.length)];
      setDailyQuote(randomQuote);
      localStorage.setItem(`daily-quote-${todayKey}`, randomQuote);
    }
  }, );

  // -------------------
  // JOURNAL HANDLERS
  // -------------------
  const handleSaveJournal = () => {
    const newEntry = {
      id: Date.now(),
      content: entry,
      date: new Date().toLocaleString(),
    };
    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem("journal-entries", JSON.stringify(updated));
    setEntry("");
    setLastSaved(new Date());
    alert("✅ Journal entry saved!");
  };

   const handleDeleteEntry = (id) => {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    localStorage.setItem("journal-entries", JSON.stringify(updated));
  };


  // -------------------
  // REFLECTION HANDLERS
  // -------------------
  const handleSaveReflection = () => {
    localStorage.setItem(`reflection-${todayKey}-${currentPrompt}`, response);
    alert("✅ Reflection saved!");
  };

  const handleNewPrompt = () => {
    const prompts = getPromptsForMood(currentMood);
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setCurrentPrompt(randomPrompt);
    localStorage.setItem(`current-prompt-${todayKey}`, randomPrompt);
    const savedResponse = localStorage.getItem(`reflection-${todayKey}-${randomPrompt}`);
    setResponse(savedResponse || "");
  };

  // -------------------
  // RENDER
  // -------------------
  return (
    <div className="journals-page">
      <h1 className="page-title">🪶 Daily Journal & Reflection</h1>

      {/* JOURNAL SECTION */}
      <section className="journal-card">
        <h2>Today's Journal</h2>
        <textarea
          className="journal-textarea"
          placeholder="Write about your thoughts, feelings, or experiences..."
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
        />
        <button className="save-button" onClick={handleSaveJournal}>
          💾 Save Journal
        </button>
        {lastSaved && (
          <p className="last-saved">Last saved: {lastSaved.toLocaleTimeString()}</p>
        )}

        <h3 className="history-title">📜 Journal History</h3>
        {entries.length === 0 ? (
          <p className="empty">No past entries yet.</p>
        ) : (
          <ul className="entry-list">
            {entries.map((e) => (
              <li key={e.id} className="entry-item">
                <span className="entry-date">{e.date}</span>
                <p className="entry-text">{e.content}</p>
                  <button
                  className="delete-button"
                  onClick={() => handleDeleteEntry(e.id)}
                  >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* DAILY QUOTE SECTION */}
      <section className="quote-card">
        <h2>☀️ Daily Quote 🌙</h2>
        <blockquote className="daily-quote">“{dailyQuote}”</blockquote>
      </section>

      {/* REFLECTION SECTION */}
      <section className="reflection-card">
        <div className="reflection-header">
          <div>
            <h2>💡 Reflection Prompt</h2>
            <p>
              {currentMood !== null
                ? `Since you're ${moodLabel} today`
                : "Take a moment to reflect on your day."}
            </p>
          </div>
          <button onClick={handleNewPrompt} className="new-prompt-button">
            🔄 New Prompt
          </button>
        </div>

        <div
          className="prompt-box"
          style={{ backgroundColor: getMoodColor(currentMood) }}
        >
          {currentPrompt}
        </div>

        <textarea
          className="reflection-textarea"
          placeholder="Write your reflection here..."
          value={response}
          onChange={(e) => setResponse(e.target.value)}
        />

        <button className="save-button" onClick={handleSaveReflection}>
          💾 Save Reflection
        </button>
      </section>
    </div>
  );
}

export default Journals;