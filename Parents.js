import React, { Component, useEffect, useState } from "react";
import axios from "axios";

function Parents() {
  const [user, setUser] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");
  
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Ngăn trang tải lại
    setMessage(`Contact successfully: ${inputValue}`);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/user.json")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
       <div className="d-block d-sm-flex justify-content-between align-items-center">
        <div>
          {user.length > 0 && (
            <div className="title">
              <p className="navbar-brand text-weight-bold">Hello: <span className="h3">{user[0].name}</span></p>
              <p className="navbar-brand text-weight-bold">Parent of: <span className="h3">{user[1].name}</span></p>
              <p className="navbar-brand text-weight-bold">Student of: <span className="h3">{user[2].name}</span></p>
            </div>
          
          )}
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-6 my-4">
          <div className="d-flex justify-content-center d-md-block mb-3">
            <h2>View mark</h2>
          </div>
            <table className="table">
              <thead>
                <tr className="table-warning">
                  <th>Subject</th>
                  <th>Mark</th>
                </tr>
              </thead>
              <tbody>
                {user.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.mark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>
      
      <div className="container my-5">
        <div className="row">
          <div className="d-none d-md-block col-md-6 my-4">
            <div className="contact_img-box">
                <img src="images/students.jpg" alt="" />
            </div>
          </div>
          <div className="col-md-6 my-4">
            <div className="d-flex justify-content-center d-md-block mb-3">
              {user.length > 0 && (
                <h2>Feedback to teacher {user[1].name}:</h2>
              )}
            </div>
            {/* <div>
              <span className="text-danger">{errors}</span>
              <span className="text-success">{successFB}</span>
            </div> */}
            <form onSubmit={handleSubmit} className="form-group">
            <div className="contact_form-container">
              <div>
                <div>
                  <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Enter your message"/>
                </div>
                <div className="mt-5">
                  <button className="btn btn-warning" type="submit">Submit</button>
                </div>
                </div>
              </div>
            </form>
          </div>
        </div>

          {message && <p>{message}</p>}

        
      </div>
    </div>
  );
}

export default Parents;
