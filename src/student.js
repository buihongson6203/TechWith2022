



import React from "react";
import { useLocation } from "react-router-dom";
import usersData from "./user.json";
import "./teacher.css";

class student extends React.Component {
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
      <table border="0">
        <caption>
          <h1>Danh sách </h1>
        </caption>
        <tr>
          <th>Name  </th>
          <th>Point</th>
          <th>Subject </th>
        </tr>
        <tr>
          <th>  {this.state.user.name}</th>
          <th> {this.state.user.point}</th>
          <th> {this.state.user.subject}</th>
        </tr>
      </table>
     
    </div>
    );
  }
}

export default student;