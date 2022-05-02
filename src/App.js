import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from './components/signup/signup';
import Home from './components/home/home';
import Login from './components/login/login';
import List from './components/list/list';
// import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<Login/>} />
        <Route exact path="/signup" element={<Signup/>} />
        <Route exact path="/home" element={<Home/>} />
        <Route exact path="/list" element={<List/>} />
      </Routes>
    </Router>
  );
}

export default App;
