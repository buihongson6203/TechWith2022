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
      <div className="view">
        {user.length > 0 && (
          <div className="title">
            <h1>Hello: {user[0].name}</h1>
            <h1>Parent of: {user[1].name}</h1>
            <h1>Teacher: {user[2].name}</h1>
          </div>
        )}

        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter your message"
            />
            <button type="submit">Submit</button>
          </form>
        </div>

        {message && <p>{message}</p>}

        <div className="view_table">
          <table border="1">
            <thead>
              <tr>
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
    </div>
  );
}

export default Parents;
