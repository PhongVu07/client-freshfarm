import React from "react";
import Navibar from "../components/Navibar";
import "../css/home.css";
import { Link } from "react-router-dom";
import HomeProduct from "../components/HomeProduct";

export default function Home(props) {
  const currentUser = props.currentUser;
  const setCurrentUser = props.setCurrentUser;
  const limitFruit = props.fruit.slice().slice(18);
  const limitVegetable = props.vegetable.slice().slice(18);
  const limitSeasoning = props.seasoning.slice().slice(18);

  const filteredProduct = props.filteredProduct;
  const setFilteredProduct = props.setFilteredProduct;
  return (
    <div className="container-fluid home">
      <Navibar
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        numItemInCart={props.numItemInCart}
        filteredProduct={filteredProduct}
        setFilteredProduct={setFilteredProduct}
      />
      <div className="container">
        <HomeProduct products={limitFruit} title="Fruit" />
        <HomeProduct products={limitVegetable} title="Vegetable" />
        <HomeProduct products={limitSeasoning} title="Seasoning" />
      </div>
    </div>
  );
}
