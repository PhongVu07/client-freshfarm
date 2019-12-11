import React from "react";
import fflogo from "../img/fflogo.png";
import { useHistory, Link } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import cart from "../img/cart.png";

export default function Navibar(props) {
  let history = useHistory();
  function exit() {
    history.push("/");
  }

  const handleLogOut = async () => {
    const res = await fetch("https://fresh-farm.herokuapp.com/user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${sessionStorage.getItem("token")}`
      }
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success == "true") {
        sessionStorage.clear("token");
        props.setCurrentUser(null);
        history.push("/");
      }
    }
  };

  return (
    <nav className="home-nav">
      <div className="container">
        <div className="top-navibar">
          <div className="">
            {/* <div className="row">
              <a href="" className="sm-link-home-nav pr-2 border-right">
                Store login
              </a>
              <a href="" className="sm-link-home-nav pl-2">
                Connect
              </a>
            </div> */}
          </div>
          <div className="">
            <div className="row">
              {!props.currentUser ? (
                <Link to="/login" className="pr-2 sm-link-home-nav">
                  Log in
                </Link>
              ) : (
                <div className="btn-group">
                  <p
                    className="sm-link-home-nav dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {(props.currentUser && props.currentUser.login_name) ||
                      (props.currentUser && props.currentUser.name)}
                  </p>
                  <div className="dropdown-menu">
                    <Link to="/user/profile" className="dropdown-item">
                      Profile
                    </Link>
                    <Link to="/user/cart/in_cart" className="dropdown-item">
                      Cart
                    </Link>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" onClick={handleLogOut}>
                      Log out
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bottom-navibar row pb-2">
          <div className="col-md-3">
            <img
              src={fflogo}
              alt="logo"
              className="bigfflogo"
              onClick={() => exit()}
            />
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

              <Link to="/user/cart/in_cart" className="d-flex justify-content-center align-items-center col-md-1 cart-nav">
                  <img src={cart} alt="cart" className="cart-icon-nav" />
                  <div className="cart-num-nav">
                    {props.numItemInCart && props.numItemInCart.length}
                  </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
