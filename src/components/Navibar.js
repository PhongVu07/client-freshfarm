import React from "react";
import fflogo from "../img/fflogo.png";
import { MdSearch, MdShoppingCart } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";

export default function Navibar(props) {
  // console.log(props.currentUser);

  return (
    <nav className="home-nav">
      <div className="container">
        <div className="top-navibar">
          <div className="">
            <div className="row">
              <a className="pr-2 border-right">Store login</a>
              <a className="pl-2">Connect</a>
            </div>
          </div>
          <div className="">
            <div className="row">
              {!props.currentUser ? (
                <a className="pr-2" href="/login">
                  Log in
                </a>
              ) : (
                <a className="pl-2" href="https://127.0.0.1:5000/user/logout">
                  Log out
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="bottom-navibar row pb-2">
          <div className="col-md-3">
            <img src={fflogo} className="bigfflogo" />
          </div>
          <div className="col-md-9 d-flex align-items-center">
            <div className="input-group md-form form-sm form-2 pl-0">
              <input
                className="form-control my-0 py-1 lime-border"
                type="text"
                placeholder="Search"
                aria-label="Search"
              />
              <div className="input-group-append">
                <span
                  className="input-group-text lime lighten-2"
                  id="basic-text1"
                >
                  <MdSearch className="search-icon-nav" />
                </span>
              </div>

              <div className="d-flex justify-content-center align-items-center col-md-1">
                <MdShoppingCart className="cart-icon-nav" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
