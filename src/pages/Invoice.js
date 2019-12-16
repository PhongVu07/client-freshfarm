import React, { useState, useEffect } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import Navibar from "../components/Navibar";
import "../css/user.css";

import { Elements } from "react-stripe-elements";
import CheckoutForm from "../components/CheckoutForm";
import UserSideBar from "../components/UserSideBar";

export default function Invoice(props) {
  const currentUser = props.currentUser && props.currentUser;
  const setCurrentUser = props.setCurrentUser;
  const { order_status } = useParams();
  const [orderItems, setOrderItems] = useState(null);

  useEffect(() => {
    props.getOrder();
    getOrderItemStatus();
  }, []);

  useEffect(() => {
    getOrderItemStatus();
  }, [props.order, order_status]);

  // console.log(props.numItemInCart, 'cart');

  const getOrderItemStatus = () => {
    let shallowCopy = props.order && props.order.slice();
    if (order_status === "all")
      return setOrderItems(
        shallowCopy && shallowCopy.filter(el => el.order_status !== "In cart")
        )
    if (order_status === "proceeding")
      return setOrderItems(
        shallowCopy && shallowCopy.filter(el => el.order_status === "Proceeding")
      );
    if (order_status === "delivering")
      return setOrderItems(
        shallowCopy &&
          shallowCopy.filter(el => el.order_status === "Delivering")
      );
    if (order_status === "delivered")
      return setOrderItems(
        shallowCopy && shallowCopy.filter(el => el.order_status === "Delivered")
      );
    if (order_status === "canceled")
      return setOrderItems(
        shallowCopy && shallowCopy.filter(el => el.order_status === "Cancel")
      );
  };

  return (
    <div className="container-fluid user-page">
      <Navibar
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        numItemInCart={props.numItemInCart}
        filteredProduct={props.filteredProduct}
        setFilteredProduct={props.setFilteredProduct}
      />

      <div className="container mt-4 mb-3">
        <div className="row">
          <UserSideBar currentUser={currentUser}/>

          <div className="my-account-cart-session col-md-10">
            <div>
              <div className="d-flex justify-content-around my-account-cart-header">
                <div className="purchase-list-page-tab">
                  <Link
                    to="/user/invoice/all"
                    className={order_status==='all' ? "page-tab-active purchase-list-page-tab-label col-md-2": "purchase-list-page-tab-label col-md-2"}
                  >
                    All
                  </Link>
                </div>
                <div className="purchase-list-page-tab">
                  <Link
                    to="/user/invoice/proceeding"
                    className={order_status==='proceeding' ? "page-tab-active purchase-list-page-tab-label col-md-2": "purchase-list-page-tab-label col-md-2"}
                  >
                    Proceeding
                  </Link>
                </div>
                <div className="purchase-list-page-tab">
                  <Link
                    to="/user/invoice/delivering"
                    className={order_status==='delivering' ? "page-tab-active purchase-list-page-tab-label col-md-2": "purchase-list-page-tab-label col-md-2"}
                  >
                    Delivering
                  </Link>
                </div>
                <div className="purchase-list-page-tab">
                  <Link
                    to="/user/invoice/delivered"
                    className={order_status==='delivered' ? "page-tab-active purchase-list-page-tab-label col-md-2": "purchase-list-page-tab-label col-md-2"}
                  >
                    Delivered
                  </Link>
                </div>
                <div className="purchase-list-page-tab">
                  <Link
                    to="/user/invoice/canceled"
                    className={order_status==='canceled' ? "page-tab-active purchase-list-page-tab-label col-md-2": "purchase-list-page-tab-label col-md-2"}
                  >
                    Canceled
                  </Link>
                </div>
              </div>

              {orderItems && orderItems.length > 0 ? (
                <div className="cart-area">
                  <table className="table table-hover table-borderless">
                    <thead className="cart-table-head">
                      <tr>
                        <th scope="col" className="cart-table-sm mt-5"></th>
                        <th scope="col" className="cart-table-sm">
                          Product id
                        </th>
                        <th scope="col" className="cart-table-sm">
                          Product
                        </th>
                        <th scope="col" className="cart-table-sm">
                          Total price
                        </th>
                        <th scope="col" className="cart-table-sm">
                          Status
                        </th>
                        <th scope="col" className="cart-table-sm"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderItems.map((orderItem, id) => {
                        return (
                          <tr key={orderItem.id}>
                            <th scope="row">
                              <img
                                src={orderItem.img_url}
                                className="order-item-img"
                              />
                            </th>
                            <td>{orderItem.product_id}</td>
                            <td>{orderItem.product}</td>
                            <td>{orderItem.total_price}</td>
                            <td>{orderItem.order_status}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="cart-area d-flex flex-column justify-content-center align-items-center">
                  <div className="cart-area-empty-icon"></div>
                  <div className="cart-area-empty-text">No item</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
