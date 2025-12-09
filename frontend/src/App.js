import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Calendar from "./components/Calendar";
import Goals from "./components/Goals";
import Mood from "./components/Mood";
import Wellness from "./components/Wellness";
import Journals from "./components/Journals";
import WeatherDisplay from "./components/WeatherDisplay";
import musicFile from "./components/audio/music.mp3";
import Articles from "./components/Articles";

function App() {
  // 🎵 Audio state
  const audioRef = useRef(null);
  const [musicOn, setMusicOn] = useState(true);

  // 🎚 Mood entries state (Step 1)
  const [entries, setEntries] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  // 🎯 Goals state
  const [goals, setGoals] = useState([]);

  // Journal entries state
  const [journals, setJournals] = useState([]);

  // Meditation state
  const [meditation, setMeditation] = useState(null);

  // --- NEW: Exercise state ---
  const [exercise, setExercise] = useState(null);

  // --- NEW: Water state ---
  const [hydration, setHydration] = useState(null);

  // --- NEW: Meals state ---
  const [meals, setMeals] = useState(null);

  // Fetch goals once on load ---
  useEffect(() => {
    fetch("http://localhost:8080/api/wellness/goal/all")
      .then((res) => res.json())
      .then((data) => setGoals(data))
      .catch((err) => console.error("Error fetching goals:", err));
  }, []);

  // --- Fetch moods once on load ---
  useEffect(() => {
    fetch("http://localhost:8080/api/wellness/mood/all")
      .then((res) => res.json())
      .then((data) => {
        const mapped = {};
        data.forEach((m) => {
          const dateStr = m.date.split("T")[0]; // YYYY-MM-DD
          mapped[dateStr] = {
            date: dateStr,
            mood: m.rating,
          };
        });
        setEntries(mapped);
      })
      .catch((err) => console.error("Error fetching moods:", err));
  }, []);

  // --- Fetch today's meditation once on load ---
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    fetch(`http://localhost:8080/api/wellness/meditation/date/${today}`)
      .then((res) => res.json())
      .then((data) => setMeditation(data))
      .catch((err) => console.error("Error fetching meditation:", err));
  }, []);

  // --- NEW: Fetch today's exercise once on load ---
  useEffect(() => {
    const todayDate = new Date();
        const today =
          todayDate.getFullYear() +
          "-" +
          String(todayDate.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(todayDate.getDate()).padStart(2, "0");
          
    fetch(`http://localhost:8080/api/wellness/exercise/date/${today}`)
      .then((res) => res.json())
      .then((data) => setExercise(data))
      .catch((err) => console.error("Error fetching exercise:", err));
  }, []);

  // Fetch journals
  useEffect(() => {
    fetch("http://localhost:8080/api/wellness/journal/all")
      .then((res) => res.json())
      .then((data) => {
        const mapped = data
          .map((j) => {
            const created = j.createdAt ? new Date(j.createdAt) : new Date();
            return {
              id: j.id,
              prompt: j.prompt,
              text: j.text,
              createdAt: j.createdAt,
              date: created.toISOString().split("T")[0],
              time: created.toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
              }),
            };
          })
          .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
        setJournals(mapped);
      })
      .catch((err) => console.error("Error fetching journals:", err));
  }, []);

  // --- NEW: Fetch water
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    fetch(`http://localhost:8080/api/wellness/water/date/${today}`)
      .then((res) => res.json())
      .then((data) => setHydration(data))
      .catch((err) => console.error("Error fetching hydration:", err));
  }, []);

  // --- NEW: Fetch meals
  useEffect(() => {
    fetch("http://localhost:8080/api/wellness/meals/all")
      .then((res) => res.json())
      .then((data) => {
        setMeals(data[data.length - 1]);
      })
      .catch((err) => console.error("Error fetching meals:", err));
  }, []);

  // --- Audio effect ---
  useEffect(() => {
    const audio = audioRef.current;
    if (musicOn) {
      const playMusic = async () => {
        try {
          await audio.play();
        } catch (err) {
          console.log("Autoplay blocked — waiting for user interaction.");
          const resumePlayback = () => {
            audio.play();
            window.removeEventListener("click", resumePlayback);
          };
          window.addEventListener("click", resumePlayback);
        }
      };
      playMusic();
    } else {
      audio.pause();
    }
  }, [musicOn]);

  const toggleMusic = () => setMusicOn((prev) => !prev);

  return (
    <Router>
      <div className="app-container">
        <Header musicOn={musicOn} toggleMusic={toggleMusic} />

        {/* 🎵 Background Music */}
        <audio
          ref={audioRef}
          src={musicFile}
          loop
          preload="auto"
          style={{ display: "none" }}
        />

        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  entries={entries}
                  goals={goals}
                  journals={journals}
                  meditation={meditation}
                  exercise={exercise}
                  hydration={hydration}
                  meals={meals}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/journals"
              element={
                <Journals
                  journals={journals}
                  setJournals={setJournals}
                  entries={entries}
                />
              }
            />
            <Route
              path="/wellness"
              element={
                <Wellness
                  meditation={meditation}
                  setMeditation={setMeditation}
                  exercise={exercise}
                  setExercise={setExercise}
                  hydration={hydration}
                  setHydration={setHydration}
                  meals={meals}
                  setMeals={setMeals}
                />
              }
            />
            <Route
              path="/goals"
              element={<Goals goals={goals} setGoals={setGoals} />}
            />
            <Route
              path="/calendar"
              element={
                <Calendar
                  entries={entries}
                  selectedDate={selectedDate}
                  onDateSelect={setSelectedDate}
                />
              }
            />
            <Route path="/weatherDisplay" element={<WeatherDisplay />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/mood"
              element={<Mood entries={entries} setEntries={setEntries} />}
            />
            <Route path="/articles" element={<Articles />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
