import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navibar from "../components/Navibar";
import {Alert} from 'react-bootstrap'
import "../css/product.css";
import { IoMdCheckmark } from "react-icons/io";
import CheckoutForm from "../components/CheckoutForm";
import { Elements } from "react-stripe-elements";
import StarRating from "../components/StarRating";
import StarRatingSm from "../components/StarRatingSm";
import CommentModal from "../components/CommentModal";

export default function Product(props) {
  const currentUser = props.currentUser;
  const setCurrentUser = props.setCurrentUser;
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  // console.log(product);
  const [orderItem, setOrderItem] = useState({
    product_id: productId,
    quantity: 0,
    total_price: 0
  });
  const [rating, setRating] = useState(null);
  const [currentUserRating, setCurrentUserRating] = useState(null);
  const [boughtThisProduct, setBoughtThisProduct] = useState(false);
  const [starsSelected, setStarSelected] = useState(0);
  const [showAlert, setShowAlert] = useState(false)
  // console.log(boughtThisProduct, "buoght?");
  useEffect(() => {
    getProduct(productId);
    getRating(productId);
    viewCount(productId);
  }, []);

  useEffect(() => {
    getBuyerId();
  }, [props.order]);

  const getProduct = async id => {
    const resp = await fetch(`https://127.0.0.1:5000/product/${id}`);
    const data = await resp.json();
    setProduct(data);
  };

  const getRating = async id => {
    const url = `https://127.0.0.1:5000/product/${id}/rating`;
    const response = await fetch(url);
    const data = await response.json();
    setRating(data);
    if (currentUser) {
      const thisUserRating =
        data && data.filter(el => el.user_id === currentUser.id);
      setCurrentUserRating(thisUserRating);
    }
    const totalRating = (
      data.reduce((total, el) => total + el.rating, 0) / data.length
    ).toFixed(1);
    setStarSelected(totalRating);
  };

  const getBuyerId = () => {
    console.log(props.order, "order");
    const boughtProductIds =
      props.order &&
      props.order
        .filter(el => el.order_status === "Proceeding")
        .map(el => el.product_id);
    console.log(boughtProductIds, "ids");
    console.log(typeof productId, "productID");
    setBoughtThisProduct(
      boughtProductIds && boughtProductIds.includes(parseInt(productId))
    );
  };

  const handleInputChange = value => {
    if (value == 0)
      return setOrderItem({ ...orderItem, total_price: 0, quantity: value });
    if (value == 1)
      return setOrderItem({
        ...orderItem,
        total_price: product.price,
        quantity: value
      });
    if (value == 2)
      return setOrderItem({
        ...orderItem,
        total_price: product.price * 2 * 0.9,
        quantity: value
      });
    if (value > 2)
      return setOrderItem({
        ...orderItem,
        total_price: product.price * value * 0.75,
        quantity: value
      });
  };

  const handleOrderItem = async e => {
    e.preventDefault();
    const url = "https://127.0.0.1:5000/user/create_order_item";
    let data = orderItem;
    const response = await fetch(url, {
      method: "POST",
      Access: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "text/plain",
        Authorization: `Token ${sessionStorage.getItem("token")}`
      },
      body: JSON.stringify(data)
    });
    if (response.ok) {
      const data = await response.json();
      props.setOrder(data.order_items);
      setShowAlert(true)
    } else { 
      // console.log("order error");
      alert("Error");
    }
  };

  const viewCount = async id => {
    const url = `https://127.0.0.1:5000/product/${id}/view_count`;
    const response = await fetch(url);
    if (response.ok) return console.log("view counted");
    console.log("error view count");
  };

  return (
    <div className="container-fluid">
      <Navibar
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        numItemInCart={props.numItemInCart}
        filteredProduct={props.filteredProduct}
        setFilteredProduct={props.setFilteredProduct}
      />
      {showAlert ? <Alert onClose={() => setShowAlert(false)} variant={'success'} dismissible>Added to cart</Alert> : <></>}

      <div className="container mt-4 pt-4 pb-4 bgc-white">
        <div className="row">
          <div className="col-md-4 col-12">
            <img
              src={product.img_url}
              className="img-fluid col-md-12 col-12"
              alt="Responsive image"
            />
          </div>

          <div className="col-md-8 col-12">
            <h3>{product.name}</h3>
            <h5>{product.discription}</h5>
            <div className="product-price mt-3 d-flex ">
              <input
                className="quantity input-quantity mr-2"
                type="number"
                min="0"
                max={product.stock}
                defaultValue="0"
                onChange={e => handleInputChange(e.target.value)}
              />
              <span className="space" />
              <div className="quantity ml-1">
                <h2 className="quantity ff-price">{product.price}₫</h2>
                <div className="quantity bullshit">/250g</div>
              </div>
            </div>

            <div className="order-item mt-4 d-flex justify-content-between align-items-center col-md-10 pl-0">
              {/* <div className="order-item-price border">
                <div className="align-self-end title-small">Total:</div>
                <div className="total-price">{orderItem.total_price}₫</div>
              </div> */}
              <div className="order-item-price border">
                <div className="align-self-end title-small">Total:</div>
                <div className="total-price-d">{orderItem.total_price}₫</div>
              </div>
              <button
                className="order-item-btn ff-secondary-btn"
                onClick={handleOrderItem}
              >
                Add to cart
              </button>
              <button
                className="order-item-btn ff-primary-btn"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                Buy now
              </button>
            </div>

            <div
              id={orderItem.quantity == 1 ? "active" : "none"}
              className="price-tag d-flex align-items-center border-top border-right border-left mt-4"
            >
              <div className="col-md-3">250g</div>
              <div className="col-md-8">0% off</div>
              <div className="col-md-1">
                <IoMdCheckmark />
              </div>
            </div>
            <div
              id={orderItem.quantity == 2 ? "active" : "none"}
              className="price-tag d-flex align-items-center border-top border-right border-left"
            >
              <div className="col-md-3">500g</div>
              <div className="col-md-8">10% off</div>
              <div className="col-md-1">
                <IoMdCheckmark />
              </div>
            </div>
            <div
              id={orderItem.quantity > 2 ? "active" : "none"}
              className="price-tag d-flex align-items-center border"
            >
              <div className="col-md-3">1kg</div>
              <div className="col-md-8">25% off</div>
              <div className="col-md-1">
                <IoMdCheckmark />
              </div>
            </div>

            <div className="mt-4">
              <div className="product-detail">
                <div className="title-small ">Express</div>
                <div>from {product.inventory}</div>
              </div>
              <div className="product-detail">
                <div className="title-small ">Provider</div>
                <div>{product.store_name}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container pl-0 pr-0">
        <div className="product-rating">
          <div className="product-rating-header-container col-md-12">
            <div className="product-rating-header">PRODUCT RATING</div>
            <div className="product-rating-btn">
              {boughtThisProduct ? (
                <CommentModal
                  currentUserRating={currentUserRating}
                  setCurrentUserRating={setCurrentUserRating}
                  getRating={getRating}
                  productId={productId}
                  contentLabel="Rate"
                />
              ) : (
                <div />
              )}
            </div>
          </div>

          <div className="product-rating-overview">
            <div className="product-rating-overview-brief">
              <div className="product-rating-over-view-score">
                <span className="product-rating-overview-ratescore">
                  {starsSelected}
                </span>
                <span className="product-rating-overview-ratescore2">on 5</span>
              </div>
              <div className="">
                <StarRating
                  starsSelected={starsSelected}
                  // setStarSelected={setStarSelected}
                />
              </div>
            </div>
          </div>

          <div className="product-rating-list">
            <div className="product-comment-list">
              {rating &&
                rating.map(comment => {
                  return (
                    <div key={comment.id} className="product-comment">
                      <div className="product-comment-avatar">
                        <div className="product-comment-avatar2">
                          <img
                            className="product-comment-avatar3"
                            src={comment.user_avata}
                            alt={comment.user_name}
                          />
                        </div>
                      </div>

                      <div className="">
                        <div className="product-comment-author">
                          {comment.user_name}
                        </div>
                        <div className="product-comment-rating">
                          <StarRatingSm starsSelected={comment.rating} />
                        </div>
                        <div className="product-comment-content">
                          {comment.comment}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
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
                  amount={orderItem.total_price}
                  setCurrentUser={setCurrentUser}
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
