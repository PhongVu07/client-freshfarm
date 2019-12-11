import React from "react";
import { Link } from "react-router-dom"

export default function HomeProduct(props) {
  return (
    <div>
      <div className="col-md-12 col-12 home-product-header mt-4">
          <div className="col-2 col-md-2 home-product-title">{props.title}</div>
      </div>
      <div className="row row-cols-1 row-cols-md-3 mt-1">
        {props.products.map(product => {
          return (
            <Link to={`/product/${product.id}`} key={product.id} className="col-md-2 col-3 home-product-card">
              <div className="card h-100 home-product-card-border">
                <div className="product-card-img">
                  <img src={product.img_url} className="card-img-top" alt="..." />
                </div>
                <div className="card-body product-card-body">
                  <Link to={`/product/${product.id}`} className="card-title">
                    {product.name}
                  </Link>
                  <div className="row d-flex justify-content-between mt-2">
                    <p className="ff-price">₫{product.price}</p>
                    <p className="title-small">{product.store}</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
