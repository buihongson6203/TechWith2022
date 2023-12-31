import logo from "./logo.svg";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./header/Header";
import Footer from "./footer/Footer";
import React from "react";
import {
  BrowserRouter as Router, Routes, Route
  , Link
} from "react-router-dom";
import Login from "./Login";
import Teacher from "./teacher/teacher";
import Parents from "./Parents";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Link to="/login">
          <button>Login</button>
        </Link>
        <div>
          <Routes>
            <Route path="/login" element={<Login />} />{" "}
            {/* Add a route for the Login component */}
          </Routes>
          <Link to="/teacher/teacher">
            <button>Teacher</button>
          </Link>
          <Routes>
            <Route path="/teacher/teacher" element={<Teacher />} />{" "}
          </Routes>
          <Link to="/Parents">
            <button>parent</button>
          </Link>


          <Routes>
            <Route path="/Parents" element={<Parents/>} />{" "}
            {/* Add a route for the Login component */}
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
