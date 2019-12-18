import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Categories from "./pages/Categories";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Product from "./pages/Product";
import User from "./pages/User";
import Invoice from "./pages/Invoice";
import RealCart from "./pages/RealCart";
import Store from "./pages/Store";
import Store2 from "./pages/Store2";
import Footer from "./components/Footer";

import { StripeProvider } from "react-stripe-elements";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [fruit, setFruit] = useState([{}]);
  const [vegetable, setVegetable] = useState([{}]);
  const [seasoning, setSeasoning] = useState([{}]);
  const [filteredProduct, setFilteredProduct] = useState(null);
  // console.log(fruit, vegetable, seasoning, 'category product');
  const [order, setOrder] = useState(null);
  const [numItemInCart, setNumItemInCart] = useState(0);
  // console.log(order, 'order');
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
  }, [order]);

  const getNumItemInCart = () => {
    let shallowCopy = order && order.slice();
    let inCartItem =
      shallowCopy && shallowCopy.filter(el => el.order_status === "In cart");
    setNumItemInCart(inCartItem);
  };

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
      if (data.id !== "Anomynous") {
        sessionStorage.setItem("token", token);
        setCurrentUser(data);
        getOrder();
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
      setFruit(data.product);
    } else if (id === 2) {
      setVegetable(data.product);
    } else {
      setSeasoning(data.product);
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
        <div className="App pb-5">
          <Switch>
            <Route path="/user/store/product">
              <Store
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                getOrder={getOrder}
                order={order}
                setOrder={setOrder}
                numItemInCart={numItemInCart}
                filteredProduct={filteredProduct}
                setFilteredProduct={setFilteredProduct}
              />
            </Route>
            <Route path="/user/store/business">
              <Store2
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                getOrder={getOrder}
                order={order}
                setOrder={setOrder}
                numItemInCart={numItemInCart}
                filteredProduct={filteredProduct}
                setFilteredProduct={setFilteredProduct}
              />
            </Route>
            <Route path="/user/invoice/:order_status">
              <Invoice
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                getOrder={getOrder}
                order={order}
                setOrder={setOrder}
                numItemInCart={numItemInCart}
                filteredProduct={filteredProduct}
                setFilteredProduct={setFilteredProduct}
              />
            </Route>
            <Route path="/user/cart/">
              <RealCart
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                getOrder={getOrder}
                order={order}
                setOrder={setOrder}
                numItemInCart={numItemInCart}
                filteredProduct={filteredProduct}
                setFilteredProduct={setFilteredProduct}
              />
            </Route>
            <Route path="/user/profile">
              <User
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                numItemInCart={numItemInCart}
                filteredProduct={filteredProduct}
                setFilteredProduct={setFilteredProduct}
              />
            </Route>
            <Route path="/category/:category">
              <Categories
                fruit={fruit}
                vegetable={vegetable}
                seasoning={seasoning}
                getCategoryProdcut={getCategoryProdcut}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                getOrder={getOrder}
                order={order}
                setOrder={setOrder}
                numItemInCart={numItemInCart}
                filteredProduct={filteredProduct}
                setFilteredProduct={setFilteredProduct}
              />
            </Route>
            <Route path="/product/:productId">
              <Product
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                getOrder={getOrder}
                order={order}
                setOrder={setOrder}
                numItemInCart={numItemInCart}
                filteredProduct={filteredProduct}
                setFilteredProduct={setFilteredProduct}
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
                filteredProduct={filteredProduct}
                setFilteredProduct={setFilteredProduct}
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
