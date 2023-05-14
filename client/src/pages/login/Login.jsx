import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { useRef, useContext } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { axiosBaseURL } from "../../utils/axiosBaseUrl";

function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching, error } = useContext(Context);

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch({
      type: "LOGIN_START",
    });

    try {
      const res = await axiosBaseURL.post("auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });

      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <span className="loginTitle"> Login </span>
      {error && (
        <span style={{ color: "red", marginTop: "10px", fontWeight: "700" }}>
          Invalid Username / Password!
        </span>
      )}
      <form className="loginForm" onSubmit={handleSubmit}>
        <label> Username </label>
        <input
          className="loginInput"
          type="text"
          placeholder="Enter Your Username..."
          ref={userRef}
        />
        <label> Password </label>
        <input
          className="loginInput"
          type="password"
          placeholder="Enter Your Password..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
}

export default Login;
