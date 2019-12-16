import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import invoice_sidebar from "../img/cart-sidebar.png";
import profile_sidebar from "../img/profile-sidebar.png";
import cart_sidebar from "../img/cartSidebar.png";
import avatar from "../img/anony-avatar.png";
import store_sidebar from "../img/store-sidebar.png";

export default function UserSideBar(props) {
  const currentUser = props.currentUser;
  // console.log(currentUser);
  return (
    <div className="user-side-bar col-md-2">
      <div className="user-page-brief text-center">
        {(currentUser && currentUser.login_name) ||
          (currentUser && currentUser.name)}
      </div>
      <div className="user-page-sidebar-menu">
        <Link to="/user/profile" className="user-page-sidebar-menu-item">
          <img
            src={profile_sidebar}
            alt="profile"
            className="user-sidebar-icon"
          />
          Profile
        </Link>
        <Link to="/user/cart" className="user-page-sidebar-menu-item">
          <img src={cart_sidebar} alt="cart" className="user-sidebar-icon" />
          Cart
        </Link>
        <Link to="/user/invoice/all" className="user-page-sidebar-menu-item">
          <img
            src={invoice_sidebar}
            alt="invoice"
            className="user-sidebar-icon"
          />
          Invoice
        </Link>
        {currentUser && currentUser.store ? (
          <>
            <p
              to="/user/store"
              className="user-page-sidebar-menu-item no-cursor"
            >
              <img
                src={store_sidebar}
                alt="store"
                className="user-sidebar-icon"
              />
              Store
            </p>
            <Link
              to="/user/store/product"
              className="user-page-sidebar-menu-item2"
            >
              Product
            </Link>
            <Link
              to="/user/store/business"
              className="user-page-sidebar-menu-item2"
            >
              Business
            </Link>
          </>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
