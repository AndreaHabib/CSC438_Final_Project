import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Signup from './components/signup/signup';
import Login from './components/login/login';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route exact path="/" exact component={Login} /> */}
      </Routes>
    </Router>
  );
}

export default App;
