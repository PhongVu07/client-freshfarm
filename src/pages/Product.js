import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navibar from "../components/Navibar";
import "../css/product.css";

export default function Product() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});

  console.log("product", product);

  useEffect(() => {
    getProduct(productId);
  }, []);

  const getProduct = async id => {
    const resp = await fetch(`https://127.0.0.1:5000/product/${id}`);
    const data = await resp.json();
    setProduct(data);
    console.log(data);
  };

  return (
    <div className="container-fluid">
      <Navibar />
      <div className="container mt-4 pt-4 bgc-white">
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
            <div className="product-price">
              <input
                className="quantity"
                type="number"
                min="0"
                max={product.stock}
              />
              <h2>{product.price}/250 gram</h2>
            </div>
            <div className="product-detail">
              <div className="product-detail-title">
                <p>Express</p>
                <p>Provider</p>
              </div>
              <div className="product-detail-content">
                <p>from {product.location}</p>
                <p>{product.store}</p>
              </div>
            </div>

            <div className="row d-flex border-top border-right border-left">
                <div className="col-md-3">250g</div>
                <div className="col-md-8">0% off</div>
                <div className="col-md-1">250g</div>
            </div>
            <div className="row d-flex border-top border-right border-left">
                <div className="col-md-3">250g</div>
                <div className="col-md-8">0% off</div>
                <div className="col-md-1">250g</div>
            </div>
            <div className="row d-flex border">
                <div className="col-md-3">250g</div>
                <div className="col-md-8">0% off</div>
                <div className="col-md-1">250g</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
