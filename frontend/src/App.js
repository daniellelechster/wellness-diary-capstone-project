
import React from 'react'
import './App.css';
import {BrowserRouter as Router, Link, Routes, Route} from "react-router-dom"
import About from "./components/About"
import Contact from "./components/Contact"
import Home from "./components/Home"
import Header from "./components/Header";
import Footer from "./components/Footer";
// import MoodCalendar from "./components/MoodCalendar"
import Goals from "./components/Goals";
import Mood from "./components/Mood";
import Wellness from "./components/Wellness";
import Journals from "./components/Journals";
import WeatherDisplay from "./components/WeatherDisplay";


function App() {

  return (
    <Router> 
      <div className="app-container"> 
        <Header /> 
      <main className="main-content">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/journals">Journals</Link></li>
          <li><Link to="/mood">Mood</Link></li>
          <li><Link to="/wellness">Wellness</Link></li>
          <li><Link to="/goals">Goals</Link></li>
          {/* <li><Link to="/moodCalendar">Mood Calendar</Link></li> */}
          <li><Link to="/contact">Contact</Link></li>

        </ul>
        <Routes>
          <Route path="/header" element={<Header />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/journals" element={<Journals />} />
          <Route path="/mood" element={<Mood />} />
          <Route path="/wellness" element={<Wellness />} />
          <Route path="/goals" element={<Goals />} />
          {/* <Route path="/moodCalendar" element={<MoodCalendar />} /> */}
          <Route path="/weatherDisplay" element={<WeatherDisplay />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/footer" element={<Footer />} />
        </Routes>
      </main>

      <Footer />
      </div>
    </Router>
  );
}
export default App;
