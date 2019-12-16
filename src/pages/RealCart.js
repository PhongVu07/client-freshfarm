import React, { useState, useEffect } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import Navibar from "../components/Navibar";
import "../css/user.css";

import { Elements } from "react-stripe-elements";
import CheckoutForm from "../components/CheckoutForm";
import UserSideBar from "../components/UserSideBar";

export default function Cart(props) {
  const currentUser = props.currentUser && props.currentUser;
  const setCurrentUser = props.setCurrentUser;
  const [orderItems, setOrderItems] = useState(null);
  const totalAmount =
    orderItems && orderItems.reduce((total, el) => total + el.total_price, 0);
    console.log(orderItems);
  useEffect(() => {
    props.getOrder();
    getOrderItem();
  }, []);

  useEffect(() => {
    getOrderItem();
  }, [props.order]);

  const getOrderItem = () => {
    let shallowCopy = props.order && props.order.slice();
    setOrderItems(
      shallowCopy && shallowCopy.filter(el => el.order_status === "In cart")
    );
  };

  const handleDeleteOrderItem = async id => {
    console.log("detele");
    const url = `https://fresh-farm.herokuapp.com/user/delete_order_item/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${sessionStorage.getItem("token")}`
      }
    });
    if (response.ok) {
      props.getOrder();
    } else {
      console.log("order error");
      alert("Error");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault()
    const url = 'https://fresh-farm.herokuapp.com/user/change_profile'
    let data = currentUser
    const response = await fetch(url, {
      method : 'POST',
      Access : 'cors',
      headers: {
        'Accept' : 'application/json',
        'Content-Type': 'text/plain',
        Authorization: `Token ${sessionStorage.getItem('token')}`
      },
      body : JSON.stringify(data)
    });
    const test = await response.json()
    if (test.state === 'success') {
      alert("saved")
    } else {
      alert("Wrong username or password")
    }
  }

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
              <div className="my-account-session-header">
                <div className="my-account-session-header-left">
                  <div className="my-account-session-header-title mashtb">
                    Cart
                  </div>
                  <div className="my-account-session-header-subtitle">
                    {orderItems && orderItems.length} item(s)
                  </div>
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
                          Quantity
                        </th>
                        <th scope="col" className="cart-table-sm">
                          Total price
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
                            <td>{orderItem.quantity}</td>
                            <td>{orderItem.total_price}</td>
                            <td
                              className="title-small"
                              onClick={() =>
                                handleDeleteOrderItem(orderItem.id)
                              }
                            >
                              Delete
                            </td>
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

            {orderItems && orderItems.length > 0 ? (
              <div className="cart-page-footer">
                <div className="cart-page-footer-row1">
                  <div className="d-flex align-item-center">
                    <div className="cart-page-footer-price">Total amount:</div>
                    <div className="cart-page-footer-price2">{totalAmount}₫</div>
                  </div>
                  <div className="ml-4">
                    <button
                      type="button"
                      className="ff-primary-btn confirm-order-btn"
                      // onClick={handleConfirmOrder}
                      data-toggle="modal"
                      data-target="#exampleModal"
                    >
                      Confirm order
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Complete purchase:
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <Elements>
                <CheckoutForm
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  handleSave={handleSave}
                  amount={totalAmount}
                  getOrder={props.getOrder}
                  setOrder={props.setOrder}
                />
              </Elements>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
