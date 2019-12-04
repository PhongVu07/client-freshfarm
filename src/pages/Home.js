import React from "react";
import Navibar from "../components/Navibar";
import "../css/home.css";
import { Link } from "react-router-dom";

export default function Home(props) {
  const currentUser = props.currentUser;
  const limitFruit = props.fruit.slice().slice(18);
  const limitVegetable = props.vegetable.slice().slice(18);
  const limitSeasoning = props.seasoning.slice().slice(18);
    // console.log(props.fruit[1]);
  return (
    <div className="container-fluid home">
      <Navibar currentUser={currentUser} />

      <div className="container">
        <h2 className="col-md-12 col-12 pt-3 pb-2">Fruit</h2>
        <div className="row row-cols-1 row-cols-md-3">
          {limitFruit.map(fruit => {
            return (
              <div key={fruit.id} className="col-md-2 col-3 mb-4">
                <div className="card h-100">
                  <div className="product-card-img">
                    <img
                      src={fruit.img_url}
                      className="card-img-top"
                      alt="..."
                    />
                  </div>
                  <div className="card-body product-card-body">
                    <Link to={`/product/${fruit.id}`} className="card-title">
                      {fruit.name}
                    </Link>
                    <div className="row d-flex justify-content-between">
                      <p>{fruit.price}</p>
                      <p>shoppee</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <h2 className="col-md-12 col-12 pb-2">Vegetable</h2>
        <div className="row row-cols-1 row-cols-md-3">
          {limitVegetable.map(fruit => {
            return (
              <div key={fruit.id} className="col-md-2 col-3 mb-4">
                <div className="card h-100">
                  <div className="product-card-img">
                    <img
                      src={fruit.img_url}
                      className="card-img-top"
                      alt="..."
                    />
                  </div>
                  <div className="card-body product-card-body">
                    <h5 className="card-title">{fruit.name}</h5>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <h2 className="col-md-12 col-12 pb-2">Seasoning</h2>
        <div className="row row-cols-1 row-cols-md-3">
          {limitSeasoning.map(fruit => {
            return (
              <div key={fruit.id} className="col-md-2 col-3 mb-4">
                <div className="card h-100">
                  <div className="product-card-img">
                    <img
                      src={fruit.img_url}
                      className="card-img-top"
                      alt="..."
                    />
                  </div>
                  <div className="card-body product-card-body">
                    <h5 className="card-title">{fruit.name}</h5>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
