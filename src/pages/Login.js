import React, { useState } from "react";
import "../css/login.css";
import fflogo from "../img/fflogo.png";
import { useHistory, Link } from "react-router-dom";

export default function Login(props) {
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);

  let history = useHistory();

  function exit() {
    history.push("/");
  }

  const handleLogin = async e => {
    e.preventDefault();
    const url = "https://fresh-farm.herokuapp.com/user/login";
    let data = {
      username: userName,
      password: password
    };
    const response = await fetch(url, {
      method: "POST",
      Access: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "text/plain"
      },
      body: JSON.stringify(data)
    });
    const test = await response.json();
    if (test.state === "success") {
      props.setCurrentUser(test.currentUser);
      sessionStorage.setItem("token", test.token);
      return history.push("/");
    } else {
      alert("Wrong username or password");
    }
  };

  return (
    <div className="login">
      <nav className="navbar sm-Navbar">
        <div className="logo-container" href="#">
          <img
            onClick={() => exit()}
            src={fflogo}
            className="d-inline-block align-mid fflogo"
            alt=""
          />
        </div>
      </nav>

      <div className="login-panel">
        <form onSubmit={handleLogin} className="login-form col-md-4 col-12">
          <h1>Login</h1>
          <div className="login-input">
            <input
              type="text"
              placeholder="Username"
              onChange={e => setUserName(e.target.value)}
            />
          </div>

          <div className="login-input">
            <input
              type="password"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className="login-btn-container row justify-content-end">
            <button onClick={() => exit()} className="login-btn2 col-md-3 mr-3">
              Exit
            </button>
            <button type="submit" className="login-btn col-md-3">
              Login
            </button>
          </div>

          <div className="login-question">
            Don't have account? &nbsp;<Link className="sign-up-link" to="/register">Sign up</Link>
          </div>
          <div className="login-question mt-4">
            <a className="login-by-facebook" href="https://fresh-farm.herokuapp.com/login/facebook">
              Login by Facebook
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
