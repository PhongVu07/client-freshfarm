import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Categories from "./pages/Categories";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Product from "./pages/Product"

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [fruit, setFruit] = useState([{}])
  const [vegetable, setVegetable] = useState([{}])
  const [seasoning, setSeasoning] = useState([{}])

  const existingToken = sessionStorage.getItem("token");
  const accessToken =
    window.location.search.split("=")[0] === "?api_key"
      ? window.location.search.split("=")[1]
      : null;

  useEffect(() => {
    getCurrentUser();
    getCategoryProdcut(1);
    getCategoryProdcut(2);
    getCategoryProdcut(3);
  }, []);

  const getCurrentUser = async () => {
    const token = existingToken || accessToken;
    const url = `https://127.0.0.1:5000/user/get_user`;
    const response = await fetch(url, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      sessionStorage.setItem("token", token);
      setCurrentUser(data);
    } else {
      sessionStorage.clear("token", token);
    }
    // window.history.replaceState({}, document.title, "/");
  };

  const getCategoryProdcut = async id => {
    const url = `https://127.0.0.1:5000/product/category/${id}`
    const resp = await fetch(url)
    const data = await resp.json()
    if (id === 1) {
      setFruit(data)
    } else if (id === 2) {
      setVegetable(data)
    } else {
      setSeasoning(data)
    }
  }

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/category/:categoryId">
            <Categories />
          </Route>
          <Route path="/product/:productId">
            <Product />
          </Route>
          <Route path="/login">
            <Login currentUser={currentUser} setCurrentUser={setCurrentUser} />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Home 
              fruit={fruit}
              vegetable={vegetable}
              seasoning={seasoning}
              currentUser={currentUser}
              />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
