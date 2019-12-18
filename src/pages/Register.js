import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import {Alert} from 'react-bootstrap'
import "../css/login.css";
import fflogo from "../img/fflogo.png";

export default function Register() {
  let history = useHistory();
  const [email, setEmail] = useState(null)
  const [userName, setUserName] = useState(null)
  const [password, setPassword] = useState(null)
  const [showAlert, setShowAlert] = useState(false)

  function exit() {
    history.push("/");
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    const url = 'https://fresh-farm.herokuapp.com/user/register'

    let data = {
      email,
      password,
      "username" : userName,
    }
    const response = await fetch(url, {
      method : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body : JSON.stringify(data)
    });
    if (response.ok) {
      setShowAlert(true)
      history.push("/login")
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
      {showAlert ? <Alert onClose={() => setShowAlert(false)} variant={'success'} dismissible>Added to cart</Alert> : <></>}

      <div className="login-panel">
        <form onSubmit={handleRegister} className="login-form col-md-4 col-12">
          <h1>Sign Up</h1>
          <div className="login-input">
            <input type="text" placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
          </div>

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
              Sign Up
            </button>
          </div>

          <div className="login-question">
            <a href="https://fresh-farm.herokuapp.com/login/facebook">Login by Facebook</a>
          </div>
        </form>
      </div>
    </div>
  );
}
