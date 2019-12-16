import React, { useState } from "react";
import "../css/user.css";


export default function EditStoreProduct(props) {
  const edittingProduct = props.edittingProduct
  const setEdittingProduct = props.setEdittingProduct
  const getStoreProduct = props.getStoreProduct
  console.log(edittingProduct, 'current product');

  const handleSave = async e => {
    e.preventDefault();
    const url = `https://127.0.0.1:5000/product/${edittingProduct.id}/edit`;
    let data = edittingProduct;
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
    const test = await response.json();
    if (test.state === "success") {
      alert("saved");
      getStoreProduct();
    } else {
      alert("Wrong username or password");
    }
  };

  return (
    <div className="my-account-session col-md-12">
      <div className="my-account-session-header">
        <div className="my-account-session-header-left">
          <div className="my-account-session-header-title">My inventory</div>
          <div className="my-account-session-header-subtitle">
            Manage your property
          </div>
        </div>
      </div>
      <div className="my-account-profile">
        <div className="my-account-profile-left">
          <div className="mb-5">
            <div className="input-with-lable-wrapper">
              <div className="input-with-lable-lable">Name</div>
              <div className="input-with-lable-content">
                <input
                  type="text"
                  className="input-with-lable-content"
                  defaultValue={edittingProduct && edittingProduct.name}
                  onChange={e =>
                    setEdittingProduct({ ...edittingProduct, name: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div className="mb-5">
            <div className="input-with-lable-wrapper">
              <div className="input-with-lable-lable">Description</div>
              <div className="input-with-lable-content">
                <textarea
                  row="5"
                  type="text"
                  className="input-with-lable-content text-area-edit-product"
                  defaultValue={edittingProduct && edittingProduct.discription}
                  onChange={e =>
                    setEdittingProduct({ ...edittingProduct, discription: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div className="mb-5">
            <div className="input-with-lable-wrapper">
              <div className="input-with-lable-lable">Price</div>
              <div className="input-with-lable-content">
                <input
                  type="text"
                  className="input-with-lable-content"
                  defaultValue={edittingProduct && edittingProduct.price}
                  onChange={e =>
                    setEdittingProduct({ ...edittingProduct, price: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <div className="input-with-lable-wrapper">
              <div className="input-with-lable-lable"></div>
              <div className="my-account-page-submit">
                <button
                  type="button"
                  className="confirm-order-btn ff-primary-btn"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
