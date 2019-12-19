import React, { useState, useEffect } from "react";
import Navibar from "../components/Navibar";
import "../css/user.css";

import UserSideBar from "../components/UserSideBar";
import StoreSaleChart from "../components/StoreSaleChart";
import StoreRating from "../components/StoreRating";
import PieChart from "../components/PieChart"


export default function StoreBusiness(props) {
  const currentUser = props.currentUser && props.currentUser;
  const [record, setRecord] = useState(null);
  const [rating, setRating] = useState(null);
  const [viewCount, setViewCount] = useState(0)
  const [saleCount, setSaleCount] = useState(0)
  
  // console.log("view:", viewCount, "sale:", saleCount);
  // console.log("sale:", record, "rating:", rating);
  useEffect(() => {
    getRecord();
  }, []);

  const getRecord = async () => {
    const url = `https://fresh-farm.herokuapp.com/product/get_sale`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${sessionStorage.getItem("token")}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      setRecord(data.sale.sort((a,b)=>new Date(a.date)- new Date(b.date)));
      setRating(data.rating);
      setViewCount(data.view_count);
      setSaleCount(data.sale_count)
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

            <div className="my-account-cart-session col-md-12">
              <PieChart viewCount={viewCount} saleCount={saleCount}/>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}
