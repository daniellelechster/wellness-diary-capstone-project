import React from 'react'
import './App.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Calendar from "./components/Calendar"
import Goals from "./components/Goals";
import Mood from "./components/Mood";
import Wellness from "./components/Wellness";
import Journals from "./components/Journals";
import WeatherDisplay from "./components/WeatherDisplay";
import Contact from "./components/Contact";


function App() {

  return (
    <Router> 
      <div className="app-container"> 
        <Header /> 
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weatherDisplay" element={<WeatherDisplay />} />
          <Route path="/journals" element={<Journals />} />
          <Route path="/mood" element={<Mood />} />
          <Route path="/wellness" element={<Wellness />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/header" element={<Header />} />
          <Route path="/footer" element={<Footer />} />
        </Routes>
      </main>

      <Footer />
      </div>
    </Router>
  );
}
export default App;
