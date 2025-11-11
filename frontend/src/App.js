import {BrowserRouter as Router, Link, Routes, Route} from "react-router-dom"
import About from "./components/About"
import Contact from "./components/Contact"
import Home from "./Home"

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
      <main className="main-content">
        {/* <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul> */}
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      </div>
    </Router>
  );  
}

export default App;
