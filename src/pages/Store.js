import React, { useState, useEffect } from "react";
import Navibar from "../components/Navibar";
import {Alert} from 'react-bootstrap'
import { FiEdit2, FiEdit } from "react-icons/fi";
import "../css/user.css";
import Moment from 'react-moment';


import UserSideBar from "../components/UserSideBar";
import EditStoreProduct from "../components/EditStoreProduct";

export default function StoreProduct(props) {
  const currentUser = props.currentUser && props.currentUser;
  const [storeProduct, setStoreProduct] = useState(null);
  const [edittingProduct, setEdittingProduct] = useState(null);
  const [showSaveProductAlert, setShowSaveProductAlert] = useState(false)
  // console.log(storeProduct, "products");

  useEffect(() => {
    getStoreProduct();
  }, []);

  const getStoreProduct = async () => {
    const url = `https://fresh-farm.herokuapp.com/user/store/product`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${sessionStorage.getItem("token")}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      setStoreProduct(data.product);
    } else {
      console.log("get porduct owned error");
      alert("fail to get product");
    }
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
      {showSaveProductAlert ? <Alert onClose={() => setShowSaveProductAlert(false)} variant={'success'} dismissible>Successful edit product</Alert> : <></>}
      

      <div className="container mt-4 mb-3">
        <div className="row">
          <UserSideBar currentUser={currentUser} />

          <div className="my-account-cart-session col-md-10">
            <div>
              <div className="my-account-session-header">
                <div className="my-account-session-header-left">
                  <div className="my-account-session-header-title mashtb">
                    Your product
                  </div>
                  <div className="my-account-session-header-subtitle">
                    Add information to attract customers
                  </div>
                </div>
              </div>

              {storeProduct && storeProduct.length > 0 ? (
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
                          Stock
                        </th>
                        <th scope="col" className="cart-table-sm">
                          Price
                        </th>
                        <th scope="col" className="cart-table-sm">
                          Expired date
                        </th>
                        <th scope="col" className="cart-table-sm"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {storeProduct.map((product, id) => {
                        return (
                          <tr key={product.id}>
                            <th scope="row">
                              <img
                                src={product.img_url}
                                className="order-item-img"
                              />
                            </th>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.stock}</td>
                            <td>{product.price}</td>
                            <td><Moment format="YYYY/MM/DD">{product.expired_date}</Moment></td>
                            <td
                              onClick={() => setEdittingProduct(product)}
                              data-toggle="modal"
                              data-target="#exampleModal"
                            >
                              <FiEdit2 />
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
          </div>
        </div>
      </div>

      {/* Edit modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <EditStoreProduct
              edittingProduct={edittingProduct}
              setEdittingProduct={setEdittingProduct}
              getStoreProduct={getStoreProduct}
              setShowSaveProductAlert={setShowSaveProductAlert}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
