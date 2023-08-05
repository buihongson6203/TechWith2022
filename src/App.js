import logo from "./logo.svg";
import "./App.css";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import React from "react";
import { BrowserRouter as Router, Routes, Route
,Link  } from "react-router-dom";
import Login from "./Login";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Link to="/login">
          <button>Login 123</button>
        </Link>
        <div>
          <Routes>
            <Route path="/login" element={<Login />} />{" "}
            {/* Add a route for the Login component */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
