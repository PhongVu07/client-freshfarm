import React, { useState, useEffect } from "react";
import Navibar from "../components/Navibar";
import "../css/user.css";

import UserSideBar from "../components/UserSideBar";
import StoreChart from "../components/StoreChart";
import StoreSaleChart from "../components/StoreSaleChart";
import StoreRating from "../components/StoreRating";

export default function StoreBusiness(props) {
  const currentUser = props.currentUser && props.currentUser;
  const [record, setRecord] = useState(null);
  const [rating, setRating] = useState(null);
  
    console.log(rating, 'rating');
  useEffect(() => {
    getRecord();
  }, []);

  const getRecord = async () => {
    const url = `https://127.0.0.1:5000/product/get_sale`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${sessionStorage.getItem("token")}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      setRecord(data.sale);
      setRating(data.rating);
      return;
    }
    console.log("get record error");
  };

  return (
    <div className="container-fluid user-page">
      <Navibar
        currentUser={currentUser}
        setCurrentUser={props.setCurrentUser}
        numItemInCart={props.numItemInCart}
        filteredProduct={props.filteredProduct}
        setFilteredProduct={props.setFilteredProduct}
      />

      <div className="container mt-4 mb-3">
        <div className="row">
          <UserSideBar currentUser={currentUser} />

          <div className="col-md-10 pb-2">
            <div className="my-account-cart-session col-md-12">
              <StoreSaleChart record={record} />
            </div>

            <div className="my-account-cart-session col-md-12">
              <StoreRating rating={rating}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
