import React, { useState } from 'react'
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

import About from "./components/About"
import Contact from "./components/Contact"
import Home from "./components/Home"
import Header from "./components/Header";
import Footer from "./components/Footer";
import Calendar from "./components/Calendar"
import Goals from "./components/Goals";
import Mood from "./components/Mood";
import Wellness from "./components/Wellness";
import Journals from "./components/Journals";
import WeatherDisplay from "./components/WeatherDisplay";
import Charts from "./components/Charts";

function App() {

  const [entries, setEntries] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

const saveMood = (date, moodValue) => {
  setEntries(prev => ({
    ...prev,
    [date]: {
      ...(prev[date] || {}),
      date: date,
      mood: moodValue
    }
  }));
};

  return (
    <Router> 
      <div className="app-container"> 
        <Header /> 
      <main className="main-content">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/journals" element={<Journals />} />
          <Route path="/mood" element={<Mood 
                  onSubmitMood={saveMood}
                  selectedDate={selectedDate} />
                  } />

          <Route path="/wellness" element={<Wellness />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/calendar" element={<Calendar 
                  entries={entries}
                  selectedDate={selectedDate}
                  onDateSelect={setSelectedDate}/>
                  } />

          <Route path="/weatherDisplay" element={<WeatherDisplay />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/charts" element={<Charts 
                  entries={entries} />} 
                  />
        </Routes>

      </main>

      <Footer />
      </div>
    </Router>
  );
}
export default App;
