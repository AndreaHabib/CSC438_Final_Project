import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Signup from './components/signup/signup';
import Home from './components/home/home';
import Login from './components/login/login';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/signup" element={<Signup/>} />
        <Route exact path="/home" element={<Home/>} />
        <Route exact path="/" element={<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;
