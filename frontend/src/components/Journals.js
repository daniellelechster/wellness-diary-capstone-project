import React, { useState, useEffect, useCallback, useRef } from "react";
import "../App.css";
import serenity from "./images/serenity.jpg";

/* -----------------------
   Reusable audio hook
   ----------------------- */
function useZenAudioPlayer(tracks = []) {
  const audioRef = useRef(null);
  const fadeRef = useRef(null);
  const progressIntervalRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [shuffledOrder, setShuffledOrder] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const makeShuffledOrder = useCallback((len) => {
    const arr = Array.from({ length: len }, (_, i) => i);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, []);

  const ensureAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = false;
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const clearFade = useCallback(() => {
    if (fadeRef.current) {
      clearInterval(fadeRef.current);
      fadeRef.current = null;
    }
  }, []);

  const fadeOut = useCallback(
    (target = 0, step = 0.05, intervalMs = 100) =>
      new Promise((resolve) => {
        const audio = audioRef.current;
        if (!audio) return resolve();
        clearFade();
        fadeRef.current = setInterval(() => {
          audio.volume = Math.max(target, audio.volume - step);
          if (audio.volume <= target + 0.0001) {
            clearFade();
            resolve();
          }
        }, intervalMs);
      }),
    [clearFade]
  );

  const fadeIn = useCallback(
    (target = volume, step = 0.03, intervalMs = 150) => {
      const audio = audioRef.current;
      if (!audio) return;
      clearFade();
      audio.volume = 0;
      fadeRef.current = setInterval(() => {
        audio.volume = Math.min(target, audio.volume + step);
        if (audio.volume >= target - 0.0001) {
          clearFade();
        }
      }, intervalMs);
    },
    [volume, clearFade]
  );

  const loadTrack = useCallback(
    async (index, autoplay = true) => {
      if (!tracks || tracks.length === 0) return;
      ensureAudio();
      const audio = audioRef.current;
      const trackUrl = tracks[index];
      if (!trackUrl) return;

      if (!audio.paused && audio.src && !audio.src.includes(trackUrl)) {
        await fadeOut(0);
        audio.pause();
      }

      audio.src = trackUrl.startsWith("http")
        ? trackUrl
        : `http://localhost:8080${trackUrl}`;

      audio.load();

      if (autoplay) {
        audio
          .play()
          .then(() => {
            fadeIn(volume);
            setIsPlaying(true);
          })
          .catch((e) => {
            console.log("Playback blocked:", e);
          });
      }
    },
    [tracks, ensureAudio, fadeOut, fadeIn, volume]
  );

  const play = useCallback(async () => {
    ensureAudio();
    try {
      await audioRef.current.play();
      fadeIn(volume);
      setIsPlaying(true);
    } catch (e) {
      console.log("Play blocked:", e);
    }
  }, [ensureAudio, fadeIn, volume]);

  const pause = useCallback(async () => {
    if (!audioRef.current) return;
    await fadeOut(0);
    audioRef.current.pause();
    audioRef.current.volume = volume;
    setIsPlaying(false);
  }, [fadeOut, volume]);

  const next = useCallback(() => {
    if (!tracks.length) return;
    if (shuffle && shuffledOrder.length) {
      const pos = shuffledOrder.indexOf(currentIndex);
      const nextPos = (pos + 1) % shuffledOrder.length;
      setCurrentIndex(shuffledOrder[nextPos]);
    } else {
      setCurrentIndex((i) => (i + 1) % tracks.length);
    }
  }, [tracks.length, shuffle, shuffledOrder, currentIndex]);

  const prev = useCallback(() => {
    if (!tracks.length) return;
    if (shuffle && shuffledOrder.length) {
      const pos = shuffledOrder.indexOf(currentIndex);
      const prevPos = (pos - 1 + shuffledOrder.length) % shuffledOrder.length;
      setCurrentIndex(shuffledOrder[prevPos]);
    } else {
      setCurrentIndex((i) => (i - 1 + tracks.length) % tracks.length);
    }
  }, [tracks.length, shuffle, shuffledOrder, currentIndex]);

  const updateVolume = useCallback((v) => {
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  }, []);

  const seekTo = useCallback((s) => {
    ensureAudio();
    if (audioRef.current && !isNaN(audioRef.current.duration)) {
      audioRef.current.currentTime = s;
      setProgress(s);
    }
  }, [ensureAudio]);

  // when tracks change, reset shuffledOrder/currentIndex
  useEffect(() => {
    if (tracks && tracks.length > 0) {
      setShuffledOrder((prev) =>
        prev.length !== tracks.length ? tracks.map((_, i) => i) : prev
      );
      setCurrentIndex(0);
    } else {
      setShuffledOrder([]);
      setCurrentIndex(0);
    }
  }, [tracks]);

  useEffect(() => {
    if (tracks.length > 0) loadTrack(currentIndex, true);
    // Intentionally not including loadTrack in deps to avoid replay loops
  }, [currentIndex, loadTrack, tracks.length]);

  // merged listeners
  useEffect(() => {
    ensureAudio();
    const audio = audioRef.current;
    if (!audio) return;

    const onUpdate = () => {
      setProgress(audio.currentTime || 0);
      setDuration(audio.duration || 0);
    };
    const onEnded = () => next();

    audio.addEventListener("timeupdate", onUpdate);
    audio.addEventListener("loadedmetadata", onUpdate);
    audio.addEventListener("ended", onEnded);

    progressIntervalRef.current = setInterval(() => {
      if (audio && !isNaN(audio.currentTime)) setProgress(audio.currentTime);
    }, 500);

    return () => {
      audio.removeEventListener("timeupdate", onUpdate);
      audio.removeEventListener("loadedmetadata", onUpdate);
      audio.removeEventListener("ended", onEnded);
      clearInterval(progressIntervalRef.current);
    };
  }, [next, ensureAudio]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
      clearInterval(fadeRef.current);
      clearInterval(progressIntervalRef.current);
    };
  }, []);

  return {
    audioRef,
    currentIndex,
    isPlaying,
    shuffle,
    volume,
    progress,
    duration,
    shuffledOrder,
    setShuffle,
    setCurrentIndex,
    setShuffledOrder,
    play,
    pause,
    next,
    prev,
    updateVolume,
    seekTo,
  };
}

/* -----------------------
   NowPlayingBar component
   small animated indicator
   ----------------------- */
function NowPlayingBar({ isPlaying, trackName }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
      <div
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: "#5ac8fa",
          opacity: isPlaying ? 1 : 0.35,
          transform: isPlaying ? "scale(1.25)" : "scale(1)",
          transition: "transform 0.4s ease, opacity 0.4s ease",
        }}
      />
      <div style={{ fontSize: 13, opacity: 0.9 }}>{trackName || "No track"}</div>
    </div>
  );
}

/* =========================
   Journals component (main)
   - Your original journaling logic preserved below
   - Audio functionality uses the hook above
   ========================= */
export default function Journals() {
  // journaling state (kept exactly as you had)
  const [entries, setEntries] = useState([]);
  const [, setCurrentMood] = useState(null);
  const [moodLabel, setMoodLabel] = useState("");
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [dailyQuote, setDailyQuote] = useState("");
  const [dailyQuotes, setDailyQuotes] = useState([]);

  const todayKey = new Date().toISOString().split("T")[0];

  // load quotes (original)
  useEffect(() => {
    async function fetchQuotes() {
      const mockQuotes = [
        "Take a deep breath. You are doing great.",
        "Progress, not perfection.",
        "Be kind to yourself today.",
        "Even the smallest step forward is progress.",
        "You are enough, exactly as you are.",
        "You are stronger than you think.",
        "Take it one step at a time.",
        "Even small progress is progress.",
        "Breathe. You're doing better than you think.",
        "Focus on the step in front of you, not the whole staircase.",
        "You deserve kindness — especially from yourself.",
        "Every day is a fresh start.",
        "Peace begins the moment you choose it.",
        "Let go of what you can't control.",
      ];
      await new Promise((res) => setTimeout(res, 300));
      setDailyQuotes(mockQuotes);
    }
    fetchQuotes();
  }, []);

  // fetch tracks from backend (Option A)
  const [fetchedTracks, setFetchedTracks] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/api/journal/audio")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.tracks) && data.tracks.length > 0) {
          setFetchedTracks(data.tracks);
        } else if (data.audioUrl) {
          setFetchedTracks([data.audioUrl]);
        }
      })
      .catch((err) => console.error("Failed to load audio metadata:", err));
  }, []);

  // use the centralized audio hook
  const {
    // eslint-disable-next-line no-unused-vars
    audioRef,
    currentIndex,
    isPlaying,
    shuffle,
    volume,
    progress,
    duration,
    setShuffle,
    setCurrentIndex,
    setShuffledOrder,
    play,
    pause,
    next,
    prev,
    updateVolume,
    seekTo,
  } = useZenAudioPlayer(fetchedTracks);

  // sync fetched tracks -> hook's shuffled order & reset index
  useEffect(() => {
    if (fetchedTracks.length > 0) {
      setShuffledOrder(fetchedTracks.map((_, i) => i));
      setCurrentIndex(0);
    }
  }, [fetchedTracks, setShuffledOrder, setCurrentIndex]);

  // ---------- ORIGINAL journaling logic (unchanged) ----------
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
      "What's one tiny thing you accomplished today?",
      "What feelings are you experiencing and why?",
      "What do you need most right now?",
      "What's one thing that might help you feel better tomorrow?",
      "How have you been brave today, even in small ways?",
      "What can you let go of or forgive yourself for?",
    ];
  }, []);

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
      const random = prompts[Math.floor(Math.random() * prompts.length)];
      setCurrentPrompt(random);
      localStorage.setItem(`current-prompt-${todayKey}`, random);
    }

    const savedQuote = localStorage.getItem(`daily-quote-${todayKey}`);
    if (savedQuote) {
      setDailyQuote(savedQuote);
    } else if (dailyQuotes.length > 0) {
      const random =
        dailyQuotes[Math.floor(Math.random() * dailyQuotes.length)];
      setDailyQuote(random);
      localStorage.setItem(`daily-quote-${todayKey}`, random);
    }
  }, [dailyQuotes, getPromptsForMood, todayKey]);

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

  const handleSaveEntry = () => {
    if (!response.trim()) return;
    const newEntry = { date: todayKey, prompt: currentPrompt, text: response };
    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem("journal-entries", JSON.stringify(updated));
    setResponse("");
  };

  const handleDeleteEntry = (index) => {
    const updated = entries.filter((_, i) => i !== index);
    setEntries(updated);
    localStorage.setItem("journal-entries", JSON.stringify(updated));
  };

  // audio UI wrappers (keeps naming similar to your original handlers)
  const handleNextTrack = () => next();
  const handlePrevTrack = () => prev();
  const togglePlay = () => (isPlaying ? pause() : play());
  const toggleShuffle = () => setShuffle(!shuffle);
  const handleSeek = (val) => seekTo(val);
  const handleVolumeChange = (v) => updateVolume(v);

  return (
    <div
      className="journals-container"
      style={{ backgroundImage: `url(${serenity})` }}
    >
      {/* Audio Player */}
      {fetchedTracks && fetchedTracks.length > 0 && (
        <div className="audio-player" style={{ marginBottom: "1rem" }}>
          <NowPlayingBar
            isPlaying={isPlaying}
            trackName={
              fetchedTracks[currentIndex]
                ? fetchedTracks[currentIndex].split("/").pop()
                : "No track"
            }
          />

          <div
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <button onClick={handlePrevTrack} aria-label="Previous">
              ⏮
            </button>
            <button onClick={togglePlay} aria-label="Play/Pause">
              {isPlaying ? "⏸ Pause" : "▶️ Play"}
            </button>
            <button onClick={handleNextTrack} aria-label="Next">
              ⏭
            </button>

            <button
              onClick={toggleShuffle}
              aria-pressed={shuffle}
              title="Shuffle"
            >
              {shuffle ? "🔀 On" : "🔀 Off"}
            </button>

            <div style={{ minWidth: 200, fontSize: 12 }}>
              {fetchedTracks[currentIndex]
                ? fetchedTracks[currentIndex].split("/").pop()
                : "No track"}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <label style={{ fontSize: 12 }}>Vol</label>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => handleVolumeChange(Number(e.target.value))}
                style={{ width: 100 }}
              />
            </div>
          </div>

          {/* Progress */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "8px",
            }}
          >
            <span style={{ fontSize: 12 }}>{formatTime(progress)}</span>
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={Math.min(progress, duration || 0)}
              onChange={(e) => handleSeek(Number(e.target.value))}
              style={{ flex: 1 }}
            />
            <span style={{ fontSize: 12 }}>{formatTime(duration)}</span>
          </div>
        </div>
      )}

      <h1>Today's Journal</h1>
      <h2>Mood: {moodLabel}</h2>

      <div className="daily-quote">
        🌞🌙 <strong> Daily Quote:</strong> {dailyQuote}
      </div>

      <div className="journal-entry">
        <h3>Journal Entry:</h3>
        <p>
          {currentPrompt}
          <button
            onClick={() => {
              const prompts = getPromptsForMood(5);
              const random =
                prompts[Math.floor(Math.random() * prompts.length)];
              setCurrentPrompt(random);
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

      <div className="journal-history">
        <h3>Journal History</h3>
        {entries.length === 0 ? (
          <p>No journal entries yet.</p>
        ) : (
          <ul>
            {entries.map((entry, index) => (
              <li key={index}>
                <strong>{entry.date}</strong> - {entry.prompt}
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

/* small helper */
function formatTime(sec) {
  if (!sec || isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}



















// import React, { useState, useEffect, useCallback } from "react";
// import "../App.css";
// import serenity from "./images/serenity.jpg";   // <-- added

// function Journals() {
//   const [entries, setEntries] = useState([]);
//   const [, setCurrentMood] = useState(null);
//   const [moodLabel, setMoodLabel] = useState("");
//   const [currentPrompt, setCurrentPrompt] = useState("");
//   const [response, setResponse] = useState("");
//   const [dailyQuote, setDailyQuote] = useState("");
//   const [dailyQuotes, setDailyQuotes] = useState([]);

//   const todayKey = new Date().toISOString().split("T")[0];

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

//     if (mood <= 4)
//       return [
//         "What’s been challenging today?",
//         "What can you do to be kind to yourself?",
//         "What's one kind thing you can do for yourself right now?",
//         "What small comfort brought you peace today?",
//         "Who or what can you reach out to for support?",
//         "What would you tell a friend feeling this way?",
//         "What's one tiny thing you accomplished today, no matter how small?",
//         "What feelings are you experiencing and why might they be there?",
//         "What do you need most right now?",
//         "What's one thing that might help you feel a little better tomorrow?",
//         "How have you been brave or strong today, even in small ways?",
//         "What can you let go of or forgive yourself for today?",
//       ];
//   }, []);

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

//   const handleSaveEntry = () => {
//     if (!response.trim()) return;
//     const newEntry = { date: todayKey, prompt: currentPrompt, text: response };
//     const updatedEntries = [newEntry, ...entries];
//     setEntries(updatedEntries);
//     localStorage.setItem("journal-entries", JSON.stringify(updatedEntries));
//     setResponse("");
//   };

//   const handleDeleteEntry = (index) => {
//     const updatedEntries = entries.filter((_, i) => i !== index);
//     setEntries(updatedEntries);
//     localStorage.setItem("journal-entries", JSON.stringify(updatedEntries));
//   };

//   return (
//     <div
//       className="journals-container"
//       style={{ backgroundImage: `url(${serenity})` }}   // <-- added
//     >
//       <h1>Today's Journal</h1>
//       <h2>Mood: {moodLabel}</h2>

//       <div className="daily-quote">
//         <span role="img" aria-label="sun and moon">
//           🌞🌙
//         </span>
//         <strong> Daily Quote:</strong> {dailyQuote}
//       </div>

//       <div className="journal-entry">
//         <h3>Journal Entry:</h3>
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

//         <textarea class="placeholder"
//           value={response}
//           onChange={(e) => setResponse(e.target.value)}
//           placeholder="Write your thoughts here..."
//         />
//         <button onClick={handleSaveEntry}>Save Entry</button>
//       </div>

//       <div className="journal-history">
//         <h3>Journal History</h3>
//         {entries.length === 0 ? (
//           <p>No journal entries yet.</p>
//         ) : (
//           <ul>
//             {entries.map((entry, index) => (
//               <li key={index}>
//                 <strong>{entry.date}</strong> - {entry.prompt}
//                 <p>{entry.text}</p>
//                 <button onClick={() => handleDeleteEntry(index)}>
//                   Delete
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