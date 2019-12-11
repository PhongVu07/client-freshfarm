import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Categories from "./pages/Categories";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Product from "./pages/Product";
import User from "./pages/User";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment"
import Footer from "./components/Footer";

import { StripeProvider } from "react-stripe-elements";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [fruit, setFruit] = useState([{}]);
  const [vegetable, setVegetable] = useState([{}]);
  const [seasoning, setSeasoning] = useState([{}]);
  const [order, setOrder] = useState(null);
  const [numItemInCart, setNumItemInCart] = useState(0)

  const existingToken = sessionStorage.getItem("token");
  const accessToken =
    window.location.search.split("=")[0] === "?api_key"
      ? window.location.search.split("=")[1]
      : null;

  const [token, setToken] = useState(existingToken || accessToken);
  // console.log('user', currentUser);
  useEffect(() => {
    getCurrentUser();
    getCategoryProdcut(1);
    getCategoryProdcut(2);
    getCategoryProdcut(3);
  }, []);
  
  useEffect(() => {
    getNumItemInCart();
  }, [order])

  const getNumItemInCart = () => {
    let shallowCopy = order && order.slice();
    let inCartItem = shallowCopy && shallowCopy.filter(el => el.order_status === "In cart");
    setNumItemInCart(inCartItem)
  }

  const getCurrentUser = async () => {
    const url = `https://fresh-farm.herokuapp.com/user/get_user`;
    const response = await fetch(url, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      if (data.id !== 'Anomynous') {
      sessionStorage.setItem("token", token);
      setCurrentUser(data);
      getOrder()
      } else {
        sessionStorage.removeItem("token");
      }
    } else {
      sessionStorage.removeItem("token");
    }
    // window.history.replaceState({}, document.title, "/");
  };

  const getCategoryProdcut = async id => {
    const url = `https://fresh-farm.herokuapp.com/product/category/${id}`;
    const resp = await fetch(url);
    const data = await resp.json();
    if (id === 1) {
      setFruit(data);
    } else if (id === 2) {
      setVegetable(data);
    } else {
      setSeasoning(data);
    }
  };

  const getOrder = async () => {
    const url = `https://fresh-farm.herokuapp.com/user/get_order`;
    const response = await fetch(url, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${sessionStorage.getItem("token")}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      setOrder(data.order_items);
    } else {
      console.log("order error");
      alert("Error");
    }
  };

  return (
    <StripeProvider apiKey="pk_test_HGLEAP7M7VfCMagBOu1vTSyA0013x1gxtS">
      <Router>
        <div className="App">
          <Switch>
            <Route path="/user/cart/:order_status">
              <Cart
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                getOrder={getOrder}
                order={order}
                setOrder={setOrder}
                numItemInCart={numItemInCart}
              />
            </Route>
            <Route path="/user/profile/payment">
              <Payment 
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                numItemInCart={numItemInCart}
                />
            </Route>

            <Route path="/user/profile">
              <User 
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                numItemInCart={numItemInCart}
                />
            </Route>

            

            <Route path="/category/:categoryId">
              <Categories />
            </Route>
            <Route path="/product/:productId">
              <Product
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                getOrder={getOrder}
                order={order}
                setOrder={setOrder}
                numItemInCart={numItemInCart}
              />
            </Route>
            <Route path="/login">
              <Login
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                setToken={setToken}
              />
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
                setCurrentUser={setCurrentUser}
                token={token}
                numItemInCart={numItemInCart}
              />
            </Route>
          </Switch>
        </div>

        <Footer />
      </Router>
    </StripeProvider>
  );
}

export default App;
