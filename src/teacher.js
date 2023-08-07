import React from "react";
import { useLocation } from "react-router-dom";
import usersData from "./user.json";

class teacher extends React.Component {
  constructor(props) {
    super(props);
    const user = JSON.parse(sessionStorage.getItem("user"));
    this.state = {
      user: user,
    };
  }

  render() {
    return (
      <div>
        <h2>User Information</h2>
        <p>Name: {this.state.user.name}</p>
        <p>Point: {this.state.user.point}</p>
        <p>Subject: {this.state.user.subject}</p>
      </div>
    );
  }
}

export default teacher;