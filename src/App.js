import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/signup/Signup";
import Home from "./components/home/home";
import Login from "./components/login/login";
import Hero from "./components/hero/Hero";
import Movie from "./components/movie/Movie";
import Favorites from "./components/favorites/Favorites";
import Show from "./components/show/Show";
import Trailer from "./components/trailer/trailer";
// import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/favorites" element={<Favorites />} />
        <Route exact path="/movie/:id" element={<Movie />} />
        <Route exact path="/show/:id" element={<Show />} />
        <Route exact path="/trailer" element={<Trailer />} />
        <Route exact path="/" element={<Hero />} />
      </Routes>
    </Router>
  );
}

export default App;
