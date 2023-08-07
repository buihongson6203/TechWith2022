import logo from "./logo.svg";
import "./App.css";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Login";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Link to="/login">
          <button>Login 123</button>
          <div></div>
        </Link>
        <div>
          <div className="welcome">Welcome to Debug Portal</div>
          <input className="input" type="text" placeholder="name student..." />
          {/* <form className="radio">
            <input name="gender" type="radio" value="Nam" />
            I am Student
            <input name="gender" type="radio" value="Nữ" />
            I am Teacher
            <input name="gender" type="radio" value="Khác" />
            I am Parent/Guardian
          </form> */}
          <div class="d-flex justify-content-center">
            <div class="form-check">
              <input
                class="form-check-input lp-input-radio ng-pristine ng-untouched ng-valid ng-empty"
                type="radio"
                ng-model="type"
                ng-value="1"
                name="3"
                value="1"
              />
              <label class="form-check-label">I am Student</label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input lp-input-radio ng-pristine ng-untouched ng-valid ng-empty"
                type="radio"
                ng-model="type"
                ng-value="1"
                name="3"
                value="1"
              />
              <label class="form-check-label">I am Teacher</label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input lp-input-radio ng-pristine ng-untouched ng-valid ng-empty"
                type="radio"
                ng-model="type"
                ng-value="1"
                name="3"
                value="1"
              />
              <label class="form-check-label">I am Parent/Guardian</label>
            </div>
          </div>
          <button className="btn">Access</button>
        </div>
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
