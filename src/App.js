import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/signup/Signup";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Hero from "./components/hero/Hero";
// import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/" element={<Hero />} />
      </Routes>
    </Router>
  );
}

export default App;
