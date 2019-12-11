import React from 'react'
import {Link} from "react-router-dom"
import { FaUser, FaShoppingCart } from "react-icons/fa";
import cart_sidebar from "../img/cart-sidebar.png"
import profile_sidebar from "../img/profile-sidebar.png"
import avatar from "../img/anony-avatar.png"

export default function UserSideBar(props) {
  const currentUser= props.currentUser;


    return (
        <div className="user-side-bar col-md-2">
            <div className="user-page-brief text-center">{currentUser && currentUser.login_name || currentUser && currentUser.name}</div>
            <div className="user-page-sidebar-menu">
              <Link to="/user/profile" className="user-page-sidebar-menu-item">
                <img src={profile_sidebar} alt="profile" className="user-sidebar-icon" />
                Profile
              </Link>
              <Link to="/user/cart/in_cart" className="user-page-sidebar-menu-item">
                <img src={cart_sidebar} alt="cart" className="user-sidebar-icon" />
                Cart
              </Link>
            </div>
          </div>
    )
}
