import React, { useState, useEffect, useCallback } from "react";
import "../App.css";
import DailyQuote from "./DailyQuote";
import serenity from "./images/serenity.jpg";

function Journals() {
  const [entries, setEntries] = useState([]);
  const [, setCurrentMood] = useState(null);
  const [moodLabel, setMoodLabel] = useState("");
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [dailyQuote, setDailyQuote] = useState("");
  const [dailyQuotes, setDailyQuotes] = useState([]);
  

  const todayKey = new Date().toISOString().split("T")[0];

  /* -------------------------
    Load Quotes (Mock API)
  --------------------------*/
  

  /* -------------------------
     Prompts Based on Mood
  --------------------------*/
  const getPromptsForMood = useCallback((mood) => {
    if (mood >= 8)
      return [
        "What made you feel grateful today?",
        "What's something that brought you joy?",
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

    if (mood >= 5)
      return [
        "What went well today?",
        "What's something you'd like to improve tomorrow?",
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

    return [
      "What’s been challenging today?",
      "What can you do to be kind to yourself?",
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
  }, []);

  /* -------------------------
     Load Saved Data
  --------------------------*/
  const getMoodLabel = (mood) =>
    [
      "Very Low 😒",
      "Down 😢",
      "Frustrated 😣",
      "Meh 😕",
      "In the Middle 😐",
      "Okay 😏",
      "Content 😊",
      "Very Good 😄",
      "Amazing 😍",
    ][mood - 1] || "Not tracked";

  useEffect(() => {
    const savedEntries =
      JSON.parse(localStorage.getItem("journal-entries")) || [];
    setEntries(savedEntries);

    const mood = parseInt(localStorage.getItem("currentMood")) || 5;
    setCurrentMood(mood);
    setMoodLabel(getMoodLabel(mood));

    const prompts = getPromptsForMood(mood);
    const savedPrompt = localStorage.getItem(`current-prompt-${todayKey}`);

    if (savedPrompt && prompts.includes(savedPrompt)) {
      setCurrentPrompt(savedPrompt);
      const savedResponse = localStorage.getItem(
        `reflection-${todayKey}-${savedPrompt}`
      );
      if (savedResponse) setResponse(savedResponse);
    } else {
      const randomPrompt =
        prompts[Math.floor(Math.random() * prompts.length)];
      setCurrentPrompt(randomPrompt);
      localStorage.setItem(`current-prompt-${todayKey}`, randomPrompt);
    }

    const savedQuote = localStorage.getItem(`daily-quote-${todayKey}`);
    if (savedQuote) {
      setDailyQuote(savedQuote);
    } else if (dailyQuotes.length > 0) {
      const randomQuote =
        dailyQuotes[Math.floor(Math.random() * dailyQuotes.length)];
      setDailyQuote(randomQuote);
      localStorage.setItem(`daily-quote-${todayKey}`, randomQuote);
    }
  }, [dailyQuotes, getPromptsForMood, todayKey]);

  /* -------------------------
     Save Entry (With Timestamp)
  --------------------------*/
  const handleSaveEntry = () => {
    if (!response.trim()) return;

    const now = new Date();
    const time = now.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });

    const newEntry = {
      date: todayKey,
      time,
      prompt: currentPrompt,
      text: response,
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem("journal-entries", JSON.stringify(updatedEntries));
    setResponse("");
  };

  /* -------------------------
    Delete Entry
  --------------------------*/
  const handleDeleteEntry = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
    localStorage.setItem("journal-entries", JSON.stringify(updatedEntries));
  };

  /* -------------------------
    UI
  --------------------------*/
  return (
    <div
      className="journals-container"
      style={{ backgroundImage: `url(${serenity})` }}
    >
      <h1>Today's Journal</h1>
      <h2>Mood: {moodLabel}</h2>

<div className="daily-quote">
  <DailyQuote />
</div>


      {/* Journal Entry */}
      <div className="journal-entry">
        <h3>Journal Entry</h3>
        <p>
          {currentPrompt}
          <button
            onClick={() => {
              const prompts = getPromptsForMood(5);
              const randomPrompt =
                prompts[Math.floor(Math.random() * prompts.length)];
              setCurrentPrompt(randomPrompt);
              setResponse("");
            }}
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

        {entries.length === 0 ? (
          <p>No journal entries yet.</p>
        ) : (
          <ul>
            {entries.map((entry, index) => (
              <li key={index}>
                <strong>{entry.date}</strong> at{" "}
                <em>{entry.time}</em> — {entry.prompt}
                <p>{entry.text}</p>

                <button onClick={() => handleDeleteEntry(index)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Journals;
