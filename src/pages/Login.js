import React, {useState} from "react";
import "../css/login.css";
import fflogo from "../img/fflogo.png";
import { useHistory } from "react-router-dom";

export default function Login(props) {
  const [userName, setUserName] = useState(null)
  const [password, setPassword] = useState(null)

  let history = useHistory();

  function exit() {
    history.push("/");
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const url = 'https://127.0.0.1:5000/user/login'
    let data = {
      "username" : userName,
      "password" : password
    }
    const response = await fetch(url, {
      method : 'POST',
      Access : 'cors',
      headers: {
        'Accept' : 'application/json',
        'Content-Type': 'text/plain' 
      },
      body : JSON.stringify(data)
    });
    const test = await response.json()
    if (test.state === 'success') {
      props.setCurrentUser(test)
      return history.push("/")
    } else {
      alert("Wrong username or password")
    }
  }

  return (
    <div className="login">
      <nav className="navbar sm-Navbar">
        <div className="logo-container" href="#">
          <img
            onClick={()=> exit()}
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
            <input type="text" placeholder="Username" onChange={e=>setUserName(e.target.value)}/>
          </div>

          <div className="login-input">
            <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
          </div>

          <div className="login-btn-container row justify-content-end">
            <button onClick={()=> exit()} className="login-btn2 col-md-3 mr-3">
              Exit
            </button>
            <button type="submit" className="login-btn col-md-3">
              Login
            </button>
          </div>

          <div className="login-question">
            Don't have account? <a href="/register">Sign up</a>
          </div>
          <a href="https://127.0.0.1:5000/login/facebook">Login by Facebook</a>
        </form>
      </div>
    </div>
  );
}
