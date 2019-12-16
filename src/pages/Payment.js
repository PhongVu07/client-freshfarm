import React, { useState } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import Navibar from "../components/Navibar";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import "../css/user.css";

export default function User(props) {
  const currentUser = props.currentUser && props.currentUser;
  const setCurrentUser = props.setCurrentUser;

  console.log('currentUser', currentUser);

  const handleSave = async (e) => {
    e.preventDefault()
    const url = 'https://127.0.0.1:5000/user/change_profile'
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
          <div className="user-side-bar col-md-2">
            <div className="user-page-brief text-center h5">Phong</div>
            <div className="user-page-sidebar-menu">
              <Link to="/user/profile" className="user-page-sidebar-menu-item">
                <FaUser className="user-sidebar-icon" />
                Profile
              </Link>
              <Link to="/user/invoice/in_cart" className="user-page-sidebar-menu-item">
                <FaShoppingCart className="user-sidebar-icon" />
                Cart
              </Link>
            </div>
          </div>

          <div className="my-account-session col-md-10">
            <div className="my-account-session-header">
              <div className="my-account-session-header-left">
                <div className="my-account-session-header-title">
                  My profile
                </div>
                <div className="my-account-session-header-subtitle">
                  Manage profile to save your account
                </div>
              </div>
            </div>
            <div className="my-account-profile">
              <div className="my-account-profile-left">
                <div className="mb-5">
                  <div className="input-with-lable-wrapper">
                    <div className="input-with-lable-lable">Name</div>
                    <div className="input-with-lable-content">
                      <input type="text" className="input-with-lable-content" defaultValue={currentUser && currentUser.name} onChange={e=>setCurrentUser({...currentUser, 'name':e.target.value})}/>
                    </div>
                  </div>
                </div>

                <div className="mb-5">
                  <div className="input-with-lable-wrapper">
                    <div className="input-with-lable-lable">Email</div>
                    <div className="input-with-lable-content">
                      <input type="text" className="input-with-lable-content" defaultValue={currentUser && currentUser.email} onChange={e=>setCurrentUser({...currentUser, email:e.target.value})}/>
                    </div>
                  </div>
                </div>

                <div className="mb-5">
                  <div className="input-with-lable-wrapper">
                    <div className="input-with-lable-lable">Phone number</div>
                    <div className="input-with-lable-content">
                      <input type="text" className="input-with-lable-content" defaultValue={currentUser && currentUser.phone} onChange={e=>setCurrentUser({...currentUser, phone:e.target.value})}/>
                    </div>
                  </div>
                </div>

                <div className="mb-5">
                  <div className="input-with-lable-wrapper">
                    <div className="input-with-lable-lable">Address</div>
                    <div className="input-with-lable-content">
                      <input type="text" className="input-with-lable-content" defaultValue={currentUser && currentUser.address} onChange={e=>setCurrentUser({...currentUser, address:e.target.value})}/>
                    </div>
                  </div>
                </div>

                <div className="mb-5">
                  <div className="input-with-lable-wrapper">
                    <div className="input-with-lable-lable">Gender</div>
                    <form className="input-with-radio">
                      <div className="input-with-radio-item">
                        <input type="radio" value="male" className="input-radio-item" checked = {currentUser && currentUser.gender === 'male'} onChange={e=>setCurrentUser({...currentUser, gender:e.target.value})}/>
                        <div className="">Male</div>
                      </div>
                      <div className="input-with-radio-item">
                        <input type="radio" value="female" className="input-radio-item" checked = {currentUser && currentUser.gender === 'female'} onChange={e=>setCurrentUser({...currentUser, gender:e.target.value})}/>
                        <div className="">Female</div>
                      </div>
                      <div className="input-with-radio-item">
                        <input type="radio" value="other" className="input-radio-item" checked = {currentUser && currentUser.gender === 'other'} onChange={e=>setCurrentUser({...currentUser, gender:e.target.value})}/>
                        <div className="">Other</div>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="input-with-lable-wrapper">
                    <div className="input-with-lable-lable"></div>
                    <div className="my-account-page-submit">
                      <button type="button" className="" onClick={handleSave}>Save</button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
