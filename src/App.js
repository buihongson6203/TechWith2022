
import Header from "./header/Header";
import Footer from "./footer/Footer";
import React from "react";
import { BrowserRouter as Router, Routes, Route
,Link  } from "react-router-dom";
// import { BrowserRouter , Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import Student from "./student"; // Corrected the import name for the Student component
import Teacher from "./teacher"; // Corrected the import name for the Teacher component

function App() {
    return (
      <Router>
        <div className="App">
          <Header />
          
          <div>
          <Routes>
            <Route path="/" element={<Login />} />{" "}
            {/* Add a route for the Login component */}
            <Route exact path="/student" element={<Student />} />{" "}
            {/* Corrected the component name */}
            <Route exact path="/teacher" element={<Teacher />} />{" "}
            {/* Corrected the component name */}
          </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
  
  export default App;
