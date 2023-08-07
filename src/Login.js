import "./Login.css";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import isEmpty from "validator/lib/isEmpty";
import userData from "./user.json";
import "./App.css";
function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState({});
  const [gender, setGender] = useState("");

  const onChangeUser = (event) => {
    const value = event.target.value;
    setUser(value);
  };

  const onChangePass = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const validateAll = () => {
    const msg = {};
    if (isEmpty(user)) {
      msg.user = "Nhập đủ user";
    }
    if (isEmpty(password)) {
      msg.password = "Nhập đủ password";
    }

    setValidation(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };
  const onChangeGender = (event) => {
    const value = event.target.value;
    setGender(value);
  };

  const navigate = useNavigate(); // day la phuong thuc navigate

  const onClickSubmit = () => {
    const isValid = validateAll();
    if (!isValid) return;

    const userIndex = userData.findIndex(
      (userObj) =>
        userObj.username === user &&
        userObj.password === password &&
        userObj.gender === gender
    );


    if (userIndex !== -1) {
      // todo when success
      const selectedUser = userData[userIndex];
      console.log("Selected user:", selectedUser);
      console.log("Selected gender:", gender);
      // localStorage.setItem('user',JSON.stringify(selectedUser))

      const userJSON = JSON.stringify(selectedUser);
      sessionStorage.setItem("user", userJSON);

      
      if (gender === "student") {
        navigate("/student", {
          state: { user: selectedUser, gender: gender },
        });
      } else if (gender === "teacher") {
        navigate("/teacher", {
          state: { user: selectedUser, gender: gender },
        });
      } else {
        alert("Gender is not recognized!");
      }
    } else {
      alert("Sai thông tin tài khoản!");
    }
  };
  return (
    <div>
      <div class="container-register">
        <div class="arrow"></div>
        <div class="login">Login</div>
        <div>
          <div class="input-login">
            <label class="title" for="email">
              Email
            </label>
            <input
              class="input"
              type="text"
              placeholder="Your email or phone"
              id="user"
              name="username"
              autoComplete="autoCompleteUser"
              onChange={onChangeUser}
            />
          </div>
          <div class="input-login">
            <label class="title" for="password">
              Password
            </label>
            <input
              class="input"
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              autoComplete="autoCompletePass"
              onChange={onChangePass}
            />
            <i class="fa-regular fa-eye"></i>
          </div>
          <input
            name="gender"
            type="radio"
            value="student"
            checked={gender === "student"}
            onChange={onChangeGender}
          />
          Nam
          <input
            name="gender"
            type="radio"
            value="teacher"
            checked={gender === "teacher"}
            onChange={onChangeGender}
          />
          Nữ
        </div>
        <div class="forgot-password">Forgot password?</div>
        <a>
          <div class="btn-login-wrapper">
            <button class="btn-login" onClick={onClickSubmit}>
              Login
            </button>
            <p>{validation.password}</p>
          </div>
        </a>
        <div class="reminder">
          Don’t have an account?
          <a>
            <span class="return">Sign Up</span>
          </a>
        </div>
        <div class="sign-in">
          <div class="thanh-ngang"></div>
          <div class="instruct"> sign in with</div>
          <div class="thanh-ngang"></div>
        </div>
      </div>
    </div>
  );
}
export default Login;